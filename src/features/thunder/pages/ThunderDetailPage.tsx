import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ThunderDetail from '../components/ThunderDetail';
import { useThunderDetail } from '../hooks/useThunderDetail';
import { joinThunderApi, leaveThunderApi, banThunderMemberApi } from '../api/thunderApi';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import { useDispatch } from 'react-redux';
import { addRecentThunder } from '../../../store/recentThunderSlice';

const ThunderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { thunderId } = useParams<{ thunderId: string }>();
  const { user, isLoading: isAuthLoading } = useAuth();
  const userId = user?.user_id;
  const { data: ThunderDetailData, isLoading } = useThunderDetail(thunderId, userId);
  const dispatch = useDispatch();

  // ThunderDetailData가 있을 때 최근 본 번개모임에 추가
  useEffect(() => {
    if (ThunderDetailData) {
      dispatch(
        addRecentThunder({
          id: ThunderDetailData.id, // ✅ Thunder 타입에 맞게 id
          name: ThunderDetailData.title,
          imageUrl: ThunderDetailData.img_url,
          region: '',
          time: '',
        }),
      );
    }
    console.log('ThunderDetailData:', ThunderDetailData);
  }, [ThunderDetailData, dispatch]);

  const handleJoin = async () => {
    if (!user) {
      alert('로그인이 필요합니다!');
      navigate('/');
      return;
    }

    if (!thunderId) return;

    try {
      await joinThunderApi(Number(thunderId));
      alert('가입 되었습니다!');
      location.reload();
    } catch (error: any) {
      alert(error.message || '가입 실패');
    }
  };

  /** 탈퇴하기 버튼 클릭 시 호출 */
  const handleLeave = async () => {
    await leaveThunderApi(Number(thunderId));
    navigate('/');
  };

  /** 멤버 추방 처리 */
  const handleBan = async (userId: string) => {
    try {
      await banThunderMemberApi(Number(thunderId), Number(userId));
      alert('추방 완료');
      location.reload();
    } catch (error) {
      alert('멤버 추방에 실패했습니다.');
    }
  };

  if (isLoading || isAuthLoading) return <p>로딩 중...</p>;

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>번개모임명</MainTitle>
      </TitleArea>
      <div className="flex flex-col gap-6">
        <ButtonUnit mode="cancel">뒤로가기</ButtonUnit>
        {ThunderDetailData ? (
          <ThunderDetail
            model={ThunderDetailData}
            onJoin={handleJoin}
            onLeave={handleLeave}
            onBan={handleBan}
          />
        ) : (
          <p>모임 정보를 찾을 수 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default ThunderDetailPage;

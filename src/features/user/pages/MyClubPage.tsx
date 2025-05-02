import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hook';
import MyJoinedClubList from '../components/MyJoinedClubList';
import MyManagedClubList from '../components/MyManagedClubList';
import MyJoinedThunderList from '../components/MyJoinedThunderList';
import { fetchMyClubList, fetchJoinedMyThunderClubList } from '../../user/hooks/useMypage';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { JoinedClubList, ManagedClubList, JoinedThunderList } from '../types';
import { MainTitle, TitleArea } from '../../../common/style/common.css';

const MyClubPage = () => {
  const nickname = useAppSelector((state) => state.user.nickname);
  const profileUrl = useAppSelector((state) => state.user.userProfile);

  const [joinedClubs, setJoinedClubs] = useState<JoinedClubList>([]);
  const [managedClubs, setManagedClubs] = useState<ManagedClubList>([]);
  const [joinedThunders, setJoinedThunders] = useState<JoinedThunderList>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 클럽 정보 통합 요청
        const { managedClubs, joinedClubs } = await fetchMyClubList();
        setManagedClubs(managedClubs);
        setJoinedClubs(joinedClubs);

        // ✅ 참여한 번개모임 요청
        const thunders = await fetchJoinedMyThunderClubList();
        setJoinedThunders(thunders);
      } catch (error) {
        console.error('내 모임 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>내 클럽 관리</MainTitle>
      </TitleArea>

      {/* 사용자 정보 */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={profileUrl || '/assets/default-profile.png'}
            alt="프로필 이미지"
            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{nickname}</span>
        </div>
        <ButtonUnit mode="cancel">✕</ButtonUnit>
      </section>

      {/* 내가 참여 중인 모임 */}
      <MyJoinedClubList clubs={joinedClubs} />

      {/* 내가 운영 중인 모임 */}
      <MyManagedClubList clubs={managedClubs} />

      {/* 내가 참여 중인 번개모임 */}
      <MyJoinedThunderList thunders={joinedThunders} />
    </>
  );
};

export default MyClubPage;

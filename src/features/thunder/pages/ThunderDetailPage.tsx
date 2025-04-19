/**
 * ThunderDetailPage
 *
 * 번개 모임 상세 페이지 컴포넌트입니다.
 * - 모임 정보(제목, 설명, 이미지, 지역, 시간 등)를 표시하고,
 * - 참여/탈퇴/삭제/수정 버튼을 보여줍니다.
 * - 참여자 목록을 렌더링하며, 운영자일 경우 멤버 추방 기능이 활성화됩니다.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchThunderDetail,
  fetchThunderMembers,
  joinThunder,
  leaveThunder,
  deleteThunder,
  banThunderMember,
} from '../api/thunderApi';
import ThunderDetail from '../components/ThunderDetail';
import ThunderMembers from '../components/ThunderMembers';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useAppSelector } from '../../../store/hook';

/**
 * 날짜/시간 문자열을 한국어 포맷으로 변환합니다.
 * @param datetime - ISO 8601 날짜 문자열
 * @returns YYYY년 MM월 DD일 HH시 mm분 형식의 문자열
 */
const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};

const ThunderDetailPage: React.FC = () => {
  const { thunderId } = useParams<{ thunderId: string }>();
  const navigate = useNavigate();
  const myUserId = useAppSelector((state) => state.user.userId);

  const [detail, setDetail] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  /**
   * 페이지 로딩 시 번개 모임 정보 및 멤버 목록을 불러옵니다.
   */
  useEffect(() => {
    if (!thunderId) return;

    const fetchAll = async () => {
      try {
        const d = await fetchThunderDetail(Number(thunderId));
        const m = await fetchThunderMembers(Number(thunderId));
        setDetail(d);
        setMembers(m);
      } catch (err) {
        alert('데이터를 불러오지 못했습니다.');
      }
    };

    fetchAll();
  }, [thunderId]);

  /** 현재 유저가 운영자인지 확인 */
  const isAdmin = members.some((m) => String(m.memberId) === myUserId && m.role === 'admin');

  /** 현재 유저가 참여자인지 확인 */
  const isParticipant = members.some((m) => String(m.memberId) === myUserId);

  /** 운영자를 제외한 참여자 목록 */
  const filteredMembers = members.filter((m) => m.role === 'member');
  const visibleMembers = filteredMembers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMembers.length;

  /** 삭제하기 버튼 클릭 시 호출 */
  const handleDelete = async () => {
    await deleteThunder(Number(thunderId));
    navigate('/');
  };

  /** 참여하기 버튼 클릭 시 호출 */
  const handleJoin = async () => {
    await joinThunder(Number(thunderId));
    window.location.reload();
  };

  /** 탈퇴하기 버튼 클릭 시 호출 */
  const handleLeave = async () => {
    await leaveThunder(Number(thunderId));
    navigate('/');
  };

  /** 멤버 추방 처리 */
  const handleBanMember = async (memberId: number) => {
    try {
      await banThunderMember(Number(thunderId), memberId);
      const updated = await fetchThunderMembers(Number(thunderId));
      setMembers(updated);
    } catch (err) {
      alert('멤버 추방에 실패했습니다.');
    }
  };

  /** 더보기 버튼 클릭 시 참여자 수 증가 */
  const loadMoreMembers = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (!detail) return <p>로딩중...</p>;

  return (
    <div>
      {/* 상단 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
        {/* 왼쪽 버튼: 참여/탈퇴/삭제/수정 */}
        <div>
          {isAdmin ? (
            <>
              <ButtonUnit mode="confirm" onClick={handleDelete}>
                삭제하기
              </ButtonUnit>
              <ButtonUnit mode="base" onClick={() => navigate(`/thunder/edit/${thunderId}`)}>
                수정하기
              </ButtonUnit>
            </>
          ) : isParticipant ? (
            <ButtonUnit mode="confirm" onClick={handleLeave}>
              탈퇴하기
            </ButtonUnit>
          ) : (
            <ButtonUnit mode="confirm" onClick={handleJoin}>
              참여하기
            </ButtonUnit>
          )}
        </div>

        {/* 닫기 버튼 */}
        <ButtonUnit mode="cancel">X</ButtonUnit>
      </div>

      {/* 상세 정보 표시 */}
      <ThunderDetail
        thunderId={detail.thunderId}
        title={detail.title}
        description={detail.description}
        category={detail.category}
        region={detail.region}
        imageUrl={detail.imgUrl || '/default-image.png'}
        dateTime={formatDateTime(detail.datetime)}
        members={[]} // 멤버 리스트는 별도 렌더링
      />

      {/* 참여자 목록 */}
      {visibleMembers.length === 0 ? (
        <p>참여자 없음</p>
      ) : (
        <>
          <ThunderMembers
            members={visibleMembers}
            isViewerAdmin={isAdmin}
            onBanClick={handleBanMember}
          />
          {hasMore && (
            <div style={{ marginTop: '1rem' }}>
              <ButtonUnit mode="more" onMore={loadMoreMembers}>
                참여자 더보기
              </ButtonUnit>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ThunderDetailPage;

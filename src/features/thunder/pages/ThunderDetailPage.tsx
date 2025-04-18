import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchThunderDetail, joinThunder, leaveThunder, deleteThunder } from '../api/thunderApi';
import ThunderDetail from '../components/ThunderDetail';
import ThunderMembers from '../components/ThunderMembers';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useAppSelector } from '../../../store/hook';

/**
 * datetime 문자열을 한국어 형식으로 포맷하는 함수
 *
 * @param datetime - ISO 8601 형식의 날짜 문자열
 * @returns 'YYYY년 MM월 DD일 HH시 mm분' 형태의 문자열
 */
const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};

/**
 * ThunderDetailPage 컴포넌트
 *
 * 번개 모임의 상세 정보를 보여주는 페이지로,
 * 모임 정보, 시간, 위치, 대표 이미지, 참여 인원 등을 렌더링하며
 * 참여, 탈퇴, 삭제 등의 동작을 처리함
 *
 * - 상단 버튼: 참여/탈퇴/삭제, 닫기(X)
 * - 상세 정보: 제목, 설명, 이미지, 위치, 시간
 * - 참여자 리스트: 최대 3명까지 보여주고 '더보기' 버튼으로 확장
 */
const ThunderDetailPage: React.FC = () => {
  const { thunderId } = useParams<{ thunderId: string }>();
  const navigate = useNavigate();
  const myUserId = useAppSelector((state) => state.user.userId);

  const [detail, setDetail] = useState<any>(null); // 번개 모임 상세 정보
  const [eventDate, setEventDate] = useState<string>(''); // 모임 시간
  const [members, setMembers] = useState<any[]>([]); // 참여자 목록 전체
  const [visibleCount, setVisibleCount] = useState(3); // 처음 보여줄 참여자 수

  // 현재 로그인한 유저가 운영자인지 여부
  const isAdmin = members.some((m) => m.memberId === myUserId && m.isAdmin);

  // 현재 로그인한 유저가 참여 중인지 여부
  const isParticipant = members.some((m) => m.memberId === myUserId);

  /**
   * 컴포넌트 마운트 시 모임 정보, 시간, 참여자 정보를 불러오는 함수
   * (현재 mock 데이터 기반으로 작성되어 있으며, 향후 실제 API로 대체 예정)
   */
  useEffect(() => {
    if (!thunderId) return;

    const fetchAll = async () => {
      const d = await fetchThunderDetail(Number(thunderId));
      setDetail(d);

      // 🔧 추후 API 명세 확정 시 교체 예정
      const mockEvent = { eventDate: new Date().toISOString() };
      setEventDate(mockEvent.eventDate);

      const mockMembers = [
        { memberId: 1, nickname: '유저1', isAdmin: true },
        { memberId: 2, nickname: '유저2' },
        { memberId: 3, nickname: '유저3' },
        { memberId: 4, nickname: '유저4' },
      ];
      setMembers(mockMembers);
    };

    fetchAll();
  }, [thunderId]);

  /**
   * 삭제 버튼 클릭 시 모임 삭제 후 메인 페이지로 이동
   */
  const handleDelete = async () => {
    await deleteThunder(Number(thunderId));
    navigate('/');
  };

  /**
   * 참여 버튼 클릭 시 모임 가입 후 페이지 새로고침
   */
  const handleJoin = async () => {
    await joinThunder(Number(thunderId));
    window.location.reload();
  };

  /**
   * 탈퇴 버튼 클릭 시 모임 탈퇴 후 메인 페이지로 이동
   */
  const handleLeave = async () => {
    await leaveThunder(Number(thunderId));
    navigate('/');
  };

  /**
   * '참여자 더보기' 버튼 클릭 시, 추가 참여자를 보여줌
   */
  const loadMoreMembers = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (!detail) return <p>로딩중...</p>;

  const visibleMembers = members.slice(0, visibleCount); // 현재 보여지는 멤버
  const hasMore = visibleCount < members.length; // 더보기 여부

  return (
    <div>
      {/* 상단 버튼: 참여 관련(왼), 닫기(오) */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {isAdmin ? (
          <ButtonUnit mode="confirm" onClick={handleDelete}>
            삭제하기
          </ButtonUnit>
        ) : isParticipant ? (
          <ButtonUnit mode="confirm" onClick={handleLeave}>
            탈퇴하기
          </ButtonUnit>
        ) : (
          <ButtonUnit mode="confirm" onClick={handleJoin}>
            참여하기
          </ButtonUnit>
        )}
        <ButtonUnit mode="cancel" children="X" />
      </div>

      {/* 모임 상세 정보 */}
      <ThunderDetail
        thunderId={Number(thunderId)}
        title={detail.title}
        description={detail.description}
        category={detail.category}
        region={detail.region}
        imageUrl={detail.imageUrl || '/default-image.png'}
        dateTime={formatDateTime(eventDate)}
        location={detail.region}
        members={[]}
      />

      {/* 참여자 리스트 */}
      {members.length === 0 ? (
        <p>참여자 없음</p>
      ) : (
        <>
          <ThunderMembers members={visibleMembers} isViewerAdmin={isAdmin} />
          {hasMore && (
            <ButtonUnit mode="more" onMore={loadMoreMembers}>
              참여자 더보기
            </ButtonUnit>
          )}
        </>
      )}
    </div>
  );
};

export default ThunderDetailPage;

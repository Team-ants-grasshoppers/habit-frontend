import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClubDetailProps, ClubMember } from '../types';
import { useAuth } from '../../../hooks/useAuth';
import {
  fetchClubDetail,
  fetchClubMembers,
  manageClubMember,
  requestJoinClub,
} from '../api/clubApi';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ClubDetail from '../components/ClubDetail';

/**
 * ClubDetailPage 컴포넌트
 *
 * 클럽 상세 페이지로, 다음의 기능을 포함한다:
 *
 * - 클럽 정보(fetchClubDetail) 및 멤버 목록(fetchClubMembers) 조회
 * - 운영자(admin), 일반 멤버(member), 가입 대기자(pending) 구분하여 렌더링
 * - 사용자가 클럽에 가입 요청을 보낼 수 있는 '가입하기' 버튼 제공
 * - 운영자인 경우 가입 대기자의 가입을 승인하거나 거절할 수 있는 기능 포함
 *
 * 상태 설명:
 * @state clubData - 클럽 기본 정보 (이름, 소개, 이미지 등)
 * @state admins - 클럽 운영진 목록 (ClubMember[])
 * @state members - 일반 멤버 목록 (ClubMember[])
 * @state pendingMembers - 가입 대기자 목록 (ClubMember[])
 * @state isLoading - 데이터 로딩 여부
 *
 * 인증 상태:
 * - useAuth 훅을 사용하여 현재 로그인 유저 정보(user)와 로딩 상태(isAuthLoading) 조회
 *
 * API 사용:
 * - fetchClubDetail(clubId): 클럽 상세 정보 조회
 * - fetchClubMembers(clubId): 멤버/운영진/대기자 목록 조회
 * - requestJoinClub(clubId): 클럽 가입 요청
 * - manageClubMember(clubId, { target_member_id, action }): 가입 승인/거절 처리
 *
 * 컴포넌트 렌더링 구성:
 * 1. <ButtonUnit mode="cancel"> - 상단 뒤로가기 버튼
 * 2. <ClubDetail> - 클럽 이미지, 이름, 소개, 운영진/멤버/대기자 리스트 렌더링 및 가입/승인/거절 기능 연결
 */

const ClubDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const defaultProfile = '/assets/default-profile.png';

  const [clubData, setClubData] = useState<ClubDetailProps | null>(null);
  const [admins, setAdmins] = useState<ClubMember[]>([]);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [pendingMembers, setPendingMembers] = useState<ClubMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoading: isAuthLoading } = useAuth();
  const userId = user?.user_id;

  useEffect(() => {
    if (!clubId) return;

    const fetchData = async () => {
      try {
        const detail = await fetchClubDetail(Number(clubId));
        const memberList = await fetchClubMembers(Number(clubId));

        const admins = memberList
          .filter((m) => m.role === 'admin')
          .map((m) => ({
            id: String(m.member_id),
            name: m.nickname,
            profileImageUrl: defaultProfile,
          }));

        const members = memberList
          .filter((m) => m.role === 'member')
          .map((m) => ({
            id: String(m.member_id),
            name: m.nickname,
            profileImageUrl: defaultProfile,
          }));

        const pending = memberList
          .filter((m) => m.role === 'pending')
          .map((m) => ({
            id: String(m.member_id),
            name: m.nickname,
            profileImageUrl: defaultProfile,
          }));

        setClubData({
          id: Number(clubId),
          name: detail.name,
          description: detail.description,
          category: detail.category,
          region: detail.region,
          imageUrl: detail.imageUrl,
          admins,
          members,
        });
        setAdmins(admins);
        setMembers(members);
        setPendingMembers(pending);
      } catch (error) {
        alert('모임 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clubId]);

  const handleJoin = async () => {
    if (!user) {
      alert('로그인이 필요합니다!');
      navigate('/login');
      return;
    }

    if (!clubId) return;

    try {
      await requestJoinClub(Number(clubId));
      alert('가입 요청이 성공적으로 전송되었습니다!');
      location.reload();
    } catch (error: any) {
      alert(error.message || '가입 요청 실패');
    }
  };

  const handleApprove = async (userId: string) => {
    if (!clubId) return;
    try {
      await manageClubMember(Number(clubId), {
        target_member_id: Number(userId),
        action: 'approve',
      });
      alert('승인 완료');
      location.reload();
    } catch {
      alert('승인 실패');
    }
  };

  const handleReject = async (userId: string) => {
    if (!clubId) return;
    try {
      await manageClubMember(Number(clubId), {
        target_member_id: Number(userId),
        action: 'reject',
      });
      alert('거절 완료');
      location.reload();
    } catch {
      alert('거절 실패');
    }
  };

  const handleBan = async (userId: string) => {
    if (!clubId) return;
    try {
      await manageClubMember(Number(clubId), {
        target_member_id: Number(userId),
        action: 'ban',
      });
      alert('추방 완료');
      location.reload();
    } catch {
      alert('추방 실패');
    }
  };

  if (isLoading || isAuthLoading) return <p>로딩 중...</p>;
  if (!clubData) return <p>모임 정보를 찾을 수 없습니다.</p>;

  const isAdmin = admins.some((admin) => admin.id === userId);
  const isMember = members.some((member) => member.id === userId);
  const isPending = pendingMembers.some((pending) => pending.id === userId);

  return (
    <div className="flex flex-col gap-6">
      <ButtonUnit mode="cancel">뒤로가기</ButtonUnit>

      <ClubDetail
        imageUrl={clubData.imageUrl || defaultProfile}
        name={clubData.name}
        description={clubData.description}
        admins={admins}
        members={members}
        pendingUsers={pendingMembers}
        isAdmin={isAdmin}
        isMember={isMember}
        isPending={isPending}
        onJoin={handleJoin}
        onApprove={handleApprove}
        onReject={handleReject}
        onBan={handleBan}
      />
    </div>
  );
};

export default ClubDetailPage;

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
      />
    </div>
  );
};

export default ClubDetailPage;

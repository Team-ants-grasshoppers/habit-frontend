import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ClubDetail from '../components/ClubDetail';
import ClubRequest from '../components/ClubRequest';
import ButtonUnit from '../../../common/components/ui/Buttons';
import {
  fetchClubDetail,
  fetchClubMembers,
  requestJoinClub,
  manageClubMember,
} from '../api/clubApi';

interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}
/**
 * ClubDetailPage 컴포넌트
 *
 * 클럽 상세 페이지로, 다음의 기능을 포함한다:
 *
 * - 클럽 정보(fetchClubDetail) 및 멤버 목록(fetchClubMembers) 조회
 * - 운영자(admin), 멤버(member), 가입대기자(pending) 구분하여 렌더링
 * - 사용자가 클럽에 가입 요청을 보낼 수 있는 '가입하기' 버튼 제공
 * - 운영자인 경우 가입대기자의 가입을 승인하거나 거절할 수 있는 기능 포함
 *
 * 상태 설명:
 * @state name - 클럽 이름
 * @state description - 클럽 소개
 * @state imageUrl - 클럽 이미지 URL
 * @state admins - 운영진 목록 (ClubMember[])
 * @state members - 일반 멤버 목록 (ClubMember[])
 * @state pendingUsers - 가입대기자 목록 (ClubMember[])
 * @state hasJoined - 현재 로그인 유저가 해당 클럽에 가입되어 있는지 여부
 * @state isAdmin - 현재 로그인 유저가 해당 클럽의 운영자인지 여부
 *
 * API 사용:
 * - fetchClubDetail(clubId): 클럽 상세 정보 조회
 * - fetchClubMembers(clubId): 멤버/운영진/대기자 목록 조회
 * - requestJoinClub(clubId): 클럽 가입 요청
 * - manageClubMember(clubId, { target_member_id, action }): 가입 승인/거절 처리
 *
 * 컴포넌트 렌더링 구성:
 * 1. <ButtonUnit mode="cancel"> - 상단 뒤로가기 버튼
 * 2. <ClubDetail> - 클럽 이미지, 이름, 소개, 운영진/멤버 리스트 렌더링
 * 3. <ButtonUnit mode="confirm"> - 미가입 & 로그인 유저에게만 보이는 '가입하기' 버튼
 * 4. <ClubRequest> - 운영자일 경우 가입 요청 대기자 목록 및 승인/거절 버튼 표시
 */

const ClubDetailPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [admins, setAdmins] = useState<ClubMember[]>([]);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [pendingUsers, setPendingUsers] = useState<ClubMember[]>([]);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const defaultProfile = '/assets/default-profile.png';

  useEffect(() => {
    if (!clubId) return;

    const fetchData = async () => {
      try {
        const detail = await fetchClubDetail(Number(clubId));
        setName(detail.name);
        setDescription(detail.description);
        setImageUrl(detail.imageUrl);

        const rawMembers = await fetchClubMembers(Number(clubId));

        const admins: ClubMember[] = [];
        const members: ClubMember[] = [];
        const pending: ClubMember[] = [];

        rawMembers.forEach((m) => {
          const mapped: ClubMember = {
            id: m.member_id.toString(),
            name: m.nickname,
            profileImageUrl: defaultProfile,
          };

          if (m.role === 'admin') {
            admins.push(mapped);
            if (m.member_id.toString() === user.userId) {
              setIsAdmin(true);
              setHasJoined(true);
            }
          } else if (m.role === 'member') {
            members.push(mapped);
            if (m.member_id.toString() === user.userId) {
              setHasJoined(true);
            }
          } else if (m.role === 'pending') {
            pending.push(mapped);
            if (m.member_id.toString() === user.userId) {
              setHasJoined(true);
            }
          }
        });

        setAdmins(admins);
        setMembers(members);
        setPendingUsers(pending);
      } catch (err) {
        alert('클럽 정보를 불러오지 못했습니다.' + err);
      }
    };

    fetchData();
  }, [clubId, user.userId]);

  const handleJoin = async () => {
    if (!clubId) return;
    try {
      await requestJoinClub(Number(clubId));
      alert('가입 요청이 전송되었습니다.');
      setHasJoined(true);
    } catch (err) {
      alert('가입 요청에 실패했습니다.');
    }
  };

  const handleApprove = (userId: string) => {
    if (!clubId) return;
    manageClubMember(Number(clubId), { target_member_id: Number(userId), action: 'approve' })
      .then(() => window.location.reload())
      .catch(() => alert('승인 실패'));
  };

  const handleReject = (userId: string) => {
    if (!clubId) return;
    manageClubMember(Number(clubId), { target_member_id: Number(userId), action: 'reject' })
      .then(() => window.location.reload())
      .catch(() => alert('거절 실패'));
  };

  return (
    <div>
      <ButtonUnit mode="cancel">뒤로가기</ButtonUnit>

      <ClubDetail
        imageUrl={imageUrl}
        name={name}
        description={description}
        admins={admins}
        members={members}
      />

      {!hasJoined && user.isLogin && (
        <ButtonUnit mode="confirm" onClick={handleJoin}>
          가입하기
        </ButtonUnit>
      )}

      <ClubRequest
        pendingUsers={pendingUsers}
        onApprove={handleApprove}
        onReject={handleReject}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default ClubDetailPage;

import React from 'react';
import { ClubMember } from '../types';
import ClubMembers from './ClubMembers';
import ClubRequest from './ClubRequest';
import ButtonUnit from '../../../common/components/ui/Buttons';

interface ClubDetailProps {
  imageUrl: string;
  name: string;
  description: string;
  admins: ClubMember[];
  members: ClubMember[];
  pendingUsers: ClubMember[];
  isAdmin: boolean;
  isMember: boolean;
  isPending: boolean;
  onJoin: () => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

/**
 * ClubDetail 컴포넌트
 *
 * - 클럽 ID를 기반으로 클럽 상세 정보를 직접 API 호출
 * - 운영진 / 일반 멤버 구분
 */
const ClubDetail: React.FC<ClubDetailProps> = ({
  imageUrl,
  name,
  description,
  admins,
  members,
  pendingUsers,
  isAdmin,
  isMember,
  isPending,
  onJoin,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-60 object-cover rounded-md" />

        {isAdmin && (
          <ButtonUnit
            mode="confirm"
            className="absolute top-4 right-4"
            onClick={() => {
              // 수정 페이지 이동은 페이지단에서 처리
            }}
          >
            수정하기
          </ButtonUnit>
        )}
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>

      <div>
        <h3 className="text-xl font-semibold">모임 소개</h3>
        <p className="mt-2">{description}</p>
      </div>

      {/* 가입 상태별 버튼 */}
      {!isAdmin && !isMember && !isPending && (
        <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onJoin}>
          가입하기
        </ButtonUnit>
      )}

      {isPending && (
        <div className="mt-4 w-fit self-end text-sm font-semibold text-yellow-500">
          가입 대기중입니다
        </div>
      )}

      <ClubMembers admins={admins} members={members} />

      {/* 운영자만 가입 대기자 관리 가능 */}
      {isAdmin && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">가입 대기자 목록</h3>
          <ClubRequest pendingUsers={pendingUsers} onApprove={onApprove} onReject={onReject} />
        </div>
      )}
    </div>
  );
};

export default ClubDetail;

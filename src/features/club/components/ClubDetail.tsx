import React from 'react';
import { ClubDetailModel } from '../types';
import ClubMembers from './ClubMembers';
import ClubRequest from './ClubRequest';
import ButtonUnit from '../../../common/components/ui/Buttons';

export interface ClubDetailProps {
  model: ClubDetailModel;
  onJoin: () => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onBan: (userId: string) => void;
}

/**
 * ClubDetail - 클럽 상세 정보를 표시하는 프레젠테이셔널 컴포넌트
 *
 * 주요 기능:
 * - 클럽 대표 이미지, 이름, 소개 출력
 * - 운영진 및 멤버 리스트 출력
 * - 현재 로그인 유저 상태에 따라 "가입하기" 또는 "가입 대기중" 표시
 * - 운영자(admin)인 경우 가입 대기자 목록과 승인/거절 및 추방 기능 제공
 * - 수정 버튼 표시 (클릭 시 수정 페이지 이동은 상위 컴포넌트에서 처리)
 *
 * props:
 * @prop imageUrl - 클럽 대표 이미지 URL
 * @prop clubName - 클럽 이름
 * @prop description - 클럽 소개
 * @prop admins - 운영진 리스트
 * @prop members - 일반 멤버 리스트
 * @prop pendingUsers - 가입 대기자 리스트
 * @prop isAdmin - 현재 유저가 운영자인지 여부
 * @prop isMember - 현재 유저가 멤버인지 여부
 * @prop isPending - 현재 유저가 가입 대기중인지 여부
 * @prop onJoin - 가입 요청 핸들러
 * @prop onApprove - 가입 승인 핸들러
 * @prop onReject - 가입 거절 핸들러
 * @prop onBan - 멤버 추방 핸들러
 */
const ClubDetail: React.FC<ClubDetailProps> = ({
  model: {
    imageUrl,
    clubName,
    description,
    category,
    region,

    admins,
    members,
    pendingUsers,
    isAdmin,
    isMember,
    isPending,
  },
  onJoin,
  onApprove,
  onReject,
  onBan,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <img src={imageUrl} alt={clubName} className="w-full h-60 object-cover rounded-md" />

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

      <h2 className="text-2xl font-bold">{clubName}</h2>

      <div>
        <h3 className="text-xl font-semibold">모임 소개</h3>
        <p className="mt-2">{description}</p>
      </div>

      <div className="flex gap-4">
        <span className="text-sm font-semibold">{category}</span>
        <span className="text-sm font-semibold">{region}</span>
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

      <ClubMembers admins={admins} members={members} isAdmin={isAdmin} onBan={onBan} />

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

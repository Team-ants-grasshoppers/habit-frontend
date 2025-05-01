import React from 'react';
import ThunderMembers from './ThunderMembers';
import { ThunderDetailModel } from '../types';
import ButtonUnit from '../../../common/components/ui/Buttons';

export interface ThunderDetailProps {
  model: ThunderDetailModel;
  onJoin: () => void;
  onLeave: () => void;
  onBan: (userId: string) => void;
}

/**
 * 번개 모임 상세 정보 컴포넌트
 *
 * `ThunderDetail`은 번개 모임의 제목, 설명, 시간, 위치, 참여 인원 등을 표시하는 컴포넌트입니다.
 * - `ThunderMembers`를 통해 참여 중인 인원 목록을 렌더링합니다.
 *
 * @component
 * @param {ThunderDetailProps} props - 컴포넌트에 전달되는 props
 * @returns {JSX.Element}
 */
const ThunderDetail: React.FC<ThunderDetailProps> = ({
  model: {
    thunderName,
    description,
    category,
    region,
    imageUrl,
    date,
    time,
    admins,
    members,
    isAdmin,
    isMember,
  },
  onJoin,
  onLeave,
  onBan,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <img src={imageUrl} alt={thunderName} className="w-full h-60 object-cover rounded-md" />

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

      <h2 className="text-2xl font-bold">{thunderName}</h2>

      <div>
        <h3 className="text-xl font-semibold">번개모임 소개</h3>
        <p className="mt-2">{description}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">모임 카테고리</h3>
        <p className="mt-2">{category}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">모임 지역</h3>
        <p className="mt-2">{region}</p>
      </div>
      <div>
        <p className="text-gray-600">날짜: {date}</p>
        <p className="text-gray-600">시간: {time}</p>
      </div>

      {/* 가입 상태별 버튼 */}
      {!isAdmin && !isMember && (
        <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onJoin}>
          가입하기
        </ButtonUnit>
      )}

      {/* 가입 상태별 버튼 */}
      {!isAdmin && isMember && (
        <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onLeave}>
          탈퇴하기
        </ButtonUnit>
      )}

      <ThunderMembers admins={admins} members={members} isAdmin={isAdmin} onBan={onBan} />
    </div>
  );
};

export default ThunderDetail;

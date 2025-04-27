import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { ClubRequestProps } from '../types';

/**
 * ClubRequest
 * 클럽 가입 대기자 목록을 렌더링하고, 각 대기자에 대해 '가입 승인' 또는 '거절' 처리 가능
 *
 * 주요 기능:
 * - 대기자 리스트(pendingUsers)를 받아 각 유저별로 관리 버튼 표시
 * - 관리 버튼 클릭 시 모달이 열리고, 승인/거절을 선택할 수 있음
 * - 승인 시 onApprove 콜백 호출, 거절 시 onReject 콜백 호출
 * - 모달은 ESC 키 또는 X 버튼으로 닫을 수 있음
 *
 * props:
 * @prop pendingUsers - 가입 대기 중인 유저 배열
 * @prop onApprove - 가입 승인 버튼 클릭 시 호출할 콜백 (필수)
 * @prop onReject - 가입 거절 버튼 클릭 시 호출할 콜백 (선택)
 *
 * @component
 * @returns {JSX.Element} 가입 대기자 리스트 및 관리 모달 UI
 */

const ClubRequest: React.FC<ClubRequestProps> = ({ pendingUsers, onApprove, onReject }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * '관리' 버튼 클릭 시
   * 선택한 유저 ID 설정하고 모달 오픈
   * @param userId - 선택된 유저 ID
   */
  const openManageModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  /** 승인 버튼 클릭 시   */
  const handleApprove = () => {
    if (selectedUserId) {
      onApprove(selectedUserId);
      closeModal();
    }
  };

  /** 거절 버튼 클릭 시   */
  const handleReject = () => {
    if (selectedUserId) {
      onReject?.(selectedUserId);
      closeModal();
    }
  };

  /** 모달 닫기   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h3>가입대기</h3>
      {pendingUsers.map((user) => (
        <div key={user.userId} className="flex items-center gap-4">
          <img
            src={user.profileImageUrl}
            alt={`${user.nickname} 프로필`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-medium">{user.nickname}</span>

          {/* 관리 버튼 */}
          <ButtonUnit mode="more" onClick={() => openManageModal(user.userId)}>
            관리
          </ButtonUnit>
        </div>
      ))}

      {/* 관리 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <p>이 회원의 가입을 승인하시겠습니까?</p>

          <div>
            <ButtonUnit mode="confirm" onClick={handleApprove}>
              승인
            </ButtonUnit>
            <ButtonUnit mode="cancel" onClick={handleReject}>
              거절
            </ButtonUnit>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClubRequest;

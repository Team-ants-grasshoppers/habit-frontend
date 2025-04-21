import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';

/**
 * 클럽 가입 요청 유저 정보를 나타내는 인터페이스
 */
interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}

/**
 * ClubRequest 컴포넌트 Props
 * @property pendingUsers - 가입 대기 중인 유저 리스트
 * @property onApprove - 유저 가입 승인 콜백
 * @property onReject - 유저 가입 거절 콜백
 */
interface ClubRequestProps {
  pendingUsers: ClubMember[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
}
/**
 * ClubRequest 컴포넌트
 *
 * 클럽 가입 요청자 목록을 표시하고 (가입 대기 목록)
 * '관리' 버튼을 눌렀을 때 승인/거절을 선택할 수 있도록 한다.
 * - 상위 컴포넌트에서 pendingUsers를 전달받아 렌더링함
 * - 각 유저 항목에는 가입 수락 버튼이 존재하고, 클릭 시 확인 모달이 표시됨
 * - 모달에서 '승인' 시 onApprove 콜백으로 유저 ID를 상위에 전달
 * - '거절' 시 onReject 콜백으로 유저 ID를 상위에 전달
 * - 닫기(X) 또는 ESC 키는 단순히 모달만 닫힘
 *
 * @component
 * @param {ClubRequestProps} props - 가입 대기자 리스트와 승인/거절 콜백
 * @returns {JSX.Element} 가입 요청자 리스트 UI
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

  /**
   * 승인 버튼 클릭 시
   */
  const handleApprove = () => {
    if (selectedUserId) {
      onApprove(selectedUserId);
      closeModal();
    }
  };

  /**
   * 거절 버튼 클릭 시
   */
  const handleReject = () => {
    if (selectedUserId) {
      onReject?.(selectedUserId);
      closeModal();
    }
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h3>가입대기</h3>
      {pendingUsers.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <img
            src={user.profileImageUrl}
            alt={`${user.name} 프로필`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-medium">{user.name}</span>

          {/* 관리 버튼 */}
          <ButtonUnit mode="more" onClick={() => openManageModal(user.id)}>
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

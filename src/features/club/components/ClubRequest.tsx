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
 * @property onReject - 유저 가입 거절 콜백 (선택)
 * @property isAdmin - 현재 로그인 유저가 운영자인지 여부 (기본값: false)
 */
interface ClubRequestProps {
  pendingUsers: ClubMember[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
  isAdmin?: boolean;
}
/**
 * ClubRequest 컴포넌트
 *
 * 클럽 가입 요청자 목록을 표시하고 가입 수락/거절을 위한 모달을 띄운다.
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
const ClubRequest: React.FC<ClubRequestProps> = ({
  pendingUsers,
  onApprove,
  onReject,
  isAdmin = false,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 가입 승인 버튼 클릭 시 모달 열기
   * @param userId - 선택된 유저 ID
   */
  const handleApproveClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  /**
   * 모달 확인 클릭 시 승인 처리
   */
  const handleConfirm = () => {
    if (selectedUserId) onApprove(selectedUserId);
    closeModal();
  };

  /**
   * 모달 취소 클릭 시 거절 처리
   */
  const handleReject = () => {
    if (selectedUserId && onReject) onReject(selectedUserId);
    closeModal();
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
      <div>
        {pendingUsers.map((user) => (
          <div key={user.id}>
            <img src={user.profileImageUrl} alt={user.name} />
            <p>{user.name}</p>

            {/* 운영자일 때만 가입받기 버튼 표시 */}
            {isAdmin && (
              <ButtonUnit mode="confirm" onClick={() => handleApproveClick(user.id)}>
                가입받기
              </ButtonUnit>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        mode="alert"
        title="정말 이 회원을 가입받으시겠습니까?"
        confirmText="승인"
        cancelText="거절"
        onConfirm={handleConfirm}
        onCancel={handleReject}
        onClose={closeModal}
      />
    </div>
  );
};

export default ClubRequest;

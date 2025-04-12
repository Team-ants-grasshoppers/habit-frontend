import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';

interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface ClubRequestProps {
  pendingUsers: ClubMember[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void; // ✅ 거절 콜백 추가
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
const ClubRequest: React.FC<ClubRequestProps> = ({ pendingUsers, onApprove, onReject }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApproveClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedUserId) onApprove(selectedUserId);
    closeModal();
  };

  const handleReject = () => {
    if (selectedUserId && onReject) onReject(selectedUserId);
    closeModal();
  };

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
            <ButtonUnit mode="confirm" onClick={() => handleApproveClick(user.id)}>
              가입받기
            </ButtonUnit>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        mode="alert"
        title="정말 이 회원을 가입받으시겠습니까?"
        confirmText="승인"
        cancelText="거절"
        onConfirm={handleConfirm} // ✅ 승인
        onCancel={handleReject} // ✅ 거절 처리 (상위 API 호출 가능)
        onClose={closeModal} // ✅ 단순 닫기 (X, ESC)
      />
    </div>
  );
};

export default ClubRequest;

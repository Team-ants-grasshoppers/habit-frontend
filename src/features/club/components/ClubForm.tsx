import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';

interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface ClubFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    name: string;
    description: string;
    imageUrl: string;
    adims: ClubMember[];
    members: ClubMember[];
  };
  onSubmit?: (data: { name: string; description: string; imageUrl: string }) => void;
}

/**
 * ClubForm 컴포넌트
 *
 * 클럽 생성/수정 폼을 렌더링하는 컴포넌트
 * - mode: 'create' | 'edit'에 따라 입력 필드의 기본값이 다름
 * - 운영진/멤버 프로필은 직접 렌더링함
 * - 멤버 프로필 옆에는 추방 버튼이 있으며 클릭 시 확인 모달이 열림
 * - 하단 버튼 영역은 포함하지 않음
 * - name, description, imageUrl 값은 onSubmit을 통해 상위로 전달 가능
 */
const ClubForm: React.FC<ClubFormProps> = ({ mode, initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [adims] = useState<ClubMember[]>(initialData?.adims || []);
  const [members, setMembers] = useState<ClubMember[]>(initialData?.members || []);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpelClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleConfirmExpel = () => {
    if (selectedUserId) {
      setMembers((prev) => prev.filter((user) => user.id !== selectedUserId));
    }
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ name, description, imageUrl });
    }
  };

  return (
    <div>
      <h2>{mode === 'edit' ? '모임 수정' : '모임 만들기'}</h2>

      <div>
        <label>모임명</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>모임 소개</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>이미지 URL</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>

      <div>
        <h3>운영진</h3>
        <div>
          {adims.map((leader) => (
            <div key={leader.id}>
              <img src={leader.profileImageUrl} alt={leader.name} />
              <span>{leader.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>멤버</h3>
        <div>
          {members.map((member) => (
            <div key={member.id}>
              <img src={member.profileImageUrl} alt={member.name} />
              <span>{member.name}</span>
              <button onClick={() => handleExpelClick(member.id)}>추방하기</button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        mode="alert"
        title="정말 이 회원을 추방하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirmExpel}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ClubForm;

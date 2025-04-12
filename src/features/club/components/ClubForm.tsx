import React, { useRef, useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';

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
  onSubmit?: (data: { name: string; description: string; image: File | null }) => void;
  onImageUpload?: (file: File) => Promise<string>; // 이미지 업로드 콜백 (옵션으로 유지 가능)
}

const ClubForm: React.FC<ClubFormProps> = ({ mode, initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [adims] = useState<ClubMember[]>(initialData?.adims || []);
  const [members, setMembers] = useState<ClubMember[]>(initialData?.members || []);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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
      onSubmit({ name, description, image });
    }
  };

  return (
    <div>
      <h2>{mode === 'edit' ? '모임 수정' : '모임 만들기'}</h2>

      <div>
        <label>모임명</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* ✅ 이미지 업로드 영역 */}
      <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        {previewUrl ? <img src={previewUrl} alt="미리보기" /> : <div>이미지 넣기</div>}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageSelect}
      />

      <div>
        <label>모임 소개</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
              <ButtonUnit mode="text" onClick={() => handleExpelClick(member.id)}>
                추방하기
              </ButtonUnit>
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

      {/* ✅ 등록/수정 버튼 */}
      <div>
        <ButtonUnit mode="confirm" onClick={handleSubmit}>
          {mode === 'edit' ? '수정 완료' : '등록'}
        </ButtonUnit>
      </div>
    </div>
  );
};

export default ClubForm;

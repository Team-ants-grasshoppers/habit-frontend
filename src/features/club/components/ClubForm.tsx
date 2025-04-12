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
  onSubmit?: (data: { name: string; description: string; imageUrl: string }) => void;
  onImageUpload?: (file: File) => Promise<string>; // 이미지 업로드 콜백
}
/**
 * ClubForm 컴포넌트
 *
 * 클럽 생성 또는 수정 시 사용하는 폼 컴포넌트입니다.
 *
 * - `mode`에 따라 `"create"` 또는 `"edit"` 모드로 동작합니다.
 * - `"edit"` 모드일 경우, `initialData`를 통해 기존 데이터를 불러와 입력 필드에 초기화합니다.
 * - 이미지 업로드는 외부에서 전달된 `onImageUpload` 콜백으로 처리하며, 업로드된 이미지 URL을 상태에 반영합니다.
 * - 클럽 멤버는 운영진(`adims`)과 일반 멤버(`members`)로 구분되며,
 *   일반 멤버는 "추방하기" 버튼을 통해 모달 확인 후 제거할 수 있습니다.
 * - 등록/수정 완료 시 `onSubmit` 콜백이 호출되며, name, description, imageUrl을 포함한 데이터가 전달됩니다.
 *
 * @component
 * @param {ClubFormProps} props - 클럽 폼 컴포넌트에 전달되는 props
 * @param {'create' | 'edit'} props.mode - 생성 또는 수정 모드
 * @param {Object} [props.initialData] - 수정 시 사용할 초기 데이터 (edit 모드에서만 사용)
 * @param {string} props.initialData.name - 클럽명
 * @param {string} props.initialData.description - 클럽 설명
 * @param {string} props.initialData.imageUrl - 대표 이미지 URL
 * @param {ClubMember[]} props.initialData.adims - 운영진 목록
 * @param {ClubMember[]} props.initialData.members - 클럽 멤버 목록
 * @param {(data: { name: string; description: string; imageUrl: string }) => void} [props.onSubmit] - 등록/수정 완료 시 실행되는 콜백
 * @param {(file: File) => Promise<string>} [props.onImageUpload] - 이미지 업로드 콜백 (업로드 성공 시 이미지 URL 반환)
 */
const ClubForm: React.FC<ClubFormProps> = ({ mode, initialData, onSubmit, onImageUpload }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [adims] = useState<ClubMember[]>(initialData?.adims || []);
  const [members, setMembers] = useState<ClubMember[]>(initialData?.members || []);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      const uploadedUrl = await onImageUpload(file);
      setImageUrl(uploadedUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
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

      {/* ✅ 이미지 업로드 영역 */}
      <div onClick={handleImageClick}>
        {imageUrl ? <img src={imageUrl} alt="미리보기" /> : <div>이미지 넣기</div>}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
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

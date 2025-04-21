import React, { useState } from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';
import InputText from '../../../common/components/ui/InputText';
import { INTERESTS } from '../../../constants/interests';
import { REGIONS } from '../../../constants/regions';
import InterestModal from '../../../common/components/utils/InterestModal';
import RegionModal from '../../../common/components/utils/RegionModal';

interface ClubFormProps {
  mode: 'create' | 'edit'; // ✅ 추가
  name: string;
  imageUrl?: string;
  description: string;
  category: string;
  region: string;
  onNameChange: (value: string) => void;
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string[]) => void;
  onRegionChange: (value: string[]) => void;
  onSubmit: (data: {
    name: string;
    description: string;
    region: string;
    category: string;
    image?: File | null;
  }) => void;
}

const ClubForm: React.FC<ClubFormProps> = ({
  mode,
  name,
  imageUrl,
  description,
  category,
  region,
  onNameChange,
  onImageChange,
  onDescriptionChange,
  onCategoryChange,
  onRegionChange,
  onSubmit,
}) => {
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const handleInterestSelect = (selected: string[]) => {
    onCategoryChange(selected);
    setIsInterestModalOpen(false);
  };

  const handleRegionSelect = (selected: string[]) => {
    onRegionChange(selected);
    setIsRegionModalOpen(false);
  };

  return (
    <div>
      {/* 모임명 */}
      <InputText type="text" name={name} value={name} onChange={(value) => onNameChange(value)} />

      {/* 이미지 업로드 */}
      <div className="flex flex-col">
        <label>모임 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onImageChange(e.target.files?.[0] || null)}
        />
        {imageUrl && <img src={imageUrl} alt="모임 이미지 미리보기" />}
      </div>

      {/* 모임 소개 */}
      <div>
        <label>모임 소개</label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={5}
        />
      </div>

      {/* 모임 카테고리 */}
      <div>
        <label>카테고리</label>
        <ButtonUnit mode="base" onClick={() => setIsInterestModalOpen(true)}>
          {category || '카테고리 설정'}
        </ButtonUnit>
      </div>

      {/* 지역 선택 */}
      <div>
        <label>지역</label>
        <ButtonUnit mode="base" onClick={() => setIsRegionModalOpen(true)}>
          {region || '지역 설정'}
        </ButtonUnit>
      </div>

      <div>
        <ButtonUnit
          mode="confirm"
          onClick={() => onSubmit({ name, description, region, category })}
        >
          {mode === 'create' ? '모임 생성' : '수정 완료'}
        </ButtonUnit>
      </div>

      {/* 관심사 모달 */}
      <InterestModal
        isOpen={isInterestModalOpen}
        selectedInterests={INTERESTS}
        onCancel={() => setIsInterestModalOpen(false)}
        onConfirm={handleInterestSelect}
      />

      {/* 지역 모달 */}
      <RegionModal
        isOpen={isRegionModalOpen}
        selectedRegions={REGIONS}
        onCancel={() => setIsRegionModalOpen(false)}
        onConfirm={handleRegionSelect}
      />
    </div>
  );
};

export default ClubForm;

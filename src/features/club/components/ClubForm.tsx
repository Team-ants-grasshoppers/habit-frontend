import React, { useState } from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';
import InputText, { StyledLabel } from '../../../common/components/ui/InputText';
import InterestModal from '../../../common/components/utils/InterestModal';
import RegionModal from '../../../common/components/utils/RegionModal';
import { INTERESTS } from '../../../constants/interests';
import { REGIONS } from '../../../constants/regions';
import { useClubForm } from '../hooks/useClub';
import { ClubFormData } from '../types';
import { ClubFormWrapper } from '../../../common/style/common.css';

/** ### 모임 생성/수정 폼에서 사용
 * - onNameChange: 이름 입력 핸들러
 * - onImageChange: 이미지 업로드 핸들러
 * - onDescriptionChange: 소개 입력 핸들러
 * - onCategoryChange: 관심사 선택 핸들러
 * - onRegionChange: 지역 선택 핸들러
 * - onSubmit: 폼 제출 핸들러 (폼 데이터 전달)
 */
export interface ClubFormProps {
  mode: 'create' | 'edit';
  initialData?: ClubFormData;
  onSubmit: (data: ClubFormData) => void;
}

/**
 * ClubForm - 모임 생성/수정 폼 UI 렌더링
 *
 * 주요 기능 :
 * - 모임명 입력
 * - 이미지 업로드 및 미리보기
 * - 모임 소개 입력
 * - 카테고리(관심사) 선택
 * - 지역 선택
 * - 생성 또는 수정 완료 버튼
 *
 * props:
 * @prop mode - 'create' | 'edit' 모드 구분
 * @prop clubName - 모임명 입력값
 * @prop imageUrl - 업로드된 이미지 미리보기 URL
 * @prop description - 모임 소개 입력값
 * @prop category - 선택된 카테고리
 * @prop region - 선택된 지역
 * @prop onNameChange - 모임명 변경 핸들러
 * @prop onImageChange - 이미지 파일 변경 핸들러
 * @prop onDescriptionChange - 소개 변경 핸들러
 * @prop onCategoryChange - 카테고리 선택 핸들러
 * @prop onRegionChange - 지역 선택 핸들러
 * @prop onSubmit - 폼 제출 핸들러
 *
 * 추가 구성:
 * - 관심사 선택 모달 (InterestModal)
 * - 지역 선택 모달 (RegionModal)
 */
const ClubForm: React.FC<ClubFormProps> = ({ mode, initialData, onSubmit }) => {
  const { formData, setFormData, handleImageChange } = useClubForm(initialData);

  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const handleInterestSelect = (selected: string[]) => {
    setFormData({ ...formData, category: selected[0] });
    setIsInterestModalOpen(false);
  };

  const handleRegionSelect = (selected: string[]) => {
    setFormData({ ...formData, region: selected[0] });
    setIsRegionModalOpen(false);
  };

  return (
    <ClubFormWrapper>
      {/* 모임명 */}
      <InputText
        type="text"
        name={formData.name}
        value={formData.name}
        label="모임명"
        onChange={(value) => setFormData({ ...formData, name: value })}
      />

      {/* 모임 카테고리 */}
      <div>
        <StyledLabel>카테고리</StyledLabel>
        <ButtonUnit mode="base" onClick={() => setIsInterestModalOpen(true)}>
          {formData.category || '카테고리 설정'}
        </ButtonUnit>
      </div>

      {/* 지역 선택 */}
      <div>
        <StyledLabel>지역</StyledLabel>
        <ButtonUnit mode="base" onClick={() => setIsRegionModalOpen(true)}>
          {formData.region || '지역 설정'}
        </ButtonUnit>
      </div>

      {/* 이미지 업로드 */}
      <div className="flex flex-col">
        <StyledLabel>모임 이미지</StyledLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files?.[0] || undefined)}
        />
        {formData.image.url && <img src={formData.image.url} alt="모임 이미지 미리보기" />}
      </div>

      {/* 모임 소개 */}
      <div className="textarea_wrap">
        <StyledLabel>모임 소개</StyledLabel>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
        />
      </div>

      <ButtonUnit mode="confirm" onClick={() => onSubmit(formData)}>
        {mode === 'create' ? '모임 생성' : '수정 완료'}
      </ButtonUnit>

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
    </ClubFormWrapper>
  );
};

export default ClubForm;

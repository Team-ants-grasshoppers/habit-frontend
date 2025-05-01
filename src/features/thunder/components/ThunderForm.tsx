import React, { useState } from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { ThunderFormData } from '../types';
import { useThunderForm } from '../hooks/useThunder';
import InputText, { StyledLabel } from '../../../common/components/ui/InputText';
import InterestModal from '../../../common/components/utils/InterestModal';
import RegionModal from '../../../common/components/utils/RegionModal';
import { REGIONS } from '../../../constants/regions';
import { INTERESTS } from '../../../constants/interests';
import { ClubFormWrapper } from '../../../common/style/common.css';

/**
 * ThunderForm의 props 타입 정의
 *
 * `mode`는 폼 모드를 구분하며, `initialData`는 수정 시 사용할 초기 데이터입니다.
 * `onSubmit`은 제출 버튼 클릭 시 호출되는 콜백 함수로, 폼의 데이터를 상위로 전달합니다.
 */
interface ThunderFormProps {
  mode: 'create' | 'edit'; // 생성 또는 수정 모드
  initialData?: ThunderFormData;
  onSubmit?: (data: ThunderFormData) => void;
}

/**
 * 번개 모임 생성 및 수정 폼
 *
 * `ThunderForm`은 번개 모임을 생성하거나 수정하는 폼을 제공합니다.
 * - `mode`에 따라 `"create"` 또는 `"edit"` 모드로 동작합니다.
 * - `"edit"` 모드일 경우, `initialData`를 통해 기존 데이터를 불러와 입력 필드에 초기화합니다.
 * - 이미지 업로드는 외부에서 전달된 `onImageUpload` 콜백으로 처리하며, 업로드된 이미지 URL을 상태에 반영합니다.
 * - 수정 완료 시 `onSubmit` 콜백이 호출되며, `title`, `description`, `region`, `date`, `hour`, `minute`, `image`를 포함한 데이터가 전달됩니다.
 *
 * @component
 * @param {ThunderFormProps} props - 번개 모임 폼 컴포넌트에 전달되는 props
 * @param {'create' | 'edit'} props.mode - 생성 또는 수정 모드
 * @param {Object} [props.initialData] - 수정 시 사용할 초기 데이터 (edit 모드에서만 사용)
 * @param {string} props.initialData.title - 모임명
 * @param {string} props.initialData.description - 모임 설명
 * @param {Object} props.initialData.region - 모임 지역 (city, district)
 * @param {string} props.initialData.date - 모임 날짜
 * @param {number} props.initialData.hour - 모임 시간 (시)
 * @param {number} props.initialData.minute - 모임 시간 (분)
 * @param {string} [props.initialData.imageUrl] - 기존 이미지 URL
 * @param {(data: { title: string; description: string; region: { city: string; district: string }; date: string; hour: number; minute: number; image: File | null }) => void} [props.onSubmit] - 수정 또는 생성 완료 시 실행되는 콜백 함수
 */
const ThunderForm: React.FC<ThunderFormProps> = ({ mode, initialData, onSubmit }) => {
  const { formData, setFormData, handleImageChange } = useThunderForm(initialData);

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
        name={formData.thunderName}
        value={formData.thunderName}
        label="번개모임명"
        onChange={(value) => setFormData({ ...formData, thunderName: value })}
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
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
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

      {/* 날짜 선택 */}
      <div className="fit_content">
        <StyledLabel>날짜</StyledLabel>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div className="fit_content">
        <StyledLabel>시간</StyledLabel>
        <input
          type="time"
          value={formData.time} // 시간만
          onChange={(e) =>
            setFormData({
              ...formData,
              time: e.target.value, // 시간 값만 업데이트
            })
          }
        />
      </div>
      {/* 제출 버튼 */}
      <div>
        <ButtonUnit
          mode="confirm"
          onClick={() => {
            if (onSubmit) {
              onSubmit({ ...formData });
            }
          }}
        >
          {mode === 'create' ? '번개모임 생성' : '수정 완료'}
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
    </ClubFormWrapper>
  );
};

export default ThunderForm;

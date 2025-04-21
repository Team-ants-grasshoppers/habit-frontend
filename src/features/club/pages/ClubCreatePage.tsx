import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClub } from '../api/clubApi';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ClubForm from '../components/ClubForm';
import useImageUpload from '../../../hooks/useImageUpload';

/**
 * ClubCreatePage
 *
 * 새로운 모임을 생성하는 페이지
 * - ClubForm 재사용 (mode="create")
 * - 입력값을 받아서 createClub API 호출
 * - 생성 완료 시 새 모임 상세 페이지로 이동
 */
const ClubCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');

  const { imageFile, imageUrl, handleImageChange, uploadSelectedImage } = useImageUpload();

  /**
   * 모임 생성 핸들러
   */
  const handleSubmit = async () => {
    try {
      let uploadedImgId: number | undefined = undefined;

      if (imageFile) {
        const imgId = await uploadSelectedImage();
        if (imgId) {
          uploadedImgId = imgId;
        }
      }

      // 모임 생성 API 호출
      const createdClub = await createClub({
        name,
        description,
        category,
        region,
        imgId: uploadedImgId ?? undefined,
      });

      // 생성된 클럽 ID로 상세 페이지 이동
      navigate(`/club/${createdClub.clubId}`);
    } catch (error) {
      alert('모임 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 상단 뒤로가기 버튼 */}
      <ButtonUnit mode="cancel" onClick={() => navigate(-1)}>
        뒤로가기
      </ButtonUnit>

      {/* ClubForm 재사용 */}
      <ClubForm
        mode="create"
        name={name}
        description={description}
        imageUrl={imageUrl}
        category={category}
        region={region}
        onNameChange={(value) => setName(value)}
        onDescriptionChange={(value) => setDescription(value)}
        onCategoryChange={(value) => setCategory(value[0])}
        onRegionChange={(value) => setRegion(value[0])}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ClubCreatePage;

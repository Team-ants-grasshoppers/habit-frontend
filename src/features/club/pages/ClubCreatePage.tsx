import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClub } from '../api/clubApi';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ClubForm from '../components/ClubForm';
import useImageUpload from '../../../hooks/useImageUpload';

/**
 * ClubCreatePage - 새로운 모임을 생성하는 페이지
 *
 * 기능 :
 * - ClubForm 재사용 (mode="create")
 * - 입력값을 받아 createClub API 호출
 * - 생성 성공 시 생성된 모임의 상세 페이지로 이동
 *
 * 주요 상태:
 * @state clubName - 모임 이름
 * @state description - 모임 소개
 * @state category - 관심사 카테고리
 * @state region - 지역
 * @state imageFile - 업로드할 이미지 파일
 * @state imageUrl - 업로드할 이미지 URL (미리보기용)
 *
 * 커스텀 훅 사용:
 * - useImageUpload: 이미지 파일 관리 및 서버 업로드 처리
 */
const ClubCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');

  const { imageFile, imageUrl, handleImageChange, uploadSelectedImage } = useImageUpload();

  /**
    ### 모임 생성 핸들러
    * 폼 제출 시 모임 생성 및 상세 페이지 이동 처리
    * - 이미지가 선택된 경우 먼저 업로드
    * - 이후 입력한 정보와 함께 createClub API 호출
    * - 생성 성공 시 새로 생성된 모임 상세 페이지로 이동
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
        clubName,
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
        clubName={clubName}
        description={description}
        imageUrl={imageUrl}
        category={category}
        region={region}
        onNameChange={(value) => setClubName(value)}
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

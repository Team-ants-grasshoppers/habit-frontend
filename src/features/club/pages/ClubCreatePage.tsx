import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ClubForm from '../components/ClubForm';
import { ClubFormData } from '../types';
import { useClubCreate } from '../hooks/useClubCreate';

/**
 * ClubCreatePage - 새로운 모임을 생성하는 페이지
 *
 * 기능 :
 * - ClubForm을 이용해 모임 생성 폼 작성
 * - 폼 제출 시 모임 생성 API 호출
 * - 생성 성공 시 생성된 모임의 상세 페이지로 이동
 */
const ClubCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createClub } = useClubCreate();

  const handleSubmit = async (formData: ClubFormData) => {
    try {
      const createdClub = await createClub(formData);
      navigate(`/club/${createdClub.clubId}`);
    } catch (error) {
      alert(
        `모임 생성에 실패했습니다. ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 상단 뒤로가기 버튼 */}
      <ButtonUnit mode="cancel" onClick={() => navigate(-1)}>
        뒤로가기
      </ButtonUnit>

      <ClubForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default ClubCreatePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThunderCreate } from '../hooks/useThunderCreate';
import { ThunderFormData } from '../types';
import ButtonUnit from '../../../common/components/ui/Buttons';
import ThunderForm from '../components/ThunderForm';
import { MainTitle } from '../../../common/style/common.css';

const ThunderCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: createThunder } = useThunderCreate();
  const handleSubmit = async (formData: ThunderFormData) => {
    try {
      const createdThunder = await createThunder(formData);
      navigate(`/thunder/${createdThunder.thunderId}`);
    } catch (error) {
      alert(
        `번개모임 생성에 실패했습니다. ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      );
    }
  };
  return (
    <>
      <MainTitle>번개모임 생성</MainTitle>
      <div className="flex flex-col gap-6">
        {/* 상단 뒤로가기 버튼 */}
        <ButtonUnit mode="cancel" onClick={() => navigate(-1)}>
          뒤로가기
        </ButtonUnit>

        <ThunderForm mode="create" onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default ThunderCreatePage;

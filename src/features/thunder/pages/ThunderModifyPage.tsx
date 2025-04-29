import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThunderForm from '../components/ThunderForm';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useAuth } from '../../../hooks/useAuth';
import { useThunderDetail } from '../hooks/useThunderDetail';
import { useThunderUpdate } from '../hooks/useThunderUpdate';
import { useThunderDelete } from '../hooks/useThunderDelete';
import { ThunderFormData } from '../types';
import { MainTitle } from '../../../common/style/common.css';
/**
 * ThunderModifyPage
 *
 * 번개 모임 수정 페이지 컴포넌트입니다.
 * - 기존 데이터를 API로 불러와 초기값으로 설정
 * - 제목, 설명, 관심사, 지역, 날짜, 시간, 이미지 등 변경 가능
 * - 변경 감지 후 수정된 항목만 update API 요청에 포함
 * - 지역 및 관심사 선택은 모달을 통해 선택
 * - 이미지 업로드 시 변경 여부 추적하여 imgId 전송
 */
const ThunderModifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { thunderId } = useParams<{ thunderId: string }>();
  const { user } = useAuth();
  const userId = user?.user_id;
  const { data: thunderDetail, isLoading } = useThunderDetail(thunderId, userId);
  const { mutateAsync: updateThunder } = useThunderUpdate(Number(thunderId));
  const { mutateAsync: deleteThunder } = useThunderDelete();

  const handleSubmit = async (formData: ThunderFormData) => {
    try {
      await updateThunder(formData);
      alert('번개모임 수정이 완료되었습니다.');
      navigate(`/thunder/${thunderId}`);
    } catch (e) {
      alert(`수정에 실패했습니다. ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!thunderId) return;
      await deleteThunder(thunderId);
      alert('번개모임이 삭제되었습니다.');
      navigate('/');
    } catch (e) {
      alert(`삭제에 실패했습니다. ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (!thunderDetail) return <p>모임 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <MainTitle>번개모임 수정</MainTitle>
      <div className="flex flex-col gap-6">
        {/* 상단 뒤로가기 버튼 */}
        <div>
          <ButtonUnit mode="cancel" children={'X'} />
        </div>

        {/* 번개 모임 수정 폼 */}
        <ThunderForm
          mode="edit"
          initialData={{
            thunderName: thunderDetail.thunderName,
            description: thunderDetail.description,
            category: thunderDetail.category,
            region: thunderDetail.region,
            date: thunderDetail.date,
            time: thunderDetail.time,
            image: {
              url: thunderDetail.imageUrl,
            },
          }}
          onSubmit={handleSubmit}
        />

        {/* 번개 모임 삭제 버튼 */}
        <ButtonUnit mode="base" onClick={handleDelete}>
          모임 삭제
        </ButtonUnit>
      </div>
    </>
  );
};

export default ThunderModifyPage;

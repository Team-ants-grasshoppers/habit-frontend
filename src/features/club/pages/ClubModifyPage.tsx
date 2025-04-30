import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useAuth } from '../../../hooks/useAuth';
import ClubForm from '../components/ClubForm';
import { ClubFormData } from '../types';
import { useClubDetail } from '../hooks/useClubDetail';
import { useClubUpdate } from '../hooks/useClubUpdate';
import { useClubDelete } from '../hooks/useClubDelete';
import { MainTitle, TitleArea } from '../../../common/style/common.css';

/**
 * ClubModifyPage
 * 기존 모임 정보를 수정하는 페이지
 *
 * 주요 기능:
 * - 클럽 상세 정보 조회 및 폼 초기화
 * - 클럽 이름, 소개글, 이미지, 관심사, 지역 수정
 * - 수정된 정보 저장 (updateClub API 호출)
 * - 클럽 삭제 기능 제공 (deleteClub API 호출)
 *
 * 상태 설명:
 * @state clubName - 클럽 이름
 * @state description - 클럽 소개
 * @state category - 클럽 관심사
 * @state region - 클럽 지역
 * @state imageFile, imageUrl - 이미지 파일 및 미리보기 URL (useImageUpload 훅 사용)
 *
 * API 사용:
 * - fetchClubDetail(clubId): 클럽 상세 정보 조회
 * - updateClub(clubId, data): 클럽 수정
 * - deleteClub(clubId): 클럽 삭제
 * - 이미지 업로드: useImageUpload 훅 사용
 *
 * 컴포넌트 렌더링 구성:
 * 1. 상단 뒤로가기 버튼 (`ButtonUnit mode="cancel"`)
 * 2. <ClubForm> - 클럽 정보 수정 입력
 * 3. 하단 "모임 삭제" 버튼
 */

const ClubModifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const { user } = useAuth();
  const userId = user?.user_id;
  const { data: clubDetail, isLoading } = useClubDetail(clubId, userId);
  const { mutateAsync: updateClub } = useClubUpdate(Number(clubId));
  const { mutateAsync: deleteClub } = useClubDelete();

  const handleSubmit = async (formData: ClubFormData) => {
    try {
      await updateClub(formData);
      alert('모임 수정이 완료되었습니다.');
      navigate(`/club/${clubId}`);
    } catch (e) {
      alert(`수정에 실패했습니다. ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!clubId) return;
      await deleteClub(clubId);
      alert('모임이 삭제되었습니다.');
      navigate('/clubs');
    } catch (e) {
      alert(`삭제에 실패했습니다. ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (!clubDetail) return <p>모임 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>모임 수정</MainTitle>
      </TitleArea>

      <ClubForm
        mode="edit"
        initialData={{
          clubName: clubDetail.clubName,
          description: clubDetail.description,
          image: {
            url: clubDetail.imageUrl,
          },
          category: clubDetail.category,
          region: clubDetail.region,
        }}
        onSubmit={handleSubmit}
      />

      <div>
        <ButtonUnit mode="cancel" onClick={handleDelete}>
          모임 삭제
        </ButtonUnit>
      </div>
    </>
  );
};

export default ClubModifyPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClubDetail, fetchClubMembers, updateClub, deleteClub } from '../api/clubApi';
import ClubForm from '../components/ClubForm';
import ButtonUnit from '../../../common/components/ui/Buttons';
import uploadImage from '../../../common/api/imageApi';
import Modal from '../../../common/components/ui/Modal';
import { INTERESTS } from '../../../constants/interests';
import { REGIONS } from '../../../constants/regions';

interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}
/**
 * ClubModifyPage 컴포넌트
 *
 * 클럽 정보 수정 페이지로, 기존 클럽의 상세 정보를 불러와 수정할 수 있는 기능을 제공한다.
 *
 * 주요 기능:
 * - 클럽 상세 정보 및 멤버 목록 불러오기 (운영자, 일반 멤버 구분)
 * - 클럽 이름, 소개, 이미지 수정
 * - 관심사 및 지역 설정 (모달 기반)
 * - 클럽 삭제
 *
 * 상태 설명:
 * @state initialData - 클럽 초기 데이터 (name, description, imageUrl, adims, members)
 * @state category - 현재 설정된 클럽 관심사 (단일 선택)
 * @state region - 현재 설정된 클럽 지역 (단일 선택)
 * @state isInterestOpen - 관심사 모달 오픈 여부
 * @state isRegionOpen - 지역 모달 오픈 여부
 *
 * API 사용:
 * - fetchClubDetail(clubId): 클럽 상세 정보 조회
 * - fetchClubMembers(clubId): 클럽 멤버 목록 조회
 * - updateClub(clubId, data): 클럽 수정 API
 * - deleteClub(clubId): 클럽 삭제 API
 * - uploadImage(file): 이미지 업로드 후 imgId 반환
 *
 * UI 구성:
 * 1. 상단 X 버튼 → 뒤로가기 (`ButtonUnit mode="cancel"`)
 * 2. 관심사/지역 설정 버튼 → 모달 열기
 * 3. <ClubForm> → 이름, 소개, 이미지 등 수정 입력
 * 4. 하단 "모임 삭제" 버튼
 * 5. <Modal> → 관심사/지역 설정 모달 (단일 선택 방식)
 */

const ClubModifyPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<{
    name: string;
    description: string;
    imageUrl: string;
    adims: ClubMember[];
    members: ClubMember[];
  } | null>(null);

  const [category, setCategory] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [isInterestOpen, setInterestOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);

  useEffect(() => {
    if (!clubId) return;

    const fetchData = async () => {
      try {
        const detail = await fetchClubDetail(Number(clubId));
        const membersData = await fetchClubMembers(Number(clubId));

        const adims = membersData
          .filter((m) => m.role === 'admin')
          .map((m) => ({
            id: m.member_id.toString(),
            name: m.nickname,
            profileImageUrl: '/assets/default-profile.png',
          }));

        const members = membersData
          .filter((m) => m.role === 'member')
          .map((m) => ({
            id: m.member_id.toString(),
            name: m.nickname,
            profileImageUrl: '/assets/default-profile.png',
          }));

        setInitialData({
          name: detail.name,
          description: detail.description,
          imageUrl: detail.imageUrl,
          adims,
          members,
        });

        setCategory(detail.category);
        setRegion(detail.region);
      } catch (err) {
        alert('클럽 정보를 불러오지 못했습니다.');
      }
    };

    fetchData();
  }, [clubId]);

  const handleSubmit = async (data: { name: string; description: string; image: File | null }) => {
    if (!clubId || !initialData) return;
    try {
      let imgId: number | undefined = undefined;

      if (data.image) {
        imgId = Number(await uploadImage(data.image));
      }

      await updateClub(Number(clubId), {
        description: data.description,
        category,
        region,
        imgId: imgId ?? 0,
      });

      alert('수정이 완료되었습니다.');
    } catch (err) {
      alert('수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!clubId) return;
    if (!window.confirm('정말로 이 모임을 삭제하시겠습니까?')) return;

    try {
      await deleteClub(Number(clubId));
      alert('모임이 삭제되었습니다.');
      navigate('/clubs');
    } catch (err: any) {
      const msg = err.response?.data?.error || '삭제에 실패했습니다.';
      alert(msg);
    }
  };

  if (!initialData) return <p>로딩중...</p>;

  return (
    <div>
      {/* 상단 뒤로가기 버튼 */}
      <div>
        <ButtonUnit mode="cancel" children={'X'} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <ButtonUnit mode="base" onClick={() => setInterestOpen(true)}>
          모임 카테고리 설정
        </ButtonUnit>
        <ButtonUnit mode="base" onClick={() => setRegionOpen(true)}>
          지역 설정
        </ButtonUnit>
      </div>

      <ClubForm mode="edit" initialData={initialData} onSubmit={handleSubmit} />

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonUnit mode="cancel" onClick={handleDelete}>
          모임 삭제
        </ButtonUnit>
      </div>

      {/* 모달 영역 */}
      <Modal
        isOpen={isInterestOpen}
        mode="checkbox"
        title="관심사 설정"
        checkboxItems={INTERESTS}
        checked={[category]}
        onCheckedChange={(items) => setCategory(items[0])}
        onClose={() => setInterestOpen(false)}
      />

      <Modal
        isOpen={isRegionOpen}
        mode="checkbox"
        title="지역 설정"
        checkboxItems={REGIONS}
        checked={[region]}
        onCheckedChange={(items) => setRegion(items[0])}
        onClose={() => setRegionOpen(false)}
      />
    </div>
  );
};

export default ClubModifyPage;

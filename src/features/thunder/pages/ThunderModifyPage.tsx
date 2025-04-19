import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThunderForm from '../components/ThunderForm';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { fetchThunderDetail, updateThunder } from '../api/thunderApi';
import uploadImage from '../../../common/api/imageApi';
import CalendarView from '../../calendar/components/CalendarView';
import { INTERESTS } from '../../../constants/interests';
import { REGIONS } from '../../../constants/regions';
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
  const { thunderId } = useParams<{ thunderId: string }>();
  const navigate = useNavigate();

  // 🔧 초기값 및 상태 정의
  const [initialDetail, setInitialDetail] = useState<any>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [imgId, setImgId] = useState<number | null>(null);
  const [hasUploadedImage, setHasUploadedImage] = useState(false); // 이미지 변경 여부

  /**
   * 번개 모임 상세 정보를 불러와 초기 상태 설정
   */
  useEffect(() => {
    if (!thunderId) return;

    (async () => {
      try {
        const detail = await fetchThunderDetail(Number(thunderId));
        setInitialDetail(detail);
        setSelectedRegion(detail.region);
        setSelectedCategory(detail.category);
        setSelectedDate(detail.datetime.split('T')[0]);
        setTime(detail.datetime.split('T')[1].slice(0, 5));
        setImgId(null); // 최초 로드 시 imgId는 null
      } catch {
        alert('모임 정보를 불러올 수 없습니다.');
      }
    })();
  }, [thunderId]);

  /**
   * 이미지 업로드 처리 함수
   * @param file - 업로드할 이미지 파일
   * @returns 성공 메시지
   */
  const handleImageUpload = async (file: File): Promise<string> => {
    const id = await uploadImage(file);
    setImgId(Number(id));
    setHasUploadedImage(true);
    return '업로드 성공';
  };

  /**
   * 폼 제출 시 수정 요청을 보냄
   * 변경된 항목만 포함하여 update API 호출
   * @param form - ThunderForm에서 전달된 제목, 설명, 이미지
   */
  const handleSubmit = async (form: { title: string; description: string; image: File | null }) => {
    if (!initialDetail) return;

    const updated = {
      title: form.title !== initialDetail.title ? form.title : null,
      description: form.description !== initialDetail.description ? form.description : null,
      region: selectedRegion !== initialDetail.region ? selectedRegion : null,
      category: selectedCategory !== initialDetail.category ? selectedCategory : null,
      date:
        `${selectedDate} ${time}` !==
        `${initialDetail.datetime.split('T')[0]} ${initialDetail.datetime.split('T')[1].slice(0, 5)}`
          ? `${selectedDate} ${time}`
          : null,
      id: hasUploadedImage ? imgId : null,
    };

    try {
      await updateThunder(Number(thunderId), updated);
      navigate(`/thunder/${thunderId}`);
    } catch {
      alert('모임 수정에 실패했습니다.');
    }
  };

  if (!initialDetail) return <p>로딩중...</p>;

  return (
    <div>
      <h2>번개 모임 수정하기</h2>

      {/* 폼: 제목, 설명, 이미지 */}
      <ThunderForm
        mode="edit"
        initialData={{
          title: initialDetail.title,
          description: initialDetail.description,
          imageUrl: initialDetail.imgUrl,
          region: initialDetail.region,
          date: initialDetail.datetime.split('T')[0],
          time: initialDetail.datetime.split('T')[1].slice(0, 5),
        }}
        onImageUpload={handleImageUpload}
        onSubmit={handleSubmit}
      />

      {/* 지역/관심사 선택 버튼 */}
      <div>
        <ButtonUnit mode="base" onClick={() => setRegionModalOpen(true)}>
          지역 선택
        </ButtonUnit>
        <p>선택된 지역: {selectedRegion || '없음'}</p>
      </div>
      <div>
        <ButtonUnit mode="base" onClick={() => setCategoryModalOpen(true)}>
          관심사 선택
        </ButtonUnit>
        <p>선택된 관심사: {selectedCategory || '없음'}</p>
      </div>

      {/* 날짜 선택 */}
      <div>
        <p>날짜 선택</p>
        <CalendarView
          events={[]}
          onClickDate={(date) => {
            const formatted = date.toLocaleDateString('sv-SE');
            setSelectedDate(formatted);
          }}
          onClickAdd={() => {}}
        />
        <p>선택된 날짜: {selectedDate || '없음'}</p>
      </div>

      {/* 시간 선택 */}
      <div>
        <label>
          시간:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      {/* 하단 취소 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <ButtonUnit mode="cancel" onClick={() => navigate(-1)}>
          취소
        </ButtonUnit>
      </div>

      {/* 지역 선택 모달 */}
      <Modal
        isOpen={regionModalOpen}
        mode="checkbox"
        title="지역 선택"
        checkboxItems={REGIONS}
        checked={selectedRegion ? [selectedRegion] : []}
        onCheckedChange={(values) => setSelectedRegion(values[0])}
        onConfirm={() => setRegionModalOpen(false)}
        onCancel={() => setRegionModalOpen(false)}
        onClose={() => setRegionModalOpen(false)}
        confirmText="확인"
        cancelText="취소"
      />

      {/* 관심사 선택 모달 */}
      <Modal
        isOpen={categoryModalOpen}
        mode="checkbox"
        title="관심사 선택"
        checkboxItems={INTERESTS}
        checked={selectedCategory ? [selectedCategory] : []}
        onCheckedChange={(values) => setSelectedCategory(values[0])}
        onConfirm={() => setCategoryModalOpen(false)}
        onCancel={() => setCategoryModalOpen(false)}
        onClose={() => setCategoryModalOpen(false)}
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  );
};

export default ThunderModifyPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThunderForm from '../components/ThunderForm';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { createThunder } from '../api/thunderApi';
import uploadImage from '../../../common/api/imageApi';
import CalendarView from '../../calendar/components/CalendarView';
import { INTERESTS } from '../../../constants/interests';
import { REGIONS } from '../../../constants/regions';
import InterestModal from '../../../common/components/utils/InterestModal';
import RegionModal from '../../../common/components/utils/RegionModal';

/**
 * ThunderCreatePage
 *
 * 번개 모임 생성 페이지 컴포넌트입니다.
 * - 모임명, 설명, 이미지 업로드, 관심사, 지역, 날짜, 시간 등을 입력받아 생성
 * - 이미지 업로드 시 서버에 업로드 후 imgId 저장
 * - 지역/관심사 선택은 모달을 통해 진행
 * - 날짜는 CalendarView 고정형 컴포넌트에서 선택
 * - 시간은 input[type=time] 입력으로 설정
 */
const ThunderCreatePage: React.FC = () => {
  const navigate = useNavigate();

  /** 지역 선택 모달 열림 여부 */
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  /** 관심사 선택 모달 열림 여부 */
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  /** 선택된 지역 */
  const [selectedRegion, setSelectedRegion] = useState('');
  /** 선택된 관심사 */
  const [selectedCategory, setSelectedCategory] = useState('');
  /** 선택된 날짜 (YYYY-MM-DD) */
  const [selectedDate, setSelectedDate] = useState('');
  /** 선택된 시간 (HH:mm) */
  const [time, setTime] = useState('');

  /** 업로드된 이미지 ID */
  const [imgId, setImgId] = useState<number | null>(null);

  /**
   * 이미지 업로드 처리
   * @param file - 사용자가 업로드한 이미지 파일
   * @returns 성공 메시지
   */
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const id = await uploadImage(file);
      setImgId(Number(id));
      return '업로드 성공';
    } catch (err) {
      alert('이미지 업로드 실패');
      throw err;
    }
  };

  /**
   * 폼 제출 시 호출
   * - 유효성 검사 후 createThunder API 호출
   * @param form - ThunderForm에서 전달된 데이터
   */
  const handleSubmit = async (form: { title: string; description: string; image: File | null }) => {
    if (!imgId || !selectedRegion || !selectedDate || !time) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const datetimeString = new Date(`${selectedDate}T${time}:00`).toISOString();

    try {
      const thunderId = await createThunder({
        title: form.title,
        description: form.description,
        category: selectedCategory,
        region: selectedRegion,
        time: datetimeString,
        imgId: imgId,
      });

      navigate(`/thunder/${thunderId}`);
    } catch (err) {
      alert('모임 생성 실패');
    }
  };

  /**
   * 날짜 클릭 시 호출됨 (CalendarView용)
   * @param date - 선택된 날짜 객체
   */
  const handleClickDate = (date: Date) => {
    const formatted = date.toLocaleDateString('sv-SE'); // "YYYY-MM-DD"
    setSelectedDate(formatted);
  };

  return (
    <div>
      <h2>번개 모임 만들기</h2>

      {/* 모임 정보 입력 폼 */}
      <ThunderForm mode="create" onImageUpload={handleImageUpload} onSubmit={handleSubmit} />

      {/* 지역/관심사 선택 */}
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
        <p>선택된 지역: {selectedCategory || '없음'}</p>
      </div>

      {/* 날짜 선택 */}
      <div>
        <p>날짜 선택</p>
        <CalendarView events={[]} onClickDate={handleClickDate} onClickAdd={() => {}} />
        <p>선택된 날짜: {selectedDate || '없음'}</p>
      </div>

      {/* 시간 선택 */}
      <div>
        <label>
          시간:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      {/* 취소 버튼 */}
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

      {/* 관심사 모달 */}
      <InterestModal
        isOpen={categoryModalOpen}
        selectedInterests={INTERESTS}
        onCancel={() => setCategoryModalOpen(false)}
        onConfirm={(selected) => {
          setSelectedCategory(selected[0]);
          setCategoryModalOpen(false);
        }}
      />

      {/* 지역 모달 */}
      <RegionModal
        isOpen={regionModalOpen}
        selectedRegions={REGIONS}
        onCancel={() => setRegionModalOpen(false)}
        onConfirm={(selected) => {
          setSelectedRegion(selected[0]);
          setRegionModalOpen(false);
        }}
      />
    </div>
  );
};

export default ThunderCreatePage;

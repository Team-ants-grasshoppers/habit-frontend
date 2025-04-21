import React, { useRef, useState } from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';

/**
 * ThunderForm의 props 타입 정의
 *
 * `mode`는 폼 모드를 구분하며, `initialData`는 수정 시 사용할 초기 데이터입니다.
 * `onSubmit`은 제출 버튼 클릭 시 호출되는 콜백 함수로, 폼의 데이터를 상위로 전달합니다.
 */
interface ThunderFormProps {
  mode: 'create' | 'edit'; // 생성 또는 수정 모드
  initialData?: {
    // 수정 시 사용할 초기 데이터
    title: string;
    description: string;
    region: string;
    date: string;
    time: string;
    imageUrl?: string;
  };
  onSubmit?: (data: {
    // 제출 시 상위에서 처리할 콜백
    title: string;
    description: string;
    region: string;
    date: string;
    time: string;
    image: File | null;
  }) => void;
  onImageUpload?: (file: File) => Promise<string>;
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
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [region, setRegion] = useState(initialData?.region || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSubmit?.({ title, description, region, date, time, image });
  };

  return (
    <div>
      <h2>{mode === 'edit' ? '번개 모임 수정' : '번개 모임 생성'}</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="모임명" />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="상세 설명"
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
        {previewUrl ? <img src={previewUrl} alt="미리보기" width={120} /> : <div>이미지 선택</div>}
      </div>

      {/* 배포 에러로 임시 추가 */}
      <input
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="지역 (ex: 서울 강남)"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="날짜"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="시간"
      />
      {/* //배포 에러로 임시 추가 끝 */}

      <div>
        <ButtonUnit mode="confirm" onClick={handleSubmit}>
          {mode === 'edit' ? '수정 완료' : '등록'}
        </ButtonUnit>
      </div>
    </div>
  );
};

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
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [region, setRegion] = useState(initialData?.region || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSubmit?.({ title, description, region, date, time, image });
  };

  return (
    <div>
      <h2>{mode === 'edit' ? '번개 모임 수정' : '번개 모임 생성'}</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="모임명" />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="상세 설명"
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
        {previewUrl ? <img src={previewUrl} alt="미리보기" width={120} /> : <div>이미지 선택</div>}
      </div>

      <div>
        <ButtonUnit mode="confirm" onClick={handleSubmit}>
          {mode === 'edit' ? '수정 완료' : '등록'}
        </ButtonUnit>
      </div>
    </div>
  );
};

export default ThunderForm;

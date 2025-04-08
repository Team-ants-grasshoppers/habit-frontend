import React, { useState, useEffect } from 'react';
import Modal from '../../../common/components/ui/Modal';

interface ThunderFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    description: string;
    region: { city: string; district: string };
    date: string;
    hour: number;
    minute: number;
  };
}

const ThunderForm: React.FC<ThunderFormProps> = ({ mode, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState({ city: '', district: '' });
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setRegion(initialData.region);
      setDate(initialData.date);
      setHour(initialData.hour);
      setMinute(initialData.minute);
    }
  }, [mode, initialData]);

  const handleLocationConfirm = () => {
    setIsLocationModalOpen(false);
  };

  return (
    <div>
      <h2>{mode === 'create' ? '번개 모임 만들기' : '번개 모임 수정하기'}</h2>

      <div>
        <label>모임명</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>이미지 업로드</label>
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </div>

      <div>
        <label>상세 설명</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label onClick={() => setIsLocationModalOpen(true)} style={{ cursor: 'pointer' }}>
          모임 위치: {region.city || '지역 선택'}
        </label>
      </div>

      <Modal
        isOpen={isLocationModalOpen}
        mode="checkbox"
        title="모임 위치 선택"
        checkboxItems={['서울', '경기', '인천']}
        checked={region.city ? [region.city] : []}
        onCheckedChange={(checked) => setRegion({ ...region, city: checked[0] })}
        onConfirm={handleLocationConfirm}
        onCancel={() => setIsLocationModalOpen(false)}
        confirmText="확인"
        cancelText="취소"
      />

      <div>
        <label>모임 시간</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <div>
          <input type="number" value={hour} onChange={(e) => setHour(+e.target.value)} />시
          <input type="number" value={minute} onChange={(e) => setMinute(+e.target.value)} />분
        </div>
      </div>
    </div>
  );
};

export default ThunderForm;

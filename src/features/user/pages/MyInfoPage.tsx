import { useEffect, useState } from 'react';
import { getMyInfo, updateMyInfo, withdrawUser } from '../hooks/useUser';
import UserInfo from '../components/UserInfo';
import uploadImage from '../../../common/api/imageApi';
import { validateForm } from '../hooks/validateForm';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useNavigate } from 'react-router-dom';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import styled from '@emotion/styled';

const MyInfoPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{
    user_id: string;
    nickname: string;
    email: string;
    profile_media_id?: string;
  } | null>(null);

  const [formState, setFormState] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    apiError: '',
    successMsg: '',
  });

  const [profileImageId, setProfileImageId] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyInfo();
        setUser(res);
        setFormState((prev) => ({
          ...prev,
          nickname: res.nickname,
          email: res.email,
        }));
        setImgPreview(res.profileImageUrl);
      } catch {
        alert('사용자 정보를 불러오지 못했습니다.');
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const errors = validateForm(formState, 'edit');
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        apiError: '유효성 검사 실패',
        successMsg: '',
      }));
      return;
    }

    if (formState.password && formState.password !== formState.confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        apiError: '비밀번호가 일치하지 않습니다.',
        successMsg: '',
      }));
      return;
    }

    if (!user) return;

    const updateData: {
      id: string;
      nickname: string;
      email: string;
      password: string;
      profile_image: string;
      region: string;
      interest: string;
    } = {
      id: user.user_id,
      nickname: formState.nickname || user.nickname,
      email: formState.email || user.email,
      password: formState.password || '',
      profile_image: profileImageId || user.profile_media_id || '',
      region: '서울', // ✅ 고정
      interest: '운동', // ✅ 고정
    };

    if (formState.password) updateData.password = formState.password;
    if (profileImageId) updateData.profile_image = profileImageId;

    try {
      await updateMyInfo(updateData);
      setFormState((prev) => ({
        ...prev,
        apiError: '',
        successMsg: '정보가 성공적으로 수정되었습니다!',
        password: '',
        confirmPassword: '',
      }));
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        apiError: error.response?.data?.error || '수정에 실패했습니다.',
        successMsg: '',
      }));
    }
  };

  const handleImageClick = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const imgId = await uploadImage(file, 'profile');
          setProfileImageId(imgId);
          setImgPreview(URL.createObjectURL(file));
        } catch {
          alert('이미지 업로드 실패');
        }
      }
    };

    input.click();
  };

  const handleWithdraw = async () => {
    if (!user) return;
    try {
      await withdrawUser({ user_id: user.user_id, password: withdrawPassword });
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (err: any) {
      alert(err.message || '회원 탈퇴 실패');
    }
  };

  if (!user) return <p>로딩중...</p>;

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>내 정보</MainTitle>
      </TitleArea>

      <UserInfoWrapper>
        <div>
          <div className="profile_img">
            <img
              src={imgPreview || '/default-profile.png'}
              alt="프로필"
              onClick={handleImageClick}
            />
          </div>
          <p className="id_wrpper">
            <strong>아이디</strong>
            {user.user_id}
          </p>
        </div>

        <UserInfo
          initialData={{
            userId: user.user_id,
            nickname: formState.nickname,
            email: formState.email,
          }}
          onSubmit={handleSubmit}
          onChange={(updated) => setFormState((prev) => ({ ...prev, ...updated, successMsg: '' }))}
        />

        <div style={{ marginTop: '3rem' }}>
          <ButtonUnit mode="text" onClick={() => setWithdrawModalOpen(true)}>
            회원 탈퇴
          </ButtonUnit>
        </div>

        <Modal isOpen={isWithdrawModalOpen} onClose={() => setWithdrawModalOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.4rem', textAlign: 'center' }}>
              정말 탈퇴하시겠습니까?
              <br />
              비밀번호를 입력해주세요.
            </p>

            <input
              type="password"
              value={withdrawPassword}
              onChange={(e) => setWithdrawPassword(e.target.value)}
              placeholder="비밀번호"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.4rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            />

            <div
              className="btn_shadow"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <ButtonUnit mode="cancel" onClick={() => setWithdrawModalOpen(false)}>
                취소
              </ButtonUnit>
              <ButtonUnit mode="confirm" onClick={handleWithdraw}>
                확인
              </ButtonUnit>
            </div>
          </div>
        </Modal>
      </UserInfoWrapper>
    </>
  );
};

export default MyInfoPage;

const UserInfoWrapper = styled.div`
  .profile_img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    overflow: hidden;
    border: var(--border);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }

  p {
    margin: 2rem 0;
    font-size: 1.8rem;
    font-weight: 600;

    strong {
      display: inline-block;
      min-width: 6rem;
      margin-right: 1rem;
      font-size: 1.6rem;
    }
  }
`;

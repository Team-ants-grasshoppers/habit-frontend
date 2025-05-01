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

/**
 * @description 사용자 정보 조회, 수정, 탈퇴를 처리하는 내 정보 페이지 컴포넌트
 */
const MyInfoPage = () => {
  const navigate = useNavigate();

  /**
   * @state user
   * @description 서버에서 불러온 현재 로그인 사용자 정보
   */
  const [user, setUser] = useState<{
    user_id: string;
    nickname: string;
    email: string;
    profile_media_id?: string;
  } | null>(null);

  /**
   * @state formState
   * @description 사용자 정보 수정용 입력 필드 상태
   */
  const [formState, setFormState] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    apiError: '',
    successMsg: '',
  });

  /**
   * @state profileImageId
   * @description 서버에서 업로드된 이미지의 ID (수정 요청 시 전달됨)
   */
  const [profileImageId, setProfileImageId] = useState<string | null>(null);

  /**
   * @state imgPreview
   * @description 프로필 이미지 미리보기용 URL
   */
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  /**
   * @state isWithdrawModalOpen
   * @description 회원 탈퇴 모달 표시 여부
   */
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  /**
   * @state withdrawPassword
   * @description 회원 탈퇴 시 입력되는 비밀번호
   */
  const [withdrawPassword, setWithdrawPassword] = useState('');

  /**
   * @function useEffect
   * @description 컴포넌트 마운트 시 사용자 정보 요청
   */
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
        setImgPreview(`/api/images/${res.profile_media_id}`);
      } catch {
        alert('사용자 정보를 불러오지 못했습니다.');
      }
    })();
  }, []);

  /**
   * @function handleSubmit
   * @description 사용자 정보 수정 요청 핸들러
   */
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
      nickname?: string;
      email?: string;
      password?: string;
      profile_image?: string;
    } = {
      id: user.user_id,
    };

    if (formState.nickname !== user.nickname) updateData.nickname = formState.nickname;
    if (formState.email !== user.email) updateData.email = formState.email;
    if (formState.password) updateData.password = formState.password;
    if (profileImageId) updateData.profile_image = profileImageId;

    try {
      await updateMyInfo(updateData);
      setFormState((prev) => ({
        ...prev,
        apiError: '',
        successMsg: '정보가 성공적으로 수정되었습니다!',
      }));
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        apiError: error.response?.data?.error || '수정에 실패했습니다.',
        successMsg: '',
      }));
    }
  };

  /**
   * @function handleImageClick
   * @description 이미지 클릭 시 파일 선택 및 서버 업로드 처리
   */
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

  /**
   * @function handleWithdraw
   * @description 회원 탈퇴 요청 및 후속 처리
   */
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
          <p>
            <strong>아이디</strong>
            {user.user_id}
          </p>
        </div>

        {/* 사용자 정보 수정 폼 */}
        <UserInfo
          initialData={{
            userId: user.user_id,
            nickname: formState.nickname,
            email: formState.email,
          }}
          onSubmit={handleSubmit}
        />

        {/* 회원 탈퇴 버튼 */}
        <div style={{ marginTop: '3rem' }}>
          <ButtonUnit mode="text" onClick={() => setWithdrawModalOpen(true)}>
            회원 탈퇴
          </ButtonUnit>
        </div>

        {/* 회원 탈퇴 모달 */}
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

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
    strong {
      display: inline-block;
      min-width: 6rem;
      margin-right: 1rem;
    }
  }
`;

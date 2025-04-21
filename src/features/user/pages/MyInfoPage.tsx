import { useEffect, useState } from 'react';
import { getMyInfo, updateMyInfo } from '../hooks/useUser';
import UserInfo from '../components/UserInfo';

interface UserType {
  user_id: string;
  nickname: string;
  email: string;
  region: string;
  profile_media_id: string;
}

const MyInfoPage = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyInfo();
        setUser(res);
      } catch (err) {
        alert('사용자 정보를 불러오지 못했습니다.');
      }
    })();
  }, []);

  if (!user) return <p>로딩중...</p>;

  return (
    <UserInfo
      initialData={{
        userId: user.user_id,
        nickname: user.nickname,
        email: user.email,
      }}
      onSubmit={(data) =>
        updateMyInfo({
          ...data,
          id: user.user_id,
        })
      }
    />
  );
};

export default MyInfoPage;

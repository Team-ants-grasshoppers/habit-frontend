import { useEffect, useState } from 'react';
import { getMyInfo, updateMyInfo, checkEmailDuplicate } from '../hooks/useUser';
import UserInfo from '../components/UserInfo';

const MyInfoPage = () => {
  const [user, setUser] = useState(null);

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
      initialData={user}
      onSubmit={updateMyInfo}
      checkEmailDuplicate={checkEmailDuplicate}
    />
  );
};

export default MyInfoPage;

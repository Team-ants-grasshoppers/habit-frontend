/**
 * MyClubPage 컴포넌트
 *
 * 사용자가 참여 중인 모임, 운영 중인 모임, 참여한 번개모임을 하나의 페이지에 통합하여 보여주는 페이지입니다.
 *
 * ✅ 기능
 * - 상단에 사용자 프로필 이미지, 닉네임, 닫기 버튼(`ButtonUnit`)을 표시
 * - 사용자 ID를 기반으로 API 요청을 통해 각 섹션의 데이터(fetchJoinedMyClubList, fetchMyClubList, fetchJoinedMyThunderClubList)를 불러옴
 * - 참여한 모임은 `MyJoinedClubList`, 운영 중인 모임은 `MyManagedClubList`, 참여한 번개모임은 `MyJoinedThunderList` 컴포넌트로 각각 분리하여 렌더링
 * - 닫기 버튼 클릭 시 `navigate(-1)`로 이전 페이지로 이동
 *
 * ✅ 사용된 상태
 * - Redux에서 사용자 정보(userId, nickname, profileUrl)를 가져옴
 * - useState로 각 섹션별 리스트 상태를 관리
 *
 * @returns {JSX.Element} 내 모임 정보를 보여주는 마이페이지 뷰
 */

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hook';
import MyJoinedClubList from '../components/MyJoinedClubList';
import MyManagedClubList from '../components/MyManagedClubList';
import MyJoinedThunderList from '../components/MyJoinedThunderList';
import {
  fetchJoinedMyClubList,
  fetchMyClubList,
  fetchJoinedMyThunderClubList,
} from '../../user/hooks/useMypage';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { JoinedClubList, JoinedThunderList, ManagedClubList } from '../types';
import { MainTitle, TitleArea } from '../../../common/style/common.css';

const MyClubPage = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const nickname = useAppSelector((state) => state.user.nickname);
  const profileUrl = useAppSelector((state) => state.user.userProfile);

  const [joinedClubs, setJoinedClubs] = useState<JoinedClubList>([]);
  const [managedClubs, setManagedClubs] = useState<ManagedClubList>([]);
  const [joinedThunders, setJoinedThunders] = useState<JoinedThunderList>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const clubs = await fetchJoinedMyClubList(userId);
        const myClubs = await fetchMyClubList(userId);
        const thunders = await fetchJoinedMyThunderClubList(userId);

        setJoinedClubs(clubs);
        setManagedClubs(myClubs);
        setJoinedThunders(thunders);
      } catch (error) {
        console.error('내 모임 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>내 모임 관리</MainTitle>
      </TitleArea>

      {/* 사용자 정보 */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={profileUrl || '/assets/default-profile.png'}
            alt="프로필 이미지"
            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{nickname}</span>
        </div>
      </section>

      {/* 내가 참여 중인 모임 */}
      <MyJoinedClubList clubs={joinedClubs} />

      {/* 내가 운영 중인 모임 */}
      <MyManagedClubList clubs={managedClubs} />

      {/* 내가 참여 중인 번개모임 */}
      <MyJoinedThunderList thunders={joinedThunders} />
    </>
  );
};

export default MyClubPage;

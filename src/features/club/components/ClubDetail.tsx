import React from 'react';
import { ClubDetailModel } from '../types';
import ClubMembers from './ClubMembers';
import ClubRequest from './ClubRequest';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import styled from '@emotion/styled';

export interface ClubDetailProps {
  model: ClubDetailModel;
  onJoin: () => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onBan: (userId: string) => void;
}

/**
 * ClubDetail - 클럽 상세 정보를 표시하는 프레젠테이셔널 컴포넌트
 *
 * 주요 기능:
 * - 클럽 대표 이미지, 이름, 소개 출력
 * - 운영진 및 멤버 리스트 출력
 * - 현재 로그인 유저 상태에 따라 "가입하기" 또는 "가입 대기중" 표시
 * - 운영자(admin)인 경우 가입 대기자 목록과 승인/거절 및 추방 기능 제공
 * - 수정 버튼 표시 (클릭 시 수정 페이지 이동은 상위 컴포넌트에서 처리)
 *
 * props:
 * @prop imageUrl - 클럽 대표 이미지 URL
 * @prop clubName - 클럽 이름
 * @prop description - 클럽 소개
 * @prop admins - 운영진 리스트
 * @prop members - 일반 멤버 리스트
 * @prop pendingUsers - 가입 대기자 리스트
 * @prop isAdmin - 현재 유저가 운영자인지 여부
 * @prop isMember - 현재 유저가 멤버인지 여부
 * @prop isPending - 현재 유저가 가입 대기중인지 여부
 * @prop onJoin - 가입 요청 핸들러
 * @prop onApprove - 가입 승인 핸들러
 * @prop onReject - 가입 거절 핸들러
 * @prop onBan - 멤버 추방 핸들러
 */
const ClubDetail: React.FC<ClubDetailProps> = ({
  model: {
    imageUrl,
    clubName,
    description,
    category,
    region,
    admins,
    members,
    pendingUsers,
    isAdmin,
    isMember,
    isPending,
  },
  onJoin,
  onApprove,
  onReject,
  onBan,
}) => {
  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>{clubName}</MainTitle>
      </TitleArea>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {/* 가입 상태별 버튼 */}
          {!isAdmin && !isMember && !isPending && (
            <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onJoin}>
              가입하기
            </ButtonUnit>
          )}
          {isPending && <div>가입 대기중입니다</div>}
        </div>
        <div>
          {isAdmin && (
            <ButtonUnit
              mode="confirm"
              className="absolute top-4 right-4"
              onClick={() => {
                // 수정 페이지 이동은 페이지단에서 처리
              }}
            >
              수정하기
            </ButtonUnit>
          )}
        </div>
      </div>

      <ImgArea>
        <img src={imageUrl} alt={clubName} />
      </ImgArea>

      <TextArea>
        <strong>{clubName} 소개</strong>
        <p>{description}</p>

        <TagArea>
          <li>
            <span>활동지역</span>
            {region}
          </li>
          <li>
            <span>카테고리</span>
            {category}
          </li>
        </TagArea>
      </TextArea>

      <MembersArea>
        <ClubMembers admins={admins} members={members} isAdmin={isAdmin} onBan={onBan} />
      </MembersArea>

      {/* 운영자만 가입 대기자 관리 가능 */}
      {isAdmin && (
        <div>
          <h3>가입 대기자 목록</h3>
          <ClubRequest pendingUsers={pendingUsers} onApprove={onApprove} onReject={onReject} />
        </div>
      )}
    </>
  );
};

export default ClubDetail;

const ImgArea = styled.div`
  width: 100%;
  height: 30rem;
  overflow: hidden;
  margin: 2rem 0;
  img {
    width: auto;
    height: 100%;
    object-fit: contain;
    object-position: left;
    border-radius: 0.8rem;
  }
`;

const TextArea = styled.div`
  border: var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  strong {
    display: block;
    font-size: 1.6rem;
    font-weight: bold;
    border-bottom: 1px solid var(--light_gray);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.8rem;
    margin-bottom: 3rem;
  }
`;
const TagArea = styled.ul`
  display: flex;
  li {
    position: relative;
    font-size: 1.4rem;
    margin-right: 2rem;
    &:first-child::before {
      content: '';
      position: absolute;
      top: 50%;
      right: -1rem;
      width: 0.1rem;
      height: 1rem;
      background: var(--textColor);
      transform: translateY(-50%);
    }
    span {
      display: inline-block;
      margin-right: 0.5rem;
      color: var(--textColor_dark);
    }
  }
`;

const MembersArea = styled.div`
  border: var(--border);
  border-radius: var(--radius);
  padding: 0 2rem;
  margin-top: 2rem;

  & > div {
    margin: 2rem 0;
  }

  h3 {
    display: block;
    font-size: 1.6rem;
    font-weight: bold;
    border-bottom: 1px solid var(--light_gray);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

import React from 'react';
import ThunderMembers from './ThunderMembers';
import { ThunderDetailModel } from '../types';
import ButtonUnit from '../../../common/components/ui/Buttons';
import {
  ButtonArea,
  DetailWrapper,
  ImgArea,
  TagArea,
  TextArea,
} from '../../club/components/ClubDetail';
import { MainTitle, TitleArea } from '../../../common/style/common.css';

export interface ThunderDetailProps {
  model: ThunderDetailModel;
  onJoin: () => void;
  onLeave: () => void;
  onBan: (userId: string) => void;
}

/**
 * 번개 모임 상세 정보 컴포넌트
 *
 * `ThunderDetail`은 번개 모임의 제목, 설명, 시간, 위치, 참여 인원 등을 표시하는 컴포넌트입니다.
 * - `ThunderMembers`를 통해 참여 중인 인원 목록을 렌더링합니다.
 *
 * @component
 * @param {ThunderDetailProps} props - 컴포넌트에 전달되는 props
 * @returns {JSX.Element}
 */
const ThunderDetail: React.FC<ThunderDetailProps> = ({
  model: {
    title,
    description,
    category,
    region,
    img_url,
    date,
    time,
    admins,
    members,
    isAdmin,
    isMember,
  },
  onJoin,
  onLeave,
  onBan,
}) => {
  return (
    <DetailWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TitleArea>
          <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
          <MainTitle>{title}</MainTitle>
        </TitleArea>

        <ButtonArea>
          <div className="btn_shadow">
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

            {!isAdmin && !isMember && (
              <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onJoin}>
                가입하기
              </ButtonUnit>
            )}

            {!isAdmin && isMember && (
              <ButtonUnit mode="confirm" className="mt-4 w-fit self-end" onClick={onLeave}>
                탈퇴하기
              </ButtonUnit>
            )}
          </div>
        </ButtonArea>
      </div>

      <ImgArea>
        <img src={img_url} alt={title} className="w-full h-60 object-cover rounded-md" />
      </ImgArea>

      <TextArea>
        <strong>
          모임 날짜 (시간) : {date} ({time})
        </strong>
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

      <ThunderMembers admins={admins} members={members} isAdmin={isAdmin} onBan={onBan} />
    </DetailWrapper>
  );
};

export default ThunderDetail;

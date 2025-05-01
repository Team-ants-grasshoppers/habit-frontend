import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BaseListItem {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
  extraButtons?: React.ReactNode;
}

interface BaseListProps {
  items: BaseListItem[];
  /** 페이지 이동을 위한 URL Prefix 예: /club → /club/아이디 */
  routePrefix: string;
}

/**
 * BaseList 컴포넌트
 *
 * 공통 리스트 렌더링용 컴포넌트로, 사진과 이름으로 구성된 카드형 항목을 나열합니다.
 *
 * ✅ 기능
 * - 상위 컴포넌트에서 전달된 배열(items)을 기반으로 카드 형태의 항목들을 렌더링합니다.
 * - 각 항목은 이미지, 이름, (선택적으로) 우측 상단 버튼 등의 요소로 구성됩니다.
 * - 각 카드 클릭 시 `routePrefix`에 해당 항목의 id를 붙여 해당 상세 페이지로 이동합니다.
 * - 카드 우측 상단에는 `extraButtons`를 통해 삭제 버튼 등 추가 요소를 부착할 수 있습니다.
 *   - `extraButtons` 클릭 시 상위 카드의 페이지 이동 이벤트는 전파되지 않습니다.
 * - 리스트가 비어 있을 경우 null을 반환합니다 (렌더링 안됨).
 *
 * ✅ 예시
 * routePrefix="/club" 이고 id="123"인 경우 → /club/123 으로 이동
 *
 * @component
 * @param {BaseListProps} props - 리스트 렌더링에 필요한 속성들
 * @param {BaseListItem[]} props.items - 렌더링할 항목 배열 (id, name, imageUrl, extraButtons 포함 가능)
 * @param {string} props.routePrefix - 각 항목을 클릭했을 때 이동할 페이지의 URL prefix
 * @returns {JSX.Element | null} 렌더링된 리스트 UI 또는 null
 */

const BaseList: React.FC<BaseListProps> = ({ items, routePrefix }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return (
    <CardContainer>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`${routePrefix}/${item.id}`)}
          style={{ cursor: 'pointer' }}
          className="list_card"
        >
          {/* 카드 내부: 이미지 + 이름 */}
          <ImgArea>
            <img src={item.imageUrl || '/vite.svg'} />
          </ImgArea>

          <TextArea>
            <span>#{item.category}</span>
            <p>{item.name}</p>
          </TextArea>

          {/* 카드 바깥쪽에 띄우는 버튼 */}
          {item.extraButtons && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {item.extraButtons}
            </div>
          )}
        </div>
      ))}
    </CardContainer>
  );
};

export default BaseList;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 686px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .list_card {
    position: relative;
    border-radius: 3rem;
    overflow: hidden;
    aspect-ratio: 1.3 / 1;

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
`;

const ImgArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease-in-out;
  }
`;
const TextArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  span {
    display: inline-block;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.1;
    color: var(--white);
    border: var(--border_dark);
    background: var(--primary-orange);
    padding: 0.4rem 1.4rem 0.5rem;
    border-radius: 2rem;
    border: var(--border_dark);
  }
  p {
    font-size: 1.8rem;
    font-weight: 800;
    margin-top: 2rem;
    color: var(--white);
  }
`;

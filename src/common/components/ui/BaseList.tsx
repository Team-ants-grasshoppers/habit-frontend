import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BaseListItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface BaseListProps {
  items: BaseListItem[];
  /** 페이지 이동을 위한 URL Prefix 예: /club → /club/아이디 */
  routePrefix: string;
}

/**
 * BaseList 컴포넌트
 *
 * 공통 리스트 렌더링용 컴포넌트로, 사진과 이름으로 구성된 카드형 항목을 나열한다.
 * - 각 항목은 상위에서 전달된 배열(items)을 기반으로 렌더링됨
 * - 클릭 시 `routePrefix`에 해당 항목의 id를 붙여 해당 페이지로 이동
 * - 리스트가 비어 있을 경우 아무것도 렌더링하지 않음
 *
 * 예: routePrefix="/club" 이고 id="123"이면 → /club/123 으로 이동
 *
 * @component
 * @param {BaseListProps} props - 렌더링할 항목 배열과 이동할 URL prefix
 * @returns {JSX.Element | null} 리스트 UI 또는 null
 */
const BaseList: React.FC<BaseListProps> = ({ items, routePrefix }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} onClick={() => navigate(`${routePrefix}/${item.id}`)}>
          <img src={item.imageUrl} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default BaseList;

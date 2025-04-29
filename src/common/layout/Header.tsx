import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { alc, flexStyle, jb, sectionStyle } from '../style/common.css';
import { layoutTheme } from './layoutStyle.css';

const Header = () => {
  return (
    <HeaderStyle>
      <Logo to="/">HABIT</Logo>
    </HeaderStyle>
  );
};

export default Header;

// 헤더 스타일
const HeaderStyle = styled.header`
  ${sectionStyle}
  ${flexStyle}
  ${jb}
  ${alc}
  box-shadow: var(--shadow);
  height: ${layoutTheme.header.height};
  background-color: #ffffff;
  padding: 0 20px;
`;

// 로고 스타일
const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;

  &:hover {
    color: #e67020; /* primary 컬러보다 살짝 더 진하게 */
  }
`;

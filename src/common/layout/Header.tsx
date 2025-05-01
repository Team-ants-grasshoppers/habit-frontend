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
  height: ${layoutTheme.header.height};
  padding: 0 4rem;
`;

// 로고 스타일
const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
`;

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
  padding: 0 2rem;
`;

// 로고 스타일
const Logo = styled(Link)`
  position: relative;
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-orange);
`;

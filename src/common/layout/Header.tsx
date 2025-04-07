import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { alc, flexStyle, jb, sectionStyle } from '../style/common.css';
import { layoutTheme } from './layoutStyle.css';

const Header = () => {
  return (
    <HeaderStyle>
      <Link to="/">HABIT</Link>
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.header`
  ${sectionStyle}
  ${flexStyle}
  ${jb}
  ${alc}
  box-shadow: var(--shadow);
  height: ${layoutTheme.header.height};
`;

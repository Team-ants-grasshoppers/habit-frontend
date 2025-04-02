export const theme = {
  // 색상 팔레트
  colors: {
    primary: '#F16C1E',
    secondary: '#E7dcda',
    accent: '#FF6F61',
    text: '#232323',
    border: '#dddddd',
    error: '#FF4C4C',
    success: '#28A745',
    white: '#fff',
  },

  // 배경 관련 스타일 (예를 들어 그라데이션 등)
  backgrounds: {
    white: '#fff',
    light: '#f9f9f9',
    dark: '#333333',
    gradient: 'linear-gradient(135deg, #5B36AC 0%, #FF6F61 100%)',
  },

  // 여백 및 패딩에 사용할 스페이싱 값
  spacing: {
    xs: '1px',
    sm: '0.4rem',
    md: '1rem',
    lg: '2rem',
    xl: '5rem',
    xxl: '10rem',
  },

  // 폰트 패밀리, 사이즈, 굵기 등 타이포그래피 설정
  fontSizes: {
    xs: '0.8rem',
    sm: '1rem',
    md: '1.8rem',
    lg: '2rem',
    xl: '2.4rem',
    xxl: '3rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    normal: 1.5,
    relaxed: 1.75,
  },

  // 보더 스타일 설정
  border: {
    radius: '4px',
    width: '1px',
    style: 'solid',
  },

  // 플렉스 관련 속성을 미리 정의
  flex: {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  },

  // 반응형 디자인을 위한 브레이크포인트
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },

  // 그림자 효과
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 20px rgba(0,0,0,0.15)',
  },

  // 애니메이션 및 전환 효과
  transitions: {
    fast: 'all 0.2s ease-in-out',
    normal: 'all 0.4s ease-in-out',
    slow: 'all 0.6s ease-in-out',
  },
};

export type AppTheme = typeof theme;

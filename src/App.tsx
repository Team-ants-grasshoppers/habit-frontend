import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import GlobalStyle from './common/style/GlobalStyle';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

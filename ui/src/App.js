import { createGlobalStyle } from 'styled-components';
import LandingPage from './landingPage/LandingPage';
import { Provider as RebassProvider } from "rebass";
import rebassTheme from './rebassTheme';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100%; height: 100%; }
  #app { height: inherit; > div { height: 100%; } }
  html { height: 100%; }
  a { color: inherit; text-decoration: none; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { list-style: none }
  button { border: 0; padding: 0; font: inherit; outline: none; cursor: pointer; }
  svg { fill: #4A4A4A; }s
`;

function App() {
  return (
    <RebassProvider theme={rebassTheme}>
      <GlobalStyle />
      <LandingPage />
    </RebassProvider>
  );
}

export default App;

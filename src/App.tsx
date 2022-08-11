import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import styled, { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import moon from "./img/moon.png";
import sun from "./img/sun.png";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color: inherit; // 색 변하지 마..
}
`;

const ThemeIcon = styled.div`
  position: absolute;
  z-index: 1;
  top: 35px;
  right: 40px;
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    cursor: pointer;
  }
`;

function App() {
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ThemeIcon onClick={toggleDarkAtom}>
          <img src={isDark ? sun : moon} alt="theme" />
        </ThemeIcon>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

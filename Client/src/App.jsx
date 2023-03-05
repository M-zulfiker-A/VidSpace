import React, { useState } from 'react'
import styled, { ThemeProvider } from "styled-components"
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import VideoCards from './Components/VideoCards';
import { darkMode , Lightmode } from './utils/Themes';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home';
import Video from './Pages/Video';

const Container = styled.div`
  display : flex;
  width : 100vw;
`;

const Wrapper = styled.div`
`;
const Main = styled.div`
  flex:7;
  background: ${({theme})=>theme.bg};
  color : ${({theme})=>theme.text};
`

const App = () => {
  const [isdarkMode , setisdarkMode] = useState(true)
  return (
    <ThemeProvider theme={isdarkMode ? darkMode : Lightmode}>
      <Container>
        
        <BrowserRouter>
          <Menu isdarkMode={isdarkMode} setisdarkMode={setisdarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/Video">
                  <Route path=":id" element = {<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
          
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App
import React, { useState } from 'react'
import styled, { ThemeProvider } from "styled-components"
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import VideoCards from './Components/VideoCards';
import { darkMode , Lightmode } from './utils/Themes';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home';
import Video from './Pages/Video';
import SignIn from './Pages/SIgnIn';
import Search from './Pages/Search';

const Container = styled.div`
  display : flex;
  width : 100vw;
  height : 100vh;
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
            <Wrapper className='scrollableMain'>
              <Routes>
                <Route index path="/" element = {<Home />} />
                <Route path="/trends" element = {<Home type="trend" />} />
                <Route path="/subscription" element = {<Home type="sub"/>} />
                <Route path="/search" element = {<Search />} />
                <Route path="/signin" element={<SignIn />} />
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
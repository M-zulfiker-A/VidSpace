import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const Container = styled.div`
        position:sticky;
        top:0;
        background-color: ${({theme})=> theme.bg};
        padding : 0.5rem 2rem;
    `
    const Wrapper = styled.div`
        display:flex;
        align-items : center;
        justify-content : space-between;
    `
    const Search = styled.div`
        display:flex;
        margin: auto;
        width : 40%;
        height : 2rem;
        color: ${({theme})=> theme.text};
        align-items:center;
        border : 2px solid #aaaaaa4c;
        border-radius : 30px;
        padding : 0px 10px;
        justify-content : space-between;
    `

    const SignInBtn = styled.button`
        all : unset;
        padding : 0.4rem;
        display:flex;
        border-radius : 10px;
        background: transparent;
        border : 1px solid #0440f4;
        color : #0440f4;
        align-items:center;
        gap : 0.5rem;
    `
    const Input = styled.input`
        border : none;
        background-color : transparent;
    `

    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder='Search' />
                    <SearchIcon />
                </Search>
                <Link to="signin" style={{"textDecoration" : "none"}}>
                    <SignInBtn><AccountCircleIcon/>Sign In</SignInBtn>
                </Link>
            </Wrapper>
        </Container>
  )
}

export default Navbar
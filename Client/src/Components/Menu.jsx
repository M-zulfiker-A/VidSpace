import React from 'react'
import styled from 'styled-components'
import Logo from "../assets/Logo.svg"
import "../App.css"
import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FlagIcon from '@mui/icons-material/Flag';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HistoryIcon from '@mui/icons-material/History';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExploreIcon from '@mui/icons-material/Explore';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const Container = styled.div`
    flex:1;
    background : ${({theme})=> theme.bg};
    height : 100vh;
    padding : 1rem;
    color : ${({theme})=> theme.text};;
    font-size:0.7rem;
    position : sticky;
    top:0;
`;


const Items = styled.div`
    display : flex;
    gap:20px;
    align-items:center;
    padding: 0.5rem;
    cursor : pointer;

    &:hover{
        background : ${({theme})=>theme.soft}
    }
`

const Hr = styled.hr`
    margin : 1rem 0;
    border : 1px solid #80808091;
`

const Login = styled.div`
`
const SignInBtn = styled.button`
    display:flex;
    margin-top: 10px;
    background: transparent;
    border : 1px solid #0440f4;
    color : #0440f4;
    font-weight: 400;
    align-items:center;
    gap : 0.5rem;
`

const Title = styled.h2`
    font-size: 1rem;
    font-weight: 500;
    color:#aaaaaa;
    margin-bottom: 20px;
`

const Menu = ({isdarkMode , setisdarkMode }) => {
    const LogoClass = {
        height : "auto",
        width : "10rem",
        filter : `invert(${isdarkMode ? 0 : 0.97})`
    }
  return (
    <Container className='menu-container'>
    
        <Link to='/'>
            <img src={Logo} alt="Logo" style={LogoClass}/>
        </Link>
        <Link to="/" style={{"textDecoration" : "none" , "color" : "inherit"}}>
            <Items>
                <HomeIcon />    
                Home
            </Items>
        </Link>
        <Link to="trends" style={{"textDecoration" : "none" , "color" : "inherit"}}>
            <Items>
                <ExploreIcon />    
                Explore
            </Items>
        </Link>
        <Link to="subscription" style={{"textDecoration" : "none" , "color" : "inherit"}}>
            <Items>
                <SubscriptionsIcon />    
                Subscription
            </Items>
        </Link>
        <Hr />
        <Items>
            <VideoLibraryIcon />    
            Library
        </Items>
        <Items>
            <HistoryIcon />    
            History
        </Items>
        <Hr />
        <Login>
            Sign in to Like , Share and Subscribe
            <Link to="signin" style={{"textDecoration" : "none"}}>
                <SignInBtn><AccountCircleIcon/>Sign In</SignInBtn>
            </Link>
        </Login>
        <Hr />
        <Title>
            Best of VidSpace
        </Title>
        <Items>
            <LibraryMusicIcon />    
            Music
        </Items>
        <Items>
            <SportsEsportsIcon />    
            Sports
        </Items>
        <Items>
            <EmojiEventsIcon />    
            Gaming
        </Items>
        <Items>
            <MovieFilterIcon />    
            Movies
        </Items>
        <Items>
            <NewspaperIcon />    
            News
        </Items>
        <Items>
            <LiveTvIcon />    
            Live
        </Items>
        <Items>
            <SettingsIcon />    
            Settings
        </Items>
        <Items>
            <FlagIcon />    
            Report
        </Items>
        <Items>
            <HelpOutlineIcon />    
            Help
        </Items>
        <Items onClick={()=> setisdarkMode(!isdarkMode)}>
            <WbIncandescentIcon />    
            { isdarkMode ? "Light Mode" : "Dark Mode"}
        </Items>
    </Container>
  )
}

export default Menu
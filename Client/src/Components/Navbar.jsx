import React , {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Videoupload from './Videoupload';

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
const User = styled.div`
display: flex;
align-items :center;
gap : 1rem;
color : ${({theme})=> theme.text};
`
const Avatar = styled.img`
border-radius : 50%;
background-color : grey;
height:2rem;
width :2rem;
`
const Navbar = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const [showModal , setshowModal] = useState(false)
    const handleUpload =()=>{
        setshowModal(true)

    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' />
                        <SearchIcon />
                    </Search>
                    {currentUser ? 
                        <User>
                            <VideoCallIcon onClick={handleUpload}/>
                            <Avatar src={currentUser.img} />
                            {currentUser.name}
                        </User>
                        : 
                        <Link to="signin" style={{"textDecoration" : "none"}}>
                            <SignInBtn><AccountCircleIcon/>Sign In</SignInBtn>
                        </Link>
                    }
                </Wrapper>
            </Container>
            {showModal && <Videoupload setshowModal={setshowModal} />}
        </>
  )
}

export default Navbar
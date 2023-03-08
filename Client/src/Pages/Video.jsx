import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comments from '../Components/Comments';


const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`
const Content = styled.div`
  flex : 5;
`

const VideoWrapper = styled.div`
  
`

const Recommendation = styled.div`
  flex:2;
`

const Title = styled.h1`
  font-size : 1.2rem;
`

const Details = styled.div`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  display : flex;
  align-items: center;
`
const Info = styled.span`
  
  `

const Buttons = styled.div`
  margin-left:auto;
  display : flex;
  gap: 0.5rem;
`

const Button = styled.button`
  all :unset;
  display :flex;
  align-items: center;
  background-color : ${({theme})=> theme.text === "white" ? "#3e3939a8" : "#f2f2f2"};
  border-radius :1rem;
  padding : 0.3rem 0.7rem;
  gap : 0.2rem;

`
const ChannelDetails =styled.div`
  display:flex;
  flex-direction : column;
  margin-left : 0.6rem;
`
const ChannelName = styled.div`
  font-size: 1rem;
  font-weight : 600;
`

const ChannelInfo = styled.div`
  color : ${({theme})=> theme.textSoft};
`

const Subscribe = styled.button`
  all: unset;
  background-color : ${({theme})=> theme.text};
  color : ${({theme})=> theme.bg};
  border-radius :1rem;
  padding : 0.5rem 0.7rem;
  font-weight : 600;
  margin-left: 1rem;
  
`

const Avatar = styled.img`
  border-radius : 50%;
  background-color : grey;
  height:2rem;
  width :2rem;
`

const Video = () => {
  const { id } = useParams() 
  const [fillBtn , setfillBtn] = useState(false) 
  const [fillBtnDislike , setfillBtnDislike] = useState(false) 
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width='100%'
            height='500rem'
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            frameborder = "0"
            allow="accelerometer; autoplay; clipboard-write; encypted-media;  gyroscope; picture-in-picture"
            allowFullScreen
            />
        </VideoWrapper>
        <Title>React Video Sharing App UI Design | Youtube UI Clone with React</Title>
        <Details>
          <Avatar src="" alt="Avatar"/>
          <ChannelDetails>
            <ChannelName>Z Learn</ChannelName>
            <ChannelInfo>123k Subscribers</ChannelInfo>
          </ChannelDetails>
          <Subscribe>Subscribe</Subscribe>
          <Buttons>
            <Button 
              onClick={()=> { 
                setfillBtn(!fillBtn)
                if(fillBtnDislike) setfillBtnDislike(false)
                }}>
                {fillBtn ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}123</Button>
            <Button 
              onClick={()=> {
                setfillBtnDislike(!fillBtnDislike)
                if(fillBtn) setfillBtn(false)
                }}>{fillBtnDislike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}Dislike</Button>
            <Button><ReplyOutlinedIcon />Share</Button>
            <Button><FileDownloadOutlinedIcon />Download</Button>
          </Buttons>
        </Details>
        <Comments />
      </Content>
      <Recommendation>Recommended Section</Recommendation>
    </Container>
  )
}

export default Video
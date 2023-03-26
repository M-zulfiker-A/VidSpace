import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Card from "../Components/Card"
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comments from '../Components/Comments';
import {useSelector , useDispatch} from "react-redux"
import axios from 'axios';
import { fetchStart , fetchSuccess , fetchFailure , like, dislike } from '../redux/videoSlicer';
import { format } from 'timeago.js';
import { subscription, unsubscription } from '../redux/userSlicer';

axios.defaults.withCredentials = true;

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

  &:focus{
    outline : none;
  }

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
  cursor:pointer;
  background-color : ${({theme})=> theme.text};
  color : ${({theme})=> theme.bg};
  border-radius :1rem;
  padding : 0.5rem 0.7rem;
  font-weight : 600;
  margin-left: 1rem;
  
  &:focus{
    outline : none;
  }
`

const Avatar = styled.img`
  border-radius : 50%;
  background-color : grey;
  height:2rem;
  width :2rem;
`
const Description = styled.div`
  margin-top : 0.6rem;
  margin-bottom : 0.6rem;
  font-size : 0.8rem;
  background-color : ${({theme})=> theme.soft};
  padding : 0.5rem;
  border-radius : 0.4rem;
`
const Desc = styled.div``
const Views = styled.span`
  font-weight: 600;
`
const PostedTime = styled.span`
  margin-left : 0.5rem;
  font-weight: 600;
`
const VideoFrame = styled.video`
  max-height : 720px;
  width : 100%;
  object-fit : cover;
`


const Video = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state=> state.video)
  const { id } = useParams() 
  const [showMore , setshowMore] = useState(true)
  const [channel , setChannel] = useState({})
  const [videoVisible, setvideoVisible] = useState(false)

  const handleLike =async()=> {
    await axios.put(`/api/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }
  const handleDislike =async()=> {
    await axios.put(`/api/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSub =async()=>{
    if(currentUser.SubscribedUsers.includes(channel._id)){
      await axios.put(`/api/users/unsub/${channel._id}`)
      dispatch(unsubscription(channel._id))
    }else{
      await axios.put(`/api/users/sub/${channel._id}`)
      console.log(currentUser.SubscribedUsers)

      dispatch(subscription(channel._id))
    }
  }

  useEffect(() => {
    try {
      dispatch(fetchStart)
      const fetchData = async()=>{
        const Videores = await axios.get(`/api/videos/find/${id}`)
        const Usersres = await axios.get(`/api/users/find/${Videores.data.video.userId}`)
        console.log(Usersres)
        setChannel(Usersres.data)
        dispatch(fetchSuccess(Videores.data.video))
      }
      fetchData()
    } catch (error) {
      console.log(error)
      dispatch(fetchFailure())
    }finally{
      console.log(currentVideo)
    }

  }, [id, dispatch])
  
  

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {!videoVisible ? (<img onClick={()=>setvideoVisible(true)} src={currentVideo.imgUrl} />) : (<VideoFrame src={currentVideo.videoUrl} controls={true} autoPlay={true} />)}
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Avatar src={channel.img} alt="Avatar"/>
          <ChannelDetails>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelInfo>{channel.Subscribers} Subscribers</ChannelInfo>
          </ChannelDetails>
          <Subscribe onClick={handleSub}>{currentUser.SubscribedUsers?.includes(channel._id) ? "Unsubscribe" : "Subscribe"}</Subscribe>
          <Buttons>
            <Button 
              onClick={handleLike}>
                {currentVideo.likes.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}{currentVideo.likes?.length } Likes</Button>
            <Button 
              onClick={handleDislike}>{currentVideo.dislikes.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}Dislike</Button>
            <Button><ReplyOutlinedIcon />Share</Button>
            <Button><FileDownloadOutlinedIcon />Download</Button>
          </Buttons>
        </Details>
        <Description>
          <Views>{currentVideo.views} views</Views><PostedTime>{format(currentVideo.createdAt)}</PostedTime>
          <div>
            {showMore ? currentVideo.desc.slice(0,200)+"..." : currentVideo.desc}
            <div onClick={()=> setshowMore(!showMore)} style={{"cursor" : "pointer", "marginTop" : "0.5rem"}}>
              Show {showMore ? "More" : "Less"}
            </div>
          </div>
        </Description>
        <Comments />
      </Content>
      <Recommendation>
        {/* <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" /> */}
      </Recommendation>
    </Container>
  )
}

export default Video
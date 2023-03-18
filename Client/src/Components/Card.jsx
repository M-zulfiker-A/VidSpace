import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js'

const Container = styled.div`
  margin-bottom : ${(props)=> props.type === "sm" ? "1rem" :"3rem"};
  cursor : pointer;
  display : ${(props)=> props.type === "sm" && "flex"};
  align-items : ${(props)=> props.type === "sm" && "center"};
  gap : ${(props)=> props.type === "sm" && "0.5rem"};

`

const Image  = styled.img`
  width : ${(props)=> props.type === "sm" ? "50%" : "100%"};
  aspect-ratio : 1.8 / 1;
  background-color:grey;
  border-radius : 0.3rem;
`

const Details =  styled.div`
  display:flex;
  margin-top : 0.7rem;
  gap : 0.8rem;
`

const ChannelImage = styled.img`
  width : 2rem;
  height : 2rem;
  border-radius : 50%;
  background-color :grey;
  display : ${(props)=> props.type === "sm" && "none"};
`

const Texts = styled.div`

`;
const Title = styled.div`
  font-size : 1rem;
  color : ${({theme})=> theme.text};
  font-weight : 500;
`;
const ChannelName = styled.h2`
  font-size: 0.7rem;
  color : ${({theme})=> theme.textSoft};
  margin : 0.4rem 0rem;
`;
const Info = styled.div`
  font-size: 0.7rem;
  color : ${({theme})=> theme.textSoft};
`;


const Card = ({type , video}) => {
  const [channel , setChannel] = useState({})
  useEffect(()=>{
    const fetchChannel = async (video)=>{
      const channelData =  await axios.get(`http://localhost:8000/api/users/find/${video.userId}`)
      console.log(channelData)
      setChannel(channelData.data)
    }
    try{
      fetchChannel(video)
    }catch(err){
      console.log(err)
    }
  },[video.userId])
  return (
    <Link to={`/video/${video._id}`}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl}/>
        <Details>
          <ChannelImage src={channel.img} type={type}/>
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
    )
}

export default Card
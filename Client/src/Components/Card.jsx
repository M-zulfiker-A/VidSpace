import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom : ${(props)=> props.type === "sm" ? "1rem" :"3rem"};
  cursor : pointer;
  display : ${(props)=> props.type === "sm" && "flex"};
  align-items : ${(props)=> props.type === "sm" && "center"};
  gap : ${(props)=> props.type === "sm" && "0.5rem"}

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
  display : ${(props)=> props.type === "sm" && "none"}
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


const Card = ({type}) => {
  return (
    <Link to="/video/test">
      <Container type={type}>
        <Image type={type}/>
        <Details>
          <ChannelImage src="" type={type}/>
          <Texts>
            <Title>Learn by Doing</Title>
            <ChannelName>Z Learn</ChannelName>
            <Info>My first Video for testing</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
    )
}

export default Card
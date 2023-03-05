import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom : 3rem;
  cursor : pointer;
`

const Image  = styled.img`
  width : 100%;
  aspect-ratio : 1.7 / 1;
  background-color:grey
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
  background-color :grey
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


const Card = () => {
  return (
    <Link to="/video/test">
      <Container>
        <Image />
        <Details>
          <ChannelImage src=""/>
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
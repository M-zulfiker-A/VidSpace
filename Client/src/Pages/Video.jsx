import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'


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
  
`

const Details = styled.div`
  
`
const Info = styled.span`
  
  `

const Buttons = styled.div`
  
  `

const Button = styled.button`
  
  `

const Video = () => {
  const { id } = useParams()  
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width='100%'
            height='720px'
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            frameborder = "0"
            allow="accelerometer; autoplay; clipboard-write; encypted-media;  gyroscope; picture-in-picture"
            allowFullScreen
            />
        </VideoWrapper>
      </Content>
      <Recommendation>Recommended Section</Recommendation>
    </Container>
  )
}

export default Video
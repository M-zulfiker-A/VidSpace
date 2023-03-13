import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    color : ${({theme})=> theme.text};
    height : calc(100vh - 3rem);
`

const SignIn = () => {
  return (
   <Container>HI</Container>
  )
}

export default SignIn
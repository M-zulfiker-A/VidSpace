import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    color : ${({theme})=> theme.text};
    height : calc(100vh - 3rem);
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction : column;
  background-color : ${({theme})=> theme.bgLighter};
  border :1px solid ${({theme})=> theme.soft};
  padding : 1.3rem 3.5rem;
  gap : 1rem;
  border-radius : 1rem;
`

const Title = styled.h2``
const Input = styled.input`
  background-color : transparent;
  height:2rem;
  border : 1px solid ${({theme})=> theme.soft};
  width : 100%;
  border-radius : 5px;

  &::placeholder { 
  color: ${({theme})=> theme.text};
  opacity: 1;
}
`
const Buttons =  styled.button`
  all : unset;
  color:${({theme})=> theme.text};
  background-color : ${({theme})=> theme.text === "white" ? "#3e3939a8" : "#f2f2f2"};
  cursor : pointer;
  padding : 0.3rem 0.5rem;
  border-radius : 5px;

`
const More = styled.div``


const SignIn = () => {
  return (
   <Container>
    <Wrapper>
      <Title>Sign In</Title>
      <p>Find your Space inside VidSpace</p>
      <Input placeholder='username' type='text'/>
      <Input placeholder='password' type = 'password' />
      <Buttons>Sign In</Buttons>
      <p>Or</p>
      <Title>SIgn Up</Title>
      <Input placeholder='username' />
      <Input placeholder='email' type='email'/>
      <Input placeholder='password' type='password'/>
      <Buttons>Sign Up</Buttons>
    </Wrapper>
  </Container>
  )
}

export default SignIn
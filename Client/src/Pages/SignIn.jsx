import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlicer'
import { Auth , provider } from '../firebase/firebaseAuth'
import { signInWithPopup } from 'firebase/auth'
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
  color : ${({theme})=> theme.text};

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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const handleSignIn = async(e)=> {
      e.preventDefault();
      dispatch(loginStart())
      try{
      const signinAction = await axios.post("/api/auth/signin",{
        name , password
      })
      dispatch(loginSuccess(signinAction.data))
      console.log(signinAction)
    }catch(err){
      dispatch(loginFailure)
      console.log(err)
    }
  }
  const signinWithGoogle =async()=>{
    dispatch(loginStart())
    try{
      const result = await signInWithPopup(Auth, provider)
      const res = await axios.post("api/auth/google",{
        name : result.user.displayName,
        email : result.user.email,
        img : result.user.photoURL
      })
      dispatch(loginSuccess(res.data))
    }catch(err){
      dispatch(loginFailure())
    }
  }
  const handleSignUp = ()=>{
    //todo : SIgnup
  }
  return (
   <Container>
    <Wrapper>
      <Title>Sign In</Title>
      <p>Find your Space inside VidSpace</p>
      <Input placeholder='username' type='text' onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder='password' type = 'password' onChange={(e)=>setPassword(e.target.value)}/>
      <Buttons onClick={handleSignIn}>Sign In</Buttons>
      <p>Or</p>
      <Buttons onClick={signinWithGoogle}>Sign In With Google</Buttons>
      <p>Or</p>
      <Title>SIgn Up</Title>
      <Input placeholder='username' onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder='email' type='email' onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
      <Buttons >Sign Up</Buttons>
    </Wrapper>
  </Container>
  )
}

export default SignIn
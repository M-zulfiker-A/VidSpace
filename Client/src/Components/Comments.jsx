import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`
const NewComment = styled.div`
    display :flex;
    gap : 0.6rem;
    margin-top : 0.7rem;
    width : 100%;
`

const Avatar = styled.img`
  border-radius : 50%;
  background-color : grey;
  height:2rem;
  width :2rem;
  flex-shrink : 0;
`
const Input = styled.input`
    background-color : transparent;
    border-bottom : 1px solid ${({theme})=> theme.bgLighter};
    border-top : none;
    border-left : none;
    border-right : none;
    width : 100%;

    &:focus{
        outline: none;
        border-bottom : 1px solid ${({theme})=> theme.text};
        
    }
`
const AllComments = styled.div`
    
`
const Comment = styled.div`
    display : flex;
    gap : 0.6rem;
    margin-top : 0.7rem;
    width : 100%;
`

const CommentBtns = styled.div`
    display :flex;
    gap : 0.5rem;
    float :right;
    margin : 0.5rem 0;
`
const Cancelbtn = styled.button`
    all :unset;
    background-color : transparent;
    color : ${({theme})=> theme.text};
`
const Commentbtn = styled.button`
    all :unset;
    background-color : #3ea6ff ;
    color : ${({theme})=> theme.text};
    border-radius :1rem;
    padding : 0.4rem 0.7rem;
    font-weight : 600;
`
const CommentDetails = styled.div`
    display: flex;
    flex-direction : column;
    gap : 0.3rem;
`
const CommenterName = styled.span`
    font-size : 1rem;
    font-weight: 600;
    
`
const CommentDate = styled.span`
    margin-left : 0.5rem;
    color : ${({theme})=> theme.textSoft};
    font-size : 0.75rem;
`


const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src="#"/>
            <Input placeholder='Add a comment' />
        </NewComment>
        <CommentBtns>
            <Cancelbtn>Cancel</Cancelbtn>
            <Commentbtn>Comment</Commentbtn>
        </CommentBtns>
        <AllComments>
            <Comment>
                <Avatar src="" />
                <CommentDetails>
                    <div>
                    <CommenterName>Test</CommenterName><CommentDate>8 months ago</CommentDate>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis quibusdam iusto fuga voluptates! Facere, voluptate, provident, amet libero ad velit odit fuga nesciunt minus repellat voluptates aspernatur. Assumenda, officia.</p>
                </CommentDetails>
            </Comment>
            <Comment>
                <Avatar src="" />
                <CommentDetails>
                    <div>
                    <CommenterName>Test</CommenterName><CommentDate>8 months ago</CommentDate>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis quibusdam iusto fuga voluptates! Facere, voluptate, provident, amet libero ad velit odit fuga nesciunt minus repellat voluptates aspernatur. Assumenda, officia.</p>
                </CommentDetails>
            </Comment><Comment>
                <Avatar src="" />
                <CommentDetails>
                    <div>
                    <CommenterName>Test</CommenterName><CommentDate>8 months ago</CommentDate>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis quibusdam iusto fuga voluptates! Facere, voluptate, provident, amet libero ad velit odit fuga nesciunt minus repellat voluptates aspernatur. Assumenda, officia.</p>
                </CommentDetails>
            </Comment><Comment>
                <Avatar src="" />
                <CommentDetails>
                    <div>
                    <CommenterName>Test</CommenterName><CommentDate>8 months ago</CommentDate>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis quibusdam iusto fuga voluptates! Facere, voluptate, provident, amet libero ad velit odit fuga nesciunt minus repellat voluptates aspernatur. Assumenda, officia.</p>
                </CommentDetails>
            </Comment>
            
        </AllComments>
    </Container>
  )
}

export default Comments
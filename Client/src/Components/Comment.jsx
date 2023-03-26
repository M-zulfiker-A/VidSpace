import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { format } from 'timeago.js'

const CommentDiv = styled.div`
    display : flex;
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

const CommenterName = styled.span`
    font-size : 1rem;
    font-weight: 600;
`

const CommentDetails = styled.div`
    display: flex;
    flex-direction : column;
    gap : 0.3rem;
`
const CommentDate = styled.span`
    margin-left : 0.5rem;
    color : ${({theme})=> theme.textSoft};
    font-size : 0.75rem;
`

const Comment = ({comment}) => {
    const [commenter , setCommenter] = useState({})
    useEffect(() => {
        const fetchUsers =async ()=>{
            try{
                const res = await axios.get(`/api/users/find/${comment.userId}`)
                setCommenter(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchUsers()
    }, [])
    

  return (
    <CommentDiv>
        <Avatar src={commenter.img}/>
        <CommentDetails>
            <div>
            <CommenterName>{commenter.name}</CommenterName><CommentDate>{format(comment.createdAt)}</CommentDate>
            </div>
            <p>{comment.desc}</p>
        </CommentDetails>
    </CommentDiv>
  )
}

export default Comment
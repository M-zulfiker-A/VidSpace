import axios from 'axios'
import React , {useState , useEffect} from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useSelector } from 'react-redux'

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
    border-bottom : 1px solid grey;
    border-top : none;
    border-left : none;
    border-right : none;
    color : ${({theme})=> theme.text};
    width : 100%;

    &:focus{
        outline: none;
        border-bottom : 1px solid ${({theme})=> theme.text};
        
    }
`
const AllComments = styled.div`
    
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

    &:focus{
        outline: none;
    }
`
const Commentbtn = styled.button`
    all :unset;
    background-color : #3ea6ff ;
    color : ${({theme})=> theme.text};
    border-radius :1rem;
    padding : 0.4rem 0.7rem;
    font-weight : 600;

    &:focus{
        outline: none;
    }
`



const Comments = () => {
    const {currentUser} = useSelector(state => state.user)
    const {currentVideo} = useSelector(state=> state.video)
    const [allComment , setallComment ] = useState([])
    const [newComment , setnewComment] = useState("")
    const addComment =async()=>{
        setnewComment("")
        try {
            const res = await axios.post(`/api/comments/`,{userId : currentUser._id , videoId : currentVideo._id , desc : newComment})
            console.log("Commnet :",res.data)
            setallComment([res.data.comments,...allComment])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      try {
        const fetchComments =async ()=>{
            const res = await axios.get(`/api/comments/${currentVideo._id}`)
            setallComment(res.data.comments.reverse())
        }
        fetchComments()
      } catch (error) {
        console.log(error)
      }finally{
        console.log(allComment.reverse())
      }
    }, [])
    
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img}/>
            <Input placeholder='Add a comment' onChange={(e)=>(setnewComment(e.target.value))} value={newComment} />
        </NewComment>
        <CommentBtns>
            <Cancelbtn onClick={()=> setnewComment("")}>Cancel</Cancelbtn>
            <Commentbtn onClick={addComment}>Comment</Commentbtn>
        </CommentBtns>
        <AllComments>
            {allComment.length ? allComment.map(comment => <Comment key={comment._id} comment={comment}/>) : <></>}          
        </AllComments>
    </Container>
  )
}

export default Comments
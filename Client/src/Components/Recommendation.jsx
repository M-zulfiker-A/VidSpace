import axios from 'axios'
import React ,{useEffect , useState}from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
  flex:2;
`

const Recommendation = ({tags}) => {
    const [videos , setVideos] = useState([])
    const {currentVideo} = useSelector(state => state.video)
    useEffect(() => {
      (async function(){
        try{
            const res = await axios.get(`/api/videos/tags?tags=${tags}`)
            setVideos(res.data)
        }catch(err){
            console.log(err)
        }
      })();
    }, [])
    
  return (
    <Container>
        {videos.length > 0 ? videos.filter((video)=> video._id !== currentVideo._id).map((video)=><Card type="sm" video={video} />) : <></>}
    </Container>
  )
}


export default Recommendation
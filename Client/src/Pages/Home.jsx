import React , {useState , useEffect}from 'react'
import styled from 'styled-components'
import Card from '../Components/Card'
import axios from "axios"

const Container = styled.div`
    display:grid;
    grid-template-columns : repeat(auto-fit , minmax(15rem,1fr));
    column-gap : 2rem;
    padding : 1rem 2rem;

`

const Home = ({type = "random"}) => {
  const [videos , setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async ()=>{
      try {
        const res = await axios.get(`http://localhost:8000/api/videos/${type}`)
        console.log(res, typeof res)
        setVideos(res.data.videos)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchVideos()
  }, [type])
  
  
  return (
    
    <Container>
      {videos.length && videos.map((video)=>
        (<Card key={video._id} video={video}/>)
      )} 
    </Container>
  )
}

export default Home
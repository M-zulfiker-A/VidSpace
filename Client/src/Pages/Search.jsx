import axios from 'axios'
import styled from 'styled-components'
import React, { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../Components/Card'

const Container = styled.div`
    display:grid;
    grid-template-columns : repeat(auto-fill , minmax(15rem,1fr));
    column-gap : 2rem;
    padding : 1rem 2rem;

`

const Search = () => {
    const query = useLocation().search
    const [videos , setVideos] = useState([])
    useEffect(() => {
      (async function(){
        try{
            const res = await axios.get(`/api/videos/search${query}`)
            setVideos(res.data)
        }catch(err){
            console.log(err)
        }
      })()

    }, [query])
    
  return (
    <Container>
        {videos.length ? videos.map((video)=> 
        (
            <Card key={video._id} video={video} />
        )) : <h1 style={
            {
                position : "absolute",
                top: "50%",
                left: "50%",
            }
        }>No Videos Found</h1>}
    </Container>
    )
}

export default Search
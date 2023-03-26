import React , {useState, useEffect } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable,deleteObject, getDownloadURL } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Container = styled.div`
    position : absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    background-color : #000000b3;
    display : flex;
    align-items : center;
    justify-content:center;
`

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    background-color : ${({theme})=> theme.bg === "black" ? theme.bgLighter : theme.bg};
    color : ${({theme})=> theme.text};
    padding : 2rem;
    height : 70%;
    width : 60%;
`
const Top = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`
const Close = styled.div`
    cursor : pointer;
`

const Title = styled.h1`
    font-size : 2rem;
`
const Input = styled.input`
    border : 1px solid ${({theme})=> theme.soft};
    margin-bottom: 1rem;
    background-color : transparent;
    padding : 0.2rem;
    color : ${({theme})=> theme.text};
`
const Desc = styled.textarea`
    border : 1px solid ${({theme})=> theme.soft};
    margin-bottom: 1rem;
    background-color : transparent;
    padding : 0.2rem;
    color : ${({theme})=> theme.text};
`

const Button = styled.button`
    all: unset;
    cursor:pointer;
    background-color : ${({theme})=> theme.text};
    color : ${({theme})=> theme.bg};
    border-radius :1rem;
    padding : 0.3rem 1rem;
    font-weight : 600;
    width : fit-content;

    &:focus{
    outline : none;
    }
`
const ThumbNail = styled.img`
    width : 9rem;
    height : 6rem;
`
const ThumbNailContainer = styled.div`
    display: flex;
    align-items : center;
    gap: 0.5rem;
`

const Videoupload = ({setshowModal}) => {
  const [formData , setFormData] = useState({})
  const [video , setVideo] = useState(undefined)
  const [img , setImg] = useState(undefined)
  const [videoPerc , setVideoPerc] = useState(0)
  const [imgPerc , setImgPerc] = useState(0)
  const [tags , setTags] = useState([])
  const [imgFileName , setimgFileName] = useState("")

  const handleChange =(e)=>{
    setFormData(prev=>{
        return {
            ...prev, [e.target.name] : e.target.value
        }
    })
  }
  useEffect(()=>{video && uploadFile(video,"videoUrl")},[video])
  useEffect(()=>{img && uploadFile(img,"imgUrl")},[img])
  const handleTags = (e)=>{
    const tagString = e.target.value;
    setTags(tagString.split(","))
  }
  const uploadFile = (file, filetype)=>{
    const storage = getStorage();
    const fileName = Date.now() + file.name
    setimgFileName(fileName)
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        filetype === "imgUrl" ? setImgPerc(progress) : setVideoPerc(progress)
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        }
    }, 
    (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;

        // ...

        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    }, 
    () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData(prev => {
            return {
                    ...prev ,
                    [filetype] : downloadURL
            }
            })
        });
    }
    );
  }

  const deleteThumbnail =(filename)=>{
    setImgPerc(0)
    setFormData(prev => ({
        ...prev ,
        imgUrl : ""
    }))
    setImg(undefined)
    const storage = getStorage();
    const desertRef = ref(storage, filename);
    // Delete the file
    deleteObject(desertRef).then(() => {
    // File deleted successfully
    }).catch((error) => {
    // Uh-oh, an error occurred!
    });
  }

  const handleUpload =async()=>{
    const res = await axios.post("/api/videos/",{
        ...formData,
        tags
    })
    console.log(res)
  }

  return (
    <Container>
        <Wrapper>
            <Top>
                <Title>Upload a new video</Title>
                <Close onClick={()=>setshowModal(false)} title="Close">
                    X
                </Close>
            </Top>
            <label for="videoUrl">Select Video</label>
            {videoPerc > 0 ? ("Uploading "+videoPerc+"%") : (
                <Input type="file" name="videoUrl" accept='video/*' onChange={(e)=>setVideo(e.target.files[0])}/>
            )}
            <Input type="text" placeholder='Title' name = "title" onChange={handleChange}/>
            <Desc placeholder='Video description' rows={8} name="desc" onChange={handleChange}/>
            <label for="imgUrl">Thumbnail</label>
            {imgPerc > 0 ? ("Uploading "+imgPerc+"%") : (
                <Input type="file" name="imgUrl" accept='image/*' onChange={(e)=>setImg(e.target.files[0])}/>
            )}
            {imgPerc === 100 && (
            <ThumbNailContainer>
                <ThumbNail src={formData.imgUrl} /><span title="delete" onClick={()=>deleteThumbnail(imgFileName)}><DeleteIcon /></span>
            </ThumbNailContainer>
            )}
            <label for="tags">Tags</label>
            <Input type="text" name="tags" placeholder='Separate Tags with Commas' onChange={handleTags}/>
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Videoupload
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import styled from '@emotion/styled';
import FileBase from 'react-file-base64';
import {useUpdatePostMutation, useGetPostQuery} from './services/posts';
import { useParams, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

//import { matchPath , useParams, history } from 'react-router-dom'


const StyledPaper = styled(Paper)`
padding-top: 100px;
padding: theme.spacing(2),
`
const StyledForm = styled.form`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 10px;
`
const Div = styled.div`
     width: 97%;
      margin: 10px;
`
const StyledButton = styled(Button)`
margin: 10px;
`

//const initialState = {creator:'', title: '',  message: '', tags: '', selectedFile: ''};

function UpdatePost () {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const user = JSON.parse(localStorage.getItem('profile'));
  //const [formValue, setFormValue] = useState(initialState);
  // const [postData, setPostData] = useState(initialState);
// const {creator, title, message, tags, selectedFile} = formValue;
 const [updatePost] = useUpdatePostMutation()
 const {id} = useParams();
 const {data} =useGetPostQuery(id)
 let navigate = useNavigate();
 const [postUser, setPostUser] = useState(JSON.parse(localStorage.getItem('profile')));
 //let edit = currentId ? data.map((p) => p._id === currentId) : null

 useEffect(() => {
  if(id && data) {
    setPostData({id, ...data});
  }
}, [id, data])
 
 /*
 const handleInputChange = (e) => {
   let {name, value} = e.target;
   setFormValue({ ...formValue, [name]: value});
 }
 */
 
 
 const handleSubmit = async (e) => {
   e.preventDefault()
   await updatePost({...postData, name: user?.result?.name});
        navigate("/");
        toast.success("Contact Updated Successfully");
  }
/*
  const handleLogout = () => {
    setPostUser(postUser);
} */
  
  return (
    <StyledPaper key={id}>
     <StyledForm autoComplete='off'  noValidate onSubmit={handleSubmit} >
        <Typography variant='h6'>Create a Memory</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}  />
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
        <Div><FileBase type="file" multiple={false}  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></Div>
        <StyledButton variant='contained' color='primary' size='large'  type='submit' fullWidth>Submit</StyledButton>
      </StyledForm>
    </StyledPaper>
  ) 
}
export default UpdatePost





/*
 <StyledForm autoComplete='off'  noValidate onSubmit={handleSubmit} enctype="multipart/form-data">
        <Typography variant='h6'>Create a Memory</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={creator} onChange={handleInputChange}  />
        <TextField name='title' variant='outlined' label='Title' fullWidth value={title} onChange={handleInputChange}/>
        <TextField name='message' variant='outlined' label='Message' fullWidth value={message} onChange={handleInputChange} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={tags} onChange={handleInputChange}/>
        <Div><FileBase type="file" multiple={false} value={selectedFile} onChange={handleInputChange}/></Div>
        <StyledButton variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</StyledButton>
     </StyledForm>



     */
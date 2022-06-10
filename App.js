import  React, {useState } from 'react';
import { Container, Grow, Grid } from '@mui/material';
//import Form from './components/Form/Form'
//import Posts from './components/Posts/Posts';
import NavBar from './components/NavBar/NavBar';
import Home from './home/Home';
//import {Container} from '@mui/material';
//import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from './components/auth/Auth';
import UpdatePost from './updatePost';
import PostDetails from './components/postDetails/PostDetails';


function App() {
  //const [currentId, setCurrentId] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
   <Router>
    <Container maxWidth='xl'>
    <NavBar />
    <Routes>
      <Route path='/' element={() => <Navigate to="/posts" replace/>} />
      <Route path='/posts' element={<Home />} />
      <Route path='/posts.search' element={<Home />} />
      <Route path='/auth' element={() => (!user ? <Auth /> : <Navigate  to ='/posts/' replace />)} />
      <Route path='/posts/:id'  element={<PostDetails />}/>
      <Route path='/updatePost/:id' element={<UpdatePost />}></Route>
    </Routes>
    </Container>
    </Router>
  );
}

export default App;

import React, {useEffect, useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Avatar,Grid, Button, Paper, Typography} from '@mui/material';
import styled from '@emotion/styled';
import LockOutlined from '@mui/icons-material/LockOutlined'
import Input from './Input';
import {useAuthLogMutation, useAuthRegMutation} from '../../services/posts';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';



const Container = styled.div`
margin-top: 120px;
`
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [authReg] = useAuthRegMutation()
    const [authLog, {data, isError, error}] = useAuthLogMutation()
    //const dispatch = useDispatch();
    let navigate = useNavigate();
 
useEffect(() => {
  if(data) {
  localStorage.setItem('profile', JSON.stringify({...data, }))

  setErrorMessage('');
  setShowPassword(false);
  setFormData(initialState);
  setIsSignup(false);
  };
  if(isError) {
    setErrorMessage(error);
  }
}, [data, isError])


   const  handleSubmit = async (e) => {
     e.preventDefault();
     //console.log(formData);
     if(isSignup) {
     await authReg(formData)
       navigate("/");
     } else {
     await authLog(formData)
      navigate("/");
     }
   }
const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

   const  handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value});
}

const switchMode = () => {
setIsSignup((prevIsSignup) => !prevIsSignup);
setShowPassword(false)
}


const googleSuccess = async (res) => {
  
    const result = res;
    const token = res?.clientId
    //console.log(result)
    localStorage.setItem('promo', JSON.stringify({...result, }))
    //e.preventDefault();
    if(isSignup) {
    await authReg({...result})
      navigate("/");
    } else {
    await authLog({...result, token})
     navigate("/");
    }
   /* try {
  dispatch({ type: 'AUTH', data: { result, token}})
    } catch (error) {
      console.log(error)
    }
*/
};
const googleFailure = () => {
    console.log('Login Failed');
};



  return (
     
    <Container>
    <Paper elevation={3}>
    <Avatar>
     <LockOutlined />
    </Avatar>
    <Typography variant='h5'>{isSignup ? 'Sign Up': 'Sing In'}</Typography>
    <form onSubmit={handleSubmit}>
     <Grid container spacing={2} >
     { isSignup && (
             <>
             <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
             <Input name='lastName' label='Last Name' handleChange={handleChange}   half />
             </>
         )}
         <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
         <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
       { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'  />}
     </Grid>
     <Button type='submit' fullWidth variant='contained' color='primary'>{isSignup ? 'Sign Up': 'Sign In'}</Button>
    <GoogleOAuthProvider clientId="867443898220-jhl4n28trh9v8j08ejp0vr0usv7k70lj.apps.googleusercontent.com">
    <GoogleLogin
  onSuccess={googleSuccess}
  onError={ googleFailure}
 
/>;
     </GoogleOAuthProvider>
    
    

     <Grid container justifyContent='flex-end'>
         <Grid item>
             <Button onClick={switchMode}>
                 {isSignup ? "Already have an account Sign In" : "Don't have an account Sign Up" }
             </Button>
         </Grid>
     </Grid>
    </form>
    </Paper>
    </Container>
   
  )
}

export default Auth
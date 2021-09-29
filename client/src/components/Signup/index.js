
import React, {useState, useEffect} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { registerUser } from '../../store/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';





const Signup=(props)=>{

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(()=>{
        console.log(user.auth)
        if(user.auth){
            props.history.push('/dashboard');
        }
    }, [user])

    const handleEmailInputChange = event => {
        setEmailInput(event.target.value);
    };
    
    const handlePasswordInputChange = event => {
        setPasswordInput(event.target.value);
    };

    const signup = ()=>{
        console.log(emailInput, passwordInput)
        dispatch(registerUser({email: emailInput, password: passwordInput}))

    }

    // const responseGoogle = (response) => {
    //     console.log(response);
    // }
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField value= {emailInput} onChange= {handleEmailInputChange} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField value= {passwordInput} onChange= {handlePasswordInputChange} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 /> */}
                <Button onClick={()=> signup()} type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Sign Up</Button>
                {/* <Typography >
                     <Link href="#" >
                        Forgot password?
                </Link>
                </Typography> */}
                <Typography > Do you have an account? <Link href="login">Sign In</Link>
                </Typography>
                <br/>
                {/* <Divider/>
                <br/>
                <Grid align='center'>
                <Typography > 
                    Sign in with Google 
                </Typography>
                    <br/>
                <GoogleLogin
                    clientId="572277874630-vps772qpqks45qj3fihmuo2v8ltbifth.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    accessType='offline'
                    responseType='code'
                    approvalPrompt="force"
                    prompt='consent'
                    scope={'email', 'profile'}
                />
                </Grid> */}
            </Paper>
        </Grid>
    )
}

export default Signup;

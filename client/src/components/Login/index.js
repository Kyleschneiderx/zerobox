
import React, {useState, useEffect} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { loginUser } from '../../store/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';

const Login=(props)=>{

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

    const login = ()=>{
        console.log(emailInput, passwordInput)
        console.log(emailInput, passwordInput)
        dispatch(loginUser({email: emailInput, password: passwordInput}))

    }


    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
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
                <Button onClick={()=> login()} type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Sign in</Button>
                {/* <Typography >
                     <Link href="#" >
                        Forgot password?
                </Link>
                </Typography> */}
                <Typography > Do you not have an account? <Link href="/signup">Sign Up</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

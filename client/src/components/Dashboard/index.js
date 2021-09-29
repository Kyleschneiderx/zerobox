import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { GoogleLogin } from 'react-google-login';
import { addGmail } from '../../store/actions/user_actions';
import {useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'




const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData)

    const responseGoogle = (response) => {
        console.log(response)
        dispatch(addGmail(response, user))
    }

    return (
        <div>
            
            <Grid container justifyContent='flex-end' margin={3}>
                <Box m={1} pt={2}>
                    <GoogleLogin
                        clientId='572277874630-vps772qpqks45qj3fihmuo2v8ltbifth.apps.googleusercontent.com'
                        buttonText="Add Gmail"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        accessType='offline'
                        responseType='code'
                        prompt='consent'
                        scope={'https://mail.google.com/'}
                    />
                </Box>
            </Grid>
            <Box sx={{ flexGrow: 1 }} ml={10} mr={10}>
            <Grid container justifyContent='center'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>ApiKey</TableCell>     
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {/* {waitlist ? waitlist
                                        .map(pat =>{
                                        return (
                                        <TableRow key={pat.patientID}>
                                            <TableCell>{pat.patientID}</TableCell>
                                            <TableCell>{pat.name} {pat.lastname}</TableCell>
                                            <TableCell>{pat.number}</TableCell>
                                            <TableCell><Button onClick={() => deletePerson(pat._id)}><DeleteIcon/></Button></TableCell>
                                        </TableRow>
                                    )
                                }): null} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Grid>
        </Box>
        </div>
    )
}


export default Dashboard;
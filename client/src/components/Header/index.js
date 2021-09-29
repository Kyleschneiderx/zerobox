import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const auth = useSelector(state => state.user.auth)
  console.log(auth)
  return (  
    <div className={classes.root}>
      <AppBar position="static" color="#0D6F7B">
        <Toolbar>
          {auth ? 
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          : null}
          <Typography variant="h3" className={classes.title}>
            zeroBox
          </Typography>
          {!auth ? <>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button> 
          <Button color="inherit" component={Link} to="/login">Login</Button>
          </>: null }
        </Toolbar>
      </AppBar>
    </div>
  );
}
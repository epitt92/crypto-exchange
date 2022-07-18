import Footer from "./Footer";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import AcceptedCoin from "./AcceptedCoin"; 
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import swap from './download.png';
import arrow from './arrow.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Exchange(){

    const [acceptedCoins, setAcceptedCoins] = useState([]);

    const [acceptedCoinsNames, setAcceptedCoinsNames] = useState([]);

    const [first, setFirst] = useState('');

    const [second, setSecond] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [balances, setBalances] = useState([]);
    const [coinNames, setCoinNames] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [balance, setBalance] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const getAcceptedCoins = async () => {
        try{
            const response = await fetch('http://localhost:8080/getRates', {mode : 'cors'});
            const data = await response.json();
            setAcceptedCoins(Object.values(data));
            setAcceptedCoinsNames(Object.keys(data));
        }catch(e){
            console.log(e);
        }
    }

     const getInfo = async (name) => {
        setFirst(name);
    }

    const getInfo1 = async (name) => {
        setSecond(name);
    }

    const convertFunc = () => {
        let dialogKey = 0;
        if(first == ''){
            setErrorMessage('You should select First Coin!');
            dialogKey = 1;
        }
        if(second == ''){
            setErrorMessage('You should select Second Coin!');
            dialogKey = 1;
        }
        if(first == second){
            setErrorMessage('You should select different coins');
            dialogKey =1;
        }
        let key = 0;
        for(let i = 0; i <  coinNames.length; i++){
            if(coinNames[i] == first)
            {
                key = 1;
            }

        }
        if(key == 0){
            setErrorMessage('You should deposit this coin because there is no coin on your wallet!');
            dialogKey = 1;
        }
        if(dialogKey == 0){
            setBalance(balances[coinNames.findIndex((coin) => coin === first)].balancef);
            handleClickOpen();
        }

    }

    const getBalances = async () => {
        try{    
            const response = await fetch('http://localhost:8080/getBalances', {mode : 'cors'});
            const data = await response.json();
            setBalances(Object.values(data))
            setCoinNames(Object.keys(data));
        }catch(e){
            console.log(e);
        }
    }
     useEffect(() => {
        getAcceptedCoins();
        getBalances();
    }, [])

    return(
        <div>
             <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation light w-nav">
                <div className="navbar-container">
                <a href="#" className="brand w-nav-brand">
                <img src="images/cointego-logo.png" loading="lazy" srcSet="images/cointego-logo-p-500.png 500w, images/cointego-logo-p-800.png 800w, images/cointego-logo-p-1080.png 1080w, images/cointego-logo-p-1600.png 1600w, images/cointego-logo.png 1645w" width="822.5" sizes="(max-width: 479px) 140px, (max-width: 767px) 170px, 190px" alt="" className="logo-icon" />
                </a>
                <nav role="navigation" className="nav-menu w-nav-menu">
                    <Link to="/main" className="head-nav-button-inverted w-button">Dashboard</Link>
                    <Link to="/exchange" className="head-nav-button w-button">Exchange</Link>
                    <Link to="/deposit" className="head-nav-button-inverted w-button">Deposit</Link>
                    <Link to="/profile" className="head-nav-button-inverted w-button">Profile</Link>
                    <Link to="/" className="head-nav-button-inverted w-button">Sign Out</Link>
                </nav>
                <div className="menu-button w-nav-button">
                    <div className="burger-icon">
                    <div className="top-burger-line"></div>
                    <div className="middle-burger-line"></div>
                    <div className="bottom-burger-line"></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="fontAdd">
                <div className="container-7b">
                    
                    <Grid container spacing={2}>

                      <Grid item xs={5}>
                                    <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav" >
                                      {
                                        acceptedCoins.map((coin, index) => (
                                            <AcceptedCoin key={index} name={acceptedCoinsNames[index]} displayName={coin.name} img={coin.image} check={!coin.can_convert} getInfo={getInfo}/>
                                        ))
                                      }
                                    </List>
                      </Grid>
                      <Grid item xs={2}>
                        
                    
                                <img src={swap} alt="" style={{width : '50%', marginTop: '120%',marginLeft : '10%'}} />
                   
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                      <Grid item xs={4}>
                                    <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav">
                                      {
                                        acceptedCoins.map((coin, index) => (
                                            <AcceptedCoin key={index} name={acceptedCoinsNames[index]} displayName={coin.name} img={coin.image} check={!coin.can_convert} getInfo={getInfo1} />
                                        ))
                                      }
                                    </List>
                      </Grid>
                      <Grid item xs={3}>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField  placeholder="First Coin" variant="standard" disabled value={first}/>
                      </Grid>
                      <Grid item xs={1}>
                        <img src={arrow} alt="" style={{width : '100%'}}/>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField  placeholder="Second Coin" variant="standard" disabled value={second}/>
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="contained" onClick={convertFunc}>Convert</Button>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                      <Grid item xs={2}>
                      </Grid>
                      <Grid item xs={8}>
                       {errorMessage == '' ? null : (
                         <TextField
                          error
                          id="outlined-error"
                          label="Error"
                          value={errorMessage}
                          style ={{width: '100%'}}
                        />
                       )}
                      </Grid>
                      <Grid item xs={2}>
                      </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
             <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Conver Infromation!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    From : {first} <br /> To : {second} <br />
                    Balance : {balance}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Confirm</Button>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
        </div>
    )
}

export default Exchange;
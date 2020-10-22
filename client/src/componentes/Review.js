import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export default function CustomizedRatings() {
    const loggedIn= useSelector(state=>state.loggedIn);
    const userData = useSelector(state=>state.userId)
    const history = useHistory();
    const handleRegister = (e) =>{
        e.preventDefault();
        history.push('/user/singin')
      }
    
    
      const handleLogin = (e) =>{
        e.preventDefault();
        history.push('/user/login')
      }
  return (
    <div>
    
    {loggedIn === false ?  <span><label style={{color:"white"}}>Logea para opinar sobre el producto</label><Button onClick={handleRegister} className="Register" style={{marginRight: '10px'}} variant="info">Registrarse</Button>
    <Button onClick={handleLogin} variant="info" className="Register" style={{marginRight: '10px'}}>Ingresar</Button></span> : <div  className="review">
        <form>
        <h1>Opinion sobre el producto</h1>
        <h5>{userData.name} {userData.lastname}</h5>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="customized-icons"
          defaultValue={2}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
        />
      </Box>
      <input style={{width: "500px"}} type="text"/>
      <button style={{height: "29px" }} type="submit">Enviar</button>
      </form>
    </div>}
   
  </div>
    
  );
}
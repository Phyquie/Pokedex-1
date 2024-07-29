import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import logo from '../images/Pokédex_logo.png';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      
    },
  },
  '&:hover': {
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}33`, // Semi-transparent ring effect
    borderRadius: '10px', // Match the border radius to your input style
  },
  transition: 'box-shadow 0.3s ease'
}));

export default function HeaderSearch({ onName }) {
  const [newinputData, setnewInputData] = useState('');

  const handleChange = (event) => {
    let Captitalsearch = event.target.value;
    setnewInputData(Captitalsearch.toLowerCase());
    console.log(Captitalsearch);
  };

  const handlenewkeydown = (event) => {
    if (event.key === 'Enter') {
      if (newinputData !== '') onName(newinputData);
    }
  };

  const Magnifier = (newinputData) => {
    if (newinputData !== '') onName(newinputData);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'block', sm: 'block' },
            }}
          >
            <Link to="/">
              <Button variant="outline" startIcon={<ArrowBackIosIcon />} />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='flex flex-col'>
            <img src={logo} alt="Pokédex Logo" className='h-30 w-80' />
            <Search sx={{ maxWidth: 224, marginLeft: 2 }}>
            <div className='flex'>
            <IconButton onClick={() => Magnifier(newinputData)}>
              
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              value={newinputData}
              onKeyDown={handlenewkeydown}
            />
            </div>
           
              
            </Search>
            </div>
            
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

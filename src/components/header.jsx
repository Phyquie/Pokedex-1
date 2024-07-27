import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from './images/Pokédex_logo.png';
import { useNavigate } from 'react-router-dom';

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
}));

export default function Header({onTransfer}) {
  const [inputData, setInputData] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    let text=event.target.value

    setInputData(text.toLowerCase());
  };


  const handleonclick=()=>{
    if(inputData!==''){
      onTransfer(inputData);
navigate('/search');
    }


  }



 

  const handlekeydown=(event)=>{
    
    if(event.key=='Enter'){
      if(inputData!==''){
        onTransfer(inputData);
      navigate('/search');
      }
      
    }
  }
 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar>
          <div className='flex flex-col items-center justify-center w-full'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'block', sm: 'block' },
                overflow: 'visible',
                whiteSpace: 'nowrap',
              }}
            >
              <img src={logo} alt="h" className='h-30 w-80' />
            </Typography>
            <div className='flex items-center justify-center w-full'>
              <SearchIcon onClick={handleonclick} />
              <Search sx={{ minWidth: 200 }}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                  value={inputData}
                  onKeyDown={handlekeydown}
                />
              </Search>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
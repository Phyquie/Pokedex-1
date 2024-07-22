import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'elative',
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
  '&.MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
    },
  },
}));

export default function HeaderSearch({onName}) {
  const [newinputData, setnewInputData] = useState('');

  const handleChange = (event) => {
    let Captitalsearch = event.target.value
    setnewInputData(Captitalsearch.toLowerCase());
    console.log(Captitalsearch)
  };

  const handlenewkeydown=(event)=>{
    
    if(event.key==='Enter'){
      //console.log(event.key)
      onName(newinputData);
    }
  }
 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar>
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
            <Link to="/"><Button variant="outline" startIcon={<ArrowBackIosIcon />}/></Link>
          </Typography>
          <IconButton >
            <SearchIcon onClick={()=>onName(newinputData)}/>
            
          </IconButton>
          <Search sx={{ minWidth: 200 }}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'earch' }}
              onChange={handleChange}
              value={newinputData}
              onKeyDown={handlenewkeydown}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
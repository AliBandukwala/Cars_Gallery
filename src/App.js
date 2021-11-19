import React, {useState} from 'react'

import './App.css';
import Gallery from './Components/Gallery';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

const useStyles = makeStyles(theme => ({
  navbar:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%", 
    height:"50px", 
    backgroundColor:"tranparent",
    paddingLeft:"10px",  
    margin:"1em 0", 
  },
  title:{
    color:"#ff8c00",    
    fontSize:"1.5em",
    fontFamily:"Montserrat",
    fontWeight:600,
  },
  icon:{
    color:"#212121",
    marginRight:"10px",
  },
}));

function App() {

  const classes = useStyles()

  const [gridView, setGridView] = useState(false);

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const handleView = () => {
    setGridView(!gridView)
  }

  return (
    <div className="App" style={{backgroundColor:"#EFEFEF", padding:"10px", height: matches? "100vh" : "fit-content"}}>

      <div className={classes.navbar}>
        <div className={classes.title}>
          Car Photos
        </div>
        {
          matches ? 
          (
            gridView ? ( <ViewAgendaIcon className={classes.icon} onClick={handleView} /> ) : 
                            ( <GridViewRoundedIcon className={classes.icon} onClick={handleView} /> )
          ) :
          null
        }
      </div>
      
      <Gallery viewSize={gridView ? 6 : 12}/>
    </div>
  );
}

export default App;

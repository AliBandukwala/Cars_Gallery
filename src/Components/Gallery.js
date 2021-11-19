import React, { useState, useEffect } from 'react'
import { Backdrop, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    img: {
        width: "100%",
        marginBottom: "0.5em",
        borderRadius: "10px",
    },
    bdTitle: {
        color: "#ff8c00",
        fontSize: "1.5rem",
        marginTop: "2em",
        fontFamily:"Montserrat",
        fontWeight:400,
    },
    bdClose: {
        color: "grey",
        fontSize: "1rem",
        textDecoration: "underline",
        marginBottom: "2em",
        fontFamily:"Montserrat",
        fontWeight:400,
    },
    largeImgPhn: {
        width: "100%",
        borderRadius: "10px"
    },
    largeImgDesk:{
        borderRadius: "10px"
    }
}));


const Gallery = ({viewSize}) => {

    const classes = useStyles()

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const [open, setOpen] = useState(false);
    const [imgName, setImgName] = useState("");
    const [imgArr, setImgArr] = useState([])
    const [uri, setURI] = useState("")

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (i) => {
        setURI(imgArr[i].uri)
        setOpen(!open);
    };

    useEffect(() => {
        axios.get("http://localhost:5000").then(({ data }) => { setImgArr(data.images); setImgName(data.title) }).catch(err => console.log(err))
    }, [])

    return (
        <Grid container spacing={1}>

            {
                imgArr.map((image, i) => {
                    return (
                        <Grid key={i} item xs={viewSize} sm={6} lg={4}>
                            <img onClick={() => handleToggle(i)} className={classes.img} alt="" src={`https://${image.uri}_2.jpg`} />
                        </Grid>
                    )
                })
            }

            <Backdrop open={open} onClick={handleClose}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}

            >
                <div className={classes.bdTitle}>{imgName}</div>
                {uri === "" ?
                    null :
                    <img className={matches ? classes.largeImgPhn : classes.largeImgDesk} alt="" src={`https://${uri}_27.jpg`} />
                }
                <div className={classes.bdClose} >close</div>
            </Backdrop>
        </Grid>
    )
}

export default Gallery
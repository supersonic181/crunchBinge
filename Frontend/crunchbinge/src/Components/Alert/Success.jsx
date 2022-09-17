import React, { useState } from "react";

import {
    Alert,
    AlertTitle,
    Box,
    Collapse,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginModal from "../Starting/StartingComponent/LoginModel";

const Success = () => {
    const [open, setOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false);

    return(
        <>
        <Box sx={{width: "100%", mb:"1px", mt: 0}}>
            <Collapse in={open}>
                <Alert 
                    severity="success"
                        action={
                            <IconButton
                                onClick={()=> setOpen(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                >
                    <AlertTitle>User Registered Successfully</AlertTitle>
                            <Typography  color="primary" component="a" onClick={ handleOpen }>
                                Welcome Binger. Click to login
                            </Typography>
                </Alert>
            </Collapse>
        </Box>
        <LoginModal
            open={openModal}
            closeModel={handleClose}
        />
        </>
    );
}

export default Success;
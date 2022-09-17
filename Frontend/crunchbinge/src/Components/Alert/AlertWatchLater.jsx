import React, { useState } from "react";

import {
    Alert,
    AlertTitle,
    Box,
    Collapse,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const AlertWatchLater = ({name, msg}) => {
    const [open, setOpen] = useState(true);
    return(
        <Box sx={{width: "100%", mb: "2px"}}>
            <Collapse in={open}>
                <Alert 
                    severity="info"
                        action={
                            <IconButton
                                onClick={()=> setOpen(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                >
                    <AlertTitle>Hello {name}</AlertTitle>
                    {msg}
                </Alert>
            </Collapse>
        </Box>
    );
}

export default AlertWatchLater;
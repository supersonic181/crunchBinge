import React, { useState } from "react";

import {
    Alert,
    AlertTitle,
    Box,
    Collapse,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Alerts = ({error}) => {
    const [open, setOpen] = useState(true);
    return(
        <Box sx={{width: "100%", mb: "2px"}}>
            <Collapse in={open}>
                <Alert 
                    severity="error"
                        action={
                            <IconButton
                                onClick={()=> setOpen(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                >
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Collapse>
        </Box>
    );
}

export default Alerts;
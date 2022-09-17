//  Creating a component BonrderContainer which will envelop the components in the landing 
// within the borders

import {
    Box,
    styled
} from "@mui/material";

const BorderContainer = styled(Box) (() => ({
    borderBottom: "8px solid #1b1c25"
}));

export default BorderContainer;
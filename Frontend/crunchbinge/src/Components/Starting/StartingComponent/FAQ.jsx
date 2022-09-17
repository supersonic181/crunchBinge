import React, { useState } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import BorderContainer from "../../BorderedContainer/BorderContainer";
import { common } from "@mui/material/colors";

const StyledAccordion = styled(Accordion)(() => ({
    backgroundColor: "#1b1c25",
    color: common.white
}));

const Summary = styled(AccordionSummary)(() => ({
    borderBottom: "1px solid black",
    padding: "1em",
}))

const FAQ = () => {
    const [activeAccordion, setActiveAccordion] = useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setActiveAccordion(isExpanded ? panel : false)
    }


    return (
        <BorderContainer style={{ backgroundColor: "black" }}>
            <Container maxWidth="md" sx={{ py: 7 }}>
                <Typography variant="h3" component="h3" color="#ebecf1" align="center" sx={{ mb: 5 }}>
                    Frequently Asked Questions
                </Typography>
                <Stack spacing={1} mb={8}>
                    <StyledAccordion square expanded={activeAccordion === "panel1"} onChange={handleExpand("panel1")}>
                        <Summary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4">What is crunchBinge?</Typography>
                        </Summary>
                        <AccordionDetails>
                            <Typography variant="h5">
                                crunchBinge is an OTT platform to binge watch the best moment of your fav show anytime and anywhere (Similar to Netflix).
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                    <StyledAccordion square expanded={activeAccordion === "panel2"} onChange={handleExpand("panel2")}>
                        <Summary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4">Is crunchBinge content Free and how to access it?</Typography>
                        </Summary>
                        <AccordionDetails>
                            <Typography variant="h5">
                                crunchBinge is totally free you don't have to pay anthing to watch our content. You can access our free content
                                by simply logging in and if you are not a member you just need to sign up with us.
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                    <StyledAccordion square expanded={activeAccordion === "panel3"} onChange={handleExpand("panel3")}>
                        <Summary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4">What can I watch on crunchBinge?</Typography>
                        </Summary>
                        <AccordionDetails>
                            <Typography variant="h5">
                                crunchBinge is an OTT platform to binge your favourite movie's highlights and some movies, anime.
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                    <StyledAccordion square expanded={activeAccordion === "panel4"} onChange={handleExpand("panel4")}>
                        <Summary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4">On what devices can I watch crunchBinge?</Typography>
                        </Summary>
                        <AccordionDetails>
                            <Typography variant="h5">
                                You can binge our content on laptop.
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                </Stack>
            </Container>
        </BorderContainer>
    )
}

export default FAQ;
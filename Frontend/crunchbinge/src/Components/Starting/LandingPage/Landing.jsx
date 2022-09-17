import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import FAQ from "../StartingComponent/FAQ";
import Features from "../StartingComponent/Features";
import LandingHeader from "../StartingComponent/LandingHeader";
import LoginModal from "../StartingComponent/LoginModel";

const Home = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <LandingHeader openModal={() => setOpen(true)} />
            <Features />
            <FAQ />
            <Footer />
            <LoginModal open={open} closeModal={() => setOpen(false)} />
        </>
    )
}

export default Home;
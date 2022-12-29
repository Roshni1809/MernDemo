import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateComponent = ({ auth }) => {

    const Navigate = useNavigate();

    return (
        <>
        {
            auth || auth == null ? <Outlet /> : <Navigate to="signup" />
        }
        </>

    )
}

export default PrivateComponent;
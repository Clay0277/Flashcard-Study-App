import React from "react";
import { NavLink } from "react-router-dom";


function NavBar({ linkName="", link="", pageName="Page Name"}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item text-secondary">
            <NavLink className="m-1" to="/"><i className="bi bi-house m-1"></i>Home</NavLink>
            </li>
            
                {link && linkName !== "" ? <li className="breadcrumb-item text-secondary">
                    <p className="m-1 text-info"></p>
                    <NavLink to={link}>{linkName}</NavLink>
                    </li>
                    : ""}
    

            <li className="breadcrumb-item active" aria-current="page">
                <p className="m-1 text-info">{pageName}</p>
            </li>
          </ol>
        </nav>

    )
}

export default NavBar;

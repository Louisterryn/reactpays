import React from 'react';
import { NavLink } from "react-router-dom"; // Cela permet d'aller de pages en pages

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="a-propos" activeClassName="nav-active">
                À propos
            </NavLink>     
        </div>
    );
};

export default Navigation;
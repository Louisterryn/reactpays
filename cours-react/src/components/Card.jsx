import React from 'react';

const Card = (props) => {
    const { country } = props; // On déstructure pour faire props.country

    const numberFormat = (x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // le x que l'on te passe x= country.population, passe le en string. Ensuite on met une regex pour que tous les 3 caractères ils mettent un espace vide
    }
    return (
        <li className="card">
            <img src={country.flag} alt="flag"/>
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li>Pop. {numberFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;
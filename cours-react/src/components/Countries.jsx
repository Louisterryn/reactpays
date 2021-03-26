import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState ([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40); // Valeur qui servira à afficher un certains nombre de pays
    const [selectedRadio, setSelectedRadio] = useState('');
    const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

    useEffect(() => {
        if(playOnce){
            axios.get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag'
            )
            .then((res) => {
                setData(res.data)
                setPlayOnce(false) // On demande de changer la valeur en false pour qu'une fois que la data a été cherchée, on n'exécute plus ce script
            });
        }
        
        // Tri des pays par le + peuplé au - peuplé
        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i])
            const sortedArray = countryObj.sort((a,b) => {
                return b.population - a.population;
            });
            sortedArray.length = rangeValue; // On récupère la valeur pour afficher le nombre de pays. 
            setSortedData(sortedArray);
        }
        sortedCountry();
        }, [data, rangeValue, playOnce]); // On met dans les crochets pour signaler qu'à chaque fois que data ou rangeValue est modifié, on rejoue le useEffect grâce au callback
    return (
        <div className="countries">
            <div className="sort-container">
                {/* onChange permet de récupère l'event */}
                <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input type="radio" name="" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e) => setSelectedRadio(e.target.value)} />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={() => setSelectedRadio('')}>Annuler la recherche</h5> } {/* // Si selectedRadio est sur true, alors tu affiches le h5 */}
            </div>
            <ul className="countries-list">
                {/* On map la sortedData afin d'obtenir que les 30 premiers pays */}
                {sortedData
                .filter((country) => country.region.includes(selectedRadio)) // On checker la région de chaque country et si elle inclut la valeur de selectedRadio alors tu lances le map
                .map((country) => (
                    <Card country={country} key={country.name}/> // On crée une props qui permet d'envoyer les données de country à la Card
                ))}
            </ul>
        </div>
    );
};

export default Countries;
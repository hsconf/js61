import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Country} from "../types.ts";

interface Props {
    alpha3Code: string | null;
}

const CountryDetails: React.FC<Props> = ({ alpha3Code }) => {
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {
        if (alpha3Code) {

            axios.get(`https://restcountries.com/v2/alpha/${alpha3Code}`)
                .then(response => {
                    const countryData = response.data;

                    if (countryData.borders && countryData.borders.length > 0) {
                        axios.get(`https://restcountries.com/v2/alpha?codes=${countryData.borders.join(',')}`)
                            .then(borderResponse => {
                                const borderNames = borderResponse.data.map((borderCountry: any) => borderCountry.name);
                                setCountry({ ...countryData, borderNames });
                            });
                    } else {
                        setCountry({ ...countryData, borderNames: [] });
                    }
                })
                .catch(error => console.error('Error fetching country details:', error));
        }
    }, [alpha3Code]);

    if (!alpha3Code) {
        return <div>Выберите страну</div>;
    }

    if (!country) {
        return <div>Загрузка данных...</div>;
    }

    console.log(country.name);

    return country && (
        <div>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={`Флаг ${country.name}`} style={{ width: '150px', height: 'auto' }} />
            <p><strong>Столица:</strong> {country.capital}</p>
            <p><strong>Население:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Валюта:</strong> {country.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
            <p><strong>Языки:</strong> {country.languages.map(language => `${language.name} (${language.nativeName})`).join(', ')}</p>
            <p><strong>Граничит с:</strong> {country.borderNames.length > 0 ? country.borderNames.join(', ') : 'Нет соседних стран'}</p>
        </div>
    );
};

export default CountryDetails;

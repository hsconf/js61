export interface iCountries {
    name: string;
    alpha3Code: string;
}

export interface Country {
    name: string;
    capital: string;
    population: number;
    borders: string[];
    borderNames: string[];
    flag: string;
    currencies: { name: string; symbol: string }[];
    languages: { name: string; nativeName: string }[];
}
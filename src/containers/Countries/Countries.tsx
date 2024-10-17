import ListGroup from "../../components/ListGroup/ListGroup.tsx";
import {useState} from "react";
import CountryDetails from "../../components/CountryDetails.tsx";

const Countries = () => {

    const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

    const handleCountrySelect = (alpha3Code: string) => {
        setSelectedCountryCode(alpha3Code);
    };

    return (
        <div className="container row">
            <div className="col-4">
                <ListGroup onCountrySelect={handleCountrySelect} />
            </div>
            <div className="col-8">
                <CountryDetails alpha3Code={selectedCountryCode} />
            </div>
        </div>
    );
};

export default Countries;
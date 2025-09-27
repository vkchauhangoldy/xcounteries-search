
import { useEffect, useState } from "react";
import "./Counteries.css";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        if (search.trim() !== "") {
            setFiltered(
                countries.filter((c) =>
                    c.common.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFiltered(countries);
        }
    }, [search, countries]);

    const getCountries = async () => {
        try {
            const response = await fetch(
                "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch countries");
            }
            const data = await response.json();
            setCountries(data);
            setFiltered(data); // show all countries initially
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="status">Loading countries...</p>;
    }

    return (
        <>
            <div style={{ padding: "20px" }}>
                <input
                    type="text" // 👈 required for tests
                    name="search"
                    placeholder="Search countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                />
            </div>

            <div className="container">
                {filtered.map((country) => (
                    <div className="countryCard" key={country.abbr}> {/* 👈 fixed */}
                        <img
                            className="img"
                            src={country.png}
                            alt={`${country.common} flag`}
                        />
                        <p className="text">{country.common}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Countries;

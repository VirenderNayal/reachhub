import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = "https://finnhub.io/api/v1/";
const API = "cn7fp1pr01qgjtj4j9ngcn7fp1pr01qgjtj4j9o0";

export default function Search() {
    const [query, setQuery] = useState();
    const [data, setData] = useState();
    const navigate = useNavigate()

    const handleSearch = async () => {
        await axios.get(URL + "search?q=" + query + "&token=" + API).then((res) => {
            setData(res.data);
        });

        setQuery("");
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center m-5'>

            <p className='h1'>Search Companies</p>

            <div className="input-group input-group-lg m-2">
                <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                <button type='submit' onClick={handleSearch} className='btn btn-primary'>Search</button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-3 m-3">

                {
                    data &&

                    data['result'].map((e) =>
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{e.type}</h5>
                                <p className="card-text">{e.description}</p>
                                <p className="card-text">{e.symbol}</p>
                            </div>
                            <button className='btn btn-primary m-2' onClick={() => navigate(`/company/${e.symbol}`, {state:{id:e.symbol}})} >View</button>
                            {/* <Link className='btn btn-primary m-2' to={`/company/${e.symbol}`}>View</Link> */}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

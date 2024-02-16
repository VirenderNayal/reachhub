import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const URL = "https://finnhub.io/api/v1/";
const API = "cn7fp1pr01qgjtj4j9ngcn7fp1pr01qgjtj4j9o0";

export default function Company({ route, navigate }) {
    const location = useLocation();
    const [symbol, setSymbol] = useState();
    const [details, setDetails] = useState();
    const [news, setNews] = useState();

    const getData = async () => {
        await axios.get(URL + "/stock/profile2?symbol=" + "AAPL" + "&token=" + API).then((res) => {
            setDetails(res.data);
            console.log(res.data);
        })

        await axios.get(URL + "company-news?symbol=" + "AAPL" + "&from=2024-01-01&to=2024-02-15&token=" + API).then((res) => {
            setNews(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        setSymbol(location.state.id);

        getData();
    }, [])


    return (
        <div className='d-flex justify-content-center align-items-center flex-column m-5'>
            {
                details &&
                <div className="card" style={{ width: "" }}>
                    <img width={""} src={details.logo} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{details.name}</h5>
                        <p className='card-text'>Country : {details.country}</p>
                        <p className='card-text'>Country : {details.currency}</p>
                        <p className='card-text'>Finhub Industry : {details.finnhubIndustry}</p>
                        <p className='card-text'>Website : {details.weburl}</p>
                    </div>
                </div>
            }

            <div className='d-flex flex-column'>
                <h2>Company News</h2>
                {news &&
                    news.map((e) =>
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">{e.headline}</h5>
                                <p class="card-text">{e.summary}</p>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

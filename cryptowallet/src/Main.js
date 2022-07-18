import Footer from "./Footer";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import Coin from "./Coin";

function Main(){
    const [coinData, setCoinData] = useState([])
    const getData = async () => {
        try{
            const response = await fetch('http://localhost:8080/getCoins', {mode : 'cors'});
            const data  = await response.json();
            setCoinData(data.data);
        }catch(e){
            console.log(e);
        }
    }   

    useEffect(() => {
        getData();
    }, [])

    return(
        <div>
            <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation light w-nav">
                <div className="navbar-container">
                <a href="#" className="brand w-nav-brand">
                <img src="images/cointego-logo.png" loading="lazy" srcSet="images/cointego-logo-p-500.png 500w, images/cointego-logo-p-800.png 800w, images/cointego-logo-p-1080.png 1080w, images/cointego-logo-p-1600.png 1600w, images/cointego-logo.png 1645w" width="822.5" sizes="(max-width: 479px) 140px, (max-width: 767px) 170px, 190px" alt="" className="logo-icon" />
                </a>
                <nav role="navigation" className="nav-menu w-nav-menu">
                    <Link to="/main" className="head-nav-button w-button">Dashboard</Link>
                    <Link to="/exchange" className="head-nav-button-inverted w-button">Exchange</Link>
                    <Link to="/deposit" className="head-nav-button-inverted w-button">Deposit</Link>
                    <Link to="/profile" className="head-nav-button-inverted w-button">Profile</Link>
                    <Link to="/" className="head-nav-button-inverted w-button">Sign Out</Link>
                </nav>
                <div className="menu-button w-nav-button">
                    <div className="burger-icon">
                    <div className="top-burger-line"></div>
                    <div className="middle-burger-line"></div>
                    <div className="bottom-burger-line"></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="fontAdd">
                <div className="container-7a">
                    <table className="table table-sm">
                    <thead className="bg-light">
                        <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h%</th>
                        <th>7d%</th>
                        <th>Market Cap</th>
                        <th>Volume(24h)</th>
                        <th>Circulating Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coinData.slice(0, 30).map((coin, index) => {
                            return <Coin name={coin.name} symbol={coin.symbol} id={coin.id} price={coin.quote.USD.price} index={index} percent_change_24h={coin.quote.USD.percent_change_24h} percent_change_7d={coin.quote.USD.percent_change_7d} market_cap={coin.quote.USD.market_cap} volume_24h={coin.quote.USD.volume_24h} circulating_supply={coin.circulating_supply}/>
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
          <Footer />
        </div>
        )
}

export default Main;
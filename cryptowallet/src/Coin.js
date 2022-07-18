function Coin(props){
    return(
        <tr>
            <td>{props.index + 1}</td>
             <td>
                <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/" + props.id +".png" } style={{width:'25px'}} alt=""/>
                <span> {props.name}</span>
                <span> {props.symbol}</span>
            </td>
            <td>
                <span>${props.price}</span>
            </td>
            <td>
                <span>{props.percent_change_24h}%</span>
            </td>
            <td>
                <span>{props.percent_change_7d}%</span>
            </td>
            <td>
                <span>${props.market_cap}</span>
            </td>
            <td>
                <span>${props.volume_24h}</span>
            </td>
            <td>
                <span>${props.circulating_supply}</span>
            </td>
        </tr>
    )
}

export default Coin;
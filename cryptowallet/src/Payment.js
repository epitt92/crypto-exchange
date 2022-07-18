function Payment(props){
    return(
        <tr>
            <td>{props.index + 1}</td>
             <td>{props.txid}</td>
             <td>{props.coin}</td>
             <td>{props.amount}</td>
             <td>{props.address}</td>
             <td>{props.ip}</td>
             <td>{props.status}</td>
        </tr>
    )
}

export default Payment;
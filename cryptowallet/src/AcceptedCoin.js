import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function AcceptedCoin(props){
	return(
		<div>
		{props.check ? null : (
		 <ListItemButton onClick={() => props.getInfo(props.name)}>
			<ListItemIcon>
				<img src={props.img} style={{width:'30px'}} alt=""/>
			</ListItemIcon>
 			<ListItemText primary={props.displayName} />
     	</ListItemButton>
		)}
		</div>
	)
}
export default AcceptedCoin;
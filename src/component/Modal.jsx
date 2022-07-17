/* eslint-disable no-unused-vars */
import { Paper, Typography, Dialog } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { Context, CurrencyContext } from './../Context';
import moment from 'moment';

function GamesModal() {
	const [context, setContext] = useContext(Context);
	const [currencies, setCurrencies] = useContext(CurrencyContext);
	const { title, imageUrl, description, store, publishers, releaseDate } =
		context.data;

	let allStore = [];
	if (store) {
		for (const key in store) {
			allStore.push({
				country: key,
				price: store[key].price,
				currency: store[key].currency
			});
		}
	}

	return (
		<Dialog
			maxWidth="md"
			open={context.open}
			onClose={() => setContext({ open: false, data: {} })}
			aria-labelledby="responsive-dialog-title">
			<Paper sx={{ maxWidth: 345 }}>
				<img
					src={imageUrl}
					alt={title}
					style={{ height: 200, width: '100%' }}
				/>

				<Typography variant="body1" component="div" sx={{ mb: 2 }}>
					{title}
				</Typography>
				<div>
					<Typography variant="body2" sx={{ mb: 2 }}>
						Publishers : {publishers}
					</Typography>
					<Typography variant="body2" sx={{ mb: 2 }}>
						Date: {moment(releaseDate).format('YYYY-MM-DD')}
					</Typography>
				</div>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					{description}
				</Typography>
				<List
					sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					aria-label="contacts">
					{allStore &&
						allStore.map((item) => {
							return (
								<>
									{item.price ? (
										<ListItem
											key={item.country}
											disablePadding
											secondaryAction={
												<>
													<ListItemText
														primary={`${item?.price.toFixed(2)} ${currencies}`}
													/>
												</>
											}>
											<ListItemIcon sx={{ ml: 1 }}>{item.country}</ListItemIcon>
										</ListItem>
									) : (
										<></>
									)}
								</>
							);
						})}
				</List>
			</Paper>
		</Dialog>
	);
}
export default GamesModal;

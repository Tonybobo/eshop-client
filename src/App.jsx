import './App.css';
import Container from '@mui/material/Container';
import Header from './component/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import Pagination from '@mui/material/Pagination';
import { Context, CurrencyContext } from './Context';
import { useState, useEffect, useContext } from 'react';
import GamesModal from './component/Modal';
import {
	Paper,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	Divider,
	ListItemIcon
} from '@mui/material';
import axios from './axios';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	const [context, setContext] = useState({ open: false, data: '' });
	const [currencies, setCurrencies] = useState('SGD');
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(1);

	const handlePaginationChange = async (event, value) => {
		setPage(value);
		const games = await axios.get(`?page=${value}`);
		setData(games.data.results);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};
	const handleGameInfo = async (gameTitle) => {
		const result = await axios.get(
			`/${gameTitle.replace(/ /g, '%20')}?currency=${currencies}`
		);

		setContext({ open: true, data: result.data });
	};
	useEffect(() => {
		async function listGames() {
			const games = await axios.get('');
			setData(games.data.results);
			setCount(games.data.count);
		}
		listGames();
	}, []);
	return (
		<ThemeProvider theme={darkTheme}>
			<Context.Provider value={[context, setContext]}>
				<CurrencyContext.Provider value={[currencies, setCurrencies]}>
					<div className="App">
						<Container maxWidth="md">
							<Header />
							{/* main */}
							<GamesModal />
							<Paper
								style={{
									'background-color': 'rgba(0,0,0,0.5)',
									/** Smooth transition from a greyish to a less greyish color **/
									'background-image':
										'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
									/* A blur effect behind the card */
									'backdrop-filter': 'blur(10px)'
								}}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									mt: 1
								}}>
								<List
									sx={{
										width: '100%',
										position: 'relative',
										overflow: 'auto',
										maxHeight: 460,
										mt: 2
									}}>
									{data?.map((game) => {
										return (
											<>
												<ListItem
													key={game.title}
													onClick={() => handleGameInfo(game.title)}>
													<ListItemIcon>
														<ListItemAvatar>
															<Avatar
																variant="square"
																alt={game.title}
																src={game.imageUrl}
																sx={{ width: 60, height: 60, mr: 2 }}>
																<BrokenImageIcon />
															</Avatar>
														</ListItemAvatar>
													</ListItemIcon>
													<div>
														<ListItemText primary={game.title} />
														<Typography
															sx={{
																overflow: 'hidden',
																textOverflow: 'ellipsis',
																display: '-webkit-box',
																WebkitLineClamp: '2',
																WebkitBoxOrient: 'vertical'
															}}>
															{game.description}
														</Typography>
													</div>
												</ListItem>
												<Divider variant="inset" component="li" />
											</>
										);
									})}
								</List>
								<Pagination
									sx={{ mx: 'auto' }}
									count={count}
									page={page}
									onChange={handlePaginationChange}
								/>
							</Paper>
						</Container>
					</div>
				</CurrencyContext.Provider>
			</Context.Provider>
		</ThemeProvider>
	);
}

export default App;

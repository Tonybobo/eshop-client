import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './icon.png';
import { Autocomplete, TextField } from '@mui/material';
import axios from '../axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFlag from 'react-currency-flags';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export default function Header() {
	const [value, setValue] = useState('');
	const [searchOption, setSearchOption] = useState([]);
	const [countries, setCountries] = useState([]);
	const [currency, setCurrency] = useState('');

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};

	useEffect(() => {
		async function allCurrency() {
			const allCurrency = await axios.get('/currency/all');
			setCountries(allCurrency.data);
		}
		allCurrency();
	});

	const styles = {
		appBar: {
			boxShadow: 0,
			bgcolor: 'transparent',
			backgroundImage:
				'linear-gradient(rgba(255, 255, 255,0), rgba(255, 255, 255, 0))'
		},
		autocompleteImage: {
			width: '10px',
			height: '10px'
		},
		select: {
			overflowY: 'scroll',
			'&::-webkit-scrollbar': {
				width: 0
			},
			height: 40,
			width: 60,
			overflow: 'hidden'
		}
	};

	const handleSearchOption = async (searchKeyword) => {
		setValue(searchKeyword);
		const result = await axios.get(`searchGames/?search=${searchKeyword}`);
		const { results } = result.data;
		setSearchOption(results);
	};

	return (
		<Box sx={{ flexGrow: 1, zIndex: 2 }}>
			<AppBar position="static" sx={styles.appBar}>
				<Toolbar>
					<img
						src={logo}
						style={{
							width: '30px',
							height: '30px',
							marginLeft: '10px'
						}}
						alt="logo"
					/>
					<Autocomplete
						value={value}
						onChange={(event, newValue) => console.log(event, newValue)}
						onInputChange={(event) => {
							handleSearchOption(event.target.value);
						}}
						selectOnFocus
						clearOnBlur
						handleHomeEndKeys
						id="free-solo-with-text-demo"
						options={searchOption}
						getOptionLabel={(option) => {
							// Value selected with enter, right from the input
							if (typeof option === 'string') {
								return option;
							}
							// Add "xxx" option created dynamically
							if (option.inputValue) {
								return option.inputValue;
							}
							// Regular option
							return option.title;
						}}
						renderOption={(props, option) => (
							<li {...props}>
								{option.imageUrl ? (
									<img
										src={option.imageUrl}
										style={{
											width: '30px',
											height: '30px',
											marginRight: '10px'
										}}
										alt={option.title}
									/>
								) : null}
								{option.title}
							</li>
						)}
						sx={{ width: 500, marginX: 2, padding: 1 }}
						freeSolo
						renderInput={(params) => (
							<TextField
								{...params}
								fullWidth
								InputLabelProps={{ style: { color: 'white' } }}
								sx={{ paddingY: 0, paddingX: 0, input: { color: 'white' } }}
								label="Search Nintendo Games"
								size="small"
							/>
						)}
					/>

					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Countries"
						value={currency}
						onChange={handleChange}
						sx={styles.select}>
						{countries.map((country) => (
							<MenuItem key={country.id} value={country.id}>
								<CurrencyFlag currency={country.id} width={20} />
							</MenuItem>
						))}
					</Select>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

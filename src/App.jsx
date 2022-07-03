import './App.css';
import Container from '@mui/material/Container';
import Header from './component/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Context } from './Context';
import { useState } from 'react';
import GamesModal from './component/Modal';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	const [context, setContext] = useState({ open: false, data: '' });
	return (
		<ThemeProvider theme={darkTheme}>
			<Context.Provider value={[context, setContext]}>
				<div className="App">
					<Container maxWidth="md">
						<Header />
						{/* main */}
						<GamesModal />
					</Container>
				</div>
			</Context.Provider>
		</ThemeProvider>
	);
}

export default App;

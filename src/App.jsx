import './App.css';
import Container from '@mui/material/Container';
import Header from './component/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<Container maxWidth="md">
					<Header />
					{/* main */}
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;

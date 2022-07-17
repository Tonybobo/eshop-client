import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://boiling-bayou-89829.herokuapp.com/api/games'
});

export default instance;

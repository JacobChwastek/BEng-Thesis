import axios from 'axios';

export const api = axios.create({
	baseURL: `/api`,
});

api.interceptors.response.use(
	(response: any) => response,
	(error: any) => {
		if (error.response) {

		}
		return Promise.reject(error);
	}
);

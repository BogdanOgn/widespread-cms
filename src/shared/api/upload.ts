import { httpClient } from './httpClient';

export const uploadFile = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	return httpClient
		.post<{ url: string }>('/upload/', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		.then(r => r.data);
};

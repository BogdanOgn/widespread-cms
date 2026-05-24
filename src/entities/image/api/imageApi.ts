import { httpClient } from '@/shared/api';

import type { IImage, IImageCreate } from '../model/types';

export const createImage = (data: IImageCreate) =>
	httpClient.post<IImage>('/images/create_image', data).then(r => r.data);

export const deleteImage = (imageId: number) =>
	httpClient.delete(`/images/delete_image/${imageId}`);

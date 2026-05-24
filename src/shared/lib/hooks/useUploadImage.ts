import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '@/shared/api';

export const useUploadImage = () => useMutation({ mutationFn: uploadFile });

import {baseAPI} from 'infrastructure/persistance/api'

// interface UploadFilesRequest {
//  	files: FormData
// }

export const api = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		uploadDicom: builder.mutation<void, any>({
			query: (body) => ({
				url: 'dicom/upload-dicom',
				method: 'POST',
				body: body
			})
		})
	})
})

export const { useUploadDicomMutation } = api;

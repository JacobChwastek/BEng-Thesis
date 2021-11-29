import {baseAPI} from 'infrastructure/persistance/api'

export const api = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		uploadDicom: builder.mutation<void, any>({
			query: (body) => ({
				url: 'dicom/upload-dicom',
				method: 'POST',
				body: body
			})
		}),
		removeDicom: builder.mutation<void, { id: string }> ({
			query: (params) => ({
				url: 'dicom',
				method: 'DELETE',
				params: {
					id: params.id
				}
			})
		})
	})
})

export const { useUploadDicomMutation, useRemoveDicomMutation } = api;

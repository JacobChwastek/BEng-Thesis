import { baseAPI } from "infrastructure/persistance/api";


interface IUploadDocumentationImagesRequest {
	dicomId: string,
	drawLayerImgBase64: string,
	viewLayerImageBase64: string
}

export const api = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		uploadDicom: builder.mutation<void, any>({
			query: (body) => ({
				url: "dicom/upload-dicom",
				method: "POST",
				body: body
			})
		}),
		removeDicom: builder.mutation<void, { id: string }>({
			query: (params) => ({
				url: "dicom",
				method: "DELETE",
				params: {
					id: params.id
				}
			})
		}),
		uploadDocumentationImages: builder.mutation<{ id: string, documentationId?: string }, IUploadDocumentationImagesRequest>({
			query: (body) => ({
				url: "documentation/upload-documentation-images",
				method: "POST",
				body
			})
		}),
	})
});

export const { useUploadDicomMutation, useRemoveDicomMutation, useUploadDocumentationImagesMutation } = api;

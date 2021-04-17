import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
	name: "IMAGE_CLASSIFICATION_SLICE",
	initialState: {
		uploading: false,
		uploaded: false,
		error: false,
		message: "",
		result: [],
	},
	reducers: {
		setUploading: (state, action) => {
			state.uploading = action.payload;
		},
		setUploaded: (state, action) => {
			state.uploaded = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setResult: (state, action) => {
			state.result = action.payload;
		},
	},
});

export const {
	setUploading,
	setUploaded,
	setError,
	setMessage,
	setResult,
} = Slice.actions;
export default Slice.reducer;

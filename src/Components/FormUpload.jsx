import React from "react";
import { CloudUploadOutlined } from "@material-ui/icons";
import {
	Button,
	makeStyles,
	Grid,
	Typography,
	CssBaseline,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
	setUploading,
	setError,
	setMessage,
	setUploaded,
	setResult,
} from "../Redux/Slice";

import axios from "axios";

const Styles = makeStyles({
	containerImage: {
		height: 350,
		backgroundColor: "white",
		borderRadius: 6,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	selectFile: {
		marginTop: 20,
		width: 180,
		height: 40,
		backgroundColor: "#4ad4c5",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#1cbdac",
		},
	},

	title: {
		fontSize: 23,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default function FormUpload() {
	const styles = Styles();

	const dispatch = useDispatch();
	const isError = useSelector((state) => state.imageRedux.error);
	const errMessage = useSelector((state) => state.imageRedux.message);

	const uploadFile = async (file) => {
		const formData = new FormData();
		formData.append("image", file);

		axios
			.post("http://127.0.0.1:2020/knn", formData, {
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			})
			.then((response) => {
				const { status } = response.data;
				if (status === "error") {
					dispatch(setError(true));
					dispatch(setMessage(response.data.message));
					dispatch(setUploading(false));
				} else {
					dispatch(setResult(response.data));
					dispatch(setUploaded(true));
				}
			});
	};

	return (
		<>
			<CssBaseline />
			<Grid container xs={12} sm={7} className={styles.containerImage}>
				<img
					src='/images/tea.png'
					width='80'
					height='80'
					alt='Artificial Intelligent'
				/>
				<Typography className={styles.title}>
					Drinks Detection (Tensorflow.js)
				</Typography>

				<Typography style={{ fontSize: 17, textAlign: "center" }}>
					Teh Manis, Jus Jeruk, Jus Alpukat
				</Typography>

				<input
					name='image'
					accept='image/*'
					style={{ display: "none" }}
					id='raised-button-file'
					type='file'
					onChange={(e) => {
						uploadFile(e.target.files[0]);
						dispatch(setUploading(true));
					}}
				/>
				<label htmlFor='raised-button-file'>
					<Button
						variant='raised'
						component='span'
						className={styles.selectFile}>
						<CloudUploadOutlined
							style={{
								width: 20,
								marginTop: -3,
								marginRight: 5,
							}}
						/>
						Select Image
					</Button>
				</label>

				<Typography
					style={{
						color: "red",
						marginTop: 20,
						textAlign: "center",
					}}>
					{isError ? errMessage : ""}
				</Typography>
			</Grid>
		</>
	);
}

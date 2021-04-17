import React from "react";
import {
	Grid,
	Typography,
	makeStyles,
	Divider,
	CssBaseline,
	Button,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import { setUploaded, setUploading } from "../Redux/Slice";

const Styles = makeStyles({
	containerImage: {
		height: "auto",
		backgroundColor: "white",
		borderRadius: 6,
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},

	title: {
		fontSize: 25,
		fontWeight: 100,
		textAlign: "center",
	},

	tryAgain: {
		marginTop: 10,
		backgroundColor: "#ffa400",
		color: "#fff",
		width: 150,
		height: 40,
		fontSize: 17,
		"&:hover": {
			backgroundColor: "#d68e0c",
		},
	},
});

export default function Result() {
	const styles = Styles();

	const dispatch = useDispatch();

	const results = useSelector((state) => state.imageRedux.result);
	const { imageUrl, data } = results;

	const sortResults = data.slice().sort((a, b) => {
		return a.confidence > b.confidence ? -1 : 1;
	});

	const [mainResult] = sortResults;

	const dataFilter = sortResults.filter((result) => {
		return result.label !== mainResult.label && result.confidence !== 0;
	});

	const otherPrediction = () => {
		if (dataFilter.length > 0) {
			return (
				<>
					<Typography style={{ marginTop: 10, fontSize: 20 }}>
						Other Predictions
					</Typography>

					{dataFilter.map((data) => (
						<Typography style={{ fontSize: 19 }}>
							{data.label} : {Math.floor(data.confidence * 100)}%
						</Typography>
					))}
				</>
			);
		}
	};

	return (
		<>
			<CssBaseline />
			<Grid container xs={12} sm={7} className={styles.containerImage}>
				<img
					src={imageUrl}
					style={{ width: 300, marginTop: 20 }}
					alt={mainResult.label}
				/>
				<Typography className={styles.title}>
					I think it's <b>{mainResult.label}</b> with{" "}
					<b>{Math.floor(mainResult.confidence * 100)}%</b> sure
				</Typography>

				{otherPrediction()}

				<Button
					className={styles.tryAgain}
					onClick={() => {
						dispatch(setUploaded(false));
						dispatch(setUploading(false));
					}}>
					Try Another Image
				</Button>
				<Divider style={{ marginBottom: 20 }} />
			</Grid>
		</>
	);
}

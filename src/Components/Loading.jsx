import React from "react";

import {
	CircularProgress,
	Typography,
	Grid,
	makeStyles,
} from "@material-ui/core";
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
});
export default function Loading() {
	const styles = Styles();
	return (
		<>
			<Grid container xs={12} sm={7} className={styles.containerImage}>
				<CircularProgress style={{ marginBottom: 10 }} />
				<Typography style={{ fontSize: 18 }}>Analyzing...</Typography>
			</Grid>
		</>
	);
}

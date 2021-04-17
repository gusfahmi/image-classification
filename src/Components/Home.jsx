import React from "react";
import { makeStyles } from "@material-ui/core";

import { useSelector } from "react-redux";

import FormUpload from "./FormUpload";
import Loading from "./Loading";
import Result from "./Result";

const Styles = makeStyles({
	container: {
		display: "flex",
		flex: 1,
		height: "100vh",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#000",
	},
});

export default function Home() {
	const styles = Styles();

	const uploading = useSelector((state) => state.imageRedux.uploading);
	const uploaded = useSelector((state) => state.imageRedux.uploaded);

	const renderHome = () => {
		if (!uploaded) {
			return (
				<div className={styles.container}>
					{uploading ? <Loading /> : <FormUpload />}
				</div>
			);
		} else {
			return (
				<div className={styles.container}>
					<Result />
				</div>
			);
		}
	};

	return renderHome();
}

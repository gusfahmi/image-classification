import "./App.css";
import React from "react";

import Home from "./Components/Home";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Economica",
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Home />
		</ThemeProvider>
	);
}

export default App;

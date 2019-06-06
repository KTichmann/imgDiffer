import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Comparison from "./Comparison";
import Url from "./Url";

import "../styles/App.css";

const App = () => (
	<div className='App'>
		<div className='App-header'>
			<nav
				style={{
					display: "flex",
					width: "40%",
					position: "absolute",
					justifyContent: "space-around",
					left: "0px",
					top: "0px",
					padding: "10px 15px"
				}}>
				<Link
					style={{
						color: "white",
						textDecoration: "none",
						fontSize: "1.3rem"
					}}
					to='/'>
					Compare From Files
				</Link>
				<div style={{ marginTop: "-10px" }}>|</div>
				<Link
					style={{ color: "white", textDecoration: "none", fontSize: "1.3rem" }}
					to='/url'>
					Compare From Urls
				</Link>
			</nav>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/comparison' component={Comparison} />
				<Route path='/url' component={Url} />
			</Switch>
		</div>
	</div>
);

export default App;

import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Comparison from "./Comparison";
import Url from "./Url";

import "../styles/App.css";

const App = () => (
	<div className='App'>
		<div className='App-header'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/comparison' component={Comparison} />
				<Route path='/url' component={Url} />
			</Switch>
		</div>
	</div>
);

export default App;

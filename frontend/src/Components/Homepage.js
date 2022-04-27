import React from 'react';
// import './App.css';
import App2 from './App2'
import codeCompiler from '../codeCompiler'
// import Navbar from './MainNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Quize from './Quize'
import Module3 from './Module3'
import Module4 from './module4'
import MainHomePage from './MainHomePage'
import Admin from './Admin'
import Result from '../Components/Result/Result'
import CodeAdmin from '../Components/Admin/CodeAdmin'

function Homepage() {
return (
	<Router>
	
	<Switch>
		<Route path='/' exact component={MainHomePage} />
		<Route path='/codepractice' exact component={codeCompiler} />
		<Route path='/aptitude' component={Quize} />
		<Route path='/Module3' component={Module3} />
		<Route path='/Module4' component={Module4} />
		<Route path='/Admin' component={Admin} />
    	<Route path='/home' component={App2} />
		<Route path='/Result' component={Result} />
		<Route path='/CodeAdmin' component={CodeAdmin} />
		
	</Switch>
	</Router>
);
}

export default Homepage;

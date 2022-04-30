import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Aptitude from '../pages/AptiResult'
import GDResult from '../pages/GDResult'
import TechnicalResult from '../pages/TechnicalResult'
import codeChallangeResult from '../pages/CodeChallangeResult'
import addCodeQuestions from '../pages/AddCodeQuestions'

const Routes = () => {
    return (
        <Switch>
            <Route path='/admindashboard' exact component={Dashboard}/>
            <Route path='/customers' exact component={Customers}/>
            <Route path='/aptitude' exact component={Aptitude}/>
            <Route path='/technical' exact component={TechnicalResult}/>
            <Route path='/gd' exact component={GDResult}/>
            <Route path='/codechallange' exact component={codeChallangeResult}/> 
            <Route path='/addCodeQuestions' exact component={addCodeQuestions}/> 
        </Switch>
    )
}

export default Routes

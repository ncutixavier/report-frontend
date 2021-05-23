import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../components/Login'
import Report from '../components/Report'

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/reports" component={Report} />
            </BrowserRouter>
        )
    }
}

export default Index
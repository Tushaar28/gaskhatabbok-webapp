import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import AdminHomeComponent from './components/Admin/Home';
import AgencyHomeComponent from './components/Agency/Home';
import LoginComponent from './components/shared/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact render={() => <Redirect to="/login" />} />
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/agency/home" exact component={AgencyHomeComponent} />
            <Route path="/admin/home" exact component={AdminHomeComponent} />
        </BrowserRouter>
    );
};

export default App;
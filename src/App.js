import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import AddAgencyComponent from './components/Admin/AddAgency';
import AdminHomeComponent from './components/Admin/Home';
import ViewCustomersAdminComponent from './components/Admin/ViewCustomers';
import ViewDeliveriesAdminComponent from './components/Admin/ViewDeliveries';
import ViewWorkersAdminComponent from './components/Admin/ViewWorkers';
import AddWorkerComponent from './components/Agency/AddWorker';
import EditCustomerComponent from './components/Agency/EditCustomer';
import AgencyHomeComponent from './components/Agency/Home';
import ViewCustomersComponent from './components/Agency/ViewCustomers';
import ViewDeliveriesComponent from './components/Agency/ViewDeliveries';
import ViewWorkersComponent from './components/Agency/ViewWorkers';
import LoginComponent from './components/shared/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact render={() => <Redirect to="/login" />} />
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/agency/home" exact component={AgencyHomeComponent} />
            <Route path="/agency/home/worker/new" exact component={AddWorkerComponent} />
            <Route path="/agency/home/view/workers" exact component={ViewWorkersComponent} />
            <Route path="/agency/home/view/customers" exact component={ViewCustomersComponent} />
            <Route path="/agency/home/customer/edit" exact component={EditCustomerComponent} />
            <Route path="/agency/home/view/deliveries" exact component={ViewDeliveriesComponent} />
            <Route path="/admin/home" exact component={AdminHomeComponent} />
            <Route path="/admin/home/agency/new" exact component={AddAgencyComponent} />
            <Route path="/admin/home/view/customers" exact component={ViewCustomersAdminComponent} />
            <Route path="/admin/home/view/deliveries" exact component={ViewDeliveriesAdminComponent} />
            <Route path="/admin/home/view/workers" exact component={ViewWorkersAdminComponent} />
        </BrowserRouter>
    );
};

export default App;
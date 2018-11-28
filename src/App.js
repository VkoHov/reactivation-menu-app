import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import EditAdmin from './components/EditAdmi/EditAdmin';
import EditManu from './components/Editmanu/EditManu';
import TableInfo from './components/AdminHomePage/Tablelist/TableInfo/TableInfo';
import Listing from './components/Listing/Listing';
import AddNewDish from './components/AddNewDish/AddNewDish';
import ShoppingCart from './components/Layout/Navbar/ShopingCart/ShoppingCart';
import './App.css';

import DishDetails from './components/DishDetails/DishDetails';
import Registration from "./components/Registration/Registration";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route path='/login' component={Login} />
                        <Route path='/registration' component={Registration}/>
                        <Route exact path='/admin' component={AdminHomePage} />
                        <Route path='/admin/editadmin' component={EditAdmin} />
                        <Route path='/admin/editmanu' component={EditManu} />
                        <Route path='/admin/table/:tableId' component={TableInfo} />
                        <Route path='/listing'  component={Listing} />
                        <Route path='/newDish' component={AddNewDish}/>
                        <Route path='/shoppingcart' component = {ShoppingCart}/>
                        <Route path='/dish' component={DishDetails} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;
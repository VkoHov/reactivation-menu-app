import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import EditAdmin from './components/EditAdmi/EditAdmin';
import EditManu from './components/Editmanu/EditManu';
import TableInfo from './components/AdminHomePage/Tablelist/TableInfo/TableInfo';
import CategoryList from './components/CategoryList/Category/CategoryList';
import AddNewDish from './components/AddNewDish/AddNewDish';

import './App.css';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route path='/login' component={Login} />
                        <Route exact path='/admin' component={AdminHomePage} />
                        <Route path='/admin/editadmin' component={EditAdmin} />
                        <Route path='/admin/editmanu' component={EditManu} />
                        <Route path='/admin/table/:tableId' component={TableInfo} />
                        <Route path='/listing'  component={CategoryList} />
                        <Route path='/newDish' component={AddNewDish}/>
}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;

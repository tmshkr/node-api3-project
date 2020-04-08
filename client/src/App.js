import React, { useEffect, useState } from "react";
import axios from "./utils/axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.scss";

import Users from "./components/Users";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    return axios
      .get("/api/users")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.dir(err));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route
            exact
            path="/users"
            render={(props) => (
              <Users {...props} users={users} getUsers={getUsers} />
            )}
          />
          <Route
            exact
            path="/users/add"
            render={(props) => (
              <UserForm {...props} users={users} getUsers={getUsers} />
            )}
          />
          <Route
            exact
            path="/users/edit/:id"
            render={(props) => (
              <UserForm {...props} users={users} getUsers={getUsers} />
            )}
          />
          <Redirect to="/users" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Librarian from "./components/Librarian";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/librarian">
        <Librarian />
      </Route>
    </Switch>
  );
}

export default App;

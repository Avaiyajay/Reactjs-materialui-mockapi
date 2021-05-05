import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Showtable from "./components/Showtable";
import Tabledata from "./components/Tabledata";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
        </Route>
        <Route path="/table">
          <Showtable />
        </Route>
        <Route path="/tabledata">
          <Tabledata />
        </Route>
        <Route path="/form">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

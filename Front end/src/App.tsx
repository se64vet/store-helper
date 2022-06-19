import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch , Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import AllItems from "./pages/AllItems/AllItems";
import Sale from "./pages/Sale/Sale";

function App() {
  return (
    <>
      
      <Router>
        <Switch>

          <Route exact path={'/'}>
            <Auth />
          </Route>

          <Route path={'/Dash Board'}>
            <div className="desktop_layout">
            <Sidebar />
            <Dashboard />
            </div>
          </Route>

          <Route path={'/All Items'}>
            <div className="desktop_layout">
            <Sidebar />
            <AllItems />
            </div>
          </Route>

          <Route path={'/Monthly Sale'}>
            <div className="desktop_layout">
            <Sidebar />
            <Sale />
            </div>
          </Route>

          <Route>
            <PageNotFound />
          </Route>

        </Switch>
      </Router>
      
    </>
  );
}

export default App;

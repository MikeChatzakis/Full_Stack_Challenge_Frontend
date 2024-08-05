import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import views
import Home from './views/home'
import Skill from './views/skill';
import Skills_list from './views/skills_list';
import Add_skill from './views/add_skill';
//import partials
import Navbar from './views/partials/navbar';





function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/skills_list">
          <Skills_list/>
        </Route>

        <Route exact path="/add-skill">
          <Add_skill/>
        </Route>

        <Route exact path="/skill/:id">
          <Skill/>
        </Route>
        
        {/* default route */}
        <Route path="*">
          <Home/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;

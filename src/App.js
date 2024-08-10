import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//general views import
import Home from './views/home'
//import skill views
import Skill from './views/skill_views/skill';
import Skills_list from './views/skill_views/skills_list';
import Add_skill from './views/skill_views/add_skill';
//import employee views
import Add_employee from './views/employee_views/add_employee';
import Employees_list from './views/employee_views/emloyees_list';
import Employee from './views/employee_views/employee';
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

        <Route exact path="/add-skill">
          <Add_skill/>
        </Route>

        <Route exact path="/skills_list">
          <Skills_list/>
        </Route>

        <Route exact path="/skill/:id">
          <Skill/>
        </Route>

        <Route exact path="/add-employee">
          <Add_employee/>
        </Route>

        <Route exact path="/employee_list">
          <Employees_list/>
        </Route>

        <Route exact path="/employee/:id">
          <Employee/>
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

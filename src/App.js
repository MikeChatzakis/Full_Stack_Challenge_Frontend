import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//general views import
import Home from './views/home'
//import skill views
import Skill from './views/skill_views/skill';
import SkillsList from './views/skill_views/skills_list';
import AddSkill from './views/skill_views/add_skill';
//import employee views
import AddEmployee from './views/employee_views/add_employee';
import EmployeesList from './views/employee_views/emloyees_list';
import Employee from './views/employee_views/employee';
//import partials
import Navbar from './views/partials/navbar';
//import other
import Downloads from './views/other/downloads';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/"> <Home/> </Route>

        <Route exact path="/add-skill"> <AddSkill /> </Route>

        <Route exact path="/skills_list"> <SkillsList/> </Route>

        <Route exact path="/skill/:id"> <Skill/> </Route>

        <Route exact path="/add-employee"> <AddEmployee/> </Route>

        <Route exact path="/employee_list"> <EmployeesList/> </Route>

        <Route exact path="/employee/:id"> <Employee/> </Route>

        <Route exact path="/downloads"> <Downloads/> </Route>

        {/* Default Path */}
        <Route path="*"> <Home/> </Route>
      </Switch>
    </Router>
  );
}

export default App;

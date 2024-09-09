import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
//general views import
import Home from './views/home'
//import skill components
import Skill from './views/skill_views/skill';
import SkillsList from './views/skill_views/skills_list';
import AddSkill from './views/skill_views/add_skill';
//import employee components
import AddEmployee from './views/employee_views/add_employee';
import EmployeesList from './views/employee_views/emloyees_list';
import Employee from './views/employee_views/employee';
//import partial components
import Navbar from './views/partials/navbar';
//import other components
import Downloads from './views/other/downloads';
import Login from './views/other/login';
//import helper routing functions
import ProtectedRoute from './custom/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path ="/login" component={Login} />

        <ProtectedRoute exact path="/add-skill" component={AddSkill} />

        <ProtectedRoute exact path="/skills_list" component={SkillsList} />

        <ProtectedRoute exact path="/skill/:id" component={Skill} />

        <ProtectedRoute exact path="/add-employee" component={AddEmployee} />

        <ProtectedRoute exact path="/employee_list" component={EmployeesList} />

        <ProtectedRoute exact path="/employee/:id" component={Employee} />

        <ProtectedRoute exact path="/downloads" component={Downloads} />

        {/* Default Path */}
        <Route path="*"> <Redirect to="/" /> </Route>
      </Switch>
    </Router>
  );
}

export default App;

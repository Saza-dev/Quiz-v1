import './App.css';
import { BrowserRouter,Routes,Route }  from 'react-router-dom';
import Footer from './components/Footer';
import Home from "./components/Home"
import Login from "./components/Login"
import CreateAcc from "./components/CreateAcc"
import DashboardUser from "./components/DashboardUser"
import DashboardAdmin from "./components/DashboardAdmin"
import joinQuiz from './components/JoinQuiz';
import Account from "./components/UserProfile";
import Quiz from "./components/Quiz";
import QuizResult from './components/QuizResult';
import AddQuiz from './components/AddQuiz'

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
    <Route path="/" exact Component={Home} />
    <Route path="/Login" exact Component={Login} />
    <Route path="/CreateAccount" exact Component={CreateAcc} />
    <Route path="/UserDashboard" exact Component={DashboardUser} />
    <Route path="/AdminDashboard" exact Component={DashboardAdmin} />
    <Route path="/Join" exact Component={joinQuiz}/>
    <Route path="/Account" exact Component={Account}/>
    <Route path="/Quiz" exact Component={Quiz}/>
    <Route path="/QuizResult" exact Component={QuizResult}/>
    <Route path="/AddQuiz" exact Component={AddQuiz}/>
    </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;

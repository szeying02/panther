import './App.css';
import Home from "./pages/Home";
import Forum from "./pages/forum/Forum";
import IndividualThread from "./pages/forum/IndividualThread";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import axios from 'axios';
import Search from './pages/forum/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';

axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/login" element = {<SignIn />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/forum/threads" element = {<Forum />} />
          <Route path = "forum/threads/:id" element = {<IndividualThread />}/>
          <Route path = "/forum/threads/search" element = {<Search />}/>
          <Route path = "*" element = {<ErrorPage status = {404} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

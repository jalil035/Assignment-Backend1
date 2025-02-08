
import { BrowserRouter, Routes,Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import {Toaster} from "react-hot-toast";
import PrivateRouter from "./components/PrivateRouter";
import AboutPage from "./page/AboutPage";
import Contact from "./page/Contact";
import DashboardPage from "./page/DashboardPage";
import BlogPage from "./page/blogPage";
import ServicePage from "./page/servicePage";



function App() {
  return (
    <BrowserRouter>
        <Toaster
            position="bottom-center"
            reverseOrder={false}
        />
    <Routes>
      <Route exact path='/' element={<HomePage />}/>
        <Route exact path='/dashboard' element={
            <PrivateRouter>
                <DashboardPage/>
            </PrivateRouter>
        }
        />


        <Route exact path='/about' element={<AboutPage/>}/>
        <Route exact path='/blog' element={<BlogPage/>}/>
        <Route exact path='/service' element={<ServicePage/>}/>
        <Route exact path='/contact' element={<Contact/>}/>





        <Route exact path='/register' element={<RegisterPage />}/>
       <Route exact path='/login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
)}

export default App;

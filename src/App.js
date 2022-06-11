
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageRoutes from './config/Routes';
import Login from './components/Login';
import Signup from './components/Signup';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'boxicons/css/boxicons.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
        <Route
          path='/*'
          element={
            <>
              <Header />
              <PageRoutes />
              <Footer />
            </>
          }
        />


        {/* </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { useRef } from 'react';
import Header from "./components/Header/Header";
import headerImg from "./assets/img/header_img.png";
import CusNavbar from "./components/Navbar/Navbar";
import logo from "./assets/img/logo.png";
import CarContainer from "./components/Car/CarContainer";
import Footer from './components/Footer/Footer';


function App() {
  const carSection = useRef(null);

  const goToCarContainer = () => carSection.current?.scrollIntoView({ behavior: 'smooth' });

  const login = () => console.log("Login Click");

  return (
    // <CarContainer carSection={carSection} />

    // <div className="App">
    //   <CusNavbar logo={logo} login={login} />
    //   <Header headerImg={headerImg} goToCarContainer={goToCarContainer} />
    //   <CarContainer carSection={carSection} />
    // </div>
    <Footer />
  );
}

export default App;

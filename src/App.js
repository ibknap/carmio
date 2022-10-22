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

  return (
    <div className="App">
      <CusNavbar logo={logo} balance={100.02} address="8932***9021" avatar="https://library.kissclipart.com/20191116/wze/kissclipart-avatar-icon-awesome-set-icon-forum-user-icon-18f64889026582d3.png"/>
      <Header headerImg={headerImg} goToCarContainer={goToCarContainer} />
      <CarContainer carSection={carSection} />
      <Footer />
    </div>
  );
}

export default App;

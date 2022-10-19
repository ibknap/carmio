import './App.css';
import { useRef } from 'react';
import Header from "./components/Header/Header";
import headerImg from "./assets/img/header_img.png";
import CusNavbar from "./components/Navbar/Navbar";
import logo from "./assets/img/logo.png";
import CarzContainer from "./components/Carz/CarzContainer";


function App() {
  const carzSection = useRef(null);

  const goToCarzContainer = () => carzSection.current?.scrollIntoView({ behavior: 'smooth' });

  const login = () => console.log("Login Click");

  return (
    <div className="App">
      <CusNavbar logo={logo} login={login} />
      <Header headerImg={headerImg} goToCarzContainer={goToCarzContainer} />
      <CarzContainer carzSection={carzSection} />

    </div>
  );
}

export default App;

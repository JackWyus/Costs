import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './components/Pages/Home';
import Newproject from './components/Pages/Newproject';
import Contact from './components/Pages/Contact';
import Company from './components/Pages/Company';
import Projects from './components/Pages/Projects';
import Project from './components/Pages/Project';


import Container from "./components/Layout/Container";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route path="/Costs" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<Newproject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ProjectList from './pages/ProjectList';
import Contact from './pages/Contact'; // import nou
 // nouă pagină pt toate proiectele

const App = () => {
  return (
    <div className="bg-[#fdfaf6] min-h-screen text-[#1c1c1c] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proiecte" element={<ProjectList />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/contact" element={<Contact />} /> {/* ruta nouă */}
      </Routes>
    </div>
  );
};
 export default App
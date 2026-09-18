import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TemplateGallery from './pages/TemplateGallery';
import Editor from './pages/Editor';
import PublicInvitation from './pages/PublicInvitation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<TemplateGallery />} />
        <Route path="/create/:templateId" element={<Editor />} />
        <Route path="/invite/:slug" element={<PublicInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

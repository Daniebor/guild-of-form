import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GuildHall from './pages/GuildHall';
import MissionScroll from './pages/MissionScroll';
import CampaignMap from './pages/CampaignMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<GuildHall />} />
        <Route path="/map" element={<CampaignMap />} />
        <Route path="/mission" element={<MissionScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

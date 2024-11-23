import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TowerList from './components/TowerList';
import SectorList from './components/SectorList';
import SectorDetail from './components/SectorDetail';
import VpnManager from './components/VpnManager';


const App = () => {
    return (
        <Router future={{ v7_startTransition: true }}>
            <div className="App">
                <h1>Lis Web Signals</h1>
                <VpnManager />
                <Routes>
                    <Route path="/" element={<TowerList />} />
                    <Route path="/tower/:towerId" element={<SectorList />} />
                    <Route path="/sector/:sectorId" element={<SectorDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
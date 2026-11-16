import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SimulatorPage from './pages/SimulatorPage';
import ApplicationPage from './pages/ApplicationPage';
import TrackingPage from './pages/TrackingPage';

export default function App() {
  const [currentView, setView] = useState('home');
  const [selectedPlanId, setSelectedPlanId] = useState('personal');
  const [simulationParams, setSimulationParams] = useState(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        selectedPlan={selectedPlanId}
        setSelectedPlan={setSelectedPlanId}
      />

      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage 
            setView={setView} 
            selectedPlan={selectedPlanId} 
            setSelectedPlan={setSelectedPlanId} 
          />
        )}

        {currentView === 'simulador' && (
          <SimulatorPage 
            selectedPlanId={selectedPlanId} 
            setSelectedPlanId={setSelectedPlanId}
            simulationParams={simulationParams}
            setSimulationParams={setSimulationParams}
            setView={setView}
          />
        )}

        {currentView === 'solicitud' && (
          <ApplicationPage 
            simulationParams={simulationParams}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            setView={setView}
          />
        )}

        {currentView === 'seguimiento' && (
          <TrackingPage 
            setView={setView}
          />
        )}
      </div>

      <Footer setView={setView} />
    </div>
  );
}

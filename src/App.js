import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import AddAppForm from './AddAppForm';
import AppList from './AppList';
import ManageIntegrations from './ManageIntegrations';
import Statistics from './Statistics';
import users from './users.json';
import cowImage from './cow.jpg'; // Add the new image
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apps, setApps] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('apps')) || [];
    setApps(storedApps);
    const storedIntegrations = JSON.parse(localStorage.getItem('integrations')) || [];
    setIntegrations(storedIntegrations);
  }, []);

  const authenticate = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
    }
  };

  const handleAddApp = (newApp) => {
    const updatedData = [...apps, newApp];
    setApps(updatedData);
    localStorage.setItem('apps', JSON.stringify(updatedData));
  };

  const handleDeleteApp = (appId) => {
    const updatedData = apps.filter(app => app.appId !== appId);
    setApps(updatedData);
    localStorage.setItem('apps', JSON.stringify(updatedData));
  };

  const handleAddIntegration = (newIntegration) => {
    const updatedData = [...integrations, newIntegration];
    setIntegrations(updatedData);
    localStorage.setItem('integrations', JSON.stringify(updatedData));
  };

  const handleDeleteIntegration = (integrationId) => {
    const updatedData = integrations.filter(integration => integration.integrationId !== integrationId);
    setIntegrations(updatedData);
    localStorage.setItem('integrations', JSON.stringify(updatedData));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login authenticate={authenticate} />} />
        <Route path="/protected" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProtectedComponent onAddApp={handleAddApp} onDeleteApp={handleDeleteApp} apps={apps} />
          </ProtectedRoute>
        } />
        <Route path="/add-app" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AddAppPage onAddApp={handleAddApp} onDeleteApp={handleDeleteApp} apps={apps} />
          </ProtectedRoute>
        } />
        <Route path="/manage-integrations" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageIntegrationsPage onAddIntegration={handleAddIntegration} onDeleteIntegration={handleDeleteIntegration} apps={apps} integrations={integrations} />
          </ProtectedRoute>
        } />
        <Route path="/statistics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <StatisticsPage apps={apps} integrations={integrations} />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

const ProtectedComponent = ({ onAddApp, onDeleteApp, apps }) => (
  <div className="App">
    <Navbar />
    <header className="App-header">
      <img src={cowImage} className="App-logo" alt="cow" />
      <p>Viewadm мясо</p>
    </header>
    <AppList apps={apps} onDeleteApp={onDeleteApp} />
  </div>
);

const AddAppPage = ({ onAddApp, onDeleteApp, apps }) => (
  <div className="App">
    <Navbar />
    <AddAppForm onAddApp={onAddApp} />
    <AppList apps={apps} onDeleteApp={onDeleteApp} />
  </div>
);

const ManageIntegrationsPage = ({ onAddIntegration, onDeleteIntegration, apps, integrations }) => (
  <div className="App">
    <Navbar />
    <ManageIntegrations onAddIntegration={onAddIntegration} onDeleteIntegration={onDeleteIntegration} apps={apps} integrations={integrations} />
  </div>
);

const StatisticsPage = ({ apps, integrations }) => (
  <div className="App">
    <Navbar />
    <Statistics apps={apps} integrations={integrations} />
  </div>
);

export default App;

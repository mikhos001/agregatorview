import React, { useState } from 'react';
import './Statistics.css';

function Statistics({ apps, integrations }) {
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statistics, setStatistics] = useState([]);

  const handleAppSelection = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedApps(value);
  };

  const handleIntegrationSelection = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedIntegrations(value);
  };

  const generateRandomStats = () => {
    const roundsPlayed = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
    const allBets = Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000;
    const allWin = Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000;
    const ggr = ((allBets - allWin) / allBets) * 100;
    return { roundsPlayed, allBets, allWin, ggr };
  };

  const handleShowAppStats = () => {
    const stats = selectedApps.map(appId => {
      const app = apps.find(app => app.appId === appId);
      const { roundsPlayed, allBets, allWin, ggr } = generateRandomStats();
      return {
        name: app.appName,
        dateRange: `${startDate} - ${endDate}`,
        roundsPlayed,
        allBets,
        allWin,
        ggr
      };
    });
    setStatistics(stats);
  };

  const handleShowIntegrationStats = () => {
    const stats = selectedIntegrations.map(integrationId => {
      const integration = integrations.find(integration => integration.integrationId === integrationId);
      const { roundsPlayed, allBets, allWin, ggr } = generateRandomStats();
      return {
        name: integration.integrationName,
        dateRange: `${startDate} - ${endDate}`,
        roundsPlayed,
        allBets,
        allWin,
        ggr
      };
    });
    setStatistics(stats);
  };

  return (
    <div className="statistics">
      <div className="form-group">
        <h2>Показать статистику по приложениям</h2>
        <label>Выберите приложения:</label>
        <select multiple value={selectedApps} onChange={handleAppSelection}>
          {apps.map(app => (
            <option key={app.appId} value={app.appId}>{app.appName}</option>
          ))}
        </select>
        <label>Начальная дата:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Конечная дата:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleShowAppStats} className="show-stats-button">Показать статистику</button>
      </div>
      <div className="form-group">
        <h2>Показать статистику по интеграциям</h2>
        <label>Выберите интеграции:</label>
        <select multiple value={selectedIntegrations} onChange={handleIntegrationSelection}>
          {integrations.map(integration => (
            <option key={integration.integrationId} value={integration.integrationId}>{integration.integrationName}</option>
          ))}
        </select>
        <label>Начальная дата:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Конечная дата:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleShowIntegrationStats} className="show-stats-button">Показать статистику</button>
      </div>
      <div className="statistics-table">
        <h2>Статистика</h2>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Диапазон дат</th>
              <th>Раундов сыграно</th>
              <th>AllBets</th>
              <th>AllWin</th>
              <th>GGR (%)</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat, index) => (
              <tr key={index}>
                <td>{stat.name}</td>
                <td>{stat.dateRange}</td>
                <td>{stat.roundsPlayed}</td>
                <td>{stat.allBets}</td>
                <td>{stat.allWin}</td>
                <td>{stat.ggr.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistics;

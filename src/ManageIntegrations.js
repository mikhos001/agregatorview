import React, { useState } from 'react';
import './ManageIntegrations.css';

function ManageIntegrations({ apps, onAddIntegration, integrations, onDeleteIntegration }) {
  const [integrationId, setIntegrationId] = useState('');
  const [integrationName, setIntegrationName] = useState('');
  const [protocol, setProtocol] = useState('');
  const [point, setPoint] = useState('');
  const [selectedApps, setSelectedApps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIntegration = { integrationId, integrationName, protocol, point, selectedApps };
    onAddIntegration(newIntegration);
    setIntegrationId('');
    setIntegrationName('');
    setProtocol('');
    setPoint('');
    setSelectedApps([]);
  };

  const handleAppSelection = (e) => {
    const value = e.target.value;
    setSelectedApps(prevSelectedApps =>
      prevSelectedApps.includes(value)
        ? prevSelectedApps.filter(app => app !== value)
        : [...prevSelectedApps, value]
    );
  };

  return (
    <div className="manage-integrations">
      <form onSubmit={handleSubmit} className="add-integration-form">
        <h2>Добавить интеграцию</h2>
        <div className="form-group">
          <label>ID интеграции:</label>
          <input type="text" value={integrationId} onChange={(e) => setIntegrationId(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Название интеграции:</label>
          <input type="text" value={integrationName} onChange={(e) => setIntegrationName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Протокол интеграции:</label>
          <input type="text" value={protocol} onChange={(e) => setProtocol(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Point интеграции:</label>
          <input type="text" value={point} onChange={(e) => setPoint(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Приложения в составе интеграции:</label>
          <div className="checkbox-group">
            {apps.map((app) => (
              <div key={app.appId} className="checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    value={app.appId}
                    checked={selectedApps.includes(app.appId)}
                    onChange={handleAppSelection}
                  />
                  {app.appName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="add-button">Добавить</button>
      </form>
      <div className="integration-list">
        <h2>Список интеграций</h2>
        <ul>
          {integrations.map((integration, index) => (
            <li key={index}>
              <div><strong>ID:</strong> <span>{integration.integrationId}</span></div>
              <div><strong>Название:</strong> <span>{integration.integrationName}</span></div>
              <div><strong>Протокол:</strong> <span>{integration.protocol}</span></div>
              <div><strong>Point:</strong> <span>{integration.point}</span></div>
              <div><strong>Приложения:</strong> <span>{integration.selectedApps.join(', ')}</span></div>
              <button onClick={() => onDeleteIntegration(integration.integrationId)} className="delete-button">Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageIntegrations;

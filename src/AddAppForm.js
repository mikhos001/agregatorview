import React, { useState } from 'react';
import './AddAppForm.css';

function AddAppForm({ onAddApp }) {
  const [appId, setAppId] = useState('');
  const [appName, setAppName] = useState('');
  const [appLink, setAppLink] = useState('');
  const [environment, setEnvironment] = useState('');
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = { appId, appName, appLink, environment, identifier };
    onAddApp(newApp);
    setAppId('');
    setAppName('');
    setAppLink('');
    setEnvironment('');
    setIdentifier('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-app-form">
      <h2>Добавить приложение</h2>
      <div className="form-row">
        <div className="form-group">
          <label>ID:</label>
          <input type="text" value={appId} onChange={(e) => setAppId(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Название:</label>
          <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ссылка:</label>
          <input type="text" value={appLink} onChange={(e) => setAppLink(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Окружение:</label>
          <input type="text" value={environment} onChange={(e) => setEnvironment(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Идентификатор:</label>
          <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </div>
        <button type="submit" className="add-button">Добавить</button>
      </div>
    </form>
  );
}

export default AddAppForm;

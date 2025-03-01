import React from 'react';
import './AppList.css';

function AppList({ apps, onDeleteApp }) {
  return (
    <div className="app-list">
      <h2>Список приложений</h2>
      <ul>
        {apps.map((app, index) => (
          <li key={index}>
            <div><strong>ID:</strong> <span>{app.appId}</span></div>
            <div><strong>Название:</strong> <span>{app.appName}</span></div>
            <div><strong>Ссылка:</strong> <span>{app.appLink}</span></div>
            <div><strong>Окружение:</strong> <span>{app.environment}</span></div>
            <div><strong>Идентификатор:</strong> <span>{app.identifier}</span></div>
            <button onClick={() => onDeleteApp(app.appId)} className="delete-button">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppList;

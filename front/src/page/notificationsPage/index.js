// front/src/page/notificationsPage/index.js
import React from 'react';

// NotificationsPage component
function NotificationsPage() {
  // Mock data for notifications (replace with actual notifications data)
  const notifications = [
    { id: 1, action: 'Вхід в акаунт', timestamp: new Date() },
    { id: 2, action: 'Відновлення акаунту', timestamp: new Date() },
    { id: 3, action: 'Зміна пароля', timestamp: new Date() },
    { id: 4, action: 'Зміна пошти', timestamp: new Date() },
    { id: 5, action: 'Поповнення', timestamp: new Date() },
    { id: 6, action: 'Переказ', timestamp: new Date() },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            {notification.action} - {notification.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;

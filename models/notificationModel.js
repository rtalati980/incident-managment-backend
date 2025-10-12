const db = require('../config/db');

const Notification = {
  // Create a new notification
  create: (notification, callback) => {
    const query = `
      INSERT INTO notifications (user_id, title, message, type, incident_id, is_read, created_at)
      VALUES (?, ?, ?, ?, ?, false, NOW())
    `;
    const values = [
      notification.user_id,
      notification.title,
      notification.message,
      notification.type || 'incident',
      notification.incident_id || null
    ];
    db.query(query, values, callback);
  },

  // Get all notifications for a specific user
  getUserNotifications: (userId, callback) => {
    const query = `
      SELECT *  
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    db.query(query, [userId], callback);
  },

  // Mark one notification as read
  markAsRead: (notificationId, callback) => {
    const query = `UPDATE notifications SET is_read = true WHERE id = ?`;
    db.query(query, [notificationId], callback);
  },

  // Mark all notifications as read for a specific user
  markAllAsRead: (userId, callback) => {
    const query = `UPDATE notifications SET is_read = true WHERE user_id = ?`;
    db.query(query, [userId], callback);
  }
};

module.exports = Notification;

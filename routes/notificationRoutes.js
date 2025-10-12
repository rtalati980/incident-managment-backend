const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');

router.get('/:userId', (req, res) => {
  Notification.getUserNotifications(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

router.patch('/:id/read', (req, res) => {
  Notification.markAsRead(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Marked as read' });
  });
});

module.exports = router;

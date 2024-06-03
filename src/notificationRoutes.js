const express = require("express");
const router = express.Router();
const pool = require("../config/DB_Config");

//get all notifications for a user
router.get("/notification/:userId", async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await pool.query(
      "SELECT * FROM notifications WHERE user_id = $1",
      [userId]
    );

    res.json(notifications.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// create a new notification
router.post("/notifications", async (req, res) => {
  try {
    const { message, userId } = req.body;
    await pool.query(
      "INSERT INTO notifications (messsage, user_id) VALUES ($1, $2)",
      [messsage, userId]
    );

    // Emit notifications to clients using socket.io
    io.emit(`notification_${userId}`, { message });
    res.status(201).json({ message: "Notifications created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

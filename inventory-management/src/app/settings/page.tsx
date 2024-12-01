"use client";
import React, { useState } from "react";

interface Props {}

function SettingsPage(props: Props) {
  const [theme, setTheme] = useState("Light");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
    // Save settings logic here
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Settings</h1>
      <div style={styles.section}>
        <h2 style={styles.subHeading}>General Settings</h2>
        <div style={styles.field}>
          <label style={styles.label}>Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            style={styles.select}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            style={styles.checkbox}
          />
          <span style={styles.checkboxLabel}>
            {notifications ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Account Settings</h2>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter a new password"
            style={styles.input}
          />
        </div>
      </div>
      <button onClick={handleSaveSettings} style={styles.button}>
        Save Settings
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center" as const,
    color: "#333",
  },
  section: {
    marginBottom: "20px",
  },
  subHeading: {
    color: "#555",
    marginBottom: "10px",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    color: "#666",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  checkbox: {
    marginRight: "10px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#555",
  },
  button: {
    width: "100%",
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SettingsPage;

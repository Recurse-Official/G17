"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/store";
import { setIsDarkMode } from "@/state";
import { useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";

interface Props {}

function SettingsPage(props: Props) {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [notifications, setNotifications] = useState(true);

  const onToggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div
      className="w-full"
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
      }}
    >
      <h1 style={{ ...styles.heading, color: isDarkMode ? "#fff" : "#333" }}>
        Settings
      </h1>
      <div style={styles.section}>
        <h2
          style={{ ...styles.subHeading, color: isDarkMode ? "#ccc" : "#555" }}
        >
          General Settings
        </h2>
        <div style={styles.field}>
          <label
            style={{ ...styles.label, color: isDarkMode ? "#ccc" : "#666" }}
          >
            Theme
          </label>
          <div style={styles.themeToggle}>
            <button onClick={onToggleDarkMode} style={styles.themeButton}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-yellow-500" />
              ) : (
                <Moon className="cursor-pointer text-gray-500" />
              )}
              <span style={{ marginLeft: "10px" }}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>
        <div style={styles.field} className="text-left">
          <label className="text-center"
            style={{ ...styles.label, color: isDarkMode ? "#ccc" : "#666" }}
          >
            Notifications
          </label>
          <input
          className="text-left"
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
        <h2
          style={{ ...styles.subHeading, color: isDarkMode ? "#ccc" : "#555" }}
        >
          Account Settings
        </h2>
        <div style={styles.field}>
          <label
            style={{ ...styles.label, color: isDarkMode ? "#ccc" : "#666" }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label
            style={{ ...styles.label, color: isDarkMode ? "#ccc" : "#666" }}
          >
            Password
          </label>
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
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center" as const,
  },
  section: {
    marginBottom: "20px",
  },
  subHeading: {
    marginBottom: "10px",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  themeToggle: {
    display: "flex",
    alignItems: "center",
  },
  themeButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "inherit",
  },
  checkbox: {
    marginRight: "10px",
  },
  checkboxLabel: {
    fontSize: "14px",
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

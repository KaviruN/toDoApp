import React, { useState, useEffect } from "react";

const AutoHideAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showAlert) {
      // Start the countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Hide the alert after 3 seconds
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Cleanup intervals and timeout on unmount or reset
      return () => {
        clearInterval(countdownInterval);
        clearTimeout(timeout);
      };
    }
  }, [showAlert]);

  const showAlertHandler = () => {
    setShowAlert(true);
    setCountdown(3); // Reset countdown each time the alert is shown
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={showAlertHandler}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Show Alert
      </button>

      {showAlert && (
        <div
          className="flex items-center justify-between px-4 py-2 bg-red-500 text-white rounded shadow-md animate-fade-in-out"
          style={{ animationDuration: "3s" }}
        >
          <span>Alert! Hiding in {countdown} seconds...</span>
        </div>
      )}
    </div>
  );
};

export default AutoHideAlert;

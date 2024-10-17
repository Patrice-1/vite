import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./index.css";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <TodoList />
      {deferredPrompt && (
        <div className="fixed bottom-5 right-5 bg-white border border-gray-300 p-4 rounded shadow-lg">
          <p>Add this app to your home screen for a better experience!</p>
          <button
            onClick={handleInstallClick}
            className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
          >
            Install
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

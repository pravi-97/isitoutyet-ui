import { useState } from "react";

const GlobalNotificationToggle = () => {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    console.log("Global notifications paused:", next);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
      <div>
        <p className="font-semibold text-white">Pause all notifications</p>
        <p className="text-sm text-slate-400">
          Temporarily stop all email alerts
        </p>
      </div>

      <button
        onClick={toggle}
        className={`w-12 h-6 rounded-full transition ${
          paused ? "bg-red-600" : "bg-green-600"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition transform ${
            paused ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default GlobalNotificationToggle;

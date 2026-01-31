// NotificationsInlineRow.jsx
import { useNavigate } from "react-router-dom";

export default function NotificationsInlineRow({
  trackedCount,
  notificationsEnabled,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/my-shows")}
      className="flex items-center justify-between px-4 py-2 mb-4 rounded-md
                 bg-slate-800/40 hover:bg-slate-800/60 cursor-pointer transition"
    >
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <span>🔔</span>
        <span className="font-medium">Notifications</span>
        <span className="text-slate-500">·</span>
        <span>{notificationsEnabled ? "Enabled" : "Paused"}</span>
        <span className="text-slate-500">·</span>
        <span>{trackedCount} shows tracked</span>
      </div>

      <span className="text-sm text-slate-400">
        Manage →
      </span>
    </div>
  );
}

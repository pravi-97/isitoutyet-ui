import { useEffect, useState } from "react";
import { User, Mail, Trash2, Check, AlertTriangle, ShieldCheck } from "lucide-react";
import { fetchMyDetailsMini, updateUserDetails } from "../api/showApi";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    let cancelled = false;

    fetchMyDetailsMini()
      .then((res) => {
        if (cancelled) return;

        const user = res.data;
        if (user) {
          setProfile({
            name: user.name ?? "",
            email: user.email ?? "",
          });
        }
      })
      .catch((err) => {
        if (!cancelled) setMyDetailsError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);


  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "contact.isitoutyet@gmail.com";

  const [tempName, setTempName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    updateUserDetails(tempName);
    setProfile({ ...profile, name: tempName });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-800/20 p-8 rounded-3xl border border-slate-800/50">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold shadow-xl mb-4">
            {(profile.name || tempName || "?")[0].toUpperCase()}
          </div>
          <h1 className="text-xl font-semibold">My Account</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your identity</p>
        </div>

        {/* Info Section */}
        <div className="space-y-6">

          {/* Name Field */}
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 ml-1">Name</span>
            {profile.name ? (
              <div className="bg-slate-800/50 px-4 py-3 rounded-xl text-slate-200 border border-slate-700/30">
                {profile.name}
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-indigo-500/5 border border-indigo-500/20 px-4 py-2 rounded-xl">
                <input
                  autoFocus
                  className="bg-transparent outline-none text-indigo-300 placeholder:text-slate-600 text-sm w-full"
                  placeholder="Enter your name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="text-indigo-400 hover:text-indigo-300 p-1"
                >
                  <Check size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Email Field (Static) */}
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 ml-1">Email Address</span>
            <div className="bg-slate-800/50 px-4 py-3 rounded-xl text-slate-400 border border-slate-700/30 flex items-center gap-2">
              <Mail size={14} className="opacity-50" />
              <span className="text-sm">{profile.email}</span>
            </div>
          </div>

        </div>
        <p className="text-xs text-slate-500 mb-4">
          To modify your name or email, reach out to{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-slate-400 hover:text-slate-300 underline"
          >
            {contactEmail}
          </a>
        </p>

        {/* Danger Zone */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          {!isConfirming ? (
            <button
              onClick={() => setIsConfirming(true)}
              className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-400 transition-colors py-2 text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          ) : (
            <div className="space-y-3 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center gap-2 text-red-400 justify-center">
                <AlertTriangle size={16} />
                <span className="text-xs font-semibold">This is permanent!</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsConfirming(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => console.log("Final Delete triggered")}
                  className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white py-2 rounded-lg text-xs font-bold border border-red-600/20 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
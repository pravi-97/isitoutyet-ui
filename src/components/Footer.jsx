export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-800
                       text-slate-100 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8
                      grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-slate-200 font-semibold mb-2">About</h4>
          <p>
            IsItOutYet tracks TV show releases and notifies you when new
            episodes or seasons drop.
          </p>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-2">API Providers</h4>
          <ul className="space-y-1">
            <li>TMDB - discovery & metadata</li>
            <li>TVMaze - episode & air-date accuracy</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-3 border-t border-slate-800
                      text-slate-500">
        © {new Date().getFullYear()} IsItOutYet
      </div>
    </footer>
  );
}

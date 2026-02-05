import { Link } from "react-router-dom";
export default function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL;

  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800 text-slate-100 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Brand/About - Spans 7 columns on desktop */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              {/* <span className="text-xl">🔥</span> */}
              <h3 className="font-bold text-slate-100 font-bold tracking-tighter text-xl">
                IsIt<span className="text-indigo-500">Out</span>Yet
              </h3>
              {/* <Link to="/" className="text-slate-100 font-bold tracking-tighter text-xl">
        IsIt<span className="text-indigo-500">Out</span>Yet
      </Link> */}
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Tracking TV show releases so you don't have to. Get notified
              the moment your favorite series returns with new episodes.
            </p>
            <p className="text-xs text-slate-500">
              Questions? Reach out at <a href={`mailto:${email}`} className="text-slate-400 hover:text-indigo-400 transition-colors font-bold">{email}</a>
            </p>
          </div>

          {/* API Providers - Spans 5 columns on desktop */}
          <div className="md:col-span-5">
            <h4 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">
              Data Powered By
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="group">
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                    TMDB
                  </p>
                  <p className="text-xs text-slate-500">Discovery & Metadata</p>
                </a>
              </li>

              <li className="group">
                <a
                  href="https://www.tvmaze.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                    TVMaze
                  </p>
                  <p className="text-xs text-slate-500">Air-date Accuracy</p>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs">
            © {new Date().getFullYear()} IsItOutYet. Built for fans.
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <Link to="/about#top" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/terms-and-privacy#top" className="hover:text-white transition-colors">
              Terms &amp; Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
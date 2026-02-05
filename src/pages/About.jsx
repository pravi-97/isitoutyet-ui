import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
    const email = import.meta.env.VITE_CONTACT_EMAIL;
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;
        const id = location.hash.substring(1);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, [location]);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 px-4 py-10" id="top">
            <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-6">
                
                <h1 className="text-2xl font-semibold text-white mb-1">
                    About IsItOutYet
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    The story behind the tracker.
                </p>

                <Section title="The Origin">
                    I'm someone who watches a lot of TV shows and kept running into the same issue — 
                    missing episodes because I didn't know they were out. Schedules change, 
                    shows disappear for months, then quietly return.
                    <br /><br />
                    After dealing with this one too many times, I decided to build 
                    something I'd actually trust myself.
                </Section>

                <Section title="The Problem">
                    Tracking TV show releases shouldn't require constant checking, but that's 
                    what most users end up doing. Air dates change, platforms disagree, 
                    and shows return without much notice.
                    <br /><br />
                    With work, personal commitments, and life getting in the way, it's easy 
                    to forget to check — and by the time you remember, you've already missed it.
                </Section>

                <Section title="The Solution">
                    <b>IsItOutYet</b> exists to make TV show tracking simple and reliable. 
                    You follow the shows you care about, and you get notified when a new 
                    episode or season is actually released.
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>No constant manual checking.</li>
                        <li>No guessing based on outdated blogs.</li>
                        <li>Clear, timely updates for the shows you love.</li>
                    </ul>
                </Section>

                <hr className="my-10 border-slate-700" />

                <Section title="Get in Touch">
                    Have feedback or a feature request? I'd love to hear it. 
                    Reach out at:{" "}
                    <a
                        href={`mailto:${email}`}
                        className="text-green-400 hover:underline font-medium"
                    >
                        {email}
                    </a>
                </Section>
            </div>
        </div>
    );
}

// Reusing your Section sub-component for visual consistency
function Section({ title, children }) {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <div className="text-sm text-slate-400 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
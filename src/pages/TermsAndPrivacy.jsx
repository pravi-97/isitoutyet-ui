export default function TermsAndPrivacy() {
    // Fallback email to prevent broken links if env is missing
    const email = import.meta.env.VITE_CONTACT_EMAIL;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 px-4 py-10">
            <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-6">

                {/* TERMS OF SERVICE */}
                <h1 className="text-2xl font-semibold text-white mb-1">
                    Terms of Service
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    Last Updated: Jan 31, 2026 (v1.0.0)
                </p>

                <Section title="1. Introduction">
                    Welcome to <b>IsItOutYet.</b> These Terms govern your use of the platform.
                    By accessing or using the app, you agree to these Terms.
                    If you do not agree, please discontinue use immediately.
                </Section>

                <Section title="2. Beta Disclaimer">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>IsItOutYet is currently in <b>Beta</b> and active development.</li>
                        <li>Features, data accuracy, and availability may change without notice.</li>
                        <li>Release data is provided on a best-effort basis for informational purposes only.</li>
                    </ul>
                </Section>

                <Section title="3. Eligibility">
                    You must be at least 13 years old to use this service. Users under 18 must
                    have parental or guardian consent.
                </Section>

                <Section title="4. User Accounts & Security">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Authentication is handled via Firebase. We do not see or store your passwords.</li>
                        <li>You are responsible for maintaining the confidentiality of your account.</li>
                        <li>We reserve the right to terminate accounts that misuse the platform or scrape data.</li>
                    </ul>
                </Section>

                <Section title="5. Third-Party Services">
                    Our service integrates with third-party providers including TMDB, TVMaze, and Firebase.
                    Your use of this app is also subject to their respective terms and data accuracy.
                </Section>

                <Section title="6. Intellectual Property">
                    All branding, logos, and original code are the property of IsItOutYet.
                    Unauthorized redistribution or reverse engineering is prohibited.
                </Section>

                <Section title="7. Limitation of Liability & 'No Warranty'">
                    <p className="mb-2">
                        <b>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</b>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>We are not liable for incorrect release dates or missed notifications.</li>
                        <li>We are not responsible for any direct or indirect damages resulting from your use of the service.</li>
                    </ul>
                </Section>

                <Section title="8. Notifications">
                    Notifications are sent based on detected release data and user preferences.
                    Delivery is not guaranteed and may be delayed, duplicated, or fail due to
                    email provider issues or user settings.
                </Section>


                <Section title="9. Governing Law">
                    These Terms are governed by the laws of India. Any disputes shall be subject
                    to the exclusive jurisdiction of the courts in <b>Karnataka, India.</b>
                </Section>

                <Section title="10. Account Termination">
                    We reserve the right to suspend or terminate accounts that violate these
                    Terms, abuse the platform, or attempt to scrape or manipulate data.
                </Section>


                <hr className="my-10 border-slate-700" />

                {/* PRIVACY POLICY */}
                <h1 className="text-2xl font-semibold text-white mb-1">
                    Privacy Policy
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    Last Updated: Jan 31, 2026 (v1.0.0)
                </p>

                <Section title="1. Data Collection">
                    <ul className="list-disc pl-5 space-y-1">
                        <li><b>Account Data:</b> Email and Unique Identifier (UID) via Firebase.</li>
                        <li><b>Usage Data:</b> Your tracked shows, notification preferences, and timestamps.</li>
                        <li><b>Technical Data:</b> IP addresses and browser info for security and analytics.</li>
                    </ul>
                </Section>

                <Section title="2. Cookies & Local Storage">
                    We use cookies and browser local storage to maintain your session and
                    remember your app preferences. By continuing to use the app, you consent to the use of cookies and local storage
                    as described in this policy.
                </Section>

                <Section title="3. Data Retention & Deletion">
                    We retain your data as long as your account is active.
                    Under <b>GDPR/DPDPA</b>, you may request account deletion at any time.
                    Upon request, your personal data will be purged from our active databases within 30 days.
                </Section>

                <Section title="4. Data Sharing">
                    We <b>never</b> sell your personal data. Data is shared only with
                    essential service providers (like Firebase for login or email services)
                    to keep the app functional.
                </Section>

                <Section title="5. Security">
                    We use reasonable and industry-accepted security practices, including
                    token-based authorization and encrypted communication where applicable.
                    However, no method of transmission over the internet is 100% secure.
                </Section>


                <Section title="6. Your Rights & Contact">
                    To exercise your rights to access, correct, or delete your data,
                    please contact us at:{" "}
                    <a
                        href={`mailto:${email}`}
                        className="text-green-400 hover:underline font-medium"
                    >
                        {email}
                    </a>
                </Section>

                <Section title="7. Changes to This Policy">
                    We may update this Privacy Policy from time to time. Continued use of the
                    service after changes implies acceptance.
                </Section>

            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
            <div className="text-sm text-slate-400 leading-relaxed">{children}</div>
        </div>
    );
}
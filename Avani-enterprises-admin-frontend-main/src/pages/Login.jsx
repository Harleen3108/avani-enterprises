import { useState } from "react";

/**
 * Ask the browser for the device's real position, to record alongside the
 * sign-in attempt.
 *
 * Never blocks the login. It resolves within 8 seconds whatever happens, and a
 * refusal or a timeout is reported rather than treated as an error — the point
 * is a better audit trail, not a gate.
 *
 * Worth being clear-eyed about what this buys: an attacker will simply deny the
 * prompt, so a hostile attempt still leaves only the IP estimate. Its real
 * value is the reverse — a SUCCESSFUL sign-in from unexpected precise
 * coordinates is a specific, high-confidence signal that something is wrong.
 */
async function requestDeviceLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
        return { denied: true, reason: "unsupported" };
    }
    return new Promise((resolve) => {
        let settled = false;
        const done = (v) => { if (!settled) { settled = true; resolve(v); } };

        // Hard ceiling: a permission prompt left sitting must not hang the form.
        const timer = setTimeout(() => done({ denied: true, reason: "timeout" }), 8000);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                clearTimeout(timer);
                done({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
            },
            (err) => {
                clearTimeout(timer);
                done({ denied: true, reason: err && err.code === 1 ? "refused" : "unavailable" });
            },
            { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
        );
    });
}
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [adminCode, setAdminCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Why the user was signed out, when it was not their choice — set by the
    // auth interceptor. Without it a rotated JWT_SECRET just dumps you back at
    // a blank login form with no explanation.
    const [error, setError] = useState(() => {
        try {
            const reason = sessionStorage.getItem("avani_signed_out_reason");
            if (reason) sessionStorage.removeItem("avani_signed_out_reason");
            return reason || "";
        } catch {
            return "";
        }
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // The admin code is verified by the SERVER now.
        //
        // It used to be compared here against import.meta.env.VITE_ADMIN_CODE,
        // which Vite inlines into the public JavaScript bundle — anyone could
        // read the real code by opening the file. Worse, because the check was
        // client-side, posting straight to /auth/login skipped it entirely. It
        // stopped nobody while looking like it did.
        setLoading(true);
        const deviceLocation = await requestDeviceLocation();
        const res = await login(email, password, adminCode, deviceLocation);
        setLoading(false);

        if (res.success) navigate("/");
        // One message for every failure, so the form cannot be used to work out
        // which of the three fields was wrong, or which emails exist.
        else setError(res.error || "Incorrect email, password or admin code.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4
            bg-gradient-to-br from-indigo-200 via-blue-100 to-pink-200">

            <div className="w-full max-w-lg sm:max-w-md
                bg-gradient-to-br from-white via-blue-50/70 to-indigo-50/60
                backdrop-blur-xl p-6 sm:p-8 rounded-2xl
                shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                border border-white/60">

                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/avani-logo.jpg"
                        alt="Avani Enterprises"
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full shadow-lg"
                    />
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                        AVANI ENTERPRISES
                    </h1>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-900 mb-1">
                    Welcome Back
                </h2>
                <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                    Sign in to continue to your dashboard
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

                    {/* Admin Code */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Admin Code
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={8}
                            required
                            className="w-full px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200
                                bg-white/80
                                focus:ring-2 focus:ring-indigo-400
                                focus:border-transparent outline-none
                                transition-all"
                            placeholder="8 digit admin code"
                            value={adminCode}
                            onChange={(e) =>
                                setAdminCode(e.target.value.replace(/\D/g, ""))
                            }
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200
                                bg-white/80
                                focus:ring-2 focus:ring-indigo-400
                                focus:border-transparent outline-none
                                transition-all"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200
                                bg-white/80
                                focus:ring-2 focus:ring-indigo-400
                                focus:border-transparent outline-none
                                transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 sm:py-2.5 rounded-lg font-semibold text-white
                            bg-gradient-to-r from-indigo-600 to-pink-500
                            hover:from-indigo-700 hover:to-pink-600
                            shadow-lg shadow-indigo-300/40
                            transition-all flex items-center justify-center
                            disabled:opacity-70"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* No sign-up link. Accounts are created by the site owner from
                    the server, not by whoever finds this page. */}
                <p className="mt-5 sm:mt-6 text-center text-xs text-gray-500">
                    Access is granted by the site owner. Contact them if you need an account.
                </p>
            </div>
        </div>
    );
};

export default Login;

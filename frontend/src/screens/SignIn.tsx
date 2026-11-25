// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "Notepad";
// the one account already registered in this prototype
const KNOWN_EMAIL = "wren@fernpost.co";
const TABS = [
  { key: "signin", label: "Sign in", wf: "i-1-0-0" },
  { key: "register", label: "Create account", wf: "i-1-0-1" },
];

const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;
// muted ink: the neutral role pulled toward the botanical ink so small copy clears 4.5:1 on cream
const muted = `color-mix(in srgb, ${brand.primaryColor} 68%, ${brand.neutralColor})`;
// the brass accent deepened so the cream button label clears 4.5:1
const accentDeep = `color-mix(in srgb, ${brand.accentColor} 50%, ${brand.primaryColor})`;

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("signin");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInErrors, setSignInErrors] = React.useState({});
  const [signingIn, setSigningIn] = React.useState(false);

  const [newEmail, setNewEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [regErrors, setRegErrors] = React.useState({});
  const [registering, setRegistering] = React.useState(false);

  const timer = React.useRef(null);
  const tabRefs = React.useRef([]);
  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const pill = { borderRadius: 999, border: 0, backgroundColor: tint(8), color: brand.primaryColor };
  const labelCls = "block pl-4 text-xs lowercase tracking-wide";
  const fieldCls = "at-focus h-12 w-full px-5 text-[15px] outline-none";

  const selectTab = (key) => {
    setTab(key);
    setSignInErrors({});
    setRegErrors({});
  };

  const onTabKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.key === tab);
    const next = (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    selectTab(TABS[next].key);
    const el = tabRefs.current[next];
    if (el) el.focus();
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    if (signingIn) return;
    const next = {};
    if (!email.trim()) next.email = "Enter the email you signed up with.";
    else if (!isEmail(email)) next.email = "That does not look like an email address.";
    if (!password) next.password = "Enter your password.";
    setSignInErrors(next);
    if (Object.keys(next).length) return;
    setSigningIn(true);
    timer.current = setTimeout(() => {
      setSigningIn(false);
      // generic refusal — never says whether the email exists
      if (password.length < 10) setSignInErrors({ form: "Email or password is incorrect. Please try again." });
      else navigate("notes");
    }, 650);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if (registering) return;
    const next = {};
    if (!newEmail.trim()) next.email = "Enter an email address.";
    else if (!isEmail(newEmail)) next.email = "That does not look like an email address.";
    else if (newEmail.trim().toLowerCase() === KNOWN_EMAIL) next.email = "That email is already in use. Sign in instead.";
    if (newPassword.length < 10) next.password = "Use at least 10 characters.";
    if (confirm !== newPassword) next.confirm = "The two passwords do not match.";
    setRegErrors(next);
    if (Object.keys(next).length) return;
    setRegistering(true);
    timer.current = setTimeout(() => {
      setRegistering(false);
      navigate("notes");
    }, 650);
  };

  const FieldNote = ({ id, children }) => (
    <p id={id} className="flex items-start gap-1.5 pl-4 pt-1 text-xs" style={{ color: brand.primaryColor }}>
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ color: brand.primaryColor, fontFamily: brand.fontBody, backgroundColor: brand.backgroundColor }}
    >
      <style>{`
        .at-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 3px; }
        .at-rise { animation: at-rise .3s ease-out both; }
        @keyframes at-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes at-breathe { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .at-dot { animation: at-breathe 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .at-rise, .at-dot { animation: none; }
          .at-focus, .at-btn { transition: none !important; }
        }
      `}</style>

      <header className="px-6 py-5 sm:px-10" style={{ backgroundColor: tint(10) }}>
        <h1 data-wf="b-0-0" className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>
          {PRODUCT}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center px-6 py-10 sm:py-14">
        <main
          className="w-full max-w-md px-6 pb-9 pt-14 sm:px-9 sm:pt-16"
          style={{ backgroundColor: tint(6), borderRadius: "170px 170px 24px 24px" }}
        >
          <div
            data-wf="b-1-0"
            role="tablist"
            aria-label="Sign in or create account"
            onKeyDown={onTabKey}
            className="mx-auto flex w-full max-w-xs gap-1 p-1"
            style={{ backgroundColor: tint(10), borderRadius: 999 }}
          >
            {TABS.map((t, i) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  data-wf={t.wf}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`at-tab-${t.key}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`at-panel-${t.key}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => selectTab(t.key)}
                  className="at-focus at-btn h-11 flex-1 text-sm transition-colors"
                  style={{
                    borderRadius: 999,
                    backgroundColor: on ? brand.backgroundColor : "transparent",
                    color: on ? brand.primaryColor : muted,
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {tab === "signin" ? (
            <div key="signin" id="at-panel-signin" role="tabpanel" aria-labelledby="at-tab-signin" className="at-rise">
              <form data-wf="b-2-0" className="mt-7 text-left" onSubmit={submitSignIn} noValidate>
                <h2 className="text-center text-3xl italic" style={{ fontFamily: brand.fontHeading }}>
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm lowercase" style={{ color: muted }}>
                  welcome back — your notes are where you left them
                </p>

                <div className="mt-7 space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="at-email" className={labelCls} style={{ color: muted }}>email</label>
                    <input
                      data-wf="i-2-0-0"
                      id="at-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={KNOWN_EMAIL}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={signInErrors.email ? true : undefined}
                      aria-describedby={signInErrors.email ? "at-email-err" : undefined}
                      className={fieldCls}
                      style={pill}
                    />
                    {signInErrors.email ? <FieldNote id="at-email-err">{signInErrors.email}</FieldNote> : null}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="at-password" className={labelCls} style={{ color: muted }}>password</label>
                    <input
                      data-wf="i-2-0-1"
                      id="at-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={signInErrors.password ? true : undefined}
                      aria-describedby={signInErrors.password ? "at-password-err" : "at-session-note"}
                      className={fieldCls}
                      style={pill}
                    />
                    {signInErrors.password ? (
                      <FieldNote id="at-password-err">{signInErrors.password}</FieldNote>
                    ) : (
                      <p id="at-session-note" className="pl-4 pt-1 text-xs lowercase" style={{ color: muted }}>
                        we keep this session open on every device you sign in on
                      </p>
                    )}
                  </div>
                </div>

                <button
                  data-wf="b-3-0"
                  type="submit"
                  disabled={signingIn}
                  className="at-focus at-btn mt-7 flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
                  style={{ borderRadius: 999, backgroundColor: accentDeep, color: brand.backgroundColor }}
                >
                  {signingIn ? (
                    <>
                      <span className="at-dot h-2 w-2 rounded-full" style={{ backgroundColor: brand.backgroundColor }} aria-hidden="true" />
                      <span className="lowercase">checking your details…</span>
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>

                <div data-wf="b-4-0" role="status" aria-live="polite" className="mt-4">
                  {signInErrors.form ? (
                    <p
                      className="at-rise flex items-start gap-2 px-5 py-3 text-sm"
                      style={{ backgroundColor: tint(12), color: brand.primaryColor, borderRadius: 20 }}
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold">Email or password is incorrect. Please try again.</strong>
                        <span className="mt-1 block lowercase" style={{ color: muted }}>
                          your email is still in the field above
                        </span>
                      </span>
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          ) : (
            <div key="register" id="at-panel-register" role="tabpanel" aria-labelledby="at-tab-register" className="at-rise">
              <form data-wf="b-5-0" className="mt-7 text-left" onSubmit={submitRegister} noValidate>
                <h2 className="text-center text-3xl italic" style={{ fontFamily: brand.fontHeading }}>
                  Create a new account
                </h2>
                <p className="mt-2 text-center text-sm lowercase" style={{ color: muted }}>
                  free to use — every note stays private to you
                </p>

                <div className="mt-7 space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="at-new-email" className={labelCls} style={{ color: muted }}>email</label>
                    <input
                      data-wf="i-5-0-0"
                      id="at-new-email"
                      name="new-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      aria-invalid={regErrors.email ? true : undefined}
                      aria-describedby={regErrors.email ? "at-new-email-err" : undefined}
                      className={fieldCls}
                      style={pill}
                    />
                    {regErrors.email ? <FieldNote id="at-new-email-err">{regErrors.email}</FieldNote> : null}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="at-new-password" className={labelCls} style={{ color: muted }}>
                      password (at least 10 characters)
                    </label>
                    <input
                      data-wf="i-5-0-1"
                      id="at-new-password"
                      name="new-password"
                      type="password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      aria-invalid={regErrors.password ? true : undefined}
                      aria-describedby={regErrors.password ? "at-new-password-err" : "at-pw-hint"}
                      className={fieldCls}
                      style={pill}
                    />
                    {regErrors.password ? (
                      <FieldNote id="at-new-password-err">{regErrors.password}</FieldNote>
                    ) : (
                      <p id="at-pw-hint" className="pl-4 pt-1 text-xs lowercase" style={{ color: muted }}>
                        a short phrase you will remember works well
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="at-confirm" className={labelCls} style={{ color: muted }}>confirm password</label>
                    <input
                      data-wf="i-5-0-2"
                      id="at-confirm"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      aria-invalid={regErrors.confirm ? true : undefined}
                      aria-describedby={regErrors.confirm ? "at-confirm-err" : undefined}
                      className={fieldCls}
                      style={pill}
                    />
                    {regErrors.confirm ? <FieldNote id="at-confirm-err">{regErrors.confirm}</FieldNote> : null}
                  </div>
                </div>

                <button
                  data-wf="b-6-0"
                  type="submit"
                  disabled={registering}
                  className="at-focus at-btn mt-7 flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
                  style={{ borderRadius: 999, backgroundColor: accentDeep, color: brand.backgroundColor }}
                >
                  {registering ? (
                    <>
                      <span className="at-dot h-2 w-2 rounded-full" style={{ backgroundColor: brand.backgroundColor }} aria-hidden="true" />
                      <span className="lowercase">setting up your notebook…</span>
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </div>
          )}
        </main>

        <section className="mt-8 grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="px-5 py-5" style={{ backgroundColor: tint(6), borderRadius: 24 }}>
            <h2 className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>Forgot your password?</h2>
            <button
              data-wf="b-7-0"
              type="button"
              onClick={() => navigate("reset-password")}
              className="at-focus at-btn mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm italic underline underline-offset-4 transition-opacity hover:opacity-80"
              style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
            >
              Email me a reset link
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p
            data-wf="b-7-1"
            className="flex items-start gap-2 px-5 py-5 text-sm"
            style={{ backgroundColor: tint(6), borderRadius: 24, color: muted }}
          >
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>If an account exists for that email, a reset link has been sent.</span>
          </p>
        </section>

        <p className="mt-8 max-w-md text-center text-xs lowercase" style={{ color: muted }}>
          notepad is free — no card, no tiers, nothing to upgrade
        </p>
      </div>
    </div>
  );
}

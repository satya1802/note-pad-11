// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const RESET_EMAIL = "satya@example.com";
const SENT_LABEL = "sent 25 nov at 14:03";
const LINK_SECONDS = 118;
const MIN_LENGTH = 10;
const RULE_WIDTHS = ["74%", "90%", "58%", "82%", "44%"];
const STRENGTH_WORDS = ["too short", "getting there", "good", "strong"];

const SAFETY_NOTES = [
  "your notes and folders stay exactly as you left them",
  "every signed-in device is signed out once you save",
  "this link closes after one use",
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function tint(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function mix(hexA, hexB, amount) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * amount));
  return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}

function scorePassword(pw) {
  if (!pw) return 0;
  if (pw.length < MIN_LENGTH) return 0;
  let s = 1;
  if (pw.length >= 14) s += 1;
  if (/[^A-Za-z]/.test(pw)) s += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1;
  return Math.min(s, 4);
}

function clock(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m + ":" + (s < 10 ? "0" + s : s);
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const paper = brand.backgroundColor;
  const muted = mix(ink, paper, 0.2);

  const [phase, setPhase] = React.useState("editing"); // editing | saving | success | expired
  const [pw1, setPw1] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [errors, setErrors] = React.useState({ pw1: "", pw2: "" });
  const [remaining, setRemaining] = React.useState(LINK_SECONDS);

  const pw1Ref = React.useRef(null);
  const pw2Ref = React.useRef(null);

  React.useEffect(() => {
    if (phase !== "editing") return undefined;
    const id = setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  React.useEffect(() => {
    if (remaining === 0 && phase === "editing") setPhase("expired");
  }, [remaining, phase]);

  React.useEffect(() => {
    if (phase !== "saving") return undefined;
    const t = setTimeout(() => setPhase("success"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  const score = scorePassword(pw1);
  const editing = phase === "editing";
  const saving = phase === "saving";
  const success = phase === "success";
  const expired = phase === "expired";

  function handleSubmit(e) {
    e.preventDefault();
    if (success) {
      navigate("sign-in");
      return;
    }
    if (expired || saving) return;

    const next = { pw1: "", pw2: "" };
    if (!pw1) next.pw1 = "enter a new password to continue.";
    else if (pw1.length < MIN_LENGTH)
      next.pw1 =
        "that's " + pw1.length + " characters. go to at least " + MIN_LENGTH + ".";
    if (!pw2) next.pw2 = "type the password a second time.";
    else if (pw1 && pw2 !== pw1) next.pw2 = "these two don't match yet.";

    setErrors(next);
    if (next.pw1) {
      if (pw1Ref.current) pw1Ref.current.focus();
      return;
    }
    if (next.pw2) {
      if (pw2Ref.current) pw2Ref.current.focus();
      return;
    }
    setPhase("saving");
  }

  const fieldStyle = {
    backgroundColor: paper,
    border: "1px solid " + tint(ink, 0.14),
    borderRadius: "999px",
    color: ink,
    height: "56px",
    fontFamily: brand.fontBody,
  };

  const errorFieldStyle = { border: "1px solid " + tint(ink, 0.45) };

  return (
    <div
      className="at-root min-h-screen w-full"
      style={{
        backgroundColor: paper,
        color: ink,
        fontFamily: brand.fontBody,
        "--at-accent": accent,
      }}
    >
      <style>{`
        .at-focus:focus-visible { outline: 2px solid var(--at-accent); outline-offset: 3px; }
        .at-primary { transition: filter .18s ease, transform .18s ease; }
        .at-primary:hover:not(:disabled) { filter: brightness(1.18); }
        .at-primary:active:not(:disabled) { transform: translateY(1px); }
        .at-ghost { transition: background-color .18s ease; }
        @keyframes at-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .at-rise { animation: at-rise .5s cubic-bezier(.22,.61,.36,1) both; }
        .at-rise-2 { animation-delay: .09s; }
        .at-rise-3 { animation-delay: .18s; }
        @keyframes at-dot { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
        .at-dot { animation: at-dot 1.2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .at-root *, .at-root { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* primary column */}
          <main className="lg:col-span-7 lg:col-start-6">
            <div className="mx-auto w-full max-w-[560px]">
              <section
                className="at-rise overflow-hidden"
                style={{
                  backgroundColor: tint(ink, 0.05),
                  borderRadius: "280px 280px 24px 24px",
                }}
              >
                <div className="px-7 pb-10 pt-20 sm:px-12 sm:pb-12 sm:pt-24">
                  <p
                    className="text-center text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: muted }}
                  >
                    notepad 9 · account recovery
                  </p>

                  <h1
                    data-wf="b-0-0"
                    className="mt-5 text-center text-[34px] italic leading-[1.14] sm:text-[40px]"
                    style={{ fontFamily: brand.fontHeading, color: ink }}
                  >
                    Set a new password
                  </h1>

                  <p
                    data-wf="b-1-0"
                    hidden={!editing && !saving}
                    style={{
                      color: muted,
                      display: editing || saving ? undefined : "none",
                    }}
                    className="mx-auto mt-5 max-w-[46ch] text-center text-[15px] leading-[1.6]"
                  >
                    Choose a new password for{" "}
                    <span className="font-semibold" style={{ color: ink }}>
                      {RESET_EMAIL}
                    </span>
                    . You will be signed out on all devices and can sign in again
                    with the new password.
                  </p>

                  {editing || saving ? (
                    <p
                      className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[13px]"
                      style={{ backgroundColor: tint(ink, 0.07), color: ink }}
                    >
                      <Clock
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                        style={{ color: muted }}
                      />
                      <span style={{ color: muted }}>{SENT_LABEL} · expires in</span>
                      <span
                        style={{ fontVariantNumeric: "tabular-nums", color: ink }}
                        className="font-semibold"
                      >
                        {clock(remaining)}
                      </span>
                      {remaining <= 60 ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                          style={{ backgroundColor: tint(accent, 0.35), color: ink }}
                        >
                          soon
                        </span>
                      ) : null}
                    </p>
                  ) : null}

                  {/* success */}
                  {success ? (
                    <div className="at-rise mt-9 text-center">
                      <span
                        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                        style={{ backgroundColor: tint(accent, 0.32) }}
                      >
                        <CheckCircle
                          className="h-7 w-7"
                          aria-hidden="true"
                          style={{ color: ink }}
                        />
                      </span>
                      <h2
                        className="mt-5 text-[24px] italic"
                        style={{ fontFamily: brand.fontHeading, color: ink }}
                      >
                        Password updated
                      </h2>
                      <p
                        className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-[1.6]"
                        style={{ color: muted }}
                      >
                        we signed out every device and closed this link. sign in
                        once with the new password and your notes are waiting where
                        you left them.
                      </p>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} noValidate className="mt-9">
                    <div
                      data-wf="b-2-0"
                      hidden={!editing && !saving}
                      style={{ display: editing || saving ? undefined : "none" }}
                      className="space-y-7"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-3 px-2">
                          <Label
                            htmlFor="new-password"
                            className="text-[14px] font-semibold"
                            style={{ color: ink }}
                          >
                            New password
                          </Label>
                          <span
                            id="new-password-hint"
                            className="text-[12px]"
                            style={{ color: muted }}
                          >
                            at least {MIN_LENGTH} characters
                          </span>
                        </div>
                        <Input
                          data-wf="i-2-0-0"
                          id="new-password"
                          ref={pw1Ref}
                          type="password"
                          autoComplete="new-password"
                          value={pw1}
                          disabled={saving}
                          onChange={(e) => {
                            setPw1(e.target.value);
                            if (errors.pw1) setErrors({ ...errors, pw1: "" });
                          }}
                          aria-invalid={errors.pw1 ? "true" : "false"}
                          aria-describedby={
                            "new-password-hint new-password-strength" +
                            (errors.pw1 ? " new-password-error" : "")
                          }
                          className="at-focus mt-2 w-full px-6 text-[15px]"
                          style={
                            errors.pw1
                              ? { ...fieldStyle, ...errorFieldStyle }
                              : fieldStyle
                          }
                        />
                        <div
                          id="new-password-strength"
                          className="mt-3 flex items-center gap-3 px-2"
                        >
                          <span className="flex gap-1.5" aria-hidden="true">
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className="block h-1.5 w-9 rounded-full transition-colors"
                                style={{
                                  backgroundColor:
                                    pw1 && i < score
                                      ? accent
                                      : tint(ink, 0.14),
                                }}
                              />
                            ))}
                          </span>
                          <span className="text-[12px]" style={{ color: muted }}>
                            {pw1
                              ? score === 0
                                ? STRENGTH_WORDS[0]
                                : STRENGTH_WORDS[score - 1]
                              : "a short phrase you'll remember works well"}
                          </span>
                        </div>
                        {errors.pw1 ? (
                          <p
                            id="new-password-error"
                            role="alert"
                            className="at-rise mt-3 flex items-start gap-2 rounded-[18px] px-4 py-2.5 text-[13px] leading-[1.5]"
                            style={{ backgroundColor: tint(ink, 0.08), color: ink }}
                          >
                            <AlertCircle
                              className="mt-0.5 h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{errors.pw1}</span>
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <Label
                          htmlFor="confirm-password"
                          className="px-2 text-[14px] font-semibold"
                          style={{ color: ink }}
                        >
                          Confirm new password
                        </Label>
                        <Input
                          data-wf="i-2-0-1"
                          id="confirm-password"
                          ref={pw2Ref}
                          type="password"
                          autoComplete="new-password"
                          value={pw2}
                          disabled={saving}
                          onChange={(e) => {
                            setPw2(e.target.value);
                            if (errors.pw2) setErrors({ ...errors, pw2: "" });
                          }}
                          aria-invalid={errors.pw2 ? "true" : "false"}
                          aria-describedby={
                            errors.pw2 ? "confirm-password-error" : undefined
                          }
                          className="at-focus mt-2 w-full px-6 text-[15px]"
                          style={
                            errors.pw2
                              ? { ...fieldStyle, ...errorFieldStyle }
                              : fieldStyle
                          }
                        />
                        {errors.pw2 ? (
                          <p
                            id="confirm-password-error"
                            role="alert"
                            className="at-rise mt-3 flex items-start gap-2 rounded-[18px] px-4 py-2.5 text-[13px] leading-[1.5]"
                            style={{ backgroundColor: tint(ink, 0.08), color: ink }}
                          >
                            <AlertCircle
                              className="mt-0.5 h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{errors.pw2}</span>
                          </p>
                        ) : pw1 && pw2 && pw1 === pw2 && pw1.length >= MIN_LENGTH ? (
                          <p
                            className="at-rise mt-3 flex items-center gap-2 px-2 text-[13px]"
                            style={{ color: muted }}
                          >
                            <Check className="h-4 w-4" aria-hidden="true" />
                            both entries match
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <Button
                      data-wf="b-3-0"
                      type="submit"
                      disabled={saving}
                      aria-busy={saving ? "true" : "false"}
                      hidden={expired}
                      className="at-primary at-focus mt-9 flex w-full items-center justify-center gap-2 text-[15px] font-semibold"
                      style={{
                        display: expired ? "none" : undefined,
                        backgroundColor: ink,
                        color: paper,
                        borderRadius: "999px",
                        height: "56px",
                        border: "none",
                        opacity: saving ? 0.75 : 1,
                        cursor: saving ? "wait" : "pointer",
                        fontFamily: brand.fontBody,
                      }}
                    >
                      {saving ? (
                        <React.Fragment>
                          <span aria-hidden="true" className="flex gap-1">
                            <span
                              className="at-dot block h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: paper }}
                            />
                            <span
                              className="at-dot block h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: paper, animationDelay: ".15s" }}
                            />
                            <span
                              className="at-dot block h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: paper, animationDelay: ".3s" }}
                            />
                          </span>
                          saving and signing out your devices…
                        </React.Fragment>
                      ) : success ? (
                        <React.Fragment>
                          Go to sign in
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </React.Fragment>
                      ) : (
                        "Save new password"
                      )}
                    </Button>
                  </form>

                  {/* expired link state */}
                  <div
                    data-wf="b-4-0"
                    hidden={!expired}
                    style={{ display: expired ? undefined : "none" }}
                    className="at-rise mt-9 text-center"
                  >
                    <span
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                      style={{ backgroundColor: tint(ink, 0.1) }}
                    >
                      <AlertCircle
                        className="h-7 w-7"
                        aria-hidden="true"
                        style={{ color: ink }}
                      />
                    </span>
                    <p
                      className="mx-auto mt-5 max-w-[42ch] text-[16px] font-semibold leading-[1.5]"
                      style={{ color: ink }}
                    >
                      This reset link has expired or has already been used.
                    </p>
                    <p
                      className="mx-auto mt-3 max-w-[44ch] text-[14px] leading-[1.6]"
                      style={{ color: muted }}
                    >
                      links last 60 minutes and work once. the one {SENT_LABEL} to{" "}
                      {RESET_EMAIL} is closed now — ask for a fresh one and your
                      notes stay untouched in the meantime.
                    </p>
                  </div>

                  <div
                    hidden={!expired}
                    style={{ display: expired ? undefined : "none" }}
                    className="at-rise at-rise-2 mt-7 flex justify-center"
                  >
                    <button
                      data-wf="b-5-0"
                      type="button"
                      onClick={() => navigate("sign-in")}
                      className="at-ghost at-focus inline-flex min-h-[56px] items-center gap-2 px-7 text-[15px] font-semibold underline underline-offset-4"
                      style={{
                        backgroundColor: tint(ink, 0.07),
                        color: ink,
                        borderRadius: "999px",
                        border: "1px solid " + tint(ink, 0.18),
                        fontFamily: brand.fontBody,
                      }}
                    >
                      Request a new reset link
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>

              <p
                className="mt-7 px-4 text-center text-[13px] leading-[1.6]"
                style={{ color: muted }}
              >
                nobody at notepad 9 can read your password — we only ever keep a
                hashed copy.
              </p>
            </div>
          </main>

          {/* brand aside */}
          <aside className="at-rise at-rise-3 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-10">
            <p
              className="text-[26px] italic"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              notepad 9
            </p>

            <div
              className="mt-10 flex h-56 w-40 flex-col justify-end gap-4 p-6"
              style={{
                backgroundColor: tint(ink, 0.07),
                borderRadius: "80px 80px 24px 24px",
              }}
              aria-hidden="true"
            >
              {RULE_WIDTHS.map((w, i) => (
                <span
                  key={w + i}
                  className="block h-px"
                  style={{
                    width: w,
                    backgroundColor: i === 1 ? accent : tint(ink, 0.26),
                  }}
                />
              ))}
            </div>

            <h2
              className="mt-10 max-w-[18ch] text-[28px] italic leading-[1.25]"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              one quiet place for your notes
            </h2>

            <ul className="mt-6 max-w-[40ch] space-y-3">
              {SAFETY_NOTES.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: tint(accent, 0.3) }}
                  >
                    <Check
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                      style={{ color: ink }}
                    />
                  </span>
                  <span className="text-[14px] leading-[1.6]" style={{ color: muted }}>
                    {note}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[12px]" style={{ color: muted }}>
              free to use · no tiers, no card
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

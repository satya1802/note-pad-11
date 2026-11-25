// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, Input, Label, Badge } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { User, Clock, Trash, AlertCircle, CheckCircle } = Icons;

const CLAY = '#9c4a2f'; // terracotta from the Atrium direction — reserved for destructive actions only

const ACCOUNT = {
  email: 'satya.ganaraju@quorq.ai',
  created_at: '3 Mar 2026',
  notes: 48,
  folders: 6,
  tags: 11,
  trashed: 3,
  thisDevice: 'chrome on macos · session started 21 nov 2026',
  otherSessions: 2,
  syncedAgo: '2 minutes ago',
};

const hexToRgba = (hex, alpha) => {
  const n = parseInt(String(hex).replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const cream = brand.backgroundColor;
  const gold = brand.accentColor;
  const neutral = brand.neutralColor;

  const [signOutState, setSignOutState] = React.useState('idle'); // idle | working
  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState('');
  const [confirmError, setConfirmError] = React.useState('');
  const [deletePhase, setDeletePhase] = React.useState('idle'); // idle | working | done

  const timers = React.useRef([]);
  const inputRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const deleteTriggerRef = React.useRef(null);

  React.useEffect(() => {
    return () => { timers.current.forEach((t) => clearTimeout(t)); };
  }, []);

  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

  React.useEffect(() => {
    if (modalOpen && inputRef.current) inputRef.current.focus();
  }, [modalOpen]);

  const closeModal = () => {
    if (deletePhase !== 'idle') return;
    setModalOpen(false);
    setConfirmText('');
    setConfirmError('');
    if (deleteTriggerRef.current) deleteTriggerRef.current.focus();
  };

  const handleSignOut = () => {
    if (signOutState === 'working') return;
    setSignOutState('working');
    later(() => navigate('sign-in'), 700);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    if (deletePhase !== 'idle') return;
    if (confirmText.trim() === '') {
      setConfirmError('type DELETE in the box above to confirm. nothing is removed until you do.');
      return;
    }
    if (confirmText.trim() !== 'DELETE') {
      setConfirmError('that didn’t match. type DELETE in capital letters — we kept what you typed.');
      return;
    }
    setConfirmError('');
    setDeletePhase('working');
    later(() => setDeletePhase('done'), 1100);
    later(() => navigate('sign-in'), 2400);
  };

  const onPanelKeyDown = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); closeModal(); return; }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])');
    const list = Array.prototype.filter.call(nodes, (n) => !n.disabled);
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const focusRing = {
    outlineColor: ink,
  };

  const surface = {
    backgroundColor: hexToRgba(ink, 0.05),
    border: `1px solid ${hexToRgba(ink, 0.12)}`,
  };

  const pillBase = 'inline-flex items-center justify-center gap-2 px-6 h-12 text-[15px] font-medium rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60';

  return (
    <div
      className="w-full min-h-full px-5 py-10 sm:px-8 sm:py-14"
      style={{ backgroundColor: cream, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        @keyframes atrium-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes atrium-veil { from { opacity: 0; } to { opacity: 1; } }
        @keyframes atrium-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .atrium-rise { animation: atrium-rise 260ms ease-out both; }
        .atrium-veil { animation: atrium-veil 200ms ease-out both; }
        .atrium-pulse { animation: atrium-pulse 1200ms ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-veil, .atrium-pulse { animation: none !important; }
          * { transition-duration: 1ms !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-3xl">

        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="mb-10">
          <h1
            className="text-[34px] sm:text-[40px] italic leading-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            Account settings
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: neutral, maxWidth: '62ch' }}>
            your notebook, your account. everything here affects only you — notes are never shared.
          </p>
        </header>

        {/* Row 2 — account card */}
        <Card
          data-wf="b-1-0"
          className="atrium-rise relative overflow-hidden px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 text-center"
          style={{
            backgroundColor: hexToRgba(gold, 0.09),
            border: `1px solid ${hexToRgba(ink, 0.12)}`,
            borderRadius: '150px 150px 24px 24px',
            boxShadow: 'none',
          }}
        >
          <div
            className="mx-auto mb-6 flex items-end justify-center"
            style={{
              width: 64,
              height: 74,
              borderRadius: '32px 32px 10px 10px',
              backgroundColor: hexToRgba(cream, 0.9),
              border: `1px solid ${hexToRgba(ink, 0.18)}`,
            }}
          >
            <span className="mb-4" aria-hidden="true">
              <User className="h-7 w-7" style={{ color: ink }} />
            </span>
          </div>

          <h2 className="sr-only">Your account</h2>

          <dl className="space-y-5">
            <div>
              <dt className="text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral }}>Email</dt>
              <dd
                className="mt-1 text-[22px] sm:text-[26px] italic break-words"
                style={{ fontFamily: brand.fontHeading, fontVariantNumeric: 'tabular-nums' }}
              >
                {ACCOUNT.email}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-[0.14em]" style={{ color: neutral }}>Account created</dt>
              <dd className="mt-1 text-[16px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {ACCOUNT.created_at}
              </dd>
            </div>
          </dl>

          <div className="mx-auto mt-7 max-w-md">
            <div style={{ borderTop: `1px solid ${hexToRgba(ink, 0.14)}` }} />
          </div>

          <p
            className="mt-6 text-[14px]"
            style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}
          >
            {ACCOUNT.notes} notes · {ACCOUNT.folders} folders · {ACCOUNT.tags} tags · {ACCOUNT.trashed} in trash
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Badge
              className="rounded-full px-4 py-1.5 text-[13px]"
              style={{ backgroundColor: hexToRgba(ink, 0.08), color: ink, border: `1px solid ${hexToRgba(ink, 0.14)}` }}
            >
              free to use — no billing, no tiers
            </Badge>
            <span className="inline-flex items-center gap-2 text-[13px]" style={{ color: neutral }}>
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>synced {ACCOUNT.syncedAgo}</span>
            </span>
          </div>
        </Card>

        {/* Rows 3 & 4 — sessions and account deletion */}
        <section className="mt-8 rounded-[24px]" style={surface}>
          <h2 className="sr-only">Sessions and account removal</h2>

          {/* Row 3 */}
          <div className="grid grid-cols-12 items-center gap-5 px-6 py-8 sm:px-9">
            <div data-wf="b-2-0" className="col-span-12 md:col-span-8">
              <h3 className="text-[19px] italic" style={{ fontFamily: brand.fontHeading }}>
                Signed in on this device
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ maxWidth: '58ch' }}>
                You stay signed in on each device you use. Signing out ends the session on this device only.
              </p>
              <p className="mt-2 text-[13px]" style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}>
                {ACCOUNT.thisDevice} · {ACCOUNT.otherSessions} other devices stay signed in
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Button
                data-wf="b-2-1"
                type="button"
                onClick={handleSignOut}
                disabled={signOutState === 'working'}
                aria-live="polite"
                className={pillBase + ' w-full md:w-auto'}
                style={{
                  backgroundColor: ink,
                  color: cream,
                  border: `1px solid ${ink}`,
                  ...focusRing,
                }}
              >
                {signOutState === 'working' ? (
                  <>
                    <span className="atrium-pulse" aria-hidden="true">
                      <Clock className="h-4 w-4" />
                    </span>
                    signing out…
                  </>
                ) : (
                  'Sign out'
                )}
              </Button>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${hexToRgba(ink, 0.12)}` }} />

          {/* Row 4 */}
          <div className="grid grid-cols-12 items-center gap-5 px-6 py-8 sm:px-9">
            <div data-wf="b-3-0" className="col-span-12 md:col-span-8">
              <h3 className="text-[19px] italic" style={{ fontFamily: brand.fontHeading, color: CLAY }}>
                Delete this account
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ maxWidth: '58ch' }}>
                Deleting your account permanently removes your notes, folders, tags and everything in the trash, and ends all sessions.
              </p>
              <p className="mt-2 text-[13px]" style={{ color: neutral }}>
                this cannot be undone, and nothing is kept in backup. if you only want a clean list,{' '}
                <button
                  type="button"
                  onClick={() => navigate('trash')}
                  className="underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ color: ink, ...focusRing }}
                >
                  empty the trash instead
                </button>
                .
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Button
                data-wf="b-3-1"
                type="button"
                ref={deleteTriggerRef}
                onClick={() => { setModalOpen(true); setConfirmError(''); }}
                className={pillBase + ' w-full md:w-auto'}
                style={{
                  backgroundColor: 'transparent',
                  color: CLAY,
                  border: `1px solid ${hexToRgba(CLAY, 0.45)}`,
                  outlineColor: CLAY,
                }}
              >
                <Trash className="h-4 w-4" aria-hidden="true" />
                Delete my account
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Row 5 — confirmation modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 atrium-veil"
          style={{ backgroundColor: hexToRgba(ink, 0.48) }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            data-wf="b-4-0"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            aria-describedby="delete-account-desc"
            onKeyDown={onPanelKeyDown}
            className="atrium-rise w-full max-w-lg px-6 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14"
            style={{
              backgroundColor: cream,
              borderRadius: '110px 110px 24px 24px',
              border: `1px solid ${hexToRgba(ink, 0.14)}`,
              boxShadow: `0 24px 60px ${hexToRgba(ink, 0.28)}`,
              color: ink,
            }}
          >
            {deletePhase === 'done' ? (
              <div className="text-center">
                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(ink, 0.08) }}>
                  <CheckCircle className="h-6 w-6" style={{ color: ink }} aria-hidden="true" />
                </span>
                <h2 id="delete-account-title" className="text-[24px] italic" style={{ fontFamily: brand.fontHeading }}>
                  Your account is gone
                </h2>
                <p id="delete-account-desc" className="mt-3 text-[15px] leading-relaxed" style={{ color: neutral }} aria-live="polite">
                  all {ACCOUNT.notes} notes, {ACCOUNT.folders} folders and {ACCOUNT.tags} tags were removed and every session ended. taking you to the sign-in page…
                </p>
              </div>
            ) : (
              <>
                <h2
                  id="delete-account-title"
                  className="text-center text-[24px] sm:text-[27px] italic leading-snug"
                  style={{ fontFamily: brand.fontHeading }}
                >
                  Permanently delete your account and all notes?
                </h2>
                <p
                  id="delete-account-desc"
                  className="mt-4 text-center text-[15px] leading-relaxed"
                  style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}
                >
                  {ACCOUNT.notes} notes, {ACCOUNT.folders} folders, {ACCOUNT.tags} tags and {ACCOUNT.trashed} items in trash will be erased for {ACCOUNT.email}. there is no way back.
                </p>

                <form onSubmit={handleDeleteSubmit} className="mt-8">
                  <Label htmlFor="confirm-delete" className="block text-[13px] uppercase tracking-[0.14em]" style={{ color: ink }}>
                    Type DELETE to confirm
                  </Label>
                  <Input
                    data-wf="i-4-0-0"
                    id="confirm-delete"
                    ref={inputRef}
                    value={confirmText}
                    onChange={(e) => { setConfirmText(e.target.value); if (confirmError) setConfirmError(''); }}
                    disabled={deletePhase === 'working'}
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid={confirmError ? 'true' : 'false'}
                    aria-describedby={confirmError ? 'confirm-delete-error' : 'confirm-delete-hint'}
                    placeholder="DELETE"
                    className="mt-3 w-full h-12 rounded-full px-5 text-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      backgroundColor: hexToRgba(cream, 1),
                      border: `1px solid ${confirmError ? CLAY : hexToRgba(ink, 0.22)}`,
                      color: ink,
                      outlineColor: confirmError ? CLAY : ink,
                      letterSpacing: '0.08em',
                    }}
                  />
                  {confirmError ? (
                    <p
                      id="confirm-delete-error"
                      role="alert"
                      className="mt-3 flex items-start gap-2 text-[14px]"
                      style={{ color: CLAY }}
                    >
                      <AlertCircle className="h-4 w-4 mt-[2px] shrink-0" aria-hidden="true" />
                      <span>{confirmError}</span>
                    </p>
                  ) : (
                    <p id="confirm-delete-hint" className="mt-3 text-[13px]" style={{ color: neutral }}>
                      capital letters, exactly as shown.
                    </p>
                  )}

                  {deletePhase === 'working' && (
                    <p className="mt-5 flex items-center gap-2 text-[14px]" style={{ color: ink }} aria-live="polite">
                      <span className="atrium-pulse" aria-hidden="true"><Clock className="h-4 w-4" /></span>
                      removing your notes, folders and tags…
                    </p>
                  )}

                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <Button
                      data-wf="i-4-0-1"
                      type="button"
                      onClick={closeModal}
                      disabled={deletePhase === 'working'}
                      className={pillBase}
                      style={{
                        backgroundColor: 'transparent',
                        color: ink,
                        border: `1px solid ${hexToRgba(ink, 0.22)}`,
                        ...focusRing,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      data-wf="i-4-0-2"
                      type="submit"
                      disabled={deletePhase === 'working'}
                      className={pillBase}
                      style={{
                        backgroundColor: CLAY,
                        color: cream,
                        border: `1px solid ${CLAY}`,
                        outlineColor: ink,
                      }}
                    >
                      <Trash className="h-4 w-4" aria-hidden="true" />
                      {deletePhase === 'working' ? 'deleting…' : 'Delete account'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

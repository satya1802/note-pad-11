// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Label, Select, Checkbox, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { X, Clock, Trash, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const INK = brand.primaryColor;
const CREAM = brand.backgroundColor;
const ACCENT = brand.accentColor;
const NEUTRAL = brand.neutralColor;

const hexToRgb = (hex) => {
  const h = String(hex).replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const tint = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const mix = (hex, other, amount) => {
  const a = hexToRgb(hex);
  const b = hexToRgb(other);
  const m = a.map((v, i) => Math.round(v * amount + b[i] * (1 - amount)));
  return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
};

const MUTED = mix(INK, CREAM, 0.74);
const SOFT = mix(NEUTRAL, CREAM, 0.9);
const PANEL = tint(INK, 0.06);
const HAIRLINE = tint(INK, 0.12);

const TRASHED_NOTES = [
  {
    id: 'n-8431',
    title: 'Winter pruning — apple espalier',
    preview: 'three buds on each spur once the hard frost has passed; keep the leader tied in…',
    folder: 'Herb journal',
    lastEditedDate: '20 Nov 2026',
    lastEditedTime: '09:14',
    trashedDate: '24 Nov 2026',
    daysLeft: 29,
  },
  {
    id: 'n-8402',
    title: 'Seed order 2027 — Chiltern & Vital',
    preview: 'broad beans (aquadulce), cavolo nero, two packets of calendula for the path edge…',
    folder: 'Seed orders',
    lastEditedDate: '18 Nov 2026',
    lastEditedTime: '16:40',
    trashedDate: '23 Nov 2026',
    daysLeft: 28,
  },
  {
    id: 'n-8377',
    title: 'Draft: letter to the allotment committee',
    preview: 'the water butt by plot 14 has stood empty since August — asking whether the…',
    folder: null,
    lastEditedDate: '14 Nov 2026',
    lastEditedTime: '21:02',
    trashedDate: '22 Nov 2026',
    daysLeft: 27,
  },
  {
    id: 'n-8350',
    title: 'Compost temperatures — week 46',
    preview: 'heap B sat at 58°c on tuesday, turned it thursday and it dropped to 41°c…',
    folder: 'Compost log',
    lastEditedDate: '21 Nov 2026',
    lastEditedTime: '07:35',
    trashedDate: '21 Nov 2026',
    daysLeft: 26,
  },
  {
    id: 'n-8298',
    title: 'Thistle Hollow — soil test numbers',
    preview: 'pH 6.4 on the top beds, 5.9 down by the hedge. phosphorus still low after two…',
    folder: 'Soil tests',
    lastEditedDate: '9 Nov 2026',
    lastEditedTime: '13:20',
    trashedDate: '19 Nov 2026',
    daysLeft: 24,
  },
  {
    id: 'n-8211',
    title: 'Shopping list (duplicate)',
    preview: 'oat milk, tahini, lemons — already written this one twice this month',
    folder: null,
    lastEditedDate: '1 Nov 2026',
    lastEditedTime: '18:05',
    trashedDate: '2 Nov 2026',
    daysLeft: 7,
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState(TRASHED_NOTES);
  const [selected, setSelected] = React.useState(['n-8431']);
  const [loading, setLoading] = React.useState(true);
  const [pending, setPending] = React.useState(null);
  const [banner, setBanner] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const [syncLabel, setSyncLabel] = React.useState('trash synced 4 minutes ago');
  const [leaving, setLeaving] = React.useState(false);
  const serverRefusedOnce = React.useRef(false);
  const cancelRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  // first load of GET /trash
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 520);
    return () => clearTimeout(t);
  }, []);

  // POST /notes/{id}/restore  ·  DELETE /notes/{id}  ·  DELETE /trash
  React.useEffect(() => {
    if (!pending) return undefined;
    const t = setTimeout(() => {
      const ids = pending.ids;
      const touched = notes.filter((n) => ids.includes(n.id));
      if (pending.kind === 'delete') {
        if (!serverRefusedOnce.current) {
          serverRefusedOnce.current = true;
          setPending(null);
          setBanner({
            tone: 'error',
            text:
              ids.length === 1
                ? 'we couldn’t reach your trash just then, so nothing was deleted. the note is still ticked below — press delete permanently again when you’re ready.'
                : `we couldn’t reach your trash just then, so nothing was deleted. all ${ids.length} notes are still ticked below — press delete permanently again when you’re ready.`,
          });
          return;
        }
        setNotes((ns) => ns.filter((n) => !ids.includes(n.id)));
        setSelected((s) => s.filter((id) => !ids.includes(id)));
        setSyncLabel('trash synced just now');
        setBanner({
          tone: 'success',
          text:
            ids.length === 1
              ? `“${touched[0] ? touched[0].title : 'that note'}” is gone for good.`
              : `${ids.length} notes are gone for good — the trash is clear.`,
        });
        setPending(null);
      } else {
        setNotes((ns) => ns.filter((n) => !ids.includes(n.id)));
        setSelected([]);
        setSyncLabel('trash synced just now');
        setBanner({
          tone: 'success',
          text:
            ids.length === 1
              ? `“${touched[0] ? touched[0].title : 'that note'}” is back in ${touched[0] && touched[0].folder ? touched[0].folder : 'my notes'} — taking you there…`
              : `${ids.length} notes are back where they were — taking you to my notes…`,
        });
        setPending(null);
        setLeaving(true);
      }
    }, 760);
    return () => clearTimeout(t);
  }, [pending, notes]);

  React.useEffect(() => {
    if (!leaving) return undefined;
    const t = setTimeout(() => navigate('notes'), 1200);
    return () => clearTimeout(t);
  }, [leaving]);

  React.useEffect(() => {
    if (modal && cancelRef.current) cancelRef.current.focus();
  }, [modal]);

  const busy = pending !== null || leaving;
  const selectedNotes = notes.filter((n) => selected.includes(n.id));

  const toggle = (id) => {
    setBanner(null);
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.concat(id)));
  };

  const closeModal = () => {
    setModal(null);
    if (returnFocusRef.current) returnFocusRef.current.focus();
  };

  const openModal = (ids, origin, event) => {
    returnFocusRef.current = event && event.currentTarget ? event.currentTarget : null;
    setBanner(null);
    setModal({ ids, origin });
  };

  const onDialogKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const first = cancelRef.current;
      const last = confirmRef.current;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const pillBase =
    'inline-flex items-center justify-center gap-2 atrium-focus transition-all duration-200 text-[15px] font-semibold';
  const pillStyle = {
    borderRadius: '999px',
    minHeight: '48px',
    paddingLeft: '24px',
    paddingRight: '24px',
    fontFamily: brand.fontBody,
  };

  const restoreHelper = () => {
    if (pending && pending.kind === 'restore') return 'putting it back where it was…';
    if (selected.length === 0) return 'tick a note above to put it back, or to remove it for good.';
    if (selected.length === 1) {
      const n = selectedNotes[0];
      return `“${n.title}” goes back to ${n.folder ? n.folder : 'my notes, unfiled'}.`;
    }
    return `${selected.length} notes go back to the folders they came from.`;
  };

  const css = `
    .atrium-focus:focus-visible { outline: 2px solid ${ACCENT} !important; outline-offset: 3px !important; }
    @keyframes atrium-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes atrium-arch { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: none; } }
    @keyframes atrium-veil { from { opacity: 0; } to { opacity: 1; } }
    @keyframes atrium-breathe { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.8; } }
    .atrium-rise { animation: atrium-rise 420ms cubic-bezier(0.22, 0.9, 0.3, 1) both; }
    .atrium-arch-in { animation: atrium-arch 320ms cubic-bezier(0.22, 0.9, 0.3, 1) both; }
    .atrium-veil-in { animation: atrium-veil 200ms ease both; }
    .atrium-breathe { animation: atrium-breathe 1.6s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .atrium-rise, .atrium-arch-in, .atrium-veil-in, .atrium-breathe { animation: none !important; }
      * { transition-duration: 1ms !important; }
    }
  `;

  const trashEmpty = !loading && notes.length === 0;

  return (
    <div style={{ backgroundColor: CREAM, color: INK, fontFamily: brand.fontBody }} className="min-h-full">
      <style>{css}</style>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 sm:col-span-8" data-wf="b-0-0">
            <h1
              className="text-[34px] sm:text-[44px] leading-tight"
              style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', letterSpacing: '-0.01em' }}
            >
              Trash
            </h1>
            <div
              aria-hidden="true"
              className="mt-3 h-[3px] w-16"
              style={{ backgroundColor: ACCENT, borderRadius: '999px' }}
            />
          </div>
          <div className="col-span-12 sm:col-span-4 flex sm:justify-end">
            <Button
              data-wf="b-0-1"
              type="button"
              disabled={notes.length === 0 || busy || loading}
              onClick={(e) => openModal(notes.map((n) => n.id), 'all', e)}
              className={pillBase + ' w-full sm:w-auto'}
              style={{
                ...pillStyle,
                backgroundColor: 'transparent',
                color: notes.length === 0 || busy || loading ? SOFT : INK,
                border: `1px solid ${notes.length === 0 || busy || loading ? tint(INK, 0.12) : tint(INK, 0.28)}`,
                cursor: notes.length === 0 || busy || loading ? 'not-allowed' : 'pointer',
              }}
            >
              <Trash aria-hidden="true" className="h-4 w-4" />
              Empty trash
            </Button>
          </div>
        </div>

        {/* Row 2 */}
        <p
          data-wf="b-1-0"
          className="mt-6 max-w-[64ch] text-[15px] leading-7"
          style={{ color: MUTED }}
        >
          Notes in the trash are not shown in my notes and are not returned by search. Restore a note to put it back
          where it was.
        </p>

        {!trashEmpty && (
          <>
            {/* Row 3 */}
            <section
              data-wf="b-2-0"
              aria-labelledby="trash-count"
              aria-busy={loading || busy ? 'true' : 'false'}
              className="mt-8 overflow-hidden atrium-rise"
              style={{ backgroundColor: PANEL, borderRadius: brand.radius }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 sm:px-7 pt-6 pb-4">
                <h2
                  id="trash-count"
                  className="text-[21px]"
                  style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}
                >
                  {loading
                    ? 'gathering your trash…'
                    : `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} in trash`}
                </h2>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[12px]"
                  style={{ backgroundColor: CREAM, color: MUTED, borderRadius: '999px' }}
                >
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  {syncLabel}
                </span>
              </div>

              <div className="px-5 sm:px-7 pb-1" role="status" aria-live="polite">
                {banner && (
                  <div
                    className="atrium-rise mb-4 flex items-start gap-3 px-4 py-3"
                    style={{
                      backgroundColor: CREAM,
                      borderRadius: '18px',
                      border: `1px solid ${banner.tone === 'error' ? tint(INK, 0.3) : tint(ACCENT, 0.55)}`,
                      color: INK,
                    }}
                  >
                    {banner.tone === 'error' ? (
                      <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <CheckCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    )}
                    <p className="text-[14px] leading-6">
                      <span className="font-semibold">{banner.tone === 'error' ? 'nothing was deleted. ' : ''}</span>
                      {banner.text}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-2 sm:px-3 pb-3">
                <div className="overflow-x-auto" style={{ backgroundColor: CREAM, borderRadius: '20px' }}>
                  {loading ? (
                    <div className="px-5 py-6 space-y-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div
                            className="atrium-breathe h-10 w-9"
                            style={{
                              backgroundColor: tint(ACCENT, 0.2),
                              borderRadius: '18px 18px 6px 6px',
                              animationDelay: `${i * 160}ms`,
                            }}
                          />
                          <div className="flex-1 space-y-2">
                            <div
                              className="atrium-breathe h-3"
                              style={{ backgroundColor: tint(INK, 0.14), borderRadius: '999px', width: '42%', animationDelay: `${i * 160}ms` }}
                            />
                            <div
                              className="atrium-breathe h-3"
                              style={{ backgroundColor: tint(INK, 0.08), borderRadius: '999px', width: '66%', animationDelay: `${i * 160 + 80}ms` }}
                            />
                          </div>
                        </div>
                      ))}
                      <p className="text-[13px]" style={{ color: MUTED }}>
                        reading the notes you’ve thrown away…
                      </p>
                    </div>
                  ) : (
                    <Table className="w-full min-w-[720px] border-collapse" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      <THead>
                        <TR style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                          <TH scope="col" className="w-12 px-4 py-3 text-left">
                            <span className="sr-only">Select note</span>
                          </TH>
                          <TH
                            scope="col"
                            data-wf="i-2-0-0"
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase"
                            style={{ color: MUTED, letterSpacing: '0.14em' }}
                          >
                            Title
                          </TH>
                          <TH
                            scope="col"
                            data-wf="i-2-0-1"
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase"
                            style={{ color: MUTED, letterSpacing: '0.14em' }}
                          >
                            Folder
                          </TH>
                          <TH
                            scope="col"
                            data-wf="i-2-0-2"
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase"
                            style={{ color: MUTED, letterSpacing: '0.14em' }}
                          >
                            Last edited
                          </TH>
                          <TH
                            scope="col"
                            data-wf="i-2-0-3"
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase"
                            style={{ color: MUTED, letterSpacing: '0.14em' }}
                          >
                            Moved to trash
                          </TH>
                        </TR>
                      </THead>
                      <TBody>
                        {notes.map((n, i) => {
                          const isSelected = selected.includes(n.id);
                          const isPending = pending !== null && pending.ids.includes(n.id);
                          return (
                            <TR
                              key={n.id}
                              className="atrium-rise transition-colors duration-200"
                              style={{
                                borderBottom: i === notes.length - 1 ? 'none' : `1px solid ${HAIRLINE}`,
                                backgroundColor: isSelected ? tint(ACCENT, 0.13) : 'transparent',
                                opacity: isPending ? 0.55 : 1,
                                animationDelay: `${i * 45}ms`,
                              }}
                            >
                              <TD className="px-4 py-4 align-top">
                                <Label htmlFor={`select-${n.id}`} className="sr-only">
                                  Select “{n.title}”
                                </Label>
                                <Checkbox
                                  id={`select-${n.id}`}
                                  checked={isSelected}
                                  disabled={busy}
                                  onChange={() => toggle(n.id)}
                                  className="atrium-focus"
                                />
                              </TD>
                              <TD className="px-4 py-4 align-top">
                                <div className="flex items-start gap-3">
                                  <span
                                    aria-hidden="true"
                                    className="grid h-10 w-9 shrink-0 place-items-center text-[15px]"
                                    style={{
                                      backgroundColor: isSelected ? tint(ACCENT, 0.3) : tint(INK, 0.08),
                                      borderRadius: '18px 18px 6px 6px',
                                      fontFamily: brand.fontHeading,
                                      fontStyle: 'italic',
                                      color: INK,
                                    }}
                                  >
                                    {n.title.charAt(0)}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex flex-wrap items-center gap-2">
                                      <span className="text-[15px] font-semibold leading-6">{n.title}</span>
                                      {isPending && (
                                        <span className="text-[12px] italic" style={{ color: MUTED }}>
                                          {pending.kind === 'restore' ? 'restoring…' : 'deleting…'}
                                        </span>
                                      )}
                                    </span>
                                    <span
                                      className="mt-1 block max-w-[34ch] truncate text-[13px] leading-5"
                                      style={{ color: MUTED }}
                                    >
                                      {n.preview}
                                    </span>
                                  </span>
                                </div>
                              </TD>
                              <TD className="px-4 py-4 align-top">
                                {n.folder ? (
                                  <Badge
                                    className="inline-flex items-center px-3 py-1 text-[12px] font-medium"
                                    style={{ backgroundColor: tint(INK, 0.08), color: INK, borderRadius: '999px' }}
                                  >
                                    {n.folder}
                                  </Badge>
                                ) : (
                                  <span className="text-[13px] italic" style={{ color: MUTED }}>
                                    unfiled
                                  </span>
                                )}
                              </TD>
                              <TD className="px-4 py-4 align-top text-[13px] leading-5" style={{ color: INK }}>
                                {n.lastEditedDate}
                                <span className="block" style={{ color: MUTED }}>
                                  {n.lastEditedTime}
                                </span>
                              </TD>
                              <TD className="px-4 py-4 align-top text-[13px] leading-5" style={{ color: INK }}>
                                {n.trashedDate}
                                <span
                                  className="mt-1 block text-[12px]"
                                  style={{ color: n.daysLeft <= 10 ? INK : MUTED, fontWeight: n.daysLeft <= 10 ? 600 : 400 }}
                                >
                                  {n.daysLeft <= 10 ? `goes for good in ${n.daysLeft} days` : `${n.daysLeft} days left`}
                                </span>
                              </TD>
                            </TR>
                          );
                        })}
                      </TBody>
                    </Table>
                  )}
                </div>
              </div>

              <p className="px-5 sm:px-7 pb-6 pt-1 text-[13px]" style={{ color: MUTED }}>
                notes rest here for 30 days from the day you delete them, then they leave on their own.
              </p>
            </section>

            {/* Row 4 */}
            <div className="mt-8 grid grid-cols-12 gap-4 items-start">
              <div className="col-span-12 sm:col-span-6">
                <Button
                  data-wf="b-3-0"
                  type="button"
                  disabled={selected.length === 0 || busy}
                  aria-busy={pending && pending.kind === 'restore' ? 'true' : 'false'}
                  onClick={() => {
                    setBanner(null);
                    setPending({ kind: 'restore', ids: selected });
                  }}
                  className={pillBase + ' w-full sm:w-auto'}
                  style={{
                    ...pillStyle,
                    minHeight: '56px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    fontSize: '16px',
                    backgroundColor: selected.length === 0 || busy ? tint(INK, 0.14) : INK,
                    color: selected.length === 0 || busy ? MUTED : CREAM,
                    border: '1px solid transparent',
                    cursor: selected.length === 0 || busy ? 'not-allowed' : 'pointer',
                    boxShadow: selected.length === 0 || busy ? 'none' : `0 10px 24px ${tint(INK, 0.22)}`,
                  }}
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Restore
                  {selected.length > 0 && (
                    <span style={{ fontVariantNumeric: 'tabular-nums', opacity: 0.8 }}>· {selected.length}</span>
                  )}
                </Button>
                <p className="mt-3 max-w-[46ch] text-[13px] leading-6" style={{ color: MUTED }}>
                  {restoreHelper()}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-6 sm:justify-self-end">
                <Button
                  data-wf="b-3-1"
                  type="button"
                  disabled={selected.length === 0 || busy}
                  onClick={(e) => openModal(selected, 'selection', e)}
                  className={pillBase + ' w-full sm:w-auto'}
                  style={{
                    ...pillStyle,
                    backgroundColor: 'transparent',
                    color: selected.length === 0 || busy ? SOFT : INK,
                    border: `1px solid ${selected.length === 0 || busy ? tint(INK, 0.12) : tint(INK, 0.28)}`,
                    cursor: selected.length === 0 || busy ? 'not-allowed' : 'pointer',
                  }}
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                  Delete permanently
                </Button>
                <p className="mt-3 text-[13px] leading-6 sm:text-right" style={{ color: MUTED }}>
                  removes the note from the trash for good.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Row 6 */}
        {trashEmpty && (
          <div data-wf="b-5-0" className="mt-8 atrium-rise">
            <div
              className="px-6 py-14 sm:py-16"
              style={{ backgroundColor: PANEL, borderRadius: brand.radius }}
            >
              <div className="mx-auto mb-8 flex w-full max-w-[420px] items-end justify-center gap-2" aria-hidden="true">
                <span
                  className="h-10 w-7"
                  style={{ backgroundColor: tint(ACCENT, 0.3), borderRadius: '14px 14px 4px 4px' }}
                />
                <span
                  className="h-16 w-11"
                  style={{ backgroundColor: tint(ACCENT, 0.45), borderRadius: '22px 22px 6px 6px' }}
                />
                <span
                  className="h-10 w-7"
                  style={{ backgroundColor: tint(ACCENT, 0.3), borderRadius: '14px 14px 4px 4px' }}
                />
              </div>
              <Empty
                title="The trash is empty."
                description="nothing is waiting here. notes you delete rest in the trash for 30 days, and then they go for good."
                action={
                  <Button
                    type="button"
                    onClick={() => navigate('notes')}
                    className={pillBase}
                    style={{
                      ...pillStyle,
                      backgroundColor: INK,
                      color: CREAM,
                      border: '1px solid transparent',
                      boxShadow: `0 10px 24px ${tint(INK, 0.22)}`,
                    }}
                  >
                    Back to my notes
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Row 5 */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 atrium-veil-in"
          style={{ backgroundColor: tint(INK, 0.45) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            data-wf="b-4-0"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby="confirm-delete-desc"
            onKeyDown={onDialogKeyDown}
            className="atrium-arch-in w-full max-w-[440px]"
            style={{
              backgroundColor: CREAM,
              borderTopLeftRadius: '220px',
              borderTopRightRadius: '220px',
              borderBottomLeftRadius: brand.radius,
              borderBottomRightRadius: brand.radius,
              boxShadow: `0 28px 64px ${tint(INK, 0.32)}`,
            }}
          >
            <div className="px-8 pb-8 pt-14 text-center">
              <span
                className="mx-auto mb-5 grid h-12 w-11 place-items-center"
                style={{ backgroundColor: tint(ACCENT, 0.28), borderRadius: '22px 22px 6px 6px' }}
              >
                <Trash aria-hidden="true" className="h-5 w-5" style={{ color: INK }} />
              </span>
              <h2
                id="confirm-delete-title"
                className="text-[25px] leading-snug"
                style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}
              >
                {modal.ids.length === 1
                  ? 'Permanently delete 1 note?'
                  : `Permanently delete ${modal.ids.length} notes?`}
              </h2>
              <p id="confirm-delete-desc" className="mx-auto mt-3 max-w-[38ch] text-[14px] leading-6" style={{ color: MUTED }}>
                This cannot be undone and they will no longer be found in search.
              </p>

              <ul className="mx-auto mt-5 max-w-[34ch] space-y-1 text-left">
                {notes
                  .filter((n) => modal.ids.includes(n.id))
                  .slice(0, 3)
                  .map((n) => (
                    <li key={n.id} className="flex items-start gap-2 text-[13px] leading-6" style={{ color: INK }}>
                      <span aria-hidden="true" style={{ color: ACCENT }}>
                        ·
                      </span>
                      <span className="truncate">{n.title}</span>
                    </li>
                  ))}
                {modal.ids.length > 3 && (
                  <li className="pl-4 text-[13px] italic" style={{ color: MUTED }}>
                    and {modal.ids.length - 3} more
                  </li>
                )}
              </ul>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                <Button
                  data-wf="i-4-0-0"
                  type="button"
                  ref={cancelRef}
                  onClick={closeModal}
                  className={pillBase}
                  style={{
                    ...pillStyle,
                    backgroundColor: 'transparent',
                    color: INK,
                    border: `1px solid ${tint(INK, 0.28)}`,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  data-wf="i-4-0-1"
                  type="button"
                  ref={confirmRef}
                  onClick={() => {
                    const ids = modal.ids;
                    setModal(null);
                    setBanner(null);
                    setSelected(ids);
                    setPending({ kind: 'delete', ids });
                  }}
                  className={pillBase}
                  style={{
                    ...pillStyle,
                    backgroundColor: INK,
                    color: CREAM,
                    border: '1px solid transparent',
                    boxShadow: `0 10px 24px ${tint(INK, 0.28)}`,
                  }}
                >
                  <Trash aria-hidden="true" className="h-4 w-4" />
                  Delete permanently
                </Button>
              </div>
              <p className="mt-5 text-[12px]" style={{ color: MUTED }}>
                press esc to keep these notes in the trash.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

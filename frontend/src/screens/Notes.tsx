// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Badge, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Search, Check, X, ChevronRight, FileText, Clock, Trash, Filter, AlertCircle } = Icons;

const hexToRgb = (hex) => {
  const h = String(hex || '#000000').replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
};

const rgba = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const FOLDER_SEED = [
  { id: 'f-work', user_id: 'u-7', name: 'Work', created_at: '2026-01-08' },
  { id: 'f-personal', user_id: 'u-7', name: 'Personal', created_at: '2026-01-08' },
  { id: 'f-recipes', user_id: 'u-7', name: 'Recipes', created_at: '2026-03-02' },
];

const TAG_SEED = [
  { id: 't-1', user_id: 'u-7', name: 'ideas' },
  { id: 't-2', user_id: 'u-7', name: 'todo' },
  { id: 't-3', user_id: 'u-7', name: 'reading' },
];

const NOTE_SEED = [
  {
    id: 'n-1041',
    wf: 'i-3-1-0',
    folder_id: 'f-work',
    title: 'Sprint planning notes',
    content_text:
      'Carry the search indexing spike into next sprint — Priya to size it. Cut folder drag-and-drop from scope, keep the tag filter.',
    tags: ['todo', 'ideas'],
    last_edited_at: 'Edited 2 minutes ago',
    is_trashed: false,
  },
  {
    id: 'n-1038',
    wf: 'i-3-1-1',
    folder_id: 'f-personal',
    title: 'Reading list 2026',
    content_text:
      'The Overstory · Piranesi · A Thousand Ships · Thinking in Systems. Borrow from Deptford library before buying anything.',
    tags: ['reading'],
    last_edited_at: 'Edited yesterday, 18:40',
    is_trashed: false,
  },
  {
    id: 'n-1036',
    wf: 'i-3-1-2',
    folder_id: 'f-personal',
    title: 'Flat move checklist',
    content_text:
      'Meter readings on the 28th, redirect post for six months, ask Mo about the van Saturday morning, cancel the fibre line.',
    tags: ['todo'],
    last_edited_at: 'Edited 21 Nov 2026',
    is_trashed: false,
  },
  {
    id: 'n-1031',
    wf: 'i-3-1-3',
    folder_id: 'f-recipes',
    title: 'Bread dough timings',
    content_text:
      '80% hydration, autolyse 40 minutes, three sets of folds twenty minutes apart, cold retard overnight at 4°C.',
    tags: [],
    last_edited_at: 'Edited 14 Nov 2026',
    is_trashed: false,
  },
  {
    id: 'n-1029',
    folder_id: 'f-work',
    title: 'Retro: November release',
    content_text:
      'What held: the Friday freeze. What hurt: three hotfixes from one untested migration. Action — Dan writes the rollback runbook.',
    tags: ['ideas', 'todo'],
    last_edited_at: 'Edited 23 Nov 2026, 16:05',
    is_trashed: false,
  },
  {
    id: 'n-1027',
    folder_id: 'f-work',
    title: 'Q1 hiring loop questions',
    content_text:
      'Ask about a time they shipped something they later removed. Pair exercise stays at forty minutes, no whiteboard algorithms.',
    tags: ['ideas'],
    last_edited_at: 'Edited 22 Nov 2026, 11:30',
    is_trashed: false,
  },
  {
    id: 'n-1024',
    folder_id: 'f-personal',
    title: 'Birthday dinner for Nadia',
    content_text:
      'Book Rochelle Canteen for eight, 19:30 on the 12th. Nadia is off dairy — check the dessert. Ilse brings the record player.',
    tags: ['todo'],
    last_edited_at: 'Edited 20 Nov 2026, 21:14',
    is_trashed: false,
  },
  {
    id: 'n-1021',
    folder_id: 'f-work',
    title: 'Standup — Terra API integration',
    content_text:
      'Sandbox keys arrive Thursday, use <your-terra-api-key> in the env file until then. Rate limit is 60 requests a minute.',
    tags: [],
    last_edited_at: 'Edited 19 Nov 2026, 09:05',
    is_trashed: false,
  },
  {
    id: 'n-1018',
    folder_id: 'f-personal',
    title: 'Notes on “The Overstory”',
    content_text:
      'Chestnut blight as a slow-motion inheritance. The trees keep the time, the people only borrow it. p.214 — the Hoel photographs.',
    tags: ['reading', 'ideas'],
    last_edited_at: 'Edited 18 Nov 2026, 22:47',
    is_trashed: false,
  },
  {
    id: 'n-1015',
    folder_id: 'f-work',
    title: 'Vendor review — Hakka Ltd',
    content_text:
      'Contract renews 31 Jan. Support response times slipped to eleven hours in October. Raise it before we commit to another year.',
    tags: ['todo'],
    last_edited_at: 'Edited 17 Nov 2026, 15:20',
    is_trashed: false,
  },
  {
    id: 'n-1009',
    folder_id: 'f-recipes',
    title: 'Miso caramel tart',
    content_text:
      'Blind bake at 180°C for 18 minutes. White miso one tablespoon into the caramel off the heat, or it splits. Chill four hours.',
    tags: [],
    last_edited_at: 'Edited 12 Nov 2026, 19:33',
    is_trashed: false,
  },
  {
    id: 'n-1004',
    folder_id: 'f-recipes',
    title: 'Sourdough starter log',
    content_text:
      'Day 9: doubling in five hours, smells of yoghurt and apple. Feeding 1:2:2 at eight each morning, rye only on Sundays.',
    tags: [],
    last_edited_at: 'Edited 9 Nov 2026, 08:10',
    is_trashed: false,
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const cream = brand.backgroundColor;
  const accent = brand.accentColor;
  const line = rgba(ink, 0.12);
  const soft = rgba(ink, 0.06);
  const softer = rgba(ink, 0.04);
  const muted = rgba(ink, 0.74);

  const [notes, setNotes] = React.useState(NOTE_SEED);
  const [folders, setFolders] = React.useState(FOLDER_SEED);
  const [folderFilter, setFolderFilter] = React.useState('f-all');
  const [tagFilter, setTagFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [folderFormOpen, setFolderFormOpen] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');
  const [folderError, setFolderError] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const trashBtnRef = React.useRef(null);
  const folderInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!query.trim()) {
      setSearching(false);
      return undefined;
    }
    setSearching(true);
    const t = setTimeout(() => setSearching(false), 380);
    return () => clearTimeout(t);
  }, [query]);

  React.useEffect(() => {
    if (folderFormOpen && folderInputRef.current) folderInputRef.current.focus();
  }, [folderFormOpen]);

  const active = notes.filter((n) => !n.is_trashed);
  const countFor = (fid) => (fid === 'f-all' ? active.length : active.filter((n) => n.folder_id === fid).length);

  const folderList = [{ id: 'f-all', name: 'All notes', wf: 'i-3-0-0' }].concat(
    folders.map((f, i) => ({ ...f, wf: i < 3 ? `i-3-0-${i + 1}` : undefined }))
  );

  const tagList = [{ key: 'all', label: 'All tags', wf: 'i-2-0-0' }].concat(
    TAG_SEED.map((t, i) => ({ key: t.name, label: t.name, wf: `i-2-0-${i + 1}` }))
  );

  const q = query.trim().toLowerCase();
  const byFolder = folderFilter === 'f-all' ? active : active.filter((n) => n.folder_id === folderFilter);
  const byTag = tagFilter === 'all' ? byFolder : byFolder.filter((n) => n.tags.includes(tagFilter));
  const visible = q
    ? byTag.filter((n) => (n.title + ' ' + n.content_text).toLowerCase().includes(q))
    : byTag;

  const folderName_ = (fid) => {
    const f = folders.find((x) => x.id === fid);
    return f ? f.name : 'Unfiled';
  };
  const activeFolderLabel = folderFilter === 'f-all' ? 'All notes' : folderName_(folderFilter);

  const noResults = q.length > 0 && !searching && visible.length === 0;
  const selectedVisible = selected.filter((id) => active.some((n) => n.id === id));

  const toggleSelect = (id) => {
    setNotice('');
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.concat(id)));
  };

  const doTrash = () => {
    const n = selectedVisible.length;
    setNotes((prev) =>
      prev.map((note) =>
        selectedVisible.includes(note.id)
          ? { ...note, is_trashed: true, trashed_at: '25 Nov 2026' }
          : note
      )
    );
    setSelected([]);
    setNotice(
      `${n} ${n === 1 ? 'note is' : 'notes are'} in the trash. they keep their folder and tags until you empty it.`
    );
  };

  const submitFolder = (e) => {
    e.preventDefault();
    const name = folderName.trim();
    if (!name) {
      setFolderError('give the folder a name — something like “garden” or “invoices”.');
      return;
    }
    if (folders.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
      setFolderError(`you already keep a folder called “${name}”. pick another name.`);
      return;
    }
    const id = `f-${name.toLowerCase().replace(/\s+/g, '-')}`;
    setFolders((prev) => prev.concat({ id, user_id: 'u-7', name, created_at: '25 Nov 2026' }));
    setFolderError('');
    setFolderName('');
    setFolderFormOpen(false);
    setFolderFilter(id);
    setNotice(`folder “${name}” is ready. open a note and move it in.`);
  };

  const pill = 'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 atr-f';

  return (
    <div
      className="min-h-full w-full"
      style={{ backgroundColor: cream, color: ink, fontFamily: brand.fontBody, fontVariantNumeric: 'tabular-nums' }}
    >
      <style>{`
        .atr-f:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .atr-noterow { transition: background-color .2s ease; }
        .atr-noterow:hover { background-color: ${rgba(ink, 0.05)}; }
        .atr-chip:hover { background-color: ${rgba(ink, 0.1)}; }
        .atr-primary:hover { background-color: ${rgba(ink, 0.86)}; }
        .atr-quiet:hover { background-color: ${rgba(ink, 0.07)}; }
        .atr-rise { animation: atrRise .34s cubic-bezier(.22,.8,.3,1) both; }
        .atr-fade { animation: atrFade .22s ease both; }
        @keyframes atrRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes atrFade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .atr-rise, .atr-fade { animation: none !important; }
          .atr-noterow, .atr-chip { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        {/* Row 1 */}
        <div className="grid grid-cols-12 items-end gap-4">
          <div data-wf="b-0-0" className="col-span-12 sm:col-span-8">
            <h1
              className="text-[34px] leading-tight sm:text-[40px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600, letterSpacing: '-0.01em' }}
            >
              My notes
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px]" style={{ color: muted }}>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{ backgroundColor: soft }}
              >
                <Clock className="h-3.5 w-3.5" aria-hidden="true" style={{ color: accent }} />
                every change saved · synced 2 minutes ago
              </span>
              <span>only you can see these notes.</span>
            </p>
          </div>
          <div className="col-span-12 flex sm:col-span-4 sm:justify-end">
            <Button
              data-wf="b-0-1"
              onClick={() => navigate('note')}
              className={`${pill} atr-primary w-full px-7 py-3.5 text-[15px] font-semibold sm:w-auto`}
              style={{ backgroundColor: ink, color: cream, borderRadius: '999px', boxShadow: `0 10px 24px ${rgba(ink, 0.18)}` }}
            >
              <Plus className="h-4.5 w-4.5" aria-hidden="true" />
              New note
            </Button>
          </div>
        </div>

        {/* Row 2 */}
        <div data-wf="b-1-0" className="mt-8">
          <Label htmlFor="notes-search" className="mb-2 block text-[13px] font-semibold" style={{ color: muted }}>
            Search the title and text of my notes
          </Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2"
              aria-hidden="true"
              style={{ color: accent }}
            />
            <Input
              id="notes-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setNotice('');
              }}
              placeholder="try “sourdough”, “meter readings” or “retro”"
              className="atr-f w-full border-0 py-4 pl-16 pr-6 text-[16px] outline-none placeholder:opacity-60"
              style={{ backgroundColor: softer, color: ink, borderRadius: '999px', boxShadow: `inset 0 0 0 1px ${line}` }}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear the search"
                className="atr-f atr-chip absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ backgroundColor: soft, color: ink }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className="mt-2 pl-6 text-[12.5px]" aria-live="polite" style={{ color: muted }}>
            {searching
              ? 'reading through your notes…'
              : q
              ? `${visible.length} of ${active.length} notes match “${query.trim()}” in ${activeFolderLabel.toLowerCase()}.`
              : 'search looks inside the text of a note, not only the title. trashed notes stay out of the results.'}
          </p>
        </div>

        {/* Row 3 */}
        <div data-wf="b-2-0" role="group" aria-label="Filter by tag" className="mt-7 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-[13px] font-semibold" style={{ color: muted }}>
            Filter by tag
          </span>
          {tagList.map((t) => {
            const on = tagFilter === t.key;
            return (
              <button
                key={t.key}
                type="button"
                data-wf={t.wf}
                aria-pressed={on}
                onClick={() => {
                  setTagFilter(t.key);
                  setNotice('');
                }}
                className={`${pill} ${on ? '' : 'atr-chip'} px-4 py-2 text-[14px]`}
                style={{
                  backgroundColor: on ? ink : soft,
                  color: on ? cream : ink,
                  fontWeight: on ? 600 : 500,
                }}
              >
                {t.key === 'all' ? (
                  <Filter className="h-4 w-4" aria-hidden="true" />
                ) : on ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : null}
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Row 4 */}
        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* Folders */}
          <section data-wf="b-3-0" className="col-span-12 lg:col-span-3">
            <div
              className="h-full px-5 pb-6 pt-9"
              style={{
                backgroundColor: rgba(ink, 0.07),
                borderRadius: '140px 140px 24px 24px',
              }}
            >
              <h2
                className="mb-5 text-center text-[21px]"
                style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600 }}
              >
                Folders
              </h2>
              <ul className="space-y-1">
                {folderList.map((f) => {
                  const on = folderFilter === f.id;
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        data-wf={f.wf}
                        aria-pressed={on}
                        onClick={() => {
                          setFolderFilter(f.id);
                          setNotice('');
                        }}
                        className={`atr-f ${on ? '' : 'atr-quiet'} flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-left text-[14.5px] transition-colors duration-200`}
                        style={{
                          backgroundColor: on ? cream : 'transparent',
                          color: ink,
                          fontWeight: on ? 600 : 500,
                          boxShadow: on ? `0 1px 0 ${line}` : 'none',
                        }}
                      >
                        {on ? (
                          <Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
                        ) : (
                          <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        <span className="flex-1 truncate">{f.name}</span>
                        <span className="text-[13px]" style={{ color: muted }}>
                          ({countFor(f.id)})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Note list */}
          <section data-wf="b-3-1" className="col-span-12 lg:col-span-9">
            <div
              className="overflow-hidden"
              style={{ backgroundColor: rgba(ink, 0.03), borderRadius: brand.radius, boxShadow: `inset 0 0 0 1px ${line}` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pb-4 pt-6 sm:px-8">
                <h2
                  className="text-[22px]"
                  style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600 }}
                >
                  {visible.length} {visible.length === 1 ? 'note' : 'notes'}
                </h2>
                <p className="text-[13px]" style={{ color: muted }}>
                  {activeFolderLabel.toLowerCase()}
                  {tagFilter !== 'all' ? ` · tagged ${tagFilter}` : ''} · newest first
                </p>
              </div>

              {searching ? (
                <ul className="px-6 pb-6 sm:px-8">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="atr-fade flex items-center gap-4 py-5" style={{ borderTop: `1px solid ${line}` }}>
                      <span className="h-5 w-5 rounded-md" style={{ backgroundColor: soft }} aria-hidden="true" />
                      <span className="flex-1">
                        <span className="block h-3.5 w-1/3 rounded-full" style={{ backgroundColor: soft }} aria-hidden="true" />
                        <span className="mt-2 block h-3 w-2/3 rounded-full" style={{ backgroundColor: softer }} aria-hidden="true" />
                      </span>
                    </li>
                  ))}
                  <li className="sr-only">reading through your notes…</li>
                </ul>
              ) : visible.length > 0 ? (
                <ul className="px-3 pb-4 sm:px-4">
                  {visible.map((n, i) => {
                    const checked = selected.includes(n.id);
                    return (
                      <li
                        key={n.id}
                        className="atr-rise"
                        style={{ animationDelay: `${Math.min(i, 8) * 28}ms`, borderTop: `1px solid ${line}` }}
                      >
                        <div
                          className="atr-noterow flex items-start gap-4 rounded-[20px] px-3 py-5 sm:px-5"
                          style={{ backgroundColor: checked ? rgba(ink, 0.06) : 'transparent' }}
                        >
                          <div className="flex items-center gap-3 pt-0.5">
                            <Label htmlFor={`sel-${n.id}`} className="sr-only">
                              Select “{n.title}” for trash
                            </Label>
                            <Checkbox
                              id={`sel-${n.id}`}
                              checked={checked}
                              onChange={() => toggleSelect(n.id)}
                              className="atr-f h-5 w-5 shrink-0 cursor-pointer"
                              style={{ accentColor: ink }}
                            />
                            <span
                              aria-hidden="true"
                              className="hidden h-8 w-6 shrink-0 items-center justify-center text-[11px] font-semibold uppercase sm:flex"
                              style={{
                                backgroundColor: rgba(accent, 0.22),
                                color: ink,
                                borderRadius: '999px 999px 6px 6px',
                              }}
                            >
                              {folderName_(n.folder_id).slice(0, 1)}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <button
                              type="button"
                              data-wf={n.wf}
                              onClick={() => navigate('note')}
                              className="atr-f group block w-full rounded-2xl text-left"
                            >
                              <span className="flex items-center gap-2">
                                <span className="truncate text-[17px] font-semibold" style={{ color: ink }}>
                                  {n.title}
                                </span>
                                <ChevronRight
                                  className="h-4 w-4 shrink-0 opacity-50"
                                  aria-hidden="true"
                                  style={{ color: ink }}
                                />
                              </span>
                              <span
                                className="mt-1.5 block line-clamp-2 text-[14px] leading-relaxed"
                                style={{ color: muted, maxWidth: '64ch' }}
                              >
                                {n.content_text}
                              </span>
                            </button>
                            <p className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px]" style={{ color: muted }}>
                              <span className="inline-flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                                {folderName_(n.folder_id)}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{n.last_edited_at}</span>
                              {n.tags.map((t) => (
                                <Badge
                                  key={t}
                                  className="rounded-full px-2.5 py-0.5 text-[12px] font-medium"
                                  style={{ backgroundColor: soft, color: ink }}
                                >
                                  #{t}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-8 pb-10 pt-4" style={{ borderTop: `1px solid ${line}` }}>
                  <p className="text-[16px]" style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}>
                    {q
                      ? 'nothing in this corner of the notepad.'
                      : `${activeFolderLabel} is quiet right now.`}
                  </p>
                  <p className="mt-2 text-[14px]" style={{ color: muted, maxWidth: '58ch' }}>
                    {q
                      ? `no note in ${activeFolderLabel.toLowerCase()}${
                          tagFilter !== 'all' ? ` tagged ${tagFilter}` : ''
                        } contains “${query.trim()}”. widen it with All tags, or clear the search.`
                      : tagFilter !== 'all'
                      ? `no note in ${activeFolderLabel.toLowerCase()} carries the tag ${tagFilter}. choose All tags to see everything here.`
                      : 'start a note here with New note, or pick another folder on the left.'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Row 5 */}
        <div className="mt-7 grid grid-cols-12 items-start gap-4">
          <div data-wf="b-4-0" className="col-span-12 sm:col-span-6 lg:col-span-3">
            <Button
              type="button"
              onClick={() => {
                setFolderFormOpen((v) => !v);
                setFolderError('');
              }}
              aria-expanded={folderFormOpen}
              aria-controls="new-folder-form"
              className={`${pill} atr-quiet w-full px-6 py-3 text-[14.5px] font-semibold`}
              style={{ backgroundColor: 'transparent', color: ink, borderRadius: '999px', boxShadow: `inset 0 0 0 1px ${rgba(ink, 0.3)}` }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New folder
            </Button>

            {folderFormOpen ? (
              <form
                id="new-folder-form"
                onSubmit={submitFolder}
                className="atr-fade mt-3 p-5"
                style={{ backgroundColor: soft, borderRadius: '24px' }}
              >
                <Label htmlFor="folder-name" className="block text-[13px] font-semibold">
                  Folder name
                </Label>
                <Input
                  id="folder-name"
                  ref={folderInputRef}
                  value={folderName}
                  onChange={(e) => {
                    setFolderName(e.target.value);
                    if (folderError) setFolderError('');
                  }}
                  placeholder="e.g. Garden"
                  aria-invalid={folderError ? 'true' : 'false'}
                  aria-describedby={folderError ? 'folder-error' : undefined}
                  className="atr-f mt-2 w-full border-0 px-5 py-2.5 text-[15px] outline-none"
                  style={{
                    backgroundColor: cream,
                    color: ink,
                    borderRadius: '999px',
                    boxShadow: `inset 0 0 0 1px ${folderError ? rgba(ink, 0.55) : line}`,
                  }}
                />
                {folderError ? (
                  <p id="folder-error" className="mt-2 flex items-start gap-1.5 text-[12.5px] font-medium" style={{ color: ink }}>
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {folderError}
                  </p>
                ) : null}
                <div className="mt-3 flex gap-2">
                  <Button
                    type="submit"
                    className={`${pill} atr-primary px-5 py-2 text-[14px] font-semibold`}
                    style={{ backgroundColor: ink, color: cream, borderRadius: '999px' }}
                  >
                    Create folder
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setFolderFormOpen(false);
                      setFolderError('');
                      setFolderName('');
                    }}
                    className={`${pill} atr-quiet px-5 py-2 text-[14px]`}
                    style={{ backgroundColor: 'transparent', color: ink, borderRadius: '999px' }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : null}
          </div>

          <div data-wf="b-4-1" className="col-span-12 sm:col-span-6 lg:col-span-3">
            <Button
              type="button"
              ref={trashBtnRef}
              disabled={selectedVisible.length === 0}
              aria-describedby="trash-help"
              onClick={doTrash}
              className={`${pill} ${selectedVisible.length === 0 ? '' : 'atr-quiet'} w-full px-6 py-3 text-[14.5px] font-semibold`}
              style={{
                backgroundColor: 'transparent',
                color: selectedVisible.length === 0 ? rgba(ink, 0.42) : ink,
                borderRadius: '999px',
                boxShadow: `inset 0 0 0 1px ${selectedVisible.length === 0 ? rgba(ink, 0.15) : rgba(ink, 0.3)}`,
                cursor: selectedVisible.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <Trash className="h-4 w-4" aria-hidden="true" />
              Move to trash
              {selectedVisible.length > 0 ? ` (${selectedVisible.length})` : ''}
            </Button>
            <p className="mt-2 px-2 text-[12.5px]" aria-live="polite" style={{ color: muted }}>
              {notice || (selectedVisible.length === 0 ? 'tick a note above to move it to the trash.' : 'nothing is deleted yet — trash keeps it until you empty it.')}
            </p>
          </div>

          <p
            data-wf="b-4-2"
            id="trash-help"
            className="col-span-12 text-[14px] leading-relaxed lg:col-span-6"
            style={{ color: noResults ? ink : muted, maxWidth: '62ch' }}
          >
            {noResults ? (
              <span className="inline-flex items-start gap-2 rounded-[20px] px-4 py-3" style={{ backgroundColor: soft }}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
                <span>
                  No notes match “{query.trim()}”. Try a different search term.
                </span>
              </span>
            ) : (
              'folders hold a note in one place; tags can stack as many as you like on the same note.'
            )}
          </p>
        </div>

        {/* Row 6 */}
        <div data-wf="b-5-0" className="mt-10">
          {active.length === 0 ? (
            <div
              className="atr-fade px-6 py-10"
              style={{ backgroundColor: rgba(ink, 0.05), borderRadius: '240px 240px 24px 24px' }}
            >
              <Empty
                title="Your notepad is still blank"
                description="You have no notes yet. Create your first note to get started."
                action={
                  <Button
                    type="button"
                    onClick={() => navigate('note')}
                    className={`${pill} atr-primary px-7 py-3 text-[15px] font-semibold`}
                    style={{ backgroundColor: ink, color: cream, borderRadius: '999px' }}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Create first note
                  </Button>
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select } = UI;

const NOTE_ID = 'n_4821';

const FOLDERS = [
  { id: 'f_work', name: 'Work' },
  { id: 'f_personal', name: 'Personal' },
  { id: 'f_reading', name: 'Reading list' },
  { id: 'f_garden', name: 'Garden journal' }
];

const INITIAL_TAGS = ['ideas', 'todo'];

const SUGGESTED_TAGS = ['sprint', 'search', 'priya', 'retro', 'writing'];

const INITIAL_HTML = [
  '<p>Goals for the sprint: finish the search index, review the trash flow with Priya, and write up the auto-save behaviour. Changes save on their own as you type.</p>',
  '<h2>Open questions</h2>',
  '<ul><li>How long should a note sit in trash before it clears itself?</li><li>Does search match folder names too, or only titles and body text?</li></ul>',
  '<p>Priya is drafting the copy for the empty-trash confirmation &mdash; <strong>due Thursday 27 Nov</strong>.</p>',
  '<h2>Order of work</h2>',
  '<ol><li>Index titles and body text</li><li>Ship the restore-from-trash flow</li><li>Write the auto-save line for the changelog</li></ol>'
].join('');

const rgba = (hex, a) => {
  const h = String(hex || '#000000').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return 'rgba(' + ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255) + ', ' + a + ')';
};

const relTime = (ts, now) => {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return m === 1 ? '1 minute ago' : m + ' minutes ago';
  const h = Math.round(m / 60);
  if (h < 24) return h === 1 ? '1 hour ago' : h + ' hours ago';
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;
  const cream = brand.backgroundColor;
  const tint = (a) => rgba(ink, a);
  const surface = 'rgba(255, 255, 255, 0.62)';

  const [title, setTitle] = React.useState('Sprint planning notes');
  const [folderId, setFolderId] = React.useState('f_work');
  const [newFolderOpen, setNewFolderOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const [folders, setFolders] = React.useState(FOLDERS);
  const [tags, setTags] = React.useState(INITIAL_TAGS);
  const [tagDraft, setTagDraft] = React.useState('');
  const [tagNote, setTagNote] = React.useState(null);
  const [status, setStatus] = React.useState('saved');
  const [lastSaved, setLastSaved] = React.useState(() => Date.now() - 2 * 60 * 1000);
  const [now, setNow] = React.useState(() => Date.now());
  const [offline, setOffline] = React.useState(false);
  const [marks, setMarks] = React.useState({ bold: false, heading: false, ul: false, ol: false });
  const [bodyText, setBodyText] = React.useState('');

  const editorRef = React.useRef(null);
  const saveTimer = React.useRef(null);
  const titleRef = React.useRef(title);
  const offlineRef = React.useRef(false);

  titleRef.current = title;
  offlineRef.current = offline;

  // clock for the "last edited" line
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(t);
  }, []);

  // connection state
  React.useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    if (typeof navigator !== 'undefined' && navigator.onLine === false) setOffline(true);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  React.useEffect(() => () => clearTimeout(saveTimer.current), []);

  const commitSave = React.useCallback(() => {
    if (offlineRef.current) {
      setStatus('offline');
      return;
    }
    if (!titleRef.current.trim()) {
      setStatus('error');
      return;
    }
    setLastSaved(Date.now());
    setNow(Date.now());
    setStatus('saved');
  }, []);

  const touch = React.useCallback(() => {
    setStatus(offlineRef.current ? 'offline' : 'saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(commitSave, 900);
  }, [commitSave]);

  React.useEffect(() => {
    if (!offline && status === 'offline') {
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(commitSave, 600);
      setStatus('saving');
    }
  }, [offline, status, commitSave]);

  const readBody = () => {
    const el = editorRef.current;
    setBodyText(el ? el.innerText || '' : '');
  };

  React.useEffect(() => { readBody(); }, []);

  const refreshMarks = React.useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) return;
    let block = '';
    try { block = String(document.queryCommandValue('formatBlock') || '').toLowerCase(); } catch (e) { block = ''; }
    const state = (cmd) => { try { return document.queryCommandState(cmd); } catch (e) { return false; } };
    setMarks({
      bold: state('bold'),
      heading: block === 'h2',
      ul: state('insertUnorderedList'),
      ol: state('insertOrderedList')
    });
  }, []);

  React.useEffect(() => {
    document.addEventListener('selectionchange', refreshMarks);
    return () => document.removeEventListener('selectionchange', refreshMarks);
  }, [refreshMarks]);

  const run = (fn) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const sel = document.getSelection();
    if (sel && (sel.rangeCount === 0 || !el.contains(sel.anchorNode))) {
      const r = document.createRange();
      r.selectNodeContents(el);
      r.collapse(false);
      sel.removeAllRanges();
      sel.addRange(r);
    }
    try { fn(); } catch (e) { /* editor command unavailable */ }
    refreshMarks();
    readBody();
    touch();
  };

  const toggleBold = () => run(() => document.execCommand('bold'));
  const toggleHeading = () => run(() => document.execCommand('formatBlock', false, marks.heading ? 'p' : 'h2'));
  const toggleUl = () => run(() => document.execCommand('insertUnorderedList'));
  const toggleOl = () => run(() => document.execCommand('insertOrderedList'));

  const onEditorKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleBold();
    }
  };

  const addTag = (raw) => {
    const name = String(raw || '').trim().toLowerCase().replace(/\s+/g, '-').slice(0, 24);
    if (!name) {
      setTagNote({ kind: 'hint', text: 'type a word, then press enter to tag this note' });
      return;
    }
    if (tags.indexOf(name) !== -1) {
      setTagNote({ kind: 'dupe', text: '"' + name + '" is already on this note' });
      return;
    }
    setTags(tags.concat(name));
    setTagDraft('');
    setTagNote({ kind: 'ok', text: 'tagged "' + name + '"' });
    touch();
  };

  const removeTag = (name) => {
    setTags(tags.filter((t) => t !== name));
    setTagNote({ kind: 'ok', text: 'removed "' + name + '"' });
    touch();
  };

  const createFolder = () => {
    const name = newFolderName.trim();
    if (!name) return;
    const id = 'f_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    setFolders(folders.concat([{ id: id, name: name }]));
    setFolderId(id);
    setNewFolderName('');
    setNewFolderOpen(false);
    touch();
  };

  const folderName = (folders.find((f) => f.id === folderId) || {}).name || 'no folder';
  const words = bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0;

  const toolbarBtn = (on) => ({
    backgroundColor: on ? ink : tint(0.06),
    color: on ? cream : ink,
    borderRadius: '999px',
    transition: 'background-color .18s ease, color .18s ease, transform .18s ease'
  });

  const statusView = (() => {
    if (status === 'saving') {
      return {
        icon: <Icons.Clock className="h-4 w-4 shrink-0" aria-hidden="true" />,
        line: 'Saving…',
        sub: 'autosaves a moment after you stop typing',
        dot: accent
      };
    }
    if (status === 'offline') {
      return {
        icon: <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />,
        line: 'Offline · last saved ' + relTime(lastSaved, now),
        sub: 'your words are kept on this device and sync when you’re back',
        dot: neutral
      };
    }
    if (status === 'error') {
      return {
        icon: <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />,
        line: 'Not saved · this note needs a title',
        sub: 'nothing you wrote has been lost — add a title and it saves again',
        dot: ink
      };
    }
    return {
      icon: <Icons.Check className="h-4 w-4 shrink-0" aria-hidden="true" />,
      line: 'Saved · Last edited ' + relTime(lastSaved, now),
      sub: 'note ' + NOTE_ID + ' · ' + words + ' words',
      dot: accent
    };
  })();

  const suggestions = SUGGESTED_TAGS.filter((t) => tags.indexOf(t) === -1).slice(0, 3);

  return (
    <div
      className="atrium w-full"
      style={{
        '--atrium-accent': accent,
        '--atrium-ink': ink,
        '--atrium-muted': neutral,
        '--atrium-heading': brand.fontHeading,
        fontFamily: brand.fontBody,
        color: ink
      }}
    >
      <style>{`
        .atrium :focus-visible { outline: 2px solid var(--atrium-accent); outline-offset: 3px; }
        .atrium .sheet-body { font-size: 17px; line-height: 1.65; }
        .atrium .sheet-body:empty:before { content: attr(data-placeholder); color: var(--atrium-muted); font-style: italic; }
        .atrium .sheet-body h2 { font-family: var(--atrium-heading); font-style: italic; font-size: 21px; line-height: 1.3; margin: 28px 0 8px; }
        .atrium .sheet-body p { margin: 0 0 16px; }
        .atrium .sheet-body ul { list-style: disc; padding-left: 24px; margin: 0 0 16px; }
        .atrium .sheet-body ol { list-style: decimal; padding-left: 24px; margin: 0 0 16px; }
        .atrium .sheet-body li { margin-bottom: 8px; }
        .atrium .sheet-body strong { font-weight: 700; }
        @keyframes atrium-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes atrium-pop { from { opacity: 0; transform: scale(.88); } to { opacity: 1; transform: none; } }
        @keyframes atrium-breathe { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        .atrium-rise { animation: atrium-rise .3s ease-out both; }
        .atrium-pop { animation: atrium-pop .22s ease-out both; }
        .atrium-breathe { animation: atrium-breathe 1.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-pop, .atrium-breathe { animation: none !important; }
          .atrium * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-2">
            <Button
              data-wf="b-0-0"
              type="button"
              onClick={() => navigate('notes')}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-4 text-sm font-semibold"
              style={{ backgroundColor: tint(0.07), color: ink, borderRadius: '999px', border: 'none' }}
            >
              <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to my notes</span>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <Label htmlFor="note-title" className="mb-2 block text-xs lowercase tracking-[0.14em]" style={{ color: neutral }}>
              title
            </Label>
            <Input
              data-wf="b-0-1"
              id="note-title"
              value={title}
              onChange={(e) => { setTitle(e.target.value); touch(); }}
              placeholder="Sprint planning notes"
              aria-invalid={status === 'error' ? 'true' : 'false'}
              aria-describedby="save-status"
              className="h-[52px] w-full px-6 text-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.75)',
                borderRadius: '999px',
                border: '1px solid ' + (status === 'error' ? ink : tint(0.12)),
                color: ink,
                fontFamily: brand.fontHeading,
                fontStyle: 'italic'
              }}
            />
          </div>

          <div data-wf="b-0-2" id="save-status" aria-live="polite" className="lg:col-span-3">
            <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>
              <span
                aria-hidden="true"
                className={'inline-block h-2 w-2 rounded-full ' + (status === 'saving' ? 'atrium-breathe' : '')}
                style={{ backgroundColor: statusView.dot }}
              />
              {statusView.icon}
              <span>{statusView.line}</span>
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}>
              {statusView.sub}
            </p>
            {status === 'error' ? (
              <Button
                type="button"
                onClick={() => { if (titleRef.current.trim()) commitSave(); else document.getElementById('note-title').focus(); }}
                className="mt-2 inline-flex min-h-[36px] items-center gap-2 px-4 text-xs font-semibold"
                style={{ backgroundColor: tint(0.08), color: ink, borderRadius: '999px', border: 'none' }}
              >
                <Icons.Edit className="h-3.5 w-3.5" aria-hidden="true" />
                fix the title
              </Button>
            ) : null}
          </div>
        </div>

        {/* Row 2 */}
        <div
          role="toolbar"
          aria-label="Text formatting"
          aria-controls="note-body"
          className="mt-8 grid grid-cols-2 gap-3 rounded-[999px] p-3 sm:grid-cols-4"
          style={{ backgroundColor: tint(0.05) }}
        >
          {[
            { wf: 'b-1-0', label: 'Bold', glyph: 'B', on: marks.bold, fn: toggleBold, italic: false },
            { wf: 'b-1-1', label: 'Heading', glyph: 'H', on: marks.heading, fn: toggleHeading, italic: true },
            { wf: 'b-1-2', label: 'Bulleted list', glyph: '•', on: marks.ul, fn: toggleUl, italic: false },
            { wf: 'b-1-3', label: 'Numbered list', glyph: '1.', on: marks.ol, fn: toggleOl, italic: false }
          ].map((b) => (
            <Button
              key={b.wf}
              data-wf={b.wf}
              type="button"
              aria-pressed={b.on}
              onClick={b.fn}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-sm font-semibold"
              style={toolbarBtn(b.on)}
            >
              <span
                aria-hidden="true"
                className="text-base"
                style={{ fontFamily: brand.fontHeading, fontStyle: b.italic ? 'italic' : 'normal', fontWeight: 700 }}
              >
                {b.glyph}
              </span>
              <span>{b.label}</span>
              {b.on ? <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            </Button>
          ))}
        </div>

        {/* Row 3 */}
        <section
          data-wf="b-2-0"
          aria-labelledby="note-heading"
          className="relative mt-6 px-6 pb-10 pt-16 sm:px-12 sm:pt-20"
          style={{
            backgroundColor: surface,
            borderRadius: '220px 220px 24px 24px',
            border: '1px solid ' + tint(0.09)
          }}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap px-4 py-1 text-[11px] lowercase tracking-[0.18em]"
            style={{ backgroundColor: tint(0.08), color: ink, borderRadius: '999px 999px 999px 999px' }}
          >
            {folderName.toLowerCase()} &middot; folder
          </span>

          <h1
            id="note-heading"
            className="text-center text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: ink }}
          >
            {title.trim() ? title : 'untitled note'}
          </h1>
          <p className="mt-2 text-center text-xs lowercase tracking-[0.14em]" style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}>
            last edited {relTime(lastSaved, now)} &middot; {words} words
          </p>

          <div className="relative mx-auto mt-10 max-w-[68ch]">
            <span
              aria-hidden="true"
              className="absolute -left-6 top-0 hidden h-full w-px sm:block"
              style={{ background: 'linear-gradient(to bottom, ' + rgba(accent, 0.75) + ', ' + rgba(accent, 0) + ')' }}
            />
            <div
              id="note-body"
              ref={editorRef}
              className="sheet-body outline-none"
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-multiline="true"
              aria-label="Note body"
              data-placeholder="start writing — this page saves itself"
              onInput={() => { readBody(); touch(); }}
              onKeyUp={refreshMarks}
              onMouseUp={refreshMarks}
              onKeyDown={onEditorKeyDown}
              dangerouslySetInnerHTML={{ __html: INITIAL_HTML }}
              style={{ color: ink, minHeight: '260px' }}
            />
          </div>

          <p className="mt-8 text-center text-xs lowercase" style={{ color: neutral }}>
            select text, then use the pills above &middot; {'⌘'}/ctrl + b for bold
          </p>
        </section>

        {/* Row 4 */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <form
            data-wf="b-3-0"
            onSubmit={(e) => { e.preventDefault(); addTag(tagDraft); }}
            className="lg:col-span-8"
            style={{ backgroundColor: tint(0.05), borderRadius: brand.radius, border: '1px solid ' + tint(0.08) }}
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-xl" style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}>
                Organise this note
              </h2>
              <p className="mt-1 text-sm" style={{ color: neutral }}>
                a folder to keep it with its kin, tags to find it from anywhere.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="note-folder" className="mb-2 block text-xs lowercase tracking-[0.14em]" style={{ color: neutral }}>
                    folder
                  </Label>
                  <Select
                    data-wf="i-3-0-0"
                    id="note-folder"
                    value={newFolderOpen ? '__new' : folderId}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '__new') { setNewFolderOpen(true); return; }
                      setNewFolderOpen(false);
                      setFolderId(v);
                      touch();
                    }}
                    className="h-[48px] w-full px-5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '999px', border: '1px solid ' + tint(0.12), color: ink }}
                  >
                    <option value="">No folder</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                    <option value="__new">+ create a folder&hellip;</option>
                  </Select>

                  {newFolderOpen ? (
                    <div className="atrium-rise mt-3">
                      <Label htmlFor="new-folder" className="mb-2 block text-xs lowercase tracking-[0.14em]" style={{ color: neutral }}>
                        new folder name
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        <Input
                          id="new-folder"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); createFolder(); } }}
                          placeholder="Sprint 14"
                          className="h-[44px] min-w-[150px] flex-1 px-5 text-sm"
                          style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '999px', border: '1px solid ' + tint(0.12), color: ink }}
                        />
                        <Button
                          type="button"
                          onClick={createFolder}
                          disabled={!newFolderName.trim()}
                          className="min-h-[44px] px-5 text-sm font-semibold disabled:opacity-45"
                          style={{ backgroundColor: ink, color: cream, borderRadius: '999px', border: 'none' }}
                        >
                          create &amp; move here
                        </Button>
                        <Button
                          type="button"
                          onClick={() => { setNewFolderOpen(false); setNewFolderName(''); }}
                          className="min-h-[44px] px-5 text-sm font-semibold"
                          style={{ backgroundColor: 'transparent', color: ink, borderRadius: '999px', border: '1px solid ' + tint(0.18) }}
                        >
                          cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs" style={{ color: neutral }}>
                      currently filed under <strong style={{ color: ink }}>{folderName}</strong>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="note-tags" className="mb-2 block text-xs lowercase tracking-[0.14em]" style={{ color: neutral }}>
                    tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      data-wf="i-3-0-1"
                      id="note-tags"
                      value={tagDraft}
                      onChange={(e) => { setTagDraft(e.target.value); setTagNote(null); }}
                      placeholder="press enter to add"
                      aria-describedby="tag-help"
                      className="h-[48px] flex-1 px-5 text-sm"
                      style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '999px', border: '1px solid ' + tint(0.12), color: ink }}
                    />
                    <Button
                      type="submit"
                      className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center px-4 text-sm font-semibold"
                      style={{ backgroundColor: tint(0.1), color: ink, borderRadius: '999px', border: 'none' }}
                    >
                      <Icons.Plus className="h-4 w-4" aria-hidden="true" />
                      <span className="ml-1 hidden sm:inline">add</span>
                    </Button>
                  </div>

                  {tags.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <li key={t} className="atrium-pop">
                          <span
                            className="inline-flex items-center gap-1 py-1 pl-4 pr-1 text-sm"
                            style={{ backgroundColor: rgba(accent, 0.18), color: ink, borderRadius: '999px' }}
                          >
                            <span>{t}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(t)}
                              aria-label={'Remove tag ' + t}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                              style={{ color: ink, transition: 'background-color .15s ease' }}
                              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = tint(0.12); }}
                              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs italic" style={{ color: neutral, fontFamily: brand.fontHeading }}>
                      no tags yet &mdash; a word or two is enough to find this later.
                    </p>
                  )}

                  {suggestions.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-xs lowercase tracking-[0.14em]" style={{ color: neutral }}>tags you already use</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                          <Button
                            key={s}
                            type="button"
                            onClick={() => addTag(s)}
                            className="min-h-[36px] px-4 text-xs font-semibold"
                            style={{ backgroundColor: 'transparent', color: ink, borderRadius: '999px', border: '1px solid ' + tint(0.18) }}
                          >
                            + {s}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <p
                    id="tag-help"
                    aria-live="polite"
                    className="mt-3 text-xs"
                    style={{ color: tagNote && tagNote.kind === 'dupe' ? ink : neutral, fontWeight: tagNote && tagNote.kind === 'dupe' ? 600 : 400 }}
                  >
                    {tagNote
                      ? (tagNote.kind === 'dupe' ? '— ' : '') + tagNote.text
                      : 'lowercase, no spaces — we tidy them for you.'}
                  </p>
                </div>
              </div>
            </div>
          </form>

          <div className="lg:col-span-4">
            <div
              className="flex h-full flex-col justify-between p-6 sm:p-8"
              style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: brand.radius, border: '1px solid ' + tint(0.08) }}
            >
              <div>
                <h2 className="text-xl" style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}>
                  Done with this one?
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: neutral }}>
                  it rests in the trash first. you can bring it back, tags and folder intact.
                </p>
              </div>
              <Button
                data-wf="b-3-1"
                type="button"
                onClick={() => navigate('trash')}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-6 text-sm font-semibold"
                style={{ backgroundColor: 'transparent', color: ink, borderRadius: '999px', border: '1px solid ' + tint(0.35) }}
              >
                <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                Move to trash
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

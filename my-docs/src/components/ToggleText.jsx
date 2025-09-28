import React, { useEffect, useState } from 'react';

/**
 * ToggleText
 *
 * Props:
 * - lines: [{ arabic, transliteration, translation }, ...]
 * - storageKey: unique key to persist toggle state (optional, e.g. "faraj")
 */
export default function ToggleText({ lines = [], storageKey = 'textToggle' }) {
  const keyA = `${storageKey}_showArabic`;
  const keyT = `${storageKey}_showTransliteration`;
  const keyR = `${storageKey}_showTranslation`;

  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  // Load saved state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sa = localStorage.getItem(keyA);
      const st = localStorage.getItem(keyT);
      const sr = localStorage.getItem(keyR);
      if (sa !== null) setShowArabic(sa === 'true');
      if (st !== null) setShowTransliteration(st === 'true');
      if (sr !== null) setShowTranslation(sr === 'true');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state when toggles change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(keyA, String(showArabic));
      localStorage.setItem(keyT, String(showTransliteration));
      localStorage.setItem(keyR, String(showTranslation));
    }
  }, [showArabic, showTransliteration, showTranslation]);

  return (
    <div className="toggle-container center-text">
      <div className="toggle-controls" role="group" aria-label="Show or hide Arabic, Transliteration, Translation">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showArabic}
            onChange={() => setShowArabic((s) => !s)}
          />{' '}
          Arabic
        </label>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showTransliteration}
            onChange={() => setShowTransliteration((s) => !s)}
          />{' '}
          Transliteration
        </label>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showTranslation}
            onChange={() => setShowTranslation((s) => !s)}
          />{' '}
          Translation
        </label>

        <button
          type="button"
          className="toggle-reset"
          onClick={() => {
            setShowArabic(true);
            setShowTransliteration(true);
            setShowTranslation(true);
          }}
        >
          Reset
        </button>
      </div>

      {lines.map((line, i) => (
        <div className="line-block" key={i}>
          <p className={`arabic ${showArabic ? '' : 'hidden'}`}>{line.arabic}</p>
          <p className={`transliteration ${showTransliteration ? '' : 'hidden'}`}>{line.transliteration}</p>
          <p className={`translation ${showTranslation ? '' : 'hidden'}`}>{line.translation}</p>
        </div>
      ))}
    </div>
  );
}

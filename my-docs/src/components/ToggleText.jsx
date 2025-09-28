// src/components/ToggleText.jsx
import React, { useEffect, useState } from 'react';
import wordDictionary from '@site/src/data/wordDictionary';

export default function ToggleText({ lines = [], storageKey = 'textToggle' }) {
  const keyA = `${storageKey}_showArabic`;
  const keyT = `${storageKey}_showTransliteration`;
  const keyR = `${storageKey}_showTranslation`;
  const keyD = `${storageKey}_showDictionary`;

  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);

  // Load saved toggle states from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sa = localStorage.getItem(keyA);
      const st = localStorage.getItem(keyT);
      const sr = localStorage.getItem(keyR);
      const sd = localStorage.getItem(keyD);
      if (sa !== null) setShowArabic(sa === 'true');
      if (st !== null) setShowTransliteration(st === 'true');
      if (sr !== null) setShowTranslation(sr === 'true');
      if (sd !== null) setShowDictionary(sd === 'true');
    }
  }, []);

  // Save toggle states when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(keyA, String(showArabic));
      localStorage.setItem(keyT, String(showTransliteration));
      localStorage.setItem(keyR, String(showTranslation));
      localStorage.setItem(keyD, String(showDictionary));
    }
  }, [showArabic, showTransliteration, showTranslation, showDictionary]);

  // Render dictionary breakdown for a single line
  const renderDictionary = (line) => {
    return (
      <div className="dictionary-block">
        {line.arabic.split(' ').map((word, i) => {
          const entry = wordDictionary[word];
          if (!entry) return <span key={i} style={{ marginRight: '0.5rem' }}>{word}</span>;
          return (
            <span key={i}>
              <strong>{word}</strong> ({entry.transliteration}) – {entry.translation}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="toggle-container center-text">
      {/* Toggle Controls */}
      <div className="toggle-controls" role="group" aria-label="Show or hide Arabic, Transliteration, Translation, Dictionary">
        <label>
          <input type="checkbox" checked={showArabic} onChange={() => setShowArabic(s => !s)} /> Arabic
        </label>
        <label>
          <input type="checkbox" checked={showTransliteration} onChange={() => setShowTransliteration(s => !s)} /> Transliteration
        </label>
        <label>
          <input type="checkbox" checked={showTranslation} onChange={() => setShowTranslation(s => !s)} /> Translation
        </label>
        <label>
          <input type="checkbox" checked={showDictionary} onChange={() => setShowDictionary(s => !s)} /> Dictionary
        </label>
        <button type="button" onClick={() => {
          setShowArabic(true);
          setShowTransliteration(true);
          setShowTranslation(true);
          setShowDictionary(false);
        }}>Reset</button>
      </div>

      {/* Lines */}
      {lines.map((line, i) => (
        <div className="line-block" key={i}>
          {showArabic && <p className="arabic">{line.arabic}</p>}
          {showTransliteration && <p className="transliteration">{line.transliteration}</p>}
          {showTranslation && <p className="translation">{line.translation}</p>}
          {showDictionary && renderDictionary(line)}

          {/* Horizontal line separator independent of dictionary */}
          <hr className="line-separator" />
        </div>
      ))}
    </div>
  );
}

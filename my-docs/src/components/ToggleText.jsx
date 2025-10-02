// src/components/ToggleText.jsx
import React, { useEffect, useState } from 'react';
import '@site/src/css/toggleText.css';
import '@site/src/css/typography.css';

export default function ToggleText({ lines = [], storageKey = 'textToggle', dictionary = {} }) {
  const keyA = `${storageKey}_showArabic`;
  const keyT = `${storageKey}_showTransliteration`;
  const keyR = `${storageKey}_showTranslation`;
  const keyD = `${storageKey}_showDictionary`;
  const keyAF = `${storageKey}_arabicFontSize`;
  const keyTF = `${storageKey}_transliterationFontSize`;
  const keySF = `${storageKey}_translationFontSize`;
  const keyFont = `${storageKey}_arabicFont`;

  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);

  const [arabicFontSize, setArabicFontSize] = useState(1.3);
  const [transliterationFontSize, setTransliterationFontSize] = useState(1.1);
  const [translationFontSize, setTranslationFontSize] = useState(1.0);

  const [arabicFont, setArabicFont] = useState('Amiri');
  const arabicFonts = ['Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Lateef', 'Cairo'];

  // Load saved state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sa = localStorage.getItem(keyA);
    const st = localStorage.getItem(keyT);
    const sr = localStorage.getItem(keyR);
    const sd = localStorage.getItem(keyD);
    const af = localStorage.getItem(keyAF);
    const tf = localStorage.getItem(keyTF);
    const sf = localStorage.getItem(keySF);
    const font = localStorage.getItem(keyFont);

    if (sa !== null) setShowArabic(sa === 'true');
    if (st !== null) setShowTransliteration(st === 'true');
    if (sr !== null) setShowTranslation(sr === 'true');
    if (sd !== null) setShowDictionary(sd === 'true');
    if (af !== null) setArabicFontSize(parseFloat(af));
    if (tf !== null) setTransliterationFontSize(parseFloat(tf));
    if (sf !== null) setTranslationFontSize(parseFloat(sf));
    if (font && arabicFonts.includes(font)) setArabicFont(font);
  }, []);

  // Save toggles and font sizes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(keyA, String(showArabic));
    localStorage.setItem(keyT, String(showTransliteration));
    localStorage.setItem(keyR, String(showTranslation));
    localStorage.setItem(keyD, String(showDictionary));
    localStorage.setItem(keyAF, String(arabicFontSize));
    localStorage.setItem(keyTF, String(transliterationFontSize));
    localStorage.setItem(keySF, String(translationFontSize));
    localStorage.setItem(keyFont, arabicFont);
  }, [showArabic, showTransliteration, showTranslation, showDictionary, arabicFontSize, transliterationFontSize, translationFontSize, arabicFont]);

  const getSliderBackground = (value, min = 0.5, max = 3) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #000 ${percentage}%, #e5e7eb ${percentage}%)`;
  };

  const renderDictionary = (line) => (
    <div className={`dictionary-block ${showDictionary ? '' : 'hidden'}`}>
      {line.arabic.split(' ').map((word, i) => {
        const entry = dictionary[word];
        if (!entry) return <span key={i}>{word}</span>;
        return (
          <span key={i}>
            {word} ({entry.transliteration}) – {entry.translation}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="toggle-container center-text">
      {/* Font size sliders */}
      <div className="font-controls">
        <div>
          <label>Arabic</label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.05}
            value={arabicFontSize}
            style={{ background: getSliderBackground(arabicFontSize) }}
            onChange={(e) => setArabicFontSize(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Transliteration</label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.05}
            value={transliterationFontSize}
            style={{ background: getSliderBackground(transliterationFontSize) }}
            onChange={(e) => setTransliterationFontSize(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Translation</label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.05}
            value={translationFontSize}
            style={{ background: getSliderBackground(translationFontSize) }}
            onChange={(e) => setTranslationFontSize(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Arabic font dropdown centered below sliders */}
      <div className="font-dropdown-container">
        <label>Arabic Font: </label>
        <select value={arabicFont} onChange={(e) => setArabicFont(e.target.value)}>
          {arabicFonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

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
          setArabicFontSize(1.3);
          setTransliterationFontSize(1.1);
          setTranslationFontSize(1.0);
          setArabicFont('Amiri');
        }}>Reset</button>
      </div>

      {/* Lines */}
      {lines.map((line, i) => (
        <div className="line-block" key={i}>
          <p
            className={`arabic ${showArabic ? '' : 'hidden'}`}
            style={{
              fontSize: `${arabicFontSize}rem`,
              direction: 'rtl',
              textAlign: 'center',
              fontFamily: arabicFont
            }}
          >
            {line.arabic}
          </p>
          <p className={`transliteration ${showTransliteration ? '' : 'hidden'}`} style={{ fontSize: `${transliterationFontSize}rem` }}>
            {line.transliteration}
          </p>
          <p className={`translation ${showTranslation ? '' : 'hidden'}`} style={{ fontSize: `${translationFontSize}rem` }}>
            {line.translation}
          </p>

          {renderDictionary(line)}

          <hr className="line-separator" />
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import duaDictionary from '@site/src/data/duaDictionary';

export default function ToggleText({ lines = [], storageKey = 'textToggle' }) {
  const keyA = `${storageKey}_showArabic`;
  const keyT = `${storageKey}_showTransliteration`;
  const keyR = `${storageKey}_showTranslation`;
  const keyD = `${storageKey}_showDictionary`;

  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);

  const [arabicFontSize, setArabicFontSize] = useState(1.3);
  const [transliterationFontSize, setTransliterationFontSize] = useState(1.1);
  const [translationFontSize, setTranslationFontSize] = useState(1.0);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(keyA, String(showArabic));
      localStorage.setItem(keyT, String(showTransliteration));
      localStorage.setItem(keyR, String(showTranslation));
      localStorage.setItem(keyD, String(showDictionary));
    }
  }, [showArabic, showTransliteration, showTranslation, showDictionary]);

  const getSliderBackground = (value, min = 0.5, max = 3) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #000 ${percentage}%, #ccc ${percentage}%)`;
  };

  const renderDictionary = (line) => (
    <div className={`dictionary-block ${showDictionary ? '' : 'hidden'}`}>
      {line.arabic.split(' ').map((word, i) => {
        const entry = duaDictionary[word];
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

      {lines.map((line, i) => (
        <div className="line-block" key={i}>
          <p className={`arabic ${showArabic ? '' : 'hidden'}`} style={{ fontSize: `${arabicFontSize}rem` }}>
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

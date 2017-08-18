/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import uniq from 'lodash/uniq';

export function languageToCountryCode(language: string): string {
  if (language.length === 2) {
    return language.toUpperCase();
  }

  return language.slice(3, 5).toUpperCase();
}

export function getPreferredCountryCode(): ?string {
  if (typeof navigator === 'undefined') {
    return null;
  }

  return languageToCountryCode(navigator.language);
}

export function getLanguages(): string[] {
  if (typeof navigator !== 'undefined') {
    if (navigator.languages) {
      return navigator.languages;
    }

    if (navigator.language) {
      return [navigator.language];
    }
  }

  return [];
}

export function getPreferredCountryCodes(): string[] {
  const languages = getLanguages();

  return uniq(languages.map(languageToCountryCode));
}

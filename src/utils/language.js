/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export function languageToCountryCode(language: string): string {
  if (language.length === 2) {
    return language.toUpperCase();
  }

  return language.slice(3).toUpperCase();
}

export function getPreferredCountryCode(): ?string {
  if (typeof navigator === 'undefined') {
    return null;
  }

  return languageToCountryCode(navigator.language);
}

export function getPreferredCountryCodes(): string[] {
  if (typeof navigator === 'undefined') {
    return [];
  }

  return navigator.languages.map((lang) => {
    if (lang.length === 2) {
      return lang.toUpperCase();
    }

    return lang.slice(3).toUpperCase();
  });
}

export default getPreferredCountryCodes;

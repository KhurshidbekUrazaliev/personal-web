/**
 * The languages I speak and how well, on one scale.
 * About, the language tree and the resume all read from this list,
 * so the levels cannot drift apart again.
 */
export type LanguageLevel = 'Native' | 'Advanced' | 'Intermediate' | 'Elementary';

export type LanguageId =
  | 'uzbek'
  | 'english'
  | 'korean'
  | 'russian'
  | 'arabic'
  | 'turkish';

export interface SpokenLanguage {
  id: LanguageId;
  name: string;
  native: string;
  flag: string;
  level: LanguageLevel;
  note: string;
}

/** How many of the four meter steps each level fills. */
export const LEVEL_STEPS: Record<LanguageLevel, number> = {
  Native: 4,
  Advanced: 3,
  Intermediate: 2,
  Elementary: 1,
};

/** Strongest first. */
export const SPOKEN_LANGUAGES: SpokenLanguage[] = [
  { id: 'uzbek',   name: 'Uzbek',   native: "O'zbek",  flag: '🇺🇿', level: 'Native',       note: 'Mother tongue' },
  { id: 'english', name: 'English', native: 'English', flag: '🇬🇧', level: 'Advanced',     note: 'IELTS 7.5' },
  { id: 'korean',  name: 'Korean',  native: '한국어',   flag: '🇰🇷', level: 'Intermediate', note: 'Living in Busan' },
  { id: 'russian', name: 'Russian', native: 'Русский', flag: '🇷🇺', level: 'Intermediate', note: 'Widely spoken across Central Asia' },
  { id: 'arabic',  name: 'Arabic',  native: 'العربية', flag: '🇸🇦', level: 'Intermediate', note: 'Language of the Quran' },
  { id: 'turkish', name: 'Turkish', native: 'Türkçe',  flag: '🇹🇷', level: 'Elementary',   note: 'Linguistic sibling of Uzbek' },
];

export function languageById(id: LanguageId): SpokenLanguage {
  const found = SPOKEN_LANGUAGES.find(l => l.id === id);
  if (!found) throw new Error(`Unknown language: ${id}`);
  return found;
}

import type { LanguageId } from './languages';

/**
 * Works out which of my six languages each word of a text is written in.
 *
 * No AI and no network. The script of a word settles Arabic and Korean.
 * Uzbek, Turkish and English share the Latin alphabet, and Uzbek and Russian
 * share Cyrillic, so for those it looks at tell-tale letters (ş, ğ, ı for
 * Turkish; oʻ, gʻ, ў, қ for Uzbek; щ, ы for Russian) and at short lists of
 * very common words. It is an estimate, not a translator.
 */

export type ScanId = LanguageId | 'other';

export interface ScanRow {
  id: ScanId;
  words: number;
  /** Share of all words in the text, 0 to 100. */
  share: number;
}

type Script = 'arabic' | 'hangul' | 'cyrillic' | 'latin';

/* ─── Letters ────────────────────────────────────────────── */
const ARABIC   = '\\u0600-\\u06FF\\u0750-\\u077F';
const HANGUL   = '\\uAC00-\\uD7AF\\u1100-\\u11FF\\u3130-\\u318F';
const CYRILLIC = '\\u0400-\\u04FF';
const LATIN    = 'A-Za-z\\u00C0-\\u024F';
const LETTERS  = LATIN + CYRILLIC + ARABIC + HANGUL;

// Uzbek writes oʻ and gʻ with an apostrophe inside the word ("oʻzbek", "doʻst"),
// so an apostrophe between letters stays part of the word.
const APOSTROPHES = "'’‘ʻʼ`";
const WORD = new RegExp(`[${LETTERS}]+(?:[${APOSTROPHES}][${LETTERS}]+)*`, 'g');

const HAS_ARABIC   = new RegExp(`[${ARABIC}]`);
const HAS_HANGUL   = new RegExp(`[${HANGUL}]`);
const HAS_CYRILLIC = new RegExp(`[${CYRILLIC}]`);

const TURKISH_LETTERS        = /[şŞğĞıİçÇöÖüÜ]/;
const UZBEK_APOSTROPHE       = /[og]'/;
const UZBEK_CYRILLIC_LETTERS = /[ўқғҳЎҚҒҲ]/;
const RUSSIAN_ONLY_LETTERS   = /[щыЩЫ]/;

/* ─── Common words ───────────────────────────────────────── */
const set = (words: string) => new Set(words.split(/\s+/).filter(Boolean));

const UZBEK_WORDS = set(`
  salom assalomu alaykum rahmat katta kichik yaxshi yomon men biz ular shu va ham
  uchun bilan lekin kerak bor yo'q emas juda suv non do'st kitob maktab uy ona ota
  bola o'zbek o'zbekiston o'zbekcha xayr nima qanday qayerda qachon bugun ertaga
  kecha ish til tili tilida shahar yangi eski kun yil odam hayot ilm o'qish
  o'rganish o'rganaman o'rganyapman gapiraman yashayman xurshidbekman marhamat
  iltimos kechirasiz tushunaman bilaman sevaman ismim mening sening bizning
  qalaysiz yaxshimisiz toshkent buxoro samarqand farg'ona beshariq hamma hech
  kim bu bir sen siz ha
`);

const UZBEK_CYRILLIC_WORDS = set(`
  салом раҳмат рахмат яхши мен сен биз сиз ва учун билан ҳам керак катта кичик
  китоб мактаб бугун эртага ўзбек ўзбекистон тил тили тилида гапираман
  яшайман исмим менинг
`);

const TURKISH_WORDS = set(`
  merhaba selam teşekkürler teşekkür ederim evet hayır ve bir bu şu için ile çok
  güzel iyi kötü su ekmek arkadaş nasılsın nasıl ben sen biz siz onlar var yok
  değil ne kim nerede zaman bugün yarın dün şehir türkiye türkçe öğreniyorum
  günaydın lütfen tamam kitap okul ev anne baba çocuk yeni eski iki üç gün yıl
  insan hayat dil konuşuyorum yaşıyorum seviyorum biliyorum görüşürüz istanbul
  ankara adım benim senin bizim hiç
`);

const ENGLISH_WORDS = set(`
  the a an and or but is are am was were be been being of to in on at for with
  from by this that these those it its i you he she we they my your his her our
  their me him us them not no yes do does did have has had will would can could
  should may might must what who where when why how which hello hi hey thanks
  thank please sorry good bad great water friend friends book school house home
  mother father child new old one two three day year people life language
  languages learn learning speak live love know city today tomorrow yesterday
  very all some more most there here about into than then so if as up out just
  like time world work build building code technology global name morning night
  every each any many much also too only now after before because while make
  made get got go going come see look want need think say said tell use find
  give take o'clock
`);

const RUSSIAN_WORDS = set(`
  привет здравствуйте как дела я ты он она мы вы они и в на не что это спасибо
  пожалуйста да нет хорошо плохо вода друг день каждый учусь сегодня завтра
  вчера язык русский говорю живу люблю знаю меня зовут очень с по для от из у
  а но или если когда где кто почему книга школа дом мама папа город год
  жизнь работа
`);

/* ─── Helpers ────────────────────────────────────────────── */

function scriptOf(word: string): Script {
  if (HAS_ARABIC.test(word)) return 'arabic';
  if (HAS_HANGUL.test(word)) return 'hangul';
  if (HAS_CYRILLIC.test(word)) return 'cyrillic';
  return 'latin';
}

/** Lower case, one kind of apostrophe, and no stray dot from "İ".toLowerCase(). */
function normalise(word: string): string {
  return word
    .toLowerCase()
    .normalize('NFD')
    .replace(/\u0307/g, '')
    .normalize('NFC')
    .replace(/[’‘ʻʼ`]/g, "'");
}

/**
 * Every language a word could belong to, judged on the word alone.
 * One entry means it is clear; none means the word is in no list.
 */
function candidates(raw: string, script: Script): ScanId[] {
  if (script === 'arabic') return ['arabic'];
  if (script === 'hangul') return ['korean'];

  const word = normalise(raw);
  const found: ScanId[] = [];

  if (script === 'cyrillic') {
    if (UZBEK_CYRILLIC_LETTERS.test(raw) || UZBEK_CYRILLIC_WORDS.has(word)) found.push('uzbek');
    if (RUSSIAN_ONLY_LETTERS.test(raw) || RUSSIAN_WORDS.has(word)) found.push('russian');
    return found;
  }

  if (UZBEK_APOSTROPHE.test(word) || UZBEK_WORDS.has(word)) found.push('uzbek');
  if (TURKISH_LETTERS.test(raw) || TURKISH_WORDS.has(word)) found.push('turkish');
  if (ENGLISH_WORDS.has(word)) found.push('english');
  return found;
}

/** What an unlisted word becomes when no clear word of its script is in the text. */
const FALLBACK: Record<Script, ScanId> = {
  arabic: 'arabic',
  hangul: 'korean',
  cyrillic: 'russian',
  latin: 'other',
};

/* ─── Scan ───────────────────────────────────────────────── */

export function countWords(text: string): number {
  return (text.normalize('NFC').match(WORD) ?? []).length;
}

export function scanText(text: string): ScanRow[] {
  const words = text.normalize('NFC').match(WORD) ?? [];
  if (!words.length) return [];

  const scripts = words.map(scriptOf);
  const options = words.map((word, i) => candidates(word, scripts[i]));
  // The language of each word that fits exactly one, else null.
  const sure = options.map(list => (list.length === 1 ? list[0] : null));

  const sureCount = new Map<ScanId, number>();
  for (const language of sure) {
    if (language) sureCount.set(language, (sureCount.get(language) ?? 0) + 1);
  }
  const weight = (language: ScanId) => sureCount.get(language) ?? 0;

  /** The closest clear word in the same script, looking both ways. */
  const nearestSure = (index: number): ScanId | null => {
    for (let step = 1; step < words.length; step++) {
      for (const j of [index - step, index + step]) {
        if (sure[j] && scripts[j] === scripts[index]) return sure[j];
      }
    }
    return null;
  };

  const languages = words.map((_, i): ScanId => {
    const clear = sure[i];
    if (clear) return clear;
    // Fits two languages ("bu" is Uzbek and Turkish): the one the rest of
    // the text leans towards wins.
    if (options[i].length) {
      return options[i].reduce((best, next) => (weight(next) > weight(best) ? next : best));
    }
    // In no list (a name, a rarer word): it takes the language of the
    // nearest clear word in the same script.
    return nearestSure(i) ?? FALLBACK[scripts[i]];
  });

  const counts = new Map<ScanId, number>();
  for (const language of languages) {
    counts.set(language, (counts.get(language) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([id, count]) => ({ id, words: count, share: (count / words.length) * 100 }))
    .sort((a, b) => b.words - a.words);
}

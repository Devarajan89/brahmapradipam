import Fuse from 'fuse.js';

export interface SearchableVerse {
  id: string;
  reference: string;
  text: string;
  devanagari: string;
  iast: string;
  translation: string;
  url: string;
  type: 'verse';
}

export interface SearchableConcept {
  id: string;
  term: string;
  transliteration: string;
  definition: string;
  url: string;
  type: 'concept';
}

export interface SearchableText {
  id: string;
  name: string;
  nameDevanagari: string;
  description: string;
  url: string;
  type: 'text';
}

export type SearchResult = SearchableVerse | SearchableConcept | SearchableText;

const fuseOptions = {
  keys: [
    { name: 'reference', weight: 2 },
    { name: 'devanagari', weight: 1.5 },
    { name: 'iast', weight: 1.5 },
    { name: 'translation', weight: 1 },
    { name: 'term', weight: 2 },
    { name: 'transliteration', weight: 1.5 },
    { name: 'definition', weight: 1 },
    { name: 'name', weight: 2 },
    { name: 'nameDevanagari', weight: 1.5 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<SearchResult> | null = null;

export function initializeSearch(data: SearchResult[]) {
  fuseInstance = new Fuse(data, fuseOptions);
}

export function search(query: string, limit = 10): SearchResult[] {
  if (!fuseInstance) return [];
  const results = fuseInstance.search(query, { limit });
  return results.map(r => r.item);
}

export function parseVerseReference(input: string): { text: string; verse: number; chapter?: number } | null {
  // Parse patterns like "isha 5", "bg 2.16", "2-16" etc
  const patterns = [
    /^(?:isha|īśa)\s*(\d+)$/i,
    /^(?:bg|gita|gītā)\s*(\d+)[.-](\d+)$/i,
    /^(\d+)[.-](\d+)$/,
  ];
  
  for (const pattern of patterns) {
    const match = input.trim().match(pattern);
    if (match) {
      if (match[0].match(/isha|īśa/i)) {
        return { text: 'isha', verse: parseInt(match[1]) };
      } else if (match[2]) {
        return { text: 'bg', chapter: parseInt(match[1]), verse: parseInt(match[2]) };
      }
    }
  }
  return null;
}

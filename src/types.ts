export enum Suit {
  MAJOR_ARCANA = 'Major Arcana',
  WANDS = 'Wands',
  CUPS = 'Cups',
  SWORDS = 'Swords',
  PENTACLES = 'Pentacles',
  // Playing Card Suits
  HEARTS = 'Hearts',
  DIAMONDS = 'Diamonds',
  CLUBS = 'Clubs',
  SPADES = 'Spades',
}

export enum DeckType {
  TAROT = 'TAROT',
  PLAYING_CARDS = 'PLAYING_CARDS',
}

export interface TarotCard {
  id: string;
  name: string;
  suit: Suit;
  value: string;
  image: string;
  meaningUpright: string;
  meaningReversed: string;
  description: string;
}

export enum SpreadType {
  ONE_CARD = 'ONE_CARD',
  THREE_CARDS = 'THREE_CARDS',
  CELTIC_CROSS = 'CELTIC_CROSS',
}

export enum ReadingTheme {
  LOVE = 'LOVE',
  STUDY = 'STUDY',
  CAREER = 'CAREER',
  OVERVIEW = 'OVERVIEW',
}

export interface UserInfo {
  fullName: string;
  birthYear: string;
  request?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  effectsEnabled: boolean;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  positionName?: string;
}

export interface ReadingResult {
  id: string;
  userId: string;
  timestamp: number;
  question: string;
  theme: ReadingTheme;
  spreadType: SpreadType;
  deckType: DeckType;
  userInfo: UserInfo;
  drawnCards: DrawnCard[];
  aiInterpretation?: string;
}

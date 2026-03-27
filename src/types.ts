export enum Suit {
  MAJOR_ARCANA = 'Major Arcana',
  WANDS = 'Wands',
  CUPS = 'Cups',
  SWORDS = 'Swords',
  PENTACLES = 'Pentacles',
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
  drawnCards: DrawnCard[];
  aiInterpretation?: string;
}

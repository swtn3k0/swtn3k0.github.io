import { Suit, TarotCard } from '../types';

const generatePlayingCards = (): TarotCard[] => {
  const suits = [Suit.HEARTS, Suit.DIAMONDS, Suit.CLUBS, Suit.SPADES];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const cards: TarotCard[] = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      const id = `${suit.toLowerCase()}-${value.toLowerCase()}`;
      cards.push({
        id,
        name: `${value} of ${suit}`,
        suit,
        value,
        image: `https://picsum.photos/seed/pc-${id}/400/600`,
        meaningUpright: `Ý nghĩa của lá ${value} ${suit} trong bói toán.`,
        meaningReversed: `Ý nghĩa ngược của lá ${value} ${suit} trong bói toán.`,
        description: `Lá bài ${value} thuộc bộ ${suit}.`
      });
    });
  });

  return cards;
};

export const playingCards: TarotCard[] = generatePlayingCards();

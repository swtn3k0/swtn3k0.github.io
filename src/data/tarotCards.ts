import { Suit, TarotCard } from '../types';

export const tarotCards: TarotCard[] = [
  {
    id: '0',
    name: 'The Fool',
    suit: Suit.MAJOR_ARCANA,
    value: '0',
    image: 'https://picsum.photos/seed/tarot-fool/400/600',
    meaningUpright: 'New beginnings, optimism, trust in life',
    meaningReversed: 'Recklessness, risk-taking, inconsiderateness',
    description: 'The Fool represents the beginning of a journey, full of potential and innocence.'
  },
  {
    id: '1',
    name: 'The Magician',
    suit: Suit.MAJOR_ARCANA,
    value: '1',
    image: 'https://picsum.photos/seed/tarot-magician/400/600',
    meaningUpright: 'Action, power, manifestation',
    meaningReversed: 'Manipulation, poor planning, untapped talents',
    description: 'The Magician signifies the power to manifest your desires through skill and focus.'
  },
  {
    id: '2',
    name: 'The High Priestess',
    suit: Suit.MAJOR_ARCANA,
    value: '2',
    image: 'https://picsum.photos/seed/tarot-priestess/400/600',
    meaningUpright: 'Intuition, mystery, subconscious mind',
    meaningReversed: 'Secrets, disconnected from intuition, withdrawal',
    description: 'The High Priestess represents the inner world and the mysteries of the subconscious.'
  },
  {
    id: '3',
    name: 'The Empress',
    suit: Suit.MAJOR_ARCANA,
    value: '3',
    image: 'https://picsum.photos/seed/tarot-empress/400/600',
    meaningUpright: 'Femininity, beauty, nature, abundance',
    meaningReversed: 'Creative block, dependence on others',
    description: 'The Empress is the mother figure, representing growth, fertility, and abundance.'
  },
  {
    id: '4',
    name: 'The Emperor',
    suit: Suit.MAJOR_ARCANA,
    value: '4',
    image: 'https://picsum.photos/seed/tarot-emperor/400/600',
    meaningUpright: 'Authority, structure, control, father figure',
    meaningReversed: 'Tyranny, rigidity, coldness',
    description: 'The Emperor represents structure, order, and authority.'
  },
  {
    id: '5',
    name: 'The Hierophant',
    suit: Suit.MAJOR_ARCANA,
    value: '5',
    image: 'https://picsum.photos/seed/tarot-hierophant/400/600',
    meaningUpright: 'Spiritual wisdom, religious beliefs, conformity, tradition',
    meaningReversed: 'Personal beliefs, freedom, challenging the status quo',
    description: 'The Hierophant represents tradition and conventional wisdom.'
  },
  {
    id: '6',
    name: 'The Lovers',
    suit: Suit.MAJOR_ARCANA,
    value: '6',
    image: 'https://picsum.photos/seed/tarot-lovers/400/600',
    meaningUpright: 'Love, harmony, relationships, values alignment, choices',
    meaningReversed: 'Self-love, disharmony, imbalance, misalignment of values',
    description: 'The Lovers represent relationships and choices made from the heart.'
  },
  {
    id: '7',
    name: 'The Chariot',
    suit: Suit.MAJOR_ARCANA,
    value: '7',
    image: 'https://picsum.photos/seed/tarot-chariot/400/600',
    meaningUpright: 'Control, will power, victory, assertion, determination',
    meaningReversed: 'Lack of control, lack of direction, aggression',
    description: 'The Chariot signifies victory through willpower and discipline.'
  },
  {
    id: '8',
    name: 'Strength',
    suit: Suit.MAJOR_ARCANA,
    value: '8',
    image: 'https://picsum.photos/seed/tarot-strength/400/600',
    meaningUpright: 'Strength, courage, persuasion, influence, compassion',
    meaningReversed: 'Inner strength, self-doubt, low energy, raw emotion',
    description: 'Strength represents inner fortitude and the power of gentle persuasion.'
  },
  {
    id: '9',
    name: 'The Hermit',
    suit: Suit.MAJOR_ARCANA,
    value: '9',
    image: 'https://picsum.photos/seed/tarot-hermit/400/600',
    meaningUpright: 'Soul-searching, introspection, being alone, inner guidance',
    meaningReversed: 'Isolation, loneliness, withdrawal',
    description: 'The Hermit represents the search for inner truth and wisdom.'
  },
  {
    id: '10',
    name: 'Wheel of Fortune',
    suit: Suit.MAJOR_ARCANA,
    value: '10',
    image: 'https://picsum.photos/seed/tarot-wheel/400/600',
    meaningUpright: 'Good luck, karma, life cycles, destiny, a turning point',
    meaningReversed: 'Bad luck, resistance to change, breaking cycles',
    description: 'The Wheel of Fortune represents the ever-changing nature of life.'
  },
  {
    id: '11',
    name: 'Justice',
    suit: Suit.MAJOR_ARCANA,
    value: '11',
    image: 'https://picsum.photos/seed/tarot-justice/400/600',
    meaningUpright: 'Justice, fairness, truth, cause and effect, law',
    meaningReversed: 'Unfairness, lack of accountability, dishonesty',
    description: 'Justice represents fairness and the consequences of our actions.'
  },
  {
    id: '12',
    name: 'The Hanged Man',
    suit: Suit.MAJOR_ARCANA,
    value: '12',
    image: 'https://picsum.photos/seed/tarot-hanged/400/600',
    meaningUpright: 'Pause, surrender, letting go, new perspectives',
    meaningReversed: 'Delays, resistance, stalling, indecision',
    description: 'The Hanged Man represents a period of suspension and seeing things from a different angle.'
  },
  {
    id: '13',
    name: 'Death',
    suit: Suit.MAJOR_ARCANA,
    value: '13',
    image: 'https://picsum.photos/seed/tarot-death/400/600',
    meaningUpright: 'Endings, change, transformation, transition',
    meaningReversed: 'Resistance to change, personal transformation, inner purging',
    description: 'Death represents the end of one cycle and the beginning of another.'
  },
  {
    id: '14',
    name: 'Temperance',
    suit: Suit.MAJOR_ARCANA,
    value: '14',
    image: 'https://picsum.photos/seed/tarot-temperance/400/600',
    meaningUpright: 'Balance, moderation, patience, purpose',
    meaningReversed: 'Imbalance, excess, self-healing, re-alignment',
    description: 'Temperance represents balance and finding the middle ground.'
  },
  {
    id: '15',
    name: 'The Devil',
    suit: Suit.MAJOR_ARCANA,
    value: '15',
    image: 'https://picsum.photos/seed/tarot-devil/400/600',
    meaningUpright: 'Shadow self, attachment, addiction, restriction, sexuality',
    meaningReversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
    description: 'The Devil represents the things that hold us back and our shadow side.'
  },
  {
    id: '16',
    name: 'The Tower',
    suit: Suit.MAJOR_ARCANA,
    value: '16',
    image: 'https://picsum.photos/seed/tarot-tower/400/600',
    meaningUpright: 'Sudden change, upheaval, chaos, revelation, awakening',
    meaningReversed: 'Personal transformation, fear of change, averting disaster',
    description: 'The Tower represents sudden and often destructive change that clears the way for something new.'
  },
  {
    id: '17',
    name: 'The Star',
    suit: Suit.MAJOR_ARCANA,
    value: '17',
    image: 'https://picsum.photos/seed/tarot-star/400/600',
    meaningUpright: 'Hope, faith, purpose, renewal, spirituality',
    meaningReversed: 'Lack of faith, despair, self-trust, disconnection',
    description: 'The Star represents hope and inspiration after a difficult period.'
  },
  {
    id: '18',
    name: 'The Moon',
    suit: Suit.MAJOR_ARCANA,
    value: '18',
    image: 'https://picsum.photos/seed/tarot-moon/400/600',
    meaningUpright: 'Illusion, fear, anxiety, subconscious, intuition',
    meaningReversed: 'Release of fear, repressed emotion, inner confusion',
    description: 'The Moon represents the realm of dreams, illusions, and the unknown.'
  },
  {
    id: '19',
    name: 'The Sun',
    suit: Suit.MAJOR_ARCANA,
    value: '19',
    image: 'https://picsum.photos/seed/tarot-sun/400/600',
    meaningUpright: 'Positivity, fun, warmth, success, vitality',
    meaningReversed: 'Inner child, feeling down, overly optimistic',
    description: 'The Sun represents joy, success, and vitality.'
  },
  {
    id: '20',
    name: 'Judgement',
    suit: Suit.MAJOR_ARCANA,
    value: '20',
    image: 'https://picsum.photos/seed/tarot-judgement/400/600',
    meaningUpright: 'Judgement, rebirth, inner calling, absolution',
    meaningReversed: 'Self-doubt, inner critic, ignoring the call',
    description: 'Judgement represents a time of reflection and answering a higher calling.'
  },
  {
    id: '21',
    name: 'The World',
    suit: Suit.MAJOR_ARCANA,
    value: '21',
    image: 'https://picsum.photos/seed/tarot-world/400/600',
    meaningUpright: 'Completion, integration, accomplishment, travel',
    meaningReversed: 'Seeking personal closure, short-cuts, delays',
    description: 'The World represents the successful completion of a journey and a sense of wholeness.'
  },
  {
    id: 'w1',
    name: 'Ace of Wands',
    suit: Suit.WANDS,
    value: '1',
    image: 'https://picsum.photos/seed/tarot-ace-wands/400/600',
    meaningUpright: 'Inspiration, new opportunities, growth, potential',
    meaningReversed: 'Emerging idea, lack of direction, distractions',
    description: 'The Ace of Wands represents a spark of inspiration and new creative potential.'
  },
  {
    id: 'c1',
    name: 'Ace of Cups',
    suit: Suit.CUPS,
    value: '1',
    image: 'https://picsum.photos/seed/tarot-ace-cups/400/600',
    meaningUpright: 'Love, new relationships, compassion, creativity',
    meaningReversed: 'Self-love, intuition, repressed emotions',
    description: 'The Ace of Cups represents the beginning of emotional and spiritual fulfillment.'
  },
  {
    id: 's1',
    name: 'Ace of Swords',
    suit: Suit.SWORDS,
    value: '1',
    image: 'https://picsum.photos/seed/tarot-ace-swords/400/600',
    meaningUpright: 'Breakthroughs, new ideas, mental clarity, success',
    meaningReversed: 'Inner clarity, re-thinking an idea, clouded judgement',
    description: 'The Ace of Swords represents mental clarity and the power of the intellect.'
  },
  {
    id: 'p1',
    name: 'Ace of Pentacles',
    suit: Suit.PENTACLES,
    value: '1',
    image: 'https://picsum.photos/seed/tarot-ace-pentacles/400/600',
    meaningUpright: 'A new financial or career opportunity, manifestation, abundance',
    meaningReversed: 'Lost opportunity, lack of planning and foresight',
    description: 'The Ace of Pentacles represents a new beginning in the material world.'
  }
];

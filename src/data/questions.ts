import { Answers } from '../types';

export const INITIAL_ANSWERS: Answers = {
  q1: '',
  q2: {
    selected: [],
    otherText: '',
  },
  q3: '',
  q4: {
    choice: '',
    how: '',
  },
  q5: {
    choice: '',
    how: '',
  },
  q6: '',
  q7: '',
  q8: '',
  q9: {
    choice: '',
    explain: '',
  },
  q10: {
    choice: '',
    explain: '',
  },
  q11: [],
  q12: '',
  q13: '',
  q14: '',
  q15: '',
  q16: {
    selected: [],
    otherText: '',
  },
  q17: 5,
  q18: '',
  q19: '',
  q20: '',
  qImportant: '',
};

export interface SectionMetadata {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
}

export const SECTIONS: SectionMetadata[] = [
  {
    id: 'sec1',
    title: 'Sentimentos e Primeiro Impacto',
    subtitle: 'Sentimentos Iniciais',
    icon: 'Heart',
    description: 'Tomar consciência das primeiras impressões e reações emocionais que emergem dessa situação hoje.',
  },
  {
    id: 'sec2',
    title: 'Mudanças e Percepções',
    subtitle: 'Relações & Dinâmicas',
    icon: 'Eye',
    description: 'Olhar para as mudanças em suas relações familiares e no impacto direto das dinâmicas vivenciadas.',
  },
  {
    id: 'sec3',
    title: 'O Não Dito e Expressão',
    subtitle: 'Voz ao Coração',
    icon: 'MessageSquareShare',
    description: 'Dar voz aos sentimentos, perguntas e palavras que ficaram guardados no seu coração por todo esse tempo.',
  },
  {
    id: 'sec4',
    title: 'Corpo, Escala e Perda',
    subtitle: 'Impacto no Corpo',
    icon: 'Activity',
    description: 'Mapear a manifestação física das emoções no seu corpo e ponderar o peso e as perdas geradas.',
  },
  {
    id: 'sec5',
    title: 'A Pergunta Crucial',
    subtitle: 'Acolhimento Final',
    icon: 'Sparkles',
    description: 'Encarar o questionamento mais importante e profundo sobre a verdade e a paz interior hoje.',
  },
];

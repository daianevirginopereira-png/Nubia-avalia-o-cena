export type AppTheme = 'daiane' | 'midnight' | 'minimal';

export type AnswerValue = string | string[] | number | { value: string; explanation?: string };

export interface Answers {
  q1: string;
  q2: {
    selected: string[];
    otherText: string;
  };
  q3: string;
  q4: {
    choice: 'Sim' | 'Não' | '';
    how: string;
  };
  q5: {
    choice: 'Sim' | 'Não' | '';
    how: string;
  };
  q6: string;
  q7: string;
  q8: string;
  q9: {
    choice: 'Sim' | 'Não' | 'Às vezes' | '';
    explain: string;
  };
  q10: {
    choice: 'Sim' | 'Não' | 'Às vezes' | '';
    explain: string;
  };
  q11: string[]; // Options: 'Da sua mãe', 'Do seu ex-marido', 'Dos dois', 'De você mesma'
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: {
    selected: string[];
    otherText: string;
  };
  q17: number; // 0 to 10
  q18: string;
  q19: string;
  q20: string;
  qImportant: string; // Pergunta mais importante
}

export type SectionId = 'intro' | 'part1' | 'break1' | 'part2' | 'break2' | 'part3' | 'part4' | 'part5' | 'summary';

export interface Section {
  id: SectionId;
  title: string;
  subtitle?: string;
  type: 'welcome' | 'questions' | 'breathing' | 'summary';
  questionIds: string[];
}

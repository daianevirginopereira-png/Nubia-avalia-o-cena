import React from 'react';
import { Answers, AppTheme } from '../types';
import { Heart, Activity, Compass, ShieldCheck, GraduationCap, ClipboardCheck } from 'lucide-react';

interface QuestionCardProps {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onSubmit: () => void;
  theme: AppTheme;
}

export default function QuestionCard({
  answers,
  setAnswers,
  onSubmit,
  theme,
}: QuestionCardProps) {

  // Checkbox helpers
  const handleQ2Checkbox = (option: string) => {
    setAnswers((prev) => {
      const selected = prev.q2.selected.includes(option)
        ? prev.q2.selected.filter((item) => item !== option)
        : [...prev.q2.selected, option];
      return { ...prev, q2: { ...prev.q2, selected } };
    });
  };

  const handleQ11Checkbox = (option: string) => {
    setAnswers((prev) => {
      const q11 = prev.q11.includes(option)
        ? prev.q11.filter((item) => item !== option)
        : [...prev.q11, option];
      return { ...prev, q11 };
    });
  };

  const handleQ16Checkbox = (option: string) => {
    setAnswers((prev) => {
      const selected = prev.q16.selected.includes(option)
        ? prev.q16.selected.filter((item) => item !== option)
        : [...prev.q16.selected, option];
      return { ...prev, q16: { ...prev.q16, selected } };
    });
  };

  const handleTextChange = (key: keyof Answers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Helper to check filled progress dynamically
  const getAnsweredCount = () => {
    let completed = 0;
    if (answers.q1) completed++;
    if (answers.q2.selected.length > 0 || answers.q2.otherText) completed++;
    if (answers.q3) completed++;
    if (answers.q4.choice) completed++;
    if (answers.q5.choice) completed++;
    if (answers.q6) completed++;
    if (answers.q7) completed++;
    if (answers.q8) completed++;
    if (answers.q9.choice) completed++;
    if (answers.q10.choice) completed++;
    if (answers.q11.length > 0) completed++;
    if (answers.q12) completed++;
    if (answers.q13) completed++;
    if (answers.q14) completed++;
    if (answers.q15) completed++;
    if (answers.q16.selected.length > 0 || answers.q16.otherText) completed++;
    if (answers.q17 !== undefined) completed++;
    if (answers.q18) completed++;
    if (answers.q19) completed++;
    if (answers.q20) completed++;
    if (answers.qImportant) completed++;
    return completed;
  };

  const isMidnight = theme === 'midnight';
  const isMinimal = theme === 'minimal';

  // Dynamic Notebook lines styling for textarea
  const getLinedStyle = (theme: AppTheme) => {
    const lineColor = theme === 'midnight'
      ? 'rgba(99, 102, 241, 0.12)' //indigo faint
      : theme === 'minimal'
      ? 'rgba(0, 0, 0, 0.08)' //minimal faint black
      : 'rgba(157, 122, 111, 0.22)'; // custom brand terracotta styled lines
    
    return {
      backgroundImage: `linear-gradient(transparent calc(1.85rem - 1px), ${lineColor} calc(1.85rem - 1px))`,
      backgroundSize: '100% 1.85rem',
      lineHeight: '1.85rem',
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
    };
  };

  // Styles map
  const styles = {
    examSheet: isMidnight
      ? 'bg-[#151D30] border-2 border-slate-700/75 p-5 md:p-8 rounded-2xl shadow-2xl relative text-slate-100 overflow-hidden'
      : isMinimal
      ? 'bg-white border-2 border-neutral-900 p-5 md:p-8 rounded-none shadow-none text-neutral-950 relative overflow-hidden font-mono'
      : 'bg-[#FDFDFB] border-2 border-daiane-brand/20 p-6 md:p-10 rounded-md shadow-xl text-daiane-dark relative overflow-hidden leading-relaxed font-sans',
    
    headerBox: isMidnight
      ? 'border border-slate-700/60 p-4 rounded-xl text-slate-300 flex flex-col md:flex-row justify-between gap-4 font-mono text-xxs'
      : isMinimal
      ? 'border-2 border-neutral-900 p-4 rounded-none text-neutral-950 flex flex-col md:flex-row justify-between gap-4 font-mono text-xxs'
      : 'border-2 border-daiane-brand/15 p-4 rounded-md text-daiane-dark/95 flex flex-col md:flex-row justify-between gap-3 font-sans text-xs bg-[#FAF5EE]/70',

    stampCircle: isMidnight
      ? 'border-2 border-dashed border-indigo-500 text-indigo-400 p-3 rounded-full flex flex-col items-center justify-center w-24 h-24 shrink-0 mx-auto md:mx-0'
      : isMinimal
      ? 'border-2 border-neutral-950 text-neutral-955 p-3 rounded-none flex flex-col items-center justify-center w-24 h-24 shrink-0 mx-auto md:mx-0 font-bold'
      : 'border-2 border-red-500/80 text-red-500 p-3 rounded-full flex flex-col items-center justify-center w-24 h-24 shrink-0 mx-auto md:mx-0 rotate-3 shadow-sm shadow-red-500/5 bg-white/40',

    sectionHeader: isMidnight
      ? 'text-xs md:text-sm font-black text-indigo-400 border-b border-indigo-950/60 pb-1 flex items-center gap-2 uppercase tracking-wider font-mono'
      : isMinimal
      ? 'text-xs md:text-sm font-black text-neutral-950 border-b-2 border-neutral-905 pb-1 flex items-center gap-2 uppercase tracking-widest font-mono'
      : 'text-xs md:text-sm font-semibold text-daiane-dark border-b-2 border-daiane-brand/25 pb-1 flex items-center gap-2 uppercase tracking-wide font-serif',

    questionTitle: isMidnight
      ? 'text-xs md:text-sm font-semibold text-slate-200 block font-mono'
      : isMinimal
      ? 'text-xs md:text-sm font-bold text-neutral-950 block font-mono'
      : 'text-xs md:text-sm font-semibold text-daiane-dark block font-serif leading-relaxed',

    textareaField: isMidnight
      ? 'w-full p-3 font-mono text-xs bg-[#0E1424] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-400'
      : isMinimal
      ? 'w-full p-3 font-mono text-xs bg-[#FAF9F6] border border-neutral-300 rounded-none text-neutral-955 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950'
      : 'w-full p-4 font-sans text-sm bg-stone-50/20 border border-daiane-brand/15 rounded-lg text-daiane-dark placeholder:text-daiane-dark/45 focus:outline-none focus:ring-2 focus:ring-daiane-brand/20 focus:border-daiane-brand/55',

    checkboxBtn: (isChecked: boolean) => {
      if (theme === 'daiane') {
        return isChecked
          ? 'bg-daiane-brand-light border-daiane-brand text-daiane-dark font-medium shadow-sm'
          : 'bg-white border-daiane-brand/15 text-daiane-dark/70 hover:border-daiane-brand/45';
      } else if (theme === 'midnight') {
        return isChecked
          ? 'bg-indigo-950/40 border-indigo-500 text-indigo-400'
          : 'bg-[#151D30] border-slate-800 text-slate-450 hover:border-slate-700';
      } else {
        return isChecked
          ? 'bg-neutral-100 border-neutral-950 text-neutral-950 font-bold border-2'
          : 'bg-white border-neutral-300 text-neutral-600';
      }
    },

    btnSubmit: isMidnight
      ? 'w-full justify-center inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/10 active:scale-[0.99] transition duration-200'
      : isMinimal
      ? 'w-full justify-center inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-neutral-950 hover:bg-neutral-900 border-2 border-neutral-950 text-white rounded-none active:scale-[0.99] transition duration-200 font-mono'
      : 'w-full justify-center inline-flex items-center gap-2 px-8 py-4.5 text-sm font-medium bg-daiane-brand hover:bg-[#8F6D63] text-white rounded-xl shadow-md shadow-daiane-brand/10 active:scale-[0.99] transition duration-200 font-serif',

    crucialBox: isMidnight
      ? 'bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-4 md:p-5 text-left space-y-3'
      : isMinimal
      ? 'bg-neutral-50 border border-neutral-300 rounded-none p-4 md:p-5 text-left space-y-3'
      : 'bg-daiane-brand-light/35 border border-daiane-brand/20 p-5 rounded-xl text-left space-y-3',

    sliderBg: isMidnight
      ? 'accent-indigo-500 bg-slate-800'
      : isMinimal
      ? 'accent-neutral-950 bg-neutral-300'
      : 'accent-daiane-brand bg-daiane-brand-light/40',
    
    badgeStyle: isMidnight
      ? 'text-indigo-305 bg-indigo-950 border border-indigo-900/50'
      : isMinimal
      ? 'text-neutral-950 bg-neutral-100 border border-neutral-305 font-bold'
      : 'text-daiane-dark bg-daiane-brand-light/50 border border-daiane-brand/15 font-semibold',
  };

  const currentCount = getAnsweredCount();

  return (
    <div className={styles.examSheet} id="school-test-card">
      
      {/* EXAM PAPER TIMELINE HEADER */}
      <div className="space-y-4 mb-8" id="test-sheet-header">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className={`font-black text-lg ${isMinimal ? 'font-mono uppercase tracking-wider' : 'font-serif text-daiane-dark font-semibold'}`}>
              AVALIAÇÃO CONFIDENCIAL DE PREPARAÇÃO
            </h2>
            <p className={`text-xxs leading-relaxed ${isMidnight ? 'text-slate-400' : 'text-stone-500'}`}>
              Sessão de Acolhida e Diálogo Terapêutico · Roteiro de Apoio Emocional
            </p>
          </div>


        </div>

        {/* Traditional Escola / Aluno table box */}
        <div className={styles.headerBox} id="exam-pupil-fields">
          <div className="space-y-1 md:col-span-2">
            <span className="block font-bold">ALUNA (PACIENTE):</span>
            <span className={`block pb-1 border-b font-semibold ${isMidnight ? 'border-slate-800' : isMinimal ? 'border-neutral-950' : 'border-stone-300 text-stone-800'}`}>
              NÚBIA <span className="opacity-30 italic font-normal">(Auto-registro sob sigilo)</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="block font-bold">PROF./TERAPEUTA:</span>
            <span className={`block pb-1 border-b font-semibold ${isMidnight ? 'border-slate-800' : isMinimal ? 'border-neutral-950' : 'border-stone-300 text-stone-800'}`}>
              DAIANE VIRGINO
            </span>
          </div>
          <div className="space-y-1 col-span-1">
            <span className="block font-bold">AULA / TURMA:</span>
            <span className={`block pb-1 border-b font-semibold focus:outline-none ${isMidnight ? 'border-slate-800 text-slate-300' : isMinimal ? 'border-neutral-950 text-neutral-950' : 'border-stone-300 text-stone-800'}`}>
              Ciclo do Sentir
            </span>
          </div>

          <div className="space-y-1 col-span-1 md:col-span-2">
            <span className="block font-bold">ESPAÇO ESCOLAR / CLÍNICA:</span>
            <span className="block italic text-xxs opacity-80">
              Espaço Terapêutico de Integração e Acolhimento
            </span>
          </div>
          <div className="space-y-1 col-span-1">
            <span className="block font-bold">GRAU DE ACOLHIMENTO:</span>
            <span className={`block font-semibold ${theme === 'daiane' ? 'text-daiane-brand' : theme === 'midnight' ? 'text-indigo-400' : 'text-neutral-900'}`}>
              ❤️ Grau de Cura
            </span>
          </div>
          <div className="space-y-1 col-span-1">
            <span className="block font-bold">DATA DE CRIAÇÃO:</span>
            <span className="block font-mono">
              {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Avaliação Instruções */}
        <div className={`p-4 text-xxs space-y-1.5 leading-relaxed border border-dashed rounded-lg ${isMidnight ? 'bg-slate-900/40 border-slate-800' : isMinimal ? 'border-neutral-900 bg-neutral-50' : 'bg-[#FAF9F6]/80 border-stone-200'}`}>
          <div className="font-bold flex items-center gap-1.5 uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            RECOMENDAÇÕES IMPORTANTES PARA O PREENCHIMENTO:
          </div>
          <ol className="list-decimal list-inside space-y-0.5 text-stone-500 md:pl-1">
            <li><strong>Livre Expressão:</strong> Não existem avaliações certas ou erradas. O objetivo é registrar no papel o seu fluxo sincero de sentimentos.</li>
            <li><strong>Pausas Calmas:</strong> Caso as memórias provoquem angústia, faça uso do botão <strong className="text-current underline cursor-pointer">"Respirar Agora"</strong> no topo da página.</li>
            <li><strong>Salvamento Garantido:</strong> Suas respostas são salvas em tempo real no banco local deste navegador.</li>
          </ol>
        </div>
      </div>

      {/* QUESTION FIELDS CONTAINER */}
      <div className="space-y-10" id="school-test-body">

        {/* PART 1: SENTIMENTOS E PRIMEIRO IMPACTO */}
        <div className="space-y-6" id="part-1-section">
          <h3 className={styles.sectionHeader}>
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            PARTE I: SENTIMENTOS E REAÇÃO INICIAL
          </h3>

          {/* Q1 */}
          <div className="space-y-2 text-left" id="question-q1">
            <label htmlFor="q1" className={styles.questionTitle}>
              Quando você pensa nessa situação hoje, qual é o sentimento que aparece primeiro?
            </label>
            <textarea
              id="q1"
              style={getLinedStyle(theme)}
              value={answers.q1}
              onChange={(e) => handleTextChange('q1', e.target.value)}
              placeholder="Escreva com calma sobre as emoções iniciais que aparecem de imediato no seu peito (ex: dor, tristeza, desconforto, angústia)..."
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q2 */}
          <div className="space-y-3" id="question-q2">
            <span className={`${styles.questionTitle} text-left`}>
              O que mais te machuca nessa história? (Assinale todas as opções alternativas que desejar)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="q2-school-options">
              {[
                'A dúvida',
                'A possibilidade de traição',
                'O comportamento do seu ex-marido',
                'O comportamento da sua mãe',
                'Não ter respostas',
              ].map((option) => {
                const isChecked = answers.q2.selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleQ2Checkbox(option)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition cursor-pointer select-none ${styles.checkboxBtn(isChecked)}`}
                    id={`school-checkbox-q2-${option.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-wider mr-1 text-current shrink-0">
                      {isChecked ? '( X )' : '(   )'}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Q2 other */}
            <div className="space-y-2 pt-1">
              <label htmlFor="q2-other-f" className={`text-[10px] font-bold uppercase tracking-wider block ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                Mencione outro fator doloroso se houver:
              </label>
              <input
                type="text"
                id="q2-other-f"
                value={answers.q2.otherText}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    q2: { ...prev.q2, otherText: e.target.value },
                  }))
                }
                placeholder="Descreva voluntariamente outra dor específica aqui..."
                className={`w-full p-2.5 text-xs focus:outline-none focus:border-daiane-brand rounded-lg ${isMidnight ? 'bg-[#0E1424] border-slate-800 text-slate-100' : isMinimal ? 'bg-neutral-50 border border-neutral-350 text-neutral-950 font-mono rounded-none' : 'bg-stone-50 border border-stone-200 text-stone-700'}`}
              />
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-2 text-left" id="question-q3">
            <label htmlFor="q3" className={styles.questionTitle}>
              Qual foi a pior parte de tudo isso para você?
            </label>
            <textarea
              id="q3"
              style={getLinedStyle(theme)}
              value={answers.q3}
              onChange={(e) => handleTextChange('q3', e.target.value)}
              placeholder="Reflicta sobre o momento ou aspecto culminante que é mais difícil e pesado de carregar nas costas..."
              className={styles.textareaField}
              rows={4}
            />
          </div>
        </div>

        {/* PART 2: MUDANÇAS E PERCEPÇÕES RELACIONAIS */}
        <div className="space-y-6 pt-2" id="part-2-section">
          <h3 className={styles.sectionHeader}>
            <Compass className="w-4 h-4 text-amber-500" />
            PARTE II: MUDANÇAS & PERCEPÇÕES RELACIONAIS
          </h3>

          {/* Q4 */}
          <div className="space-y-3" id="question-q4">
            <span className={`${styles.questionTitle} text-left`}>
              Você acredita que essa situação mudou a forma como você enxerga sua mãe?
            </span>
            <div className="flex gap-4">
              {['Sim', 'Não'].map((choice) => {
                const isSelected = answers.q4.choice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        q4: { ...prev.q4, choice: choice as 'Sim' | 'Não' },
                      }))
                    }
                    className="flex items-center gap-2 cursor-pointer select-none text-xs text-current font-semibold"
                    id={`exam-btn-q4-${choice.toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-widest">
                      {isSelected ? '( X )' : '(   )'}
                    </span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
            {answers.q4.choice === 'Sim' && (
              <div className="pt-1 animate-fade-in text-left">
                <label htmlFor="q4-how-school" className={`text-[10px] font-bold uppercase block mb-1 ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                  De que maneira isso mudou sua visão sobre ela? Explique:
                </label>
                <textarea
                  id="q4-how-school"
                  style={getLinedStyle(theme)}
                  value={answers.q4.how}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      q4: { ...prev.q4, how: e.target.value },
                    }))
                  }
                  placeholder="Se enxerga sua mãe de forma diferente hoje, comente aqui..."
                  className={styles.textareaField}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="space-y-3" id="question-q5">
            <span className={`${styles.questionTitle} text-left`}>
              Você acredita que essa situação mudou a forma como você enxerga seu ex-marido?
            </span>
            <div className="flex gap-4">
              {['Sim', 'Não'].map((choice) => {
                const isSelected = answers.q5.choice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        q5: { ...prev.q5, choice: choice as 'Sim' | 'Não' },
                      }))
                    }
                    className="flex items-center gap-2 cursor-pointer select-none text-xs text-current font-semibold"
                    id={`exam-btn-q5-${choice.toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-widest">
                      {isSelected ? '( X )' : '(   )'}
                    </span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
            {answers.q5.choice === 'Sim' && (
              <div className="pt-1 animate-fade-in text-left">
                <label htmlFor="q5-how-school" className={`text-[10px] font-bold uppercase block mb-1 ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                  De que maneira mudou? Descreva:
                </label>
                <textarea
                  id="q5-how-school"
                  style={getLinedStyle(theme)}
                  value={answers.q5.how}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      q5: { ...prev.q5, how: e.target.value },
                    }))
                  }
                  placeholder="Fale com sinceridade sobre sua nova visão em relação a ele..."
                  className={styles.textareaField}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Q6 */}
          <div className="space-y-2 text-left" id="question-q6">
            <label htmlFor="q6" className={styles.questionTitle}>
              O que você sentia quando eles saíam juntos e demoravam para voltar?
            </label>
            <textarea
              id="q6"
              style={getLinedStyle(theme)}
              value={answers.q6}
              onChange={(e) => handleTextChange('q6', e.target.value)}
              placeholder="Descreva a angústia ou o estado de espírito que tomava conta naqueles instantes..."
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q7 */}
          <div className="space-y-2 text-left" id="question-q7">
            <label htmlFor="q7" className={styles.questionTitle}>
              O que você imaginava que poderia estar acontecendo?
            </label>
            <textarea
              id="q7"
              style={getLinedStyle(theme)}
              value={answers.q7}
              onChange={(e) => handleTextChange('q7', e.target.value)}
              placeholder="Quais eram as hipóteses, ideias e medos automáticos que invadiam os seus pensamentos?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q8 */}
          <div className="space-y-2 text-left" id="question-q8">
            <label htmlFor="q8" className={styles.questionTitle}>
              Qual era o seu maior medo naquela época?
            </label>
            <textarea
              id="q8"
              style={getLinedStyle(theme)}
              value={answers.q8}
              onChange={(e) => handleTextChange('q8', e.target.value)}
              placeholder="De que desdobramento você mais procurava fugir ou que de fato te apavorava?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q9 */}
          <div className="space-y-3" id="question-q9">
            <span className={`${styles.questionTitle} text-left`}>
              Você se sentia traída?
            </span>
            <div className="flex flex-wrap gap-4">
              {['Sim', 'Não', 'Às vezes'].map((choice) => {
                const isSelected = answers.q9.choice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        q9: { ...prev.q9, choice: choice as 'Sim' | 'Não' | 'Às vezes' },
                      }))
                    }
                    className="flex items-center gap-2 cursor-pointer select-none text-xs text-current font-semibold"
                    id={`exam-btn-q9-${choice.toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-widest">
                      {isSelected ? '( X )' : '(   )'}
                    </span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
            <div className="pt-1 text-left">
              <label htmlFor="q9-explain-school" className={`text-[10px] font-bold uppercase block mb-1 ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                Justifique ou explique o seu sentimento:
              </label>
              <textarea
                id="q9-explain-school"
                style={getLinedStyle(theme)}
                value={answers.q9.explain}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    q9: { ...prev.q9, explain: e.target.value },
                  }))
                }
                placeholder="Por que você se sentia assim? Comente brevemente..."
                className={styles.textareaField}
                rows={3}
              />
            </div>
          </div>

          {/* Q10 */}
          <div className="space-y-3" id="question-q10">
            <span className={`${styles.questionTitle} text-left`}>
              Você se sentia desrespeitada?
            </span>
            <div className="flex flex-wrap gap-4">
              {['Sim', 'Não', 'Às vezes'].map((choice) => {
                const isSelected = answers.q10.choice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        q10: { ...prev.q10, choice: choice as 'Sim' | 'Não' | 'Às vezes' },
                      }))
                    }
                    className="flex items-center gap-2 cursor-pointer select-none text-xs text-current font-semibold"
                    id={`exam-btn-q10-${choice.toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-widest">
                      {isSelected ? '( X )' : '(   )'}
                    </span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
            <div className="pt-1 text-left">
              <label htmlFor="q10-explain-school" className={`text-[10px] font-bold uppercase block mb-1 ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                Em que sentido o desrespeito se manifestava? Explique:
              </label>
              <textarea
                id="q10-explain-school"
                style={getLinedStyle(theme)}
                value={answers.q10.explain}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    q10: { ...prev.q10, explain: e.target.value },
                  }))
                }
                placeholder="Discorra livremente sobre como sentia e lidava com o desrespeito..."
                className={styles.textareaField}
                rows={3}
              />
            </div>
          </div>

          {/* Q11 */}
          <div className="space-y-3" id="question-q11">
            <span className={`${styles.questionTitle} text-left`}>
              Você sentia raiva de quem? (Selecione as pessoas desejadas)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="q11-school-options">
              {[
                'Da sua mãe',
                'Do seu ex-marido',
                'Dos dois',
                'De você mesma',
              ].map((option) => {
                const isChecked = answers.q11.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleQ11Checkbox(option)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition cursor-pointer select-none ${styles.checkboxBtn(isChecked)}`}
                    id={`school-checkbox-q11-${option.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-wider mr-1 text-current shrink-0">
                      {isChecked ? '( X )' : '(   )'}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PART 3: O NÃO DITO E A VONTADE DE FALAR */}
        <div className="space-y-6 pt-2" id="part-3-section">
          <h3 className={styles.sectionHeader}>
            <Compass className="w-4 h-4 text-sky-500" />
            PARTE III: O NÃO DITO E EXPRESSÃO
          </h3>

          {/* Q12 */}
          <div className="space-y-2 text-left" id="question-q12">
            <label htmlFor="q12" className={styles.questionTitle}>
              O que você gostaria de ter perguntado naquela época e nunca perguntou?
            </label>
            <textarea
              id="q12"
              style={getLinedStyle(theme)}
              value={answers.q12}
              onChange={(e) => handleTextChange('q12', e.target.value)}
              placeholder="Quais indagações profundas restaram engasgadas e que você gostaria de saber a reposta rápida?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q13 */}
          <div className="space-y-2 text-left" id="question-q13">
            <label htmlFor="q13" className={styles.questionTitle}>
              O que você gostaria de ter dito para sua mãe e nunca conseguiu dizer?
            </label>
            <textarea
              id="q13"
              style={getLinedStyle(theme)}
              value={answers.q13}
              onChange={(e) => handleTextChange('q13', e.target.value)}
              placeholder="Abra o seu coração e redija os seus sentimentos reprimidos e deitados em relação a ela..."
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q14 */}
          <div className="space-y-2 text-left" id="question-q14">
            <label htmlFor="q14" className={styles.questionTitle}>
              O que você gostaria de ter dito para seu ex-marido e nunca conseguiu dizer?
            </label>
            <textarea
              id="q14"
              style={getLinedStyle(theme)}
              value={answers.q14}
              onChange={(e) => handleTextChange('q14', e.target.value)}
              placeholder="Que palavras ficaram no escuro, guardadas no peito, que gostarias que ele ouvisse e soubesse?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q15 */}
          <div className="space-y-2 text-left" id="question-q15">
            <label htmlFor="q15" className={styles.questionTitle}>
              Qual pensamento vem primeiro quando você lembra dessa situação?
            </label>
            <textarea
              id="q15"
              style={getLinedStyle(theme)}
              value={answers.q15}
              onChange={(e) => handleTextChange('q15', e.target.value)}
              placeholder="O eco mais imediato de pensamento que faz sua cabeça latejar no milésimo inicial..."
              className={styles.textareaField}
              rows={4}
            />
          </div>
        </div>

        {/* PART 4: MANIFESTAÇÃO FÍSICA E PERDAS */}
        <div className="space-y-6 pt-2" id="part-4-section">
          <h3 className={styles.sectionHeader}>
            <Activity className="w-4 h-4 text-daiane-brand" />
            PARTE IV: CORPO, ESCALA E PERDA
          </h3>

          {/* Q16 */}
          <div className="space-y-3" id="question-q16">
            <span className={`${styles.questionTitle} text-left`}>
              Onde você sente isso tudo no corpo? (Assinale as alternativas adequadas)
            </span>
            <div className="grid grid-cols-2 gap-2" id="q16-school-options">
              {['Coração', 'Peito', 'Garganta', 'Barriga', 'Cabeça'].map((option) => {
                const isChecked = answers.q16.selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleQ16Checkbox(option)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition cursor-pointer select-none ${styles.checkboxBtn(isChecked)}`}
                    id={`school-checkbox-q16-${option.toLowerCase()}`}
                  >
                    <span className="font-mono font-bold text-sm tracking-wider mr-1 text-current shrink-0">
                      {isChecked ? '( X )' : '(   )'}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Q16 other */}
            <div className="space-y-2 pt-1 text-left">
              <label htmlFor="q16-other-f" className={`text-[10px] font-bold uppercase block ${isMidnight ? 'text-slate-400' : 'text-stone-400'}`}>
                Indique outra zona física se manifestada:
              </label>
              <input
                type="text"
                id="q16-other-f"
                value={answers.q16.otherText}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    q16: { ...prev.q16, otherText: e.target.value },
                  }))
                }
                placeholder="Se houver alguma outra manifestation corporal de dor física, descreva..."
                className={`w-full p-2.5 text-xs focus:outline-none focus:border-daiane-brand rounded-lg ${isMidnight ? 'bg-[#0E1424] border-slate-800 text-slate-100' : isMinimal ? 'bg-neutral-50 border border-neutral-350 text-neutral-950 font-mono rounded-none' : 'bg-stone-50 border border-stone-200 text-stone-700'}`}
              />
            </div>
          </div>

          {/* Q17 */}
          <div className="space-y-4 pt-1" id="question-q17">
            <label htmlFor="q17" className={styles.questionTitle}>
              Qual nota de incômodo ou sofrimento de 0 a 10 essa situação tem hoje no seu íntimo?
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xxs text-stone-400 px-1">
                <span>0 (Sem impacto)</span>
                <span className={`text-xs font-black bg-stone-50 px-3 py-1.5 rounded-full border border-dashed shadow-sm ${styles.badgeStyle}`}>
                  Avaliação: Intensidade {answers.q17}
                </span>
                <span>10 (Impacto Extremo)</span>
              </div>
              <input
                type="range"
                id="q17"
                min="0"
                max="10"
                step="1"
                value={answers.q17}
                onChange={(e) => handleTextChange('q17', parseInt(e.target.value, 10))}
                className={`w-full h-2.5 rounded-lg appearance-none cursor-pointer focus:outline-none ${styles.sliderBg}`}
              />
              <div className="flex justify-between px-2 text-[10px] font-mono select-none text-stone-400">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <span
                    key={num}
                    onClick={() => handleTextChange('q17', num)}
                    className={`cursor-pointer w-5 h-5 flex items-center justify-center rounded-full transition-all border ${
                      answers.q17 === num
                        ? 'border-daiane-brand font-extrabold bg-daiane-brand-light text-daiane-brand scale-125' 
                        : 'border-transparent hover:text-stone-700'
                    }`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Q18 */}
          <div className="space-y-2 text-left" id="question-q18">
            <label htmlFor="q18" className={styles.questionTitle}>
              Se essa história pudesse falar, o que ela diria para você?
            </label>
            <textarea
              id="q18"
              style={getLinedStyle(theme)}
              value={answers.q18}
              onChange={(e) => handleTextChange('q18', e.target.value)}
              placeholder="Que conselho, verdade ou revelação a própria história traria ao se personificar diante de você?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q19 */}
          <div className="space-y-2 text-left" id="question-q19">
            <label htmlFor="q19" className={styles.questionTitle}>
              O que você acredita que perdeu por causa dessa situação?
            </label>
            <textarea
              id="q19"
              style={getLinedStyle(theme)}
              value={answers.q19}
              onChange={(e) => handleTextChange('q19', e.target.value)}
              placeholder="Confiança, leveza na juventude, tranquilidade familiar... O que foi arrancado das tuas mãos?"
              className={styles.textareaField}
              rows={4}
            />
          </div>

          {/* Q20 */}
          <div className="space-y-2 text-left" id="question-q20">
            <label htmlFor="q20" className={styles.questionTitle}>
              O que seu coração precisa ouvir hoje para começar a ficar em paz?
            </label>
            <textarea
              id="q20"
              style={getLinedStyle(theme)}
              value={answers.q20}
              onChange={(e) => handleTextChange('q20', e.target.value)}
              placeholder="Que palavra de redenção ou verdade última você mais busca para fechar esse ciclo em tranquilidade?"
              className={styles.textareaField}
              rows={4}
            />
          </div>
        </div>

        {/* PART 5: QUESTÃO CRUCIAL / REFLEXÃO DE OURO */}
        <div className="space-y-6 pt-2" id="part-5-section">
          <h3 className={styles.sectionHeader}>
            <Compass className="w-4 h-4 text-daiane-brand animate-spin-slow" />
            PARTE V: A QUESTÃO CRUCIAL
          </h3>

          <div className={styles.crucialBox}>
            <div className={`text-xxs font-black flex items-center gap-1.5 uppercase ${isMidnight ? 'text-indigo-400' : isMinimal ? 'text-neutral-900 border-b border-neutral-900 pb-1' : 'text-daiane-dark'}`}>
              🌿 PERGUNTA MAIS IMPORTANTE DO INTELECTO
            </div>
            <p className={`text-[10px] leading-relaxed opacity-95 ${isMidnight ? 'text-slate-400' : 'text-stone-500'}`}>
              Responda a essa última reflexão com máxima entrega e desapego. Ela é o portal para a consolidação de sua autoconfiança de hoje em diante.
            </p>

            <div className="space-y-3 pt-3">
              <label htmlFor="qImportant" className={`${styles.questionTitle} leading-relaxed text-left`}>
                Se você tivesse certeza absoluta da verdade, qualquer que fosse ela, o que mudaria dentro de você hoje?
              </label>
              <textarea
                id="qImportant"
                style={getLinedStyle(theme)}
                value={answers.qImportant}
                onChange={(e) => handleTextChange('qImportant', e.target.value)}
                placeholder="A dor perderia as garras? O medo sumiria? Suas relações familiares seriam restabelecidas? Escreva com toda a sua alma e verdade..."
                className={styles.textareaField}
                rows={5}
              />
            </div>
          </div>
        </div>

      </div>

      {/* SUBMISSION HANDOVER ROW */}
      <div className={`mt-10 pt-6 border-t font-mono text-center space-y-4 ${isMidnight ? 'border-slate-800/80' : 'border-stone-200'}`}>
        <p className={`text-3xs leading-relaxed max-w-md mx-auto ${isMidnight ? 'text-slate-500' : 'text-stone-400'}`}>
          Ao preencher todas as questões, clique no botão abaixo para encerrar sua autoavaliação e compilar o resumo das respostas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-3xs font-semibold text-stone-400 text-left">
            <ShieldCheck className="w-4 h-4 text-daiane-brand animate-pulse" />
            <span>
              Criptografia Local e Salvamento Automático Ativos no Navegador do Cliente
            </span>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={onSubmit}
              className={styles.btnSubmit}
              id="btn-entregar-prova"
              title="Preenchimento automático finalizado. Clique para entregar sua resposta."
            >
              <ClipboardCheck className="w-4 h-4 shrink-0" />
              <span>Concluir e Entregar Avaliação</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

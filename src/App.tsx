import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Shield, Compass, Heart, HelpCircle, RefreshCw, X, BookOpen } from 'lucide-react';
import { Answers, SectionId, AppTheme } from './types';
import { INITIAL_ANSWERS, SECTIONS } from './data/questions';
import WelcomeScreen from './components/WelcomeScreen';
import SectionProgressBar from './components/SectionProgressBar';
import QuestionCard from './components/QuestionCard';
import BreathingBreak from './components/BreathingBreak';
import SummaryScreen from './components/SummaryScreen';

export default function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [isSummaryView, setIsSummaryView] = useState<boolean>(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState<boolean>(false);
  const [showInterstitialBreak, setShowInterstitialBreak] = useState<boolean>(false);
  const [groundingAlert, setGroundingAlert] = useState<string | null>(null);
  const [theme, setTheme] = useState<AppTheme>('daiane');

  // Load from localstorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('nubia_sessao_answers');
    const savedStep = localStorage.getItem('nubia_sessao_step');
    const savedStarted = localStorage.getItem('nubia_sessao_started');
    const savedSummary = localStorage.getItem('nubia_sessao_summary');
    const savedTheme = localStorage.getItem('nubia_sessao_theme') as AppTheme | null;

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error('Error parsing stored answers', e);
      }
    }
    if (savedStep) {
      setCurrentSectionIndex(parseInt(savedStep, 10));
    }
    if (savedStarted === 'true') {
      setStarted(true);
    }
    if (savedSummary === 'true') {
      setIsSummaryView(true);
    }
    if (savedTheme === 'daiane' || savedTheme === 'midnight' || savedTheme === 'minimal') {
      setTheme(savedTheme);
    } else if (savedTheme === 'garden') {
      setTheme('daiane');
    }
  }, []);

  // Save to localstorage on states change
  useEffect(() => {
    localStorage.setItem('nubia_sessao_answers', JSON.stringify(answers));
    localStorage.setItem('nubia_sessao_step', currentSectionIndex.toString());
    localStorage.setItem('nubia_sessao_started', started ? 'true' : 'false');
    localStorage.setItem('nubia_sessao_summary', isSummaryView ? 'true' : 'false');
    localStorage.setItem('nubia_sessao_theme', theme);
  }, [answers, currentSectionIndex, started, isSummaryView, theme]);

  // Compute overall percentage of questionnaire completion
  const getProgressPercentage = () => {
    const totalQuestions = 21;
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

    return Math.round((completed / totalQuestions) * 100);
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleResetAndStart = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentSectionIndex(0);
    setIsSummaryView(false);
    setStarted(true);
    localStorage.removeItem('nubia_sessao_answers');
    localStorage.removeItem('nubia_sessao_step');
    localStorage.removeItem('nubia_sessao_summary');
  };

  const handleNext = () => {
    // Heavy emotional sections trigger a supportive breathing suggestion (e.g. after Section 2 and Section 4)
    if (currentSectionIndex === 1 || currentSectionIndex === 3) {
      setShowInterstitialBreak(true);
      return;
    }

    proceedNext();
  };

  const proceedNext = () => {
    setShowInterstitialBreak(false);
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSummaryView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentSectionIndex(0);
    setIsSummaryView(false);
    setStarted(false);
    localStorage.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSavedProgress = () => {
    return Object.values(answers).some((val) => {
      if (typeof val === 'string') return val !== '';
      if (typeof val === 'number') return val !== 5; // default is 5
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'object' && val !== null) {
        return (val as any).choice !== '' || (val as any).how !== '' || (val as any).explain !== '' || (val as any).selected?.length > 0 || (val as any).otherText !== '';
      }
      return false;
    });
  };

  const TEST_QUESTIONS = [
    { id: 'q1', num: 1, label: 'Sentimento Inicial' },
    { id: 'q2', num: 2, label: 'O que te Machuca' },
    { id: 'q3', num: 3, label: 'Pior Parte de Tudo' },
    { id: 'q4', num: 4, label: 'Visão sobre Mãe' },
    { id: 'q5', num: 5, label: 'Visão sobre Ex' },
    { id: 'q6', num: 6, label: 'Sentir na Ausência' },
    { id: 'q7', num: 7, label: 'Pensar na Espera' },
    { id: 'q8', num: 8, label: 'Seu Maior Medo' },
    { id: 'q9', num: 9, label: 'Sentir-se Traída?' },
    { id: 'q10', num: 10, label: 'Desrespeitada?' },
    { id: 'q11', num: 11, label: 'Raiva de Quem?' },
    { id: 'q12', num: 12, label: 'Pergunta Omissa' },
    { id: 'q13', num: 13, label: 'Dito para a Mãe' },
    { id: 'q14', num: 14, label: 'Dito para o Ex' },
    { id: 'q15', num: 15, label: 'Pensar Automático' },
    { id: 'q16', num: 16, label: 'Sentir no Corpo' },
    { id: 'q17', num: 17, label: 'Nota Escalar (Dor)' },
    { id: 'q18', num: 18, label: 'Falar da História' },
    { id: 'q19', num: 19, label: 'O que Perdeu' },
    { id: 'q20', num: 20, label: 'Coração Ouvir' },
    { id: 'qImportant', num: 21, label: 'Certeza da Verdade' }
  ];

  const isQuestionAnswered = (qId: string): boolean => {
    if (qId === 'q1') return !!answers.q1;
    if (qId === 'q2') return answers.q2.selected.length > 0 || !!answers.q2.otherText;
    if (qId === 'q3') return !!answers.q3;
    if (qId === 'q4') return !!answers.q4.choice;
    if (qId === 'q5') return !!answers.q5.choice;
    if (qId === 'q6') return !!answers.q6;
    if (qId === 'q7') return !!answers.q7;
    if (qId === 'q8') return !!answers.q8;
    if (qId === 'q9') return !!answers.q9.choice;
    if (qId === 'q10') return !!answers.q10.choice;
    if (qId === 'q11') return answers.q11.length > 0;
    if (qId === 'q12') return !!answers.q12;
    if (qId === 'q13') return !!answers.q13;
    if (qId === 'q14') return !!answers.q14;
    if (qId === 'q15') return !!answers.q15;
    if (qId === 'q16') return answers.q16.selected.length > 0 || !!answers.q16.otherText;
    if (qId === 'q17') return answers.q17 !== undefined;
    if (qId === 'q18') return !!answers.q18;
    if (qId === 'q19') return !!answers.q19;
    if (qId === 'q20') return !!answers.q20;
    if (qId === 'qImportant') return !!answers.qImportant;
    return false;
  };

  const getAnsweredCount = (): number => {
    return TEST_QUESTIONS.filter((q) => isQuestionAnswered(q.id)).length;
  };

  const scrollToQuestion = (id: string) => {
    const el = document.getElementById(`question-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const quoteList = [
    "Sua dor não reside no que aconteceu, mas na incerteza carreada. Dê voz ao seu peito.",
    "Cada palavra escrita é um pedaço de peso que você retira das suas costas.",
    "Permita-se sentir. O recolhimento de hoje pavimenta a paz de amanhã.",
    "Não existem respostas certas ou erradas. Existe apenas o seu sentir sincero."
  ];

  const isMidnight = theme === 'midnight';
  const isMinimal = theme === 'minimal';

  // Scaffold background color classes
  const scaffoldBg = isMidnight 
    ? 'bg-[#0D121F] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-indigo-950/80 transition-colors duration-300'
    : isMinimal
    ? 'bg-white text-neutral-900 min-h-screen flex flex-col antialiased selection:bg-neutral-100 transition-colors duration-300'
    : 'bg-daiane-bg text-daiane-dark min-h-screen flex flex-col antialiased selection:bg-daiane-brand-light transition-colors duration-300';

  // Radial background visual gradients
  const radialGradient = isMidnight
    ? 'bg-radial-at-t from-[#151D30]/70 via-[#0D121F]/90 to-[#0A0D16]/95'
    : isMinimal
    ? 'hidden'
    : 'bg-radial-at-t from-daiane-brand/5 via-daiane-bg/40 to-daiane-brand-light/10';

  // Header styling classes
  const headerClass = isMidnight
    ? 'sticky top-0 bg-[#0F1626]/90 backdrop-blur-md border-b border-slate-800/80 z-35 px-4 lg:px-8 py-3.5 flex items-center justify-between'
    : isMinimal
    ? 'sticky top-0 bg-white border-b border-neutral-300 z-35 px-4 lg:px-8 py-3.5 flex items-center justify-between rounded-none'
    : 'sticky top-0 bg-daiane-bg/95 backdrop-blur-md border-b border-daiane-brand/20 z-35 px-4 lg:px-8 py-3.5 flex items-center justify-between';

  const logoWrap = isMidnight
    ? 'bg-indigo-955 text-indigo-400 border border-indigo-900'
    : isMinimal
    ? 'bg-neutral-100 text-neutral-900 rounded-none border border-neutral-300'
    : 'bg-daiane-brand/5 text-daiane-brand border border-daiane-brand/25';

  const titleClass = isMidnight ? 'text-slate-100 font-sans' : isMinimal ? 'text-neutral-950 font-bold' : 'text-daiane-dark font-serif font-semibold';
  const headerSubText = isMidnight ? 'text-slate-500' : 'text-daiane-brand/90';

  const styles = {
    // Sidebar items
    sidebarCard: isMidnight
      ? 'bg-[#151D30]/95 border border-slate-804/85 p-5 shadow-sm rounded-2xl'
      : isMinimal
      ? 'bg-white border border-neutral-300 p-5 shadow-none rounded-none'
      : 'bg-white/95 border border-daiane-brand/20 p-5 shadow-sm rounded-2xl',
    sidebarTitle: isMidnight ? 'text-slate-400' : 'text-daiane-brand/800',
    
    secBtnActive: isMidnight
      ? 'bg-indigo-950/45 border-indigo-900 shadow-sm'
      : isMinimal
      ? 'bg-neutral-50 border-neutral-950 rounded-none'
      : 'bg-daiane-brand-light/55 border-daiane-brand/35 shadow-sm shadow-daiane-brand/5',
    secBtnInactive: 'bg-transparent border-transparent hover:bg-daiane-brand-light/30',
    
    badgeActive: isMidnight ? 'bg-indigo-650 border-indigo-650 text-white font-bold' : isMinimal ? 'bg-neutral-950 border-neutral-950 text-white font-bold rounded-none' : 'bg-daiane-brand border-daiane-brand text-white font-bold',
    badgeCompleted: isMidnight ? 'bg-indigo-950 border-indigo-900 text-indigo-305' : isMinimal ? 'bg-neutral-100 border-neutral-200 text-neutral-600 rounded-none' : 'bg-daiane-brand-light border-daiane-brand/15 text-daiane-dark/90',
    badgeFuture: isMidnight ? 'bg-slate-900 border-slate-800 text-slate-500' : isMinimal ? 'bg-white border-neutral-200 text-neutral-400 rounded-none' : 'bg-daiane-bg border-daiane-brand/10 text-daiane-dark/40',
    
    secTitleTextCurrent: isMidnight ? 'text-slate-100' : isMinimal ? 'text-neutral-950 font-bold' : 'text-daiane-dark font-medium',
    secTitleTextOther: isMidnight ? 'text-slate-400' : 'text-daiane-dark/60',
    
    // Quote Box
    quoteBox: isMidnight
      ? 'bg-indigo-950/20 border border-indigo-900/50 rounded-2xl p-4 space-y-2.5'
      : isMinimal
      ? 'bg-neutral-50 border border-neutral-202 p-4 rounded-none space-y-2.5'
      : 'bg-daiane-brand-light/40 rounded-2xl border border-daiane-brand/20 p-4 space-y-2.5',
    quoteTitle: isMidnight ? 'text-indigo-400' : isMinimal ? 'text-neutral-950 font-bold' : 'text-daiane-brand font-medium',
    quoteText: isMidnight ? 'text-slate-400 font-serif' : 'text-daiane-dark/85 font-serif',

    // Floating breath CTA button
    btnBreath: isMidnight
      ? 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-900/80 text-indigo-305 rounded-lg text-xxs font-bold transition-all shadow-sm'
      : isMinimal
      ? 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-205 border border-neutral-300 text-neutral-955 rounded-none text-xxs font-bold transition-all'
      : 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-daiane-brand-light/50 hover:bg-daiane-brand-light/75 border border-daiane-brand/25 text-daiane-dark rounded-lg text-xxs font-semibold transition-all shadow-sm',
    
    // Grounding toast
    toastBg: isMidnight ? 'bg-slate-900 border-slate-800 text-slate-100' : isMinimal ? 'bg-white border-neutral-900 text-neutral-900 rounded-none shadow-none' : 'bg-[#FAF5EE] border-daiane-brand/20 text-daiane-dark',
    
    // Privacy and safe space disclaimer base footer
    footerClass: isMidnight 
      ? 'bg-[#0B0F1B] border-t border-slate-850 py-4 px-6 text-center text-3xs font-medium text-slate-500 space-y-1'
      : isMinimal
      ? 'bg-white border-t border-neutral-300 py-4 px-6 text-center text-3xs font-medium text-neutral-700 space-y-1 rounded-none'
      : 'bg-daiane-bg border-t border-daiane-brand/10 py-4 px-6 text-center text-3xs font-medium text-daiane-brand space-y-1'
  };

  return (
    <div className={scaffoldBg} id="main-scaffold">
      {/* Decorative ambient background curves */}
      <div className={`fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 transition-all duration-500 ${radialGradient}`} />

      {/* Primary Navigation Header */}
      <header className={headerClass} id="nav-header">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 flex items-center justify-center text-current font-serif shadow-sm transition-all ${logoWrap} ${isMinimal ? '' : 'rounded-xl'}`}>
            <BookOpen className="w-5 h-5 shadow-sm" />
          </div>
          <div>
            <h1 className={`text-sm tracking-tight ${titleClass}`}>
              Acolhimento Terapêutico
            </h1>
            <span className={`text-3xs font-semibold uppercase tracking-widest block -mt-0.5 ${headerSubText}`}>
              Preparação de Sessão · Miss Dayane Terapeuta Emocional
            </span>
          </div>
        </div>

        {/* Right side is intentionally kept empty for a clean, undistracted therapeutic experience */}
      </header>

      {/* Main Container Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col select-text" id="primary-view-container">
        <AnimatePresence mode="wait">
          {!started ? (
            <WelcomeScreen
              onStart={handleStart}
              hasSavedProgress={hasSavedProgress()}
              onResetAndStart={handleResetAndStart}
              theme={theme}
            />
          ) : isSummaryView ? (
            <SummaryScreen
              answers={answers}
              onReset={handleReset}
              onGoBack={() => {
                setIsSummaryView(false);
                setCurrentSectionIndex(SECTIONS.length - 1);
              }}
              theme={theme}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full" id="questionnaire-interface-grid">
              
              {/* Desktop Side Tracker Dashboard (Gabarito Oficial) */}
              <aside className="hidden lg:block lg:col-span-4 space-y-6" id="no-print-area">
                <div className={styles.sidebarCard}>
                  <h3 className={`text-3xs font-bold uppercase tracking-widest ${styles.sidebarTitle}`}>
                    📋 Painel de Respostas · Progresso
                  </h3>
                  <p className={`text-[10px] ${isMidnight ? 'text-slate-400' : 'text-stone-400'} leading-relaxed mt-1.5`}>
                    Clique no balão de progresso abaixo para deslizar a folha de avaliação até a folha de pergunta desejada.
                  </p>

                  {/* 21 Question Bubbles Grid */}
                  <div className="grid grid-cols-5 gap-2.5 mt-4 justify-items-center" id="gabarito-dots">
                    {TEST_QUESTIONS.map((q) => {
                      const answered = isQuestionAnswered(q.id);
                      
                      const circleStyle = answered
                        ? (theme === 'daiane' 
                           ? 'bg-daiane-brand border-daiane-brand text-white font-bold scale-105 shadow-sm shadow-daiane-brand/20' 
                           : theme === 'midnight' 
                           ? 'bg-indigo-600 border-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/20' 
                           : 'bg-neutral-950 border-neutral-950 text-white font-bold rounded-none scale-105')
                        : (theme === 'midnight' 
                           ? 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700' 
                           : theme === 'minimal' 
                           ? 'bg-white border-neutral-300 text-neutral-400 rounded-none' 
                           : 'bg-white border-daiane-brand/20 text-daiane-dark/70 hover:border-daiane-brand/40');

                      return (
                        <button
                          key={q.id}
                          onClick={() => scrollToQuestion(q.id)}
                          className={`w-9 h-9 flex items-center justify-center text-xs border rounded-full font-mono transition-all duration-150 cursor-pointer active:scale-90 ${circleStyle}`}
                          title={`${q.label}`}
                          type="button"
                        >
                          {answered ? '✓' : '•'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Horizontal progress summary */}
                  <div className="pt-4 border-t border-daiane-brand/10 mt-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-daiane-dark/80 px-1 mb-1.5">
                      <span>Preenchimento da Avaliação</span>
                      <span className={`font-mono font-bold ${isMidnight ? 'text-indigo-400' : isMinimal ? 'text-neutral-950' : 'text-daiane-brand'}`}>
                        {Math.round((getAnsweredCount() / 21) * 100)}%
                      </span>
                    </div>
                    <div className={`w-full ${isMidnight ? 'bg-[#1E293B]' : 'bg-daiane-brand-light/30'} h-1.5 rounded-full overflow-hidden border border-daiane-brand/5`}>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          theme === 'daiane' ? 'bg-daiane-brand' : theme === 'midnight' ? 'bg-indigo-500' : 'bg-neutral-950'
                        }`}
                        style={{ width: `${(getAnsweredCount() / 21) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3.5">
                    <button
                      onClick={() => {
                        window.scrollTo({
                          top: document.getElementById('btn-entregar-prova')?.offsetTop ?? 10000,
                          behavior: 'smooth'
                        });
                      }}
                      className={`w-full py-2 border rounded-xl font-bold text-xxs transition duration-150 cursor-pointer flex items-center justify-center gap-1 ${
                        theme === 'daiane'
                          ? 'border-daiane-brand/25 bg-daiane-brand-light/35 text-daiane-dark hover:bg-daiane-brand-light/55'
                          : theme === 'midnight'
                          ? 'border-indigo-950 bg-indigo-950/20 text-indigo-300 hover:bg-indigo-950/50'
                          : 'border-neutral-300 bg-white text-neutral-950 font-mono rounded-none font-bold'
                      }`}
                    >
                      <span>Ir para o Fim da Avaliação</span>
                    </button>
                  </div>
                </div>

                {/* Ambient Quote Widget */}
                <div className={styles.quoteBox}>
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Linha de Conforto</span>
                  </div>
                  <p className={`text-xxs leading-relaxed italic pr-1 ${styles.quoteText}`}>
                    "{quoteList[getAnsweredCount() % quoteList.length]}"
                  </p>
                </div>
              </aside>

              {/* Central Dynamic Interactive Prova Escolar Area */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                
                {/* Mobile progress tracker card - Sticky to top */}
                <div className={`lg:hidden p-4 rounded-xl border flex flex-col gap-2 ${
                  isMidnight ? 'bg-slate-900 border-slate-800' : isMinimal ? 'bg-white border-neutral-350 rounded-none' : 'bg-daiane-bg border-daiane-brand/20 shadow-sm'
                }`} id="mobile-progress-widget">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                    <span className="text-current uppercase tracking-wider font-sans">Aproveitamento</span>
                    <span className={theme === 'daiane' ? 'text-daiane-dark/95' : theme === 'midnight' ? 'text-indigo-400' : 'text-neutral-950'}>
                      {Math.round((getAnsweredCount() / 21) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-daiane-brand-light/35 h-2 rounded-full overflow-hidden border border-daiane-brand/10">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        theme === 'daiane' ? 'bg-daiane-brand' : theme === 'midnight' ? 'bg-indigo-500' : 'bg-neutral-950'
                      }`}
                      style={{ width: `${(getAnsweredCount() / 21) * 100}%` }}
                    />
                  </div>
                  <p className={`text-[9px] leading-normal italic ${isMidnight ? 'text-slate-400' : 'text-daiane-dark/40'}`}>
                    Preencha as respostas e deslize o caderno para responder tudo com atenção.
                  </p>
                </div>

                {/* Unified All-in-One Exam Sheet */}
                <QuestionCard
                  answers={answers}
                  setAnswers={setAnswers}
                  onSubmit={() => {
                    setIsSummaryView(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  theme={theme}
                />
              </div>

            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Grounding containment Toast Overlay */}
      <AnimatePresence>
        {groundingAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed bottom-6 right-6 max-w-sm rounded-xl px-4 py-3.5 shadow-xl z-55 flex items-start gap-3 ${styles.toastBg}`}
            id="grounding-toast"
          >
            <div className="p-1 mt-0.5 text-indigo-455">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="space-y-0.5 flex-grow">
              <h5 className="text-xs font-bold text-current">Âncora de Segurança</h5>
              <p className="text-xxs opacity-80 leading-normal">{groundingAlert}</p>
            </div>
            <button
              onClick={() => setGroundingAlert(null)}
              className="opacity-75 hover:opacity-100 transition p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Breathing Advisor Modal */}
      <AnimatePresence>
        {isBreathingOpen && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="floating-breathing-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <BreathingBreak onDismiss={() => setIsBreathingOpen(false)} standalone={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interstitial Calming Modal Suggestion */}
      <AnimatePresence>
        {showInterstitialBreak && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4 z-45" id="interstitial-breathing-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl border border-stone-200/70 p-6 shadow-xl max-w-md text-center space-y-4"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-daiane-brand-light border border-daiane-brand/20 flex items-center justify-center text-daiane-dark">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <h3 className="text-base font-serif font-semibold text-stone-800">
                Uma breve pausa para o seu coração
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                Acabamos de revisitar lembranças profundas. Que tal fazer 3 ciclos de respiração calma antes de avançar para as próximas questões?
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    setIsBreathingOpen(true);
                    setShowInterstitialBreak(false);
                    proceedNext();
                  }}
                  className="flex-1 px-4 py-2 bg-daiane-brand hover:bg-[#8F6D63] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition"
                  id="btn-confirm-breathing-break"
                >
                  Sim, vamos respirar
                </button>
                <button
                  onClick={proceedNext}
                  className="flex-1 px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50 transition cursor-pointer"
                  id="btn-skip-breathing-break"
                >
                  Continuar Direto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standardized privacy & custody footer */}
      <footer className={styles.footerClass} id="no-print-area">
        <p>Sessão de Acolhimento — Núbia © 2026</p>
        <p className="flex items-center justify-center gap-1">
          <Shield className="w-3.5 h-3.5 text-current opacity-70" />
          Seus dados estão protegidos localmente sob preceitos rígidos de sigilo terapêutico.
        </p>
      </footer>
    </div>
  );
}

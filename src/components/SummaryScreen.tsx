import React from 'react';
import { motion } from 'motion/react';
import { Answers, AppTheme } from '../types';
import { FileText, Printer, Trash2, Heart, Smile, Sparkles, Flame, ShieldAlert, ArrowLeft, Leaf, ClipboardCheck, Activity, Compass, BookOpen, MessageCircle } from 'lucide-react';

interface SummaryScreenProps {
  answers: Answers;
  onReset: () => void;
  onGoBack: () => void;
  theme: AppTheme;
}

export default function SummaryScreen({ answers, onReset, onGoBack, theme }: SummaryScreenProps) {
  const isMidnight = theme === 'midnight';
  const isMinimal = theme === 'minimal';

  // Exporter to a structured readable Text file
  const handleExportText = () => {
    const todayStr = new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let doc = `===================================================================
QUESTIONÁRIO DE PREPARAÇÃO PARA A SESSÃO – NÚBIA
Gerado em: ${todayStr}
===================================================================\n\n`;

    doc += `🌿 NOTA DE INTRODUÇÃO:
Este questionário foi preenchido por Núbia como material confidencial de preparação
emocional antes de sua sessão de acolhimento e psicoterapia.\n\n`;

    doc += `-------------------------------------------------------------------
1. SENTIMENTOS E PRIMEIRO IMPACTO
-------------------------------------------------------------------\n`;
    doc += `Pergunta: Quando você pensa nessa situação hoje, qual sentimento aparece primeiro?\n`;
    doc += `R: ${answers.q1 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que mais te machuca nessa história?\n`;
    const selectedMachuca = [...answers.q2.selected];
    if (answers.q2.otherText) selectedMachuca.push(`Outro: ${answers.q2.otherText}`);
    doc += `R: ${selectedMachuca.join(', ') || 'Nenhuma opção selecionada.'}\n\n`;

    doc += `Pergunta: Qual foi a pior parte de tudo isso para você?\n`;
    doc += `R: ${answers.q3 || 'Não respondida.'}\n\n`;

    doc += `-------------------------------------------------------------------
2. MUDANÇAS E PERCEPÇÕES NAS RELAÇÕES
-------------------------------------------------------------------\n`;
    doc += `Pergunta: Você acredita que essa situação mudou a forma como você enxerga sua mãe?\n`;
    doc += `R: ${answers.q4.choice || 'Não selecionada.'}\n`;
    if (answers.q4.choice === 'Sim') {
      doc += `Como: ${answers.q4.how || 'Não detalhado.'}\n`;
    }
    doc += `\n`;

    doc += `Pergunta: Você acredita que essa situação mudou a forma como você enxerga seu ex-marido?\n`;
    doc += `R: ${answers.q5.choice || 'Não selecionada.'}\n`;
    if (answers.q5.choice === 'Sim') {
      doc += `Como: ${answers.q5.how || 'Não detalhado.'}\n`;
    }
    doc += `\n`;

    doc += `Pergunta: O que você sentia quando eles saíam juntos e demoravam para voltar?\n`;
    doc += `R: ${answers.q6 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que você imaginava que poderia estar acontecendo?\n`;
    doc += `R: ${answers.q7 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: Qual era o seu maior medo naquela época?\n`;
    doc += `R: ${answers.q8 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: Você se sentia traída?\n`;
    doc += `R: ${answers.q9.choice || 'Não respondida.'}\n`;
    if (answers.q9.explain) {
      doc += `Explicação: ${answers.q9.explain}\n`;
    }
    doc += `\n`;

    doc += `Pergunta: Você se sentia desrespeitada?\n`;
    doc += `R: ${answers.q10.choice || 'Não respondida.'}\n`;
    if (answers.q10.explain) {
      doc += `Explicação: ${answers.q10.explain}\n`;
    }
    doc += `\n`;

    doc += `Pergunta: Você sentia raiva de quem?\n`;
    doc += `R: ${answers.q11.join(', ') || 'Não especificada.'}\n\n`;

    doc += `-------------------------------------------------------------------
3. O NÃO DITO E A VONTADE DE FALAR
-------------------------------------------------------------------\n`;
    doc += `Pergunta: O que você gostaria de ter perguntado naquela época e nunca perguntou?\n`;
    doc += `R: ${answers.q12 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que você gostaria de ter dito para sua mãe e nunca conseguiu dizer?\n`;
    doc += `R: ${answers.q13 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que você gostaria de ter dito para seu ex-marido e nunca conseguiu dizer?\n`;
    doc += `R: ${answers.q14 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: Qual pensamento vem primeiro quando você lembra dessa situação?\n`;
    doc += `R: ${answers.q15 || 'Não respondida.'}\n\n`;

    doc += `-------------------------------------------------------------------
4. MANIFESTAÇÃO FÍSICA E PERDAS
-------------------------------------------------------------------\n`;
    doc += `Pergunta: Onde você sente isso no corpo?\n`;
    const selectedCorpo = [...answers.q16.selected];
    if (answers.q16.otherText) selectedCorpo.push(`Outro: ${answers.q16.otherText}`);
    doc += `R: ${selectedCorpo.join(', ') || 'Nenhum ponto físico registrado.'}\n\n`;

    doc += `Pergunta: Nota de dor/sofrimento da situação hoje de 0 a 10:\n`;
    doc += `R: Nota ${answers.q17}/10\n\n`;

    doc += `Pergunta: Se essa história pudesse falar, o que ela diria para você?\n`;
    doc += `R: ${answers.q18 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que você acredita que perdeu por causa dessa situação?\n`;
    doc += `R: ${answers.q19 || 'Não respondida.'}\n\n`;

    doc += `Pergunta: O que seu coração precisa ouvir hoje para começar a ficar em paz?\n`;
    doc += `R: ${answers.q20 || 'Não respondida.'}\n\n`;

    doc += `-------------------------------------------------------------------
5. A PERGUNTA CRUCIAL (MUDANÇA INTERNA)
-------------------------------------------------------------------\n`;
    doc += `Pergunta: Se você tivesse certeza absoluta da verdade, qualquer que fosse ela, o que mudaria dentro de você hoje?\n`;
    doc += `R: ${answers.qImportant || 'Não respondida.'}\n\n`;

    doc += `===================================================================\n`;
    doc += `Fim do Documento – Preparado com carinho e proteção à privacidade.\n`;
    doc += `===================================================================`;

    const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Questionario_Pre_Sessao_Nubia.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Compute how many questions were answered out of 21
  const totalQuestions = 21;
  let answeredCount = 0;
  if (answers.q1) answeredCount++;
  if (answers.q2.selected.length > 0 || answers.q2.otherText) answeredCount++;
  if (answers.q3) answeredCount++;
  if (answers.q4.choice) answeredCount++;
  if (answers.q5.choice) answeredCount++;
  if (answers.q6) answeredCount++;
  if (answers.q7) answeredCount++;
  if (answers.q8) answeredCount++;
  if (answers.q9.choice) answeredCount++;
  if (answers.q10.choice) answeredCount++;
  if (answers.q11.length > 0) answeredCount++;
  if (answers.q12) answeredCount++;
  if (answers.q13) answeredCount++;
  if (answers.q14) answeredCount++;
  if (answers.q15) answeredCount++;
  if (answers.q16.selected.length > 0 || answers.q16.otherText) answeredCount++;
  if (answers.q17 !== undefined) answeredCount++;
  if (answers.q18) answeredCount++;
  if (answers.q19) answeredCount++;
  if (answers.q20) answeredCount++;
  if (answers.qImportant) answeredCount++;

  const isFullyAnswered = answeredCount === totalQuestions;

  // Helper to generate structured WhatsApp link directed to Miss Dayane (5564992726558)
  const getWhatsAppUrl = () => {
    const phoneNumber = "5564992726558";
    const intro = "Olá, Miss Dayane! Concluí o preenchimento do meu questionário de preparação para a nossa sessão. 🌸\n\n";
    
    const q1Res = answers.q1 ? `_${answers.q1.trim()}_` : "_Não respondido_";
    const q17Res = answers.q17 !== undefined ? `*Nota ${answers.q17}/10*` : "_Não respondido_";
    
    const selectedCorpo = [...answers.q16.selected];
    if (answers.q16.otherText) selectedCorpo.push(answers.q16.otherText);
    const corpoRes = selectedCorpo.length > 0 ? `_${selectedCorpo.join(', ')}_` : "_Nenhuma_";
    
    const raivaRes = answers.q11.length > 0 ? `_${answers.q11.join(', ')}_` : "_Não especificado_";
    
    const q20Res = answers.q20 ? `_"${answers.q20.trim()}"_` : "_Não respondido_";
    const qImpRes = answers.qImportant ? `_"${answers.qImportant.trim()}"_` : "_Não respondido_";

    const body = `*📋 PREPARAÇÃO DE SESSÃO – NÚBIA*\n` +
                 `• *Total de respostas salvas:* ${answeredCount}\n` +
                 `• *Sentimento mais latente hoje:* ${q1Res}\n` +
                 `• *Nota de dor atual:* ${q17Res}\n` +
                 `• *Manifestações no corpo:* ${corpoRes}\n` +
                 `• *Raiva direcionada:* ${raivaRes}\n\n` +
                 `*🌿 O que meu coração precisa ouvir para ter paz:* \n${q20Res}\n\n` +
                 `*✨ A Questão Crucial (O que mudaria em mim se soubesse de toda a verdade):* \n${qImpRes}\n\n` +
                 `_(Levo também o relatório completo em formato de texto para nossa conversa!)_`;

    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(intro + body)}`;
  };

  // Visual Theme mapping variables
  const styles = {
    titleFont: isMinimal ? 'font-sans font-bold text-neutral-950 text-2xl md:text-3xl' : 'font-serif font-medium text-2xl md:text-3xl',
    headingColor: isMidnight ? 'text-slate-100' : isMinimal ? 'text-neutral-950' : 'text-[#583D31] font-bold',
    subTextColor: isMidnight ? 'text-slate-400 font-sans' : isMinimal ? 'text-neutral-700 font-sans' : 'text-daiane-dark/70 font-sans',
    iconWrap: isMidnight ? 'bg-indigo-950 text-indigo-400' : isMinimal ? 'bg-neutral-100 text-neutral-900 rounded-none' : 'bg-daiane-brand-light/60 text-daiane-dark',
    
    // Actions Panel Box color
    actionsPanel: isMidnight
      ? 'bg-[#151D30]/90 border border-slate-800/80 text-slate-100 shadow-xl'
      : isMinimal
      ? 'bg-neutral-950 text-neutral-105 border border-neutral-900 rounded-none shadow-none'
      : 'bg-daiane-brand text-daiane-brand-light rounded-2xl shadow-lg',
    actionsPanelSub: isMidnight ? 'text-slate-400' : isMinimal ? 'text-neutral-300' : 'text-daiane-brand-light/80',

    // Generic Cards & widgets container
    widgetBg: isMidnight
      ? 'bg-[#151D30]/90 border border-slate-800/80 p-5 shadow-sm'
      : isMinimal
      ? 'bg-white border border-neutral-300 p-5 shadow-none rounded-none'
      : 'bg-white border border-daiane-brand/10 p-5 shadow-sm',
    widgetTitle: isMidnight ? 'text-slate-250' : isMinimal ? 'text-neutral-950 font-bold' : 'text-[#583D31]',

    // Stats indicator cards
    statsItem: isMidnight
      ? 'bg-slate-900/60 border border-slate-800'
      : isMinimal
      ? 'bg-neutral-50 border border-neutral-200 rounded-none'
      : 'bg-daiane-brand-light/25 border border-daiane-brand/10',
    statsLabel: isMidnight ? 'text-slate-500' : 'text-daiane-dark/50',
    statsVal: isMidnight ? 'text-slate-200' : 'text-daiane-dark/95',

    // Read only content sheet wrapper
    mainSheet: isMidnight
      ? 'bg-[#131A2C] border border-slate-800/80 shadow-2xl overflow-hidden'
      : isMinimal
      ? 'bg-white border border-neutral-300 shadow-none overflow-hidden rounded-none'
      : 'bg-white border border-daiane-brand/15 shadow-xl overflow-hidden rounded-2xl',

    // Section title badges
    secTitle: isMidnight
      ? 'text-xs font-bold text-indigo-400 font-sans uppercase tracking-wider border-b border-indigo-950/60 pb-1.5 flex items-center gap-1.5'
      : isMinimal
      ? 'text-xs font-bold text-neutral-950 font-sans uppercase tracking-wider border-b border-neutral-300 pb-1.5 flex items-center gap-1.5'
      : 'text-xs font-bold text-daiane-dark font-sans uppercase tracking-wider border-b border-daiane-brand/20 pb-1.5 flex items-center gap-1.5',

    // Interactive/read field item text styling
    fieldLabel: isMidnight ? 'text-slate-400' : 'text-daiane-dark/40',
    fieldTextVal: isMidnight
      ? 'text-slate-200 bg-slate-900/40 p-3 rounded-lg border border-slate-850/60'
      : isMinimal
      ? 'text-neutral-950 bg-neutral-50 p-3 border border-neutral-200 rounded-none'
      : 'text-daiane-dark bg-[#FAF5EE]/40 p-3 rounded-lg border border-daiane-brand/10',

    // Rating / pain level box
    ratingBox: isMidnight
      ? 'text-indigo-400 bg-indigo-950/40 border border-indigo-900/60'
      : isMinimal
      ? 'text-neutral-950 bg-neutral-50 border border-neutral-200 rounded-none'
      : 'text-daiane-dark bg-daiane-brand-light/60 border border-daiane-brand/15',

    // Pergunta mais crucial wrapper
    crucialBox: isMidnight
      ? 'border-t-2 border-slate-850 bg-slate-900/20 p-4 rounded-xl'
      : isMinimal
      ? 'border-t border-neutral-300 bg-[#FAF5EE]/40 p-4 rounded-none'
      : 'border-t-2 border-daiane-brand-light bg-daiane-brand-light/10 p-4 rounded-xl',
    crucialHeading: isMidnight ? 'text-indigo-405 font-serif' : isMinimal ? 'text-neutral-950 font-bold' : 'text-daiane-dark/95 font-serif',
    crucialQuote: isMidnight
      ? 'text-slate-100 bg-[#151D30] border border-indigo-900/50 shadow-sm font-sans'
      : isMinimal
      ? 'text-neutral-950 bg-white border border-neutral-300 shadow-none rounded-none font-sans font-medium'
      : 'text-daiane-dark bg-white border border-daiane-brand/15 shadow-sm font-medium',

    // Danger / Data safety widget
    dangerWidget: isMidnight
      ? 'bg-[#151D30]/90 border border-rose-950/50 shadow-sm'
      : isMinimal
      ? 'bg-white border border-neutral-300 shadow-none rounded-none'
      : 'bg-white border border-stone-200 shadow-sm',
    dangerTitle: isMidnight ? 'text-rose-400' : 'text-stone-850',
    btnDanger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-transparent font-semibold',
    btnWback: isMidnight
      ? 'border-slate-800 text-slate-300 bg-slate-905 hover:bg-slate-855 font-semibold'
      : isMinimal
      ? 'border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 rounded-none font-semibold'
      : 'border-stone-200 text-stone-605 bg-white hover:bg-stone-50 font-semibold'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-6"
      id="summary-screen"
    >
      {/* Printable CSS Hook */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          #print-header, #summary-content-box {
            display: block !important;
          }
          #no-print-area, #btn-prev-section, #progress-container, #breathing-widget, #nav-header, #grounding-toast {
            display: none !important;
          }
          .shadow-xl, .shadow-md, .shadow-sm {
            box-shadow: none !important;
          }
          .border {
            border-color: #e5e7eb !important;
          }
        }
      `}</style>

      {/* Completion Greetings Banner */}
      <div className="text-center mb-6 py-4" id="no-print-area">
        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-3 ${styles.iconWrap}`}>
          <ClipboardCheck className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className={`${styles.titleFont} ${styles.headingColor}`}>
          Tudo Organizado, Núbia
        </h2>
        <p className={`${styles.subTextColor} max-w-md mx-auto mt-1 leading-relaxed text-xs`}>
          Seu coração e sua mente deram um passo muito importante ao colocar em palavras tudo o que ficou guardado.
        </p>
      </div>

      {/* Control Actions Panel */}
      <div className={`${styles.actionsPanel} p-5 md:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4`} id="no-print-area">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-serif font-medium text-sm md:text-base text-current">
            <BookOpen className="w-4 h-4 text-daiane-brand-light" />
            Opções de Exportação e Envio
          </div>
          <p className={`${styles.actionsPanelSub} text-xxs leading-relaxed max-w-md`}>
            Você pode enviar um resumo direto para a Miss Dayane via WhatsApp, baixar o relatório completo criptografado (.txt) ou imprimir as respostas em papel.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-xs transition cursor-pointer text-white shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
              isMidnight 
              ? 'bg-[#128C7E] hover:bg-[#075E54] rounded-xl' 
              : isMinimal 
              ? 'bg-neutral-950 text-white border border-neutral-950 hover:bg-neutral-900 rounded-none font-mono font-bold' 
              : 'bg-emerald-600 hover:bg-emerald-700 rounded-xl'
            }`}
            id="btn-whatsapp-send"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            Enviar via WhatsApp
          </a>
          <button
            onClick={handleExportText}
            className={`inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#583D31] border border-transparent font-semibold text-xs rounded-xl shadow-sm hover:bg-[#FAF5EE] transition cursor-pointer ${
              isMinimal ? 'rounded-none font-bold' : ''
            }`}
            id="btn-export-text"
          >
            <FileText className="w-4 h-4 text-[#583D31]" />
            Baixar Relatório (.txt)
          </button>
          <button
            onClick={handlePrint}
            className={`inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-xs transition cursor-pointer ${
              isMidnight 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl' 
              : isMinimal 
              ? 'bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200 rounded-none font-bold' 
              : 'bg-daiane-brand text-white hover:bg-[#8F6D63] rounded-xl'
            }`}
            id="btn-print-report"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Question Progress Meta Widget */}
      <div className={`${styles.widgetBg} space-y-4 rounded-2xl`} id="no-print-area">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isFullyAnswered ? 'bg-daiane-brand' : 'bg-amber-400'}`} />
            <span className={`text-xs font-semibold ${styles.widgetTitle}`}>Preenchimento da Sessão</span>
          </div>
          <span className={`font-mono text-xs ${styles.subTextColor} font-bold`}>
            {answeredCount} respondidas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`${styles.statsItem} p-3 rounded-xl text-left`}>
            <span className={`block text-3xs font-semibold uppercase ${styles.statsLabel}`}>Nota de Dor Atual</span>
            <span className={`text-lg font-bold font-serif ${styles.statsVal}`}>{answers.q17} / 10</span>
          </div>
          <div className={`${styles.statsItem} p-3 rounded-xl text-left`}>
            <span className={`block text-3xs font-semibold uppercase ${styles.statsLabel}`}>Sensações Corporais</span>
            <span className={`text-xs font-semibold ${styles.statsVal} block mt-1 truncate`}>
              {answers.q16.selected.join(', ') || 'Nenhuma'}
            </span>
          </div>
          <div className={`${styles.statsItem} p-3 rounded-xl text-left`}>
            <span className={`block text-3xs font-semibold uppercase ${styles.statsLabel}`}>Raiva Direcionada</span>
            <span className={`text-xs font-semibold ${styles.statsVal} block mt-1 truncate`}>
              {answers.q11.join(', ') || 'Nenhuma'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Beautiful Read-only Content - formatted cleanly for view and print */}
      <div className={styles.mainSheet} id="summary-content-box">
        {/* Hidden Header only visible on Real Printout */}
        <div className="hidden border-b-2 border-stone-800 p-8 text-center" id="print-header">
          <h1 className="text-2xl font-serif font-black underline my-1">
            Questionário de Preparação para a Sessão — Núbia
          </h1>
          <p className="text-xs font-mono text-stone-500 mt-2">
            Data de Emissão: {new Date().toLocaleDateString('pt-BR')} | Documento de Caráter Íntimo e Confidencial
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className={styles.secTitle}>
              <Heart className="w-3.5 h-3.5" />
              Sentimentos e Primeiro Impacto
            </h3>

            <div className="space-y-3 pl-1">
              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Sentimento que aparece primeiro hoje:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q1 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que mais te machuca nessa história:</span>
                <p className={`text-sm font-semibold ${styles.fieldTextVal}`}>
                  {[...answers.q2.selected, answers.q2.otherText].filter(Boolean).join(', ') || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>A pior parte de tudo isso:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q3 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className={styles.secTitle}>
              <Sparkles className="w-3.5 h-3.5" />
              Mudanças e Percepções
            </h3>

            <div className="space-y-3 pl-1">
              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Acredita que mudou como enxerga sua mãe?</span>
                <p className={`text-sm ${styles.fieldTextVal}`}>
                  <strong className="text-current">{answers.q4.choice || 'Não respondida'}</strong>
                  {answers.q4.choice === 'Sim' && answers.q4.how && ` — ${answers.q4.how}`}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Acredita que mudou como enxerga seu ex-marido?</span>
                <p className={`text-sm ${styles.fieldTextVal}`}>
                  <strong className="text-current">{answers.q5.choice || 'Não respondida'}</strong>
                  {answers.q5.choice === 'Sim' && answers.q5.how && ` — ${answers.q5.how}`}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Sentimento ao ver eles saindo e demorando juntos:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q6 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que você imaginava que poderia estar acontecendo:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q7 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Seu maior medo naquela época:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q8 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Se sentia traída?</span>
                  <div className={`text-sm ${styles.fieldTextVal}`}>
                    <strong>{answers.q9.choice || 'Não respondida'}</strong>
                    {answers.q9.explain && <p className="mt-1 text-xs opacity-80 italic">"{answers.q9.explain}"</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Se sentia desrespeitada?</span>
                  <div className={`text-sm ${styles.fieldTextVal}`}>
                    <strong>{answers.q10.choice || 'Não respondida'}</strong>
                    {answers.q10.explain && <p className="mt-1 text-xs opacity-80 italic">"{answers.q10.explain}"</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Sentia raiva de quem:</span>
                <p className={`text-sm font-semibold ${styles.fieldTextVal}`}>
                  {answers.q11.join(', ') || <em className="opacity-40">Não especificado</em>}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className={styles.secTitle}>
              <Flame className="w-3.5 h-3.5" />
              O Não Dito e Expressão
            </h3>

            <div className="space-y-3 pl-1">
              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que gostaria de ter perguntado na época e nunca perguntou:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q12 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que gostaria de ter dito para sua mãe e não conseguiu dizer:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q13 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que gostaria de ter dito para ex-marido e não conseguiu dizer:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q14 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Primeiro pensamento automático ao recordar da situação:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q15 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className={styles.secTitle}>
              <Activity className="w-3.5 h-3.5" />
              Corpo, Escala e Perda Explícita
            </h3>

            <div className="space-y-3 pl-1">
              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Onde sente isso no corpo:</span>
                <p className={`text-sm ${styles.fieldTextVal}`}>
                  {[...answers.q16.selected, answers.q16.otherText].filter(Boolean).join(', ') || <em className="opacity-40">Nenhum local físico selecionado</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Nota (sofrimento / impacto emocional de 0 a 10):</span>
                <p className={`text-sm font-bold p-3 rounded-lg border ${styles.ratingBox}`}>
                  Nota {answers.q17} de 10
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>Se essa história pudesse falar, o que ela diria?</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q18 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que acredita ter perdido por causa disso:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal}`}>
                  {answers.q19 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`block text-xs font-medium ${styles.fieldLabel}`}>O que seu coração precisa ouvir hoje para ter paz:</span>
                <p className={`text-sm whitespace-pre-wrap ${styles.fieldTextVal} border-daiane-brand-light/30`}>
                  {answers.q20 || <em className="opacity-40">Não respondido</em>}
                </p>
              </div>
            </div>
          </div>

          {/* Core Final Question */}
          <div className={`${styles.crucialBox} space-y-4`}>
            <h3 className={`${styles.crucialHeading} text-sm font-bold flex items-center gap-1.5 uppercase tracking-wider`}>
              <Compass className="w-5 h-5" />
              🌿 Pergunta Mais Importante
            </h3>

            <div className="space-y-2 pl-1">
              <span className={`block text-xs font-medium ${styles.fieldLabel}`}>
                Se você tivesse certeza absoluta da verdade, qualquer que fosse ela, o que mudaria dentro de você hoje?
              </span>
              <p className={`text-sm md:text-base p-4 rounded-xl border leading-relaxed whitespace-pre-wrap italic ${styles.crucialQuote}`}>
                "{answers.qImportant || 'Não respondida.'}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone Controls bar */}
      <div className={`${styles.dangerWidget} rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4`} id="no-print-area">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl mt-1">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className={`text-xs font-bold ${styles.dangerTitle}`}>Zona de Segurança de Dados</h4>
            <p className="text-xxs text-stone-500 leading-tight">
              Suas respostas confidenciais são salvas exclusivamente localmente. Deseja reiniciar ou deletar tudo deste navegador?
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onGoBack}
            className={`px-4 py-2 text-xs border rounded-xl transition cursor-pointer ${styles.btnWback}`}
          >
            Voltar ao Formulário
          </button>
          <button
            onClick={() => {
              if (
                confirm(
                  'ATENÇÃO: Isso apagará todas as respostas gravadas permanentemente do navegador. Esta ação não pode ser desfeita. Deseja continuar?'
                )
              ) {
                onReset();
              }
            }}
            className={`inline-flex items-center gap-1 px-4 py-2 text-xs transition cursor-pointer rounded-xl ${styles.btnDanger}`}
            id="btn-wipe-data"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar e Apagar Tudo
          </button>
        </div>
      </div>
    </motion.div>
  );
}

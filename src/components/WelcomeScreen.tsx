import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Clock, BookOpen } from 'lucide-react';
import { AppTheme } from '../types';

interface WelcomeScreenProps {
  onStart: () => void;
  hasSavedProgress: boolean;
  onResetAndStart: () => void;
  theme: AppTheme;
}

export default function WelcomeScreen({ onStart, hasSavedProgress, onResetAndStart, theme }: WelcomeScreenProps) {
  const isMidnight = theme === 'midnight';
  const isMinimal = theme === 'minimal';

  const styles = {
    titleFont: isMinimal ? 'font-sans font-bold text-neutral-950 text-3xl md:text-4xl' : 'font-serif font-medium text-3xl md:text-4xl',
    headingColor: isMidnight ? 'text-slate-100' : isMinimal ? 'text-neutral-950' : 'text-daiane-dark',
    subTextColor: isMidnight ? 'text-slate-350 font-sans' : isMinimal ? 'text-neutral-700 font-sans' : 'text-daiane-dark/80 font-sans',
    cardBg: isMidnight
      ? 'bg-[#151D30]/95 backdrop-blur-md border border-slate-800/80 p-6 md:p-8 shadow-2xl shadow-slate-950/50'
      : isMinimal
      ? 'bg-white border border-neutral-300 p-6 md:p-8 shadow-none rounded-none'
      : 'bg-white/95 backdrop-blur-md border border-daiane-brand/20 p-6 md:p-8 shadow-xl shadow-daiane-brand/5 rounded-2xl',
    iconWrap: isMidnight
      ? 'bg-indigo-950/80 text-indigo-400'
      : isMinimal
      ? 'bg-neutral-100 text-neutral-900 rounded-none'
      : 'bg-daiane-brand-light/50 text-daiane-brand',
    blockquote: isMidnight
      ? 'border-l-4 border-indigo-500 text-slate-300'
      : isMinimal
      ? 'border-l-4 border-neutral-950 text-neutral-700'
      : 'border-l-4 border-daiane-brand text-daiane-dark/85',
    bentoItem: isMidnight
      ? 'bg-slate-900/60 border border-slate-850'
      : isMinimal
      ? 'bg-neutral-50 border border-neutral-200 rounded-none'
      : 'bg-[#FAF5EE]/70 border border-daiane-brand/15',
    bentoTitle: isMidnight ? 'text-slate-100' : isMinimal ? 'text-neutral-950 font-bold' : 'text-daiane-dark font-medium',
    bentoText: isMidnight ? 'text-slate-400' : 'text-daiane-dark/70',
    iconColor: isMidnight ? 'text-indigo-400' : isMinimal ? 'text-neutral-900' : 'text-daiane-brand',
    divider: isMidnight ? 'border-slate-800/60' : 'border-daiane-brand/10',
    btnPrimary: isMidnight
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10'
      : isMinimal
      ? 'bg-neutral-950 hover:bg-neutral-900 text-white rounded-none font-bold'
      : 'bg-daiane-brand hover:bg-[#8F6D63] text-white shadow-md shadow-daiane-brand/10',
    btnSecondary: isMidnight
      ? 'border-slate-800 text-slate-300 bg-slate-900 hover:bg-slate-850'
      : isMinimal
      ? 'border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 rounded-none'
      : 'border-daiane-brand/25 text-daiane-dark bg-white hover:bg-daiane-brand-light/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-2xl mx-auto"
      id="welcome-container"
    >
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 shadow-sm ${styles.iconWrap}`}>
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className={`${styles.titleFont} ${styles.headingColor} mb-3`}>
          Sessão de Acolhimento & Preparação
        </h1>
        <p className={`${styles.subTextColor} max-w-lg mx-auto`}>
          Preparado especialmente para você, Núbia. Um porto seguro para colocar seus sentimentos em palavras antes do nosso encontro.
        </p>
      </div>

      <div className={`${styles.cardBg} mb-8 space-y-6`}>
        <blockquote className={`${styles.blockquote} pl-4 py-1 italic leading-relaxed text-sm`}>
          "Esse questionário não existe para descobrir a verdade dos fatos, mas para entender como essa situação afetou seu coração ao longo dos anos... Quando conseguimos colocar essas emoções em palavras, o coração se sente mais preparado."
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className={`flex flex-col items-center text-center p-4 rounded-xl ${styles.bentoItem}`}>
            <Heart className={`w-6 h-6 mb-2 ${styles.iconColor}`} />
            <h3 className={`text-xs font-semibold ${styles.bentoTitle}`}>Acolhimento</h3>
            <p className={`text-xxs mt-1 ${styles.bentoText}`}>Feito para aliviar o peso e estruturar as emoções com calma.</p>
          </div>
          <div className={`flex flex-col items-center text-center p-4 rounded-xl ${styles.bentoItem}`}>
            <ShieldCheck className={`w-6 h-6 mb-2 ${styles.iconColor}`} />
            <h3 className={`text-xs font-semibold ${styles.bentoTitle}`}>Privacidade Absoluta</h3>
            <p className={`text-xxs mt-1 ${styles.bentoText}`}>Suas respostas nunca saem deste aparelho. Ficam guardadas apenas no navegador.</p>
          </div>
          <div className={`flex flex-col items-center text-center p-4 rounded-xl ${styles.bentoItem}`}>
            <Clock className={`w-6 h-6 mb-2 ${styles.iconColor}`} />
            <h3 className={`text-xs font-semibold ${styles.bentoTitle}`}>No Seu Ritmo</h3>
            <p className={`text-xxs mt-1 ${styles.bentoText}`}>Auto-salvamento ativo. Responda gradualmente sem pressa.</p>
          </div>
        </div>

        <div className={`pt-4 border-t ${styles.divider}`}>
          <p className={`text-xs leading-relaxed text-center ${styles.subTextColor}`}>
            Recomendamos buscar um local calmo, servir um chá quente e respirar fundo algumas vezes antes de começar. Se as coisas parecerem pesadas, você pode clicar no botão <strong>"Respirar"</strong> a qualquer momento para fazer um breve exercício guiado.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {hasSavedProgress ? (
            <>
              <button
                onClick={onStart}
                className={`flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${styles.btnPrimary}`}
                id="btn-continue-session"
              >
                Continuar de onde parei
              </button>
              <button
                onClick={() => {
                  if (confirm("Deseja realmente apagar as respostas anteriores e começar um novo questionário?")) {
                    onResetAndStart();
                  }
                }}
                className={`flex-1 inline-flex justify-center items-center px-6 py-3 border transition-all duration-200 cursor-pointer ${styles.btnSecondary}`}
                id="btn-new-session"
              >
                Recomeçar do zero
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              className={`w-full sm:w-auto px-10 py-3.5 border border-transparent text-sm font-medium rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer text-center ${styles.btnPrimary}`}
              id="btn-start-questionnaire"
            >
              Iniciar Questionário com Calma
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

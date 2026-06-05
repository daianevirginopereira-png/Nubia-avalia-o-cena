import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, HelpCircle } from 'lucide-react';

interface BreathingBreakProps {
  onDismiss: () => void;
  standalone?: boolean;
}

type BreathState = 'inspire' | 'hold' | 'expire' | 'rest';

export default function BreathingBreak({ onDismiss, standalone = false }: BreathingBreakProps) {
  const [isActive, setIsActive] = useState(true);
  const [breathState, setBreathState] = useState<BreathState>('inspire');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Transition state
          setBreathState((currentState) => {
            switch (currentState) {
              case 'inspire':
                return 'hold';
              case 'hold':
                return 'expire';
              case 'expire':
                return 'rest';
              case 'rest':
                setTotalCycles((c) => c + 1);
                return 'inspire';
              default:
                return 'inspire';
            }
          });
          return 4; // 4 seconds for each phase of box breathing
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, breathState]);

  const getStateDetails = () => {
    switch (breathState) {
      case 'inspire':
        return {
          title: 'Puxe o ar lentamente',
          subtitle: 'Pelo nariz, calmamente, expandindo a barriga',
          circleScale: 1.5,
          color: 'bg-daiane-brand-light border-daiane-brand/35 shadow-daiane-brand-light/30',
          textColor: 'text-[#583D31]',
        };
      case 'hold':
        return {
          title: 'Mantenha o ar nos pulmões',
          subtitle: 'Apenas relaxe os ombros e sinta a estabilidade',
          circleScale: 1.5,
          color: 'bg-amber-100 border-amber-300 shadow-amber-100',
          textColor: 'text-amber-700',
        };
      case 'expire':
        return {
          title: 'Solte o ar suavemente',
          subtitle: 'Pela boca, deixando ir toda a tensão acumulada',
          circleScale: 0.9,
          color: 'bg-rose-100 border-rose-300 shadow-rose-100',
          textColor: 'text-rose-700',
        };
      case 'rest':
        return {
          title: 'Aguarde sem ar',
          subtitle: 'Descanse no silêncio antes da próxima inspiração',
          circleScale: 0.9,
          color: 'bg-stone-100 border-stone-200 shadow-stone-100',
          textColor: 'text-stone-600',
        };
    }
  };

  const details = getStateDetails();

  return (
    <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/60 p-6 shadow-xl shadow-stone-100 text-center" id="breathing-widget">
      {!standalone && (
        <div className="text-right mb-2">
          <span className="inline-block text-xxs font-semibold bg-daiane-brand-light text-[#583D31] px-2.5 py-1 rounded-full uppercase tracking-wider">
            Momento de Respiro Recomendado
          </span>
        </div>
      )}

      <h2 className="text-lg font-serif font-medium text-stone-800 mb-1">
        Pausa para Respirar
      </h2>
      <p className="text-xs text-stone-500 max-w-sm mx-auto mb-8">
        Refletir sobre sentimentos profundos mexe com o corpo. Faça esta pausa rápida de 4 tempos para centrar sua mente e relaxar o peito.
      </p>

      {/* Breathing Circle Area */}
      <div className="relative h-64 flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          {/* Outer Ripple */}
          {isActive && breathState === 'inspire' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.9, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeOut' }}
              className="absolute w-32 h-32 rounded-full border border-daiane-brand/30"
            />
          )}
        </AnimatePresence>

        {/* Breathing Circle Content */}
        <motion.div
          animate={{ scale: details.circleScale }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className={`w-32 h-32 rounded-full border flex flex-col items-center justify-center shadow-lg transition-colors duration-500 ${details.color}`}
        >
          <motion.span
            key={secondsLeft}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-bold text-stone-700"
          >
            {secondsLeft}s
          </motion.span>
          <span className="text-xxs uppercase tracking-widest text-stone-500 font-semibold mt-1">
            {breathState === 'inspire' && 'Instante'}
            {breathState === 'hold' && 'Mantenha'}
            {breathState === 'expire' && 'Solte'}
            {breathState === 'rest' && 'Pausa'}
          </span>
        </motion.div>
      </div>

      {/* Instructions Overlay */}
      <div className="mb-6 min-h-[4.5rem]">
        <h3 className={`text-base font-medium font-sans ${details.textColor} transition-colors duration-500`}>
          {details.title}
        </h3>
        <p className="text-xs text-stone-400 mt-1 px-4 leading-relaxed">
          {details.subtitle}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => {
            setBreathState('inspire');
            setSecondsLeft(4);
            setTotalCycles(0);
          }}
          className="p-2.5 rounded-full border border-stone-200 text-stone-500 hover:bg-stone-50 transition cursor-pointer"
          title="Reiniciar"
          id="btn-breathing-reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsActive(!isActive)}
          className={`p-4 rounded-full text-white cursor-pointer shadow-md transition ${
            isActive ? 'bg-stone-700 hover:bg-stone-800 shadow-stone-200' : 'bg-daiane-brand hover:bg-[#8F6D63] shadow-daiane-brand-light/50'
          }`}
          id="btn-breathing-toggle-play"
        >
          {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <span className="text-xs text-stone-400 font-medium">
          Ciclos: {totalCycles}
        </span>
      </div>

      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
        <span className="text-xxs text-stone-400 text-left leading-tight">
          Metodologia de respiração sugerida por psicoterapeutas para alívio de estresse pós-traumático.
        </span>
        <button
          onClick={onDismiss}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          id="btn-breathing-dismiss"
        >
          {standalone ? 'Fechar' : 'Voltar ao Questionário'}
        </button>
      </div>
    </div>
  );
}

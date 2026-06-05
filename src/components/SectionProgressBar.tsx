import React from 'react';
import { SECTIONS } from '../data/questions';
import { Heart, Eye, MessageSquareShare, Activity, Sparkles, LucideIcon } from 'lucide-react';
import { AppTheme } from '../types';

interface SectionProgressBarProps {
  currentSectionIndex: number; // 0 to 4
  questionProgress: number; // 0 to 100 percentage
  theme: AppTheme;
}

const getSectionIcon = (iconName: string): LucideIcon => {
  switch (iconName) {
    case 'Heart':
      return Heart;
    case 'Eye':
      return Eye;
    case 'MessageSquareShare':
      return MessageSquareShare;
    case 'Activity':
      return Activity;
    case 'Sparkles':
      return Sparkles;
    default:
      return Heart;
  }
};

export default function SectionProgressBar({ currentSectionIndex, questionProgress, theme }: SectionProgressBarProps) {
  // Styles based on theme
  const trackColor = theme === 'midnight' ? 'bg-slate-800' : 'bg-daiane-brand-light/40';
  const progressColor = 
    theme === 'daiane' ? 'bg-daiane-brand' : 
    theme === 'midnight' ? 'bg-indigo-500' : 'bg-stone-900';

  const getStepClasses = (isActive: boolean, isCompleted: boolean) => {
    if (theme === 'daiane') {
      return {
        stepWrap: isActive
          ? 'bg-daiane-brand-light/60 border-daiane-brand text-daiane-dark shadow-md shadow-daiane-brand/5'
          : isCompleted
          ? 'bg-daiane-brand border-daiane-brand text-white'
          : 'bg-white border-daiane-brand/20 text-daiane-dark/40',
        textLabel: isActive ? 'text-daiane-dark font-semibold' : isCompleted ? 'text-daiane-dark/80 font-medium' : 'text-daiane-dark/40',
        mobileHeading: 'text-daiane-dark'
      };
    } else if (theme === 'midnight') {
      return {
        stepWrap: isActive
          ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10'
          : isCompleted
          ? 'bg-indigo-600 border-indigo-600 text-white'
          : 'bg-[#151D30] border-slate-805 text-slate-500',
        textLabel: isActive ? 'text-indigo-400 font-bold' : isCompleted ? 'text-slate-300 font-medium' : 'text-slate-500',
        mobileHeading: 'text-indigo-400'
      };
    } else {
      // Minimalist Monochrome Swiss
      return {
        stepWrap: isActive
          ? 'bg-neutral-900 border-neutral-900 text-white'
          : isCompleted
          ? 'bg-neutral-400 border-neutral-400 text-white'
          : 'bg-white border-neutral-300 text-neutral-400',
        textLabel: isActive ? 'text-neutral-950 font-bold' : isCompleted ? 'text-neutral-500 font-medium' : 'text-neutral-400',
        mobileHeading: 'text-neutral-900'
      };
    }
  };

  const getSubTextThemeColor = () => {
    return theme === 'midnight' ? 'text-slate-400' : theme === 'daiane' ? 'text-daiane-dark/70 font-sans' : 'text-stone-500';
  };

  return (
    <div className="w-full mb-6" id="progress-container">
      {/* Visual Timeline Indicators */}
      <div className="hidden md:flex justify-between items-center relative mb-4">
        {/* Underline Progress Bar track */}
        <div className={`absolute left-6 right-6 top-6 h-0.5 ${trackColor} -z-10`} />

        {/* Dynamic Progress Indicator */}
        <div
          className={`absolute left-6 top-6 h-0.5 ${progressColor} transition-all duration-500 -z-10`}
          style={{ width: `${(currentSectionIndex / (SECTIONS.length - 1)) * 100}%` }}
        />

        {SECTIONS.map((sec, idx) => {
          const Icon = getSectionIcon(sec.icon);
          const isActive = idx === currentSectionIndex;
          const isCompleted = idx < currentSectionIndex;
          const styles = getStepClasses(isActive, isCompleted);

          return (
            <div
              key={sec.id}
              className={`flex flex-col items-center transition-all duration-300 ${
                isActive ? 'scale-105' : 'scale-100 opacity-60'
              }`}
              id={`progress-step-${sec.id}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${styles.stepWrap}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-2xs font-semibold uppercase tracking-wider mt-2 transition-colors ${styles.textLabel}`}
              >
                {sec.subtitle}
              </span>
              <span className={`text-[10px] font-medium mt-0.5 max-w-[100px] text-center truncate ${theme === 'midnight' ? 'text-slate-400' : 'text-stone-400'}`}>
                {sec.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile progress summary */}
      <div className="md:hidden flex flex-col space-y-1.5 px-1">
        <div className="flex justify-between items-baseline">
          <span className={`text-xs font-semibold font-sans uppercase tracking-wider ${getStepClasses(true, false).mobileHeading}`}>
            {SECTIONS[currentSectionIndex].title}
          </span>
          <span className={`text-xxs font-medium font-mono ${theme === 'midnight' ? 'text-slate-400' : 'text-stone-400'}`}>
            Seção {currentSectionIndex + 1} de {SECTIONS.length}
          </span>
        </div>
        <p className={`text-xxs line-clamp-1 italic ${getSubTextThemeColor()}`}>
          {SECTIONS[currentSectionIndex].description}
        </p>
      </div>

      {/* Micro percentage bar */}
      <div className={`w-full ${theme === 'midnight' ? 'bg-[#1E293B] border-slate-800' : 'bg-stone-100 border-stone-200/20'} h-1.5 rounded-full mt-2 overflow-hidden border`}>
        <div
          className={`${progressColor} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${questionProgress}%` }}
        />
      </div>
    </div>
  );
}

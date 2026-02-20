import React, { useState } from 'react';
import { BookOpen, Globe, Layout, ShieldCheck, Terminal } from 'lucide-react';
import MediumQuiz from './MediumQuiz';
import HardQuiz from './HardQuiz';
import CodeFocusedQuiz from './CodeFocused';

export default function App() {
  const [difficulty, setDifficulty] = useState(null);

  if (difficulty === 'medium') {
    return <MediumQuiz onBack={() => setDifficulty(null)} />;
  }

  if (difficulty === 'hard') {
    return <HardQuiz onBack={() => setDifficulty(null)} />;
  }

  if (difficulty === 'code') {
    return <CodeFocusedQuiz onBack={() => setDifficulty(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="space-y-4">
          <div className="inline-flex p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 mb-4 animate-bounce-subtle">
            <Layout className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-6xl font-black tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            System Admin Reviewer
          </h1>
          <p className="text-slate-400 text-xl max-w-lg mx-auto leading-relaxed">
            by Kurt Yermo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Medium Difficulty Card */}
          <button
            onClick={() => setDifficulty('medium')}
            className="group relative flex flex-col items-center p-8 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-6 right-6 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              50 Questions
            </div>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Medium</h2>
            <p className="text-slate-400 text-sm mb-6">
              Networking, DHCP, Samba & Linux Foundations
            </p>
            <div className="mt-auto px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              Begin Evaluation
            </div>
          </button>

          {/* Hard Difficulty Card */}
          <button
            onClick={() => setDifficulty('hard')}
            className="group relative flex flex-col items-center p-8 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-6 right-6 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              100 Questions
            </div>
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Hard</h2>
            <p className="text-slate-400 text-sm mb-6">
              Advanced BIND9, Windows DNS & Hierarchy
            </p>
            <div className="mt-auto px-6 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              Initial Assessment
            </div>
          </button>

          {/* Code Focused Card */}
          <button
            onClick={() => setDifficulty('code')}
            className="group relative flex flex-col items-center p-8 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              150 Questions
            </div>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Terminal className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Code Focused</h2>
            <p className="text-slate-400 text-sm mb-6">
              150 Deep-Dive Questions on CLI & DNS Syntax
            </p>
            <div className="mt-auto px-6 py-2 bg-emerald-600/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              Technical Audit
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 text-slate-500 font-medium text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Mastery Level</span>
          </div>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <span>Goodluck!</span>
        </div>
      </div>
    </div>
  );
}
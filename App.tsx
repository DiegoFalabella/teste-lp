
import React, { useState, useEffect, useCallback } from 'react';
import BackgroundLayer from './components/BackgroundLayer';
import ControlPanel from './components/ControlPanel';
import { analyzeBackgroundVibe } from './services/geminiService';
import { AppState, BrandVibe } from './types';

const defaultVibe: BrandVibe = {
  title: "Sua Visão, Nosso Canvas",
  subtitle: "Crie uma presença digital única em segundos",
  accentColor: "#3b82f6",
  description: "Faça o upload de uma imagem e veja a mágica acontecer. Nossa IA ajusta o tom, as cores e a mensagem para combinar com seu visual."
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    backgroundImage: null,
    vibe: defaultVibe,
    isAnalyzing: false,
  });

  const handleImageUpload = async (base64: string) => {
    setState(prev => ({ ...prev, backgroundImage: base64, isAnalyzing: true }));
    
    try {
      const newVibe = await analyzeBackgroundVibe(base64);
      setState(prev => ({
        ...prev,
        vibe: newVibe,
        isAnalyzing: false
      }));
    } catch (error) {
      console.error("Falha ao analisar imagem", error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 selection:bg-white selection:text-black">
      <BackgroundLayer imageUrl={state.backgroundImage} />

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: state.vibe.accentColor }}></div>
          VIBECANVAS
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-white/70">
          <a href="#" className="hover:text-white transition-colors">Portfólio</a>
          <a href="#" className="hover:text-white transition-colors">Serviços</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div 
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4 transition-colors duration-500"
          style={{ backgroundColor: `${state.vibe.accentColor}33`, color: state.vibe.accentColor, border: `1px solid ${state.vibe.accentColor}66` }}
        >
          {state.isAnalyzing ? "Identificando seu estilo..." : "Powered by Gemini AI"}
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter">
          {state.vibe.title}
        </h1>
        
        <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          {state.vibe.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: state.vibe.accentColor, color: '#fff' }}
          >
            Começar Agora
          </button>
          <button className="px-10 py-5 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
            Ver Demo
          </button>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Design Adaptativo</h3>
            <p className="text-sm text-white/60">Sua interface muda dinamicamente com base nas cores da imagem enviada.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Inteligência Criativa</h3>
            <p className="text-sm text-white/60">Gemini AI gera copy e slogans que conversam com seu conteúdo visual.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="font-bold mb-2">Performance Pura</h3>
            <p className="text-sm text-white/60">Carregamento instantâneo e otimização para todos os dispositivos.</p>
          </div>
        </div>
      </main>

      {/* UI Info Panel (Bottom Left) */}
      <div className="fixed bottom-8 left-8 hidden lg:block max-w-[200px] animate-in fade-in duration-1000 delay-500">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Análise de Mood</p>
        <div className="space-y-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-4/5" style={{ backgroundColor: state.vibe.accentColor }}></div>
          </div>
          <p className="text-xs text-white/50 italic">"{state.vibe.description}"</p>
        </div>
      </div>

      <ControlPanel onImageUpload={handleImageUpload} isAnalyzing={state.isAnalyzing} />

      {/* Floating particles or decorative elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

export default App;

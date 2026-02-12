
import React, { useRef } from 'react';
import { Upload, Sparkles, RefreshCcw } from 'lucide-react';

interface ControlPanelProps {
  onImageUpload: (base64: string) => void;
  isAnalyzing: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onImageUpload, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl flex items-center gap-2">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all active:scale-95"
        >
          <Upload size={18} />
          Trocar Fundo
        </button>

        {isAnalyzing && (
          <div className="px-4 py-2 flex items-center gap-2 text-white/80 animate-pulse">
            <Sparkles size={18} className="animate-spin" />
            <span className="text-sm font-medium">Analisando Vibe...</span>
          </div>
        )}
      </div>
      
      <p className="text-center text-xs text-white/40 mt-3 font-light tracking-widest uppercase">
        Use a IA para adaptar o conteúdo à sua imagem
      </p>
    </div>
  );
};

// Simple icon shim since we can't import icons directly from lucide-react in some environments without setup
const LucideIcons = {
  Upload: ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
  Sparkles: ({ size, className }: { size: number; className?: string }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  )
};

export default function ControlPanelStyled(props: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { onImageUpload, isAnalyzing } = props;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-md px-4">
      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
        >
          <LucideIcons.Upload size={20} />
          Customizar Fundo
        </button>

        {isAnalyzing && (
          <div className="flex items-center gap-2 text-blue-400 animate-pulse px-4">
            <LucideIcons.Sparkles size={20} className="animate-spin" />
            <span className="text-sm font-bold uppercase tracking-tighter">IA em ação</span>
          </div>
        )}
      </div>
    </div>
  );
}

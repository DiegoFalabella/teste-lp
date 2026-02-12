
export interface BrandVibe {
  title: string;
  subtitle: string;
  accentColor: string;
  description: string;
}

export interface AppState {
  backgroundImage: string | null;
  vibe: BrandVibe;
  isAnalyzing: boolean;
}

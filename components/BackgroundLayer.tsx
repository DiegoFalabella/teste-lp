
import React from 'react';

interface BackgroundLayerProps {
  imageUrl: string | null;
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ imageUrl }) => {
  const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072";
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Base Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${imageUrl || defaultImage})`,
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-gray-900" />
    </div>
  );
};

export default BackgroundLayer;

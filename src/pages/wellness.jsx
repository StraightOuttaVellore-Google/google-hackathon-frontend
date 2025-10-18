import WellnessMoodBoardWidget from "./wellness_moodboard";
import Community from "../components/Community";
import World from "../components/World";
import Pathways from "../components/Pathways";
import NeumorphicCard from "../components/NeumorphicCard";
import { useTheme } from "../contexts/ThemeContext";

export default function WellnessPage() {
  const { isBlackMode } = useTheme();
  
  return (
    <div className="text-white overflow-x-hidden relative bg-black">
      {/* Dark Green Starry Background */}
      {!isBlackMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bright Stars - Very Prominent */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`bright-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(100, 200, 100, 0.8), 0 0 16px rgba(80, 180, 80, 0.6), 0 0 24px rgba(60, 160, 60, 0.4)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`
            }}
          />
        ))}
        
        {/* Medium Stars - Prominent */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`medium-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: 'rgba(120, 220, 120, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(100, 200, 100, 0.8), 0 0 16px rgba(80, 180, 80, 0.6), 0 0 24px rgba(60, 160, 60, 0.4)',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Green Stars - Enhanced */}
        {[...Array(60)].map((_, i) => (
          <div
            key={`green-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.8}px`,
              height: `${Math.random() * 1.5 + 0.8}px`,
              background: 'rgba(100, 180, 100, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(80, 160, 80, 0.7), 0 0 12px rgba(60, 140, 60, 0.5), 0 0 18px rgba(40, 120, 40, 0.3)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
        
        {/* Distant Stars - More Visible */}
        {[...Array(120)].map((_, i) => (
          <div
            key={`distant-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '1px',
              height: '1px',
              background: 'rgba(140, 220, 140, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(100, 180, 100, 0.6), 0 0 8px rgba(80, 160, 80, 0.4)',
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 5 + 4}s`
            }}
          />
        ))}
        
        {/* Tiny Stars - Fill the Sky */}
        {[...Array(200)].map((_, i) => (
          <div
            key={`tiny-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '0.5px',
              height: '0.5px',
              background: 'rgba(120, 220, 120, 0.5)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(100, 180, 100, 0.4), 0 0 6px rgba(80, 160, 80, 0.2)',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 5}s`
            }}
          />
        ))}
        
        {/* Star Cluster 1 - Top Left Dense Stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`cluster1-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${15 + Math.random() * 20}%`,
              top: `${10 + Math.random() * 20}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: 'rgba(140, 220, 140, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(120, 200, 120, 0.7), 0 0 10px rgba(100, 180, 100, 0.5), 0 0 15px rgba(80, 160, 80, 0.3)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`
            }}
          />
        ))}
        
        {/* Star Cluster 2 - Top Right Dense Stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`cluster2-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${65 + Math.random() * 20}%`,
              top: `${15 + Math.random() * 15}%`,
              width: `${Math.random() * 1.5 + 0.8}px`,
              height: `${Math.random() * 1.5 + 0.8}px`,
              background: 'rgba(120, 200, 120, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(100, 180, 100, 0.6), 0 0 8px rgba(80, 160, 80, 0.4), 0 0 12px rgba(60, 140, 60, 0.2)',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Star Cluster 3 - Bottom Left Dense Stars */}
        {[...Array(18)].map((_, i) => (
          <div
            key={`cluster3-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${20 + Math.random() * 25}%`,
              top: `${70 + Math.random() * 20}%`,
              width: `${Math.random() * 2.5 + 1.2}px`,
              height: `${Math.random() * 2.5 + 1.2}px`,
              background: 'rgba(140, 200, 140, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(100, 160, 100, 0.6), 0 0 10px rgba(80, 140, 80, 0.4)',
              animationDelay: `${Math.random() * 3.5}s`,
              animationDuration: `${Math.random() * 2.5 + 1.8}s`
            }}
          />
        ))}
        
        {/* Star Cluster 4 - Bottom Right Dense Stars */}
        {[...Array(14)].map((_, i) => (
          <div
            key={`cluster4-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${70 + Math.random() * 20}%`,
              top: `${75 + Math.random() * 15}%`,
              width: `${Math.random() * 1.8 + 0.9}px`,
              height: `${Math.random() * 1.8 + 0.9}px`,
              background: 'rgba(110, 190, 110, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(90, 150, 90, 0.5), 0 0 8px rgba(70, 130, 70, 0.3)',
              animationDelay: `${Math.random() * 4.5}s`,
              animationDuration: `${Math.random() * 3.5 + 2.2}s`
            }}
          />
        ))}
        
        {/* Star Cluster 5 - Center Left */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`cluster5-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${5 + Math.random() * 15}%`,
              top: `${40 + Math.random() * 20}%`,
              width: `${Math.random() * 1.2 + 0.6}px`,
              height: `${Math.random() * 1.2 + 0.6}px`,
              background: 'rgba(90, 170, 90, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(70, 140, 70, 0.4), 0 0 6px rgba(50, 120, 50, 0.2)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
        
        {/* Star Cluster 6 - Center Right */}
        {[...Array(16)].map((_, i) => (
          <div
            key={`cluster6-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${80 + Math.random() * 15}%`,
              top: `${35 + Math.random() * 25}%`,
              width: `${Math.random() * 2.2 + 1.1}px`,
              height: `${Math.random() * 2.2 + 1.1}px`,
              background: 'rgba(130, 210, 130, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(100, 170, 100, 0.6), 0 0 12px rgba(80, 150, 80, 0.4)',
              animationDelay: `${Math.random() * 4.2}s`,
              animationDuration: `${Math.random() * 3.2 + 2.5}s`
            }}
          />
        ))}
        
        {/* Star Cluster 7 - Top Center Dense */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`cluster7-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${40 + Math.random() * 20}%`,
              top: `${5 + Math.random() * 15}%`,
              width: `${Math.random() * 1.8 + 0.9}px`,
              height: `${Math.random() * 1.8 + 0.9}px`,
              background: 'rgba(140, 220, 140, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(120, 200, 120, 0.7), 0 0 10px rgba(100, 180, 100, 0.5), 0 0 15px rgba(80, 160, 80, 0.3)',
              animationDelay: `${Math.random() * 3.8}s`,
              animationDuration: `${Math.random() * 2.8 + 2.2}s`
            }}
          />
        ))}
        
        {/* Star Cluster 8 - Bottom Center Dense */}
        {[...Array(14)].map((_, i) => (
          <div
            key={`cluster8-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${45 + Math.random() * 10}%`,
              top: `${85 + Math.random() * 10}%`,
              width: `${Math.random() * 2.0 + 1.0}px`,
              height: `${Math.random() * 2.0 + 1.0}px`,
              background: 'rgba(120, 200, 120, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(100, 180, 100, 0.6), 0 0 12px rgba(80, 160, 80, 0.4), 0 0 18px rgba(60, 140, 60, 0.2)',
              animationDelay: `${Math.random() * 4.8}s`,
              animationDuration: `${Math.random() * 3.8 + 2.8}s`
            }}
          />
        ))}
        
        {/* Star Cluster 9 - Left Center Dense */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`cluster9-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${5 + Math.random() * 15}%`,
              top: `${50 + Math.random() * 20}%`,
              width: `${Math.random() * 1.6 + 0.8}px`,
              height: `${Math.random() * 1.6 + 0.8}px`,
              background: 'rgba(100, 190, 100, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(80, 170, 80, 0.6), 0 0 8px rgba(60, 150, 60, 0.4)',
              animationDelay: `${Math.random() * 5.2}s`,
              animationDuration: `${Math.random() * 4.2 + 3.2}s`
            }}
          />
        ))}
        
        {/* Star Cluster 10 - Right Center Dense */}
        {[...Array(11)].map((_, i) => (
          <div
            key={`cluster10-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${85 + Math.random() * 10}%`,
              top: `${55 + Math.random() * 15}%`,
              width: `${Math.random() * 1.7 + 0.9}px`,
              height: `${Math.random() * 1.7 + 0.9}px`,
              background: 'rgba(110, 210, 110, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(90, 190, 90, 0.7), 0 0 10px rgba(70, 170, 70, 0.5), 0 0 15px rgba(50, 150, 50, 0.3)',
              animationDelay: `${Math.random() * 4.6}s`,
              animationDuration: `${Math.random() * 3.6 + 2.6}s`
            }}
          />
        ))}
        
        {/* Star Cluster 11 - Center Dense */}
        {[...Array(18)].map((_, i) => (
          <div
            key={`cluster11-star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${45 + Math.random() * 10}%`,
              top: `${45 + Math.random() * 10}%`,
              width: `${Math.random() * 1.4 + 0.7}px`,
              height: `${Math.random() * 1.4 + 0.7}px`,
              background: 'rgba(130, 220, 130, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(110, 200, 110, 0.8), 0 0 8px rgba(90, 180, 90, 0.6), 0 0 12px rgba(70, 160, 70, 0.4)',
              animationDelay: `${Math.random() * 3.2}s`,
              animationDuration: `${Math.random() * 2.2 + 1.8}s`
            }}
          />
        ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
      <WellnessMoodBoardWidget />
        <div className="px-6 pb-6 flex gap-6 mt-8">
          <NeumorphicCard 
            className="w-1/5 h-96 p-6"
            mode="wellness"
            starCount={8}
          >
            <Community />
          </NeumorphicCard>
          <NeumorphicCard 
            className="w-1/5 h-96"
            mode="wellness"
            starCount={8}
          >
            <World />
          </NeumorphicCard>
          <NeumorphicCard 
            className="w-3/5 h-96 p-6"
            mode="wellness"
            starCount={18}
          >
            <Pathways />
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
}
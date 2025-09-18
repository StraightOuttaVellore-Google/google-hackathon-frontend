import VoiceAICard from '../components/VoiceAICard'
import MonthlyCalendar from '../components/MonthlyCalendar'
import MonthlyStats from '../components/MonthlyStats'

export default function MoodBoardWidget({ onCalendarDayClick, onHistoryClick, onMatrixClick }) {
  const handleDayClick = (dayData) => {
    // Trigger the overlay callback
    if (onCalendarDayClick) {
      onCalendarDayClick(new Date(dayData.year, dayData.month - 1, dayData.day))
    }
  }

  return (
    <div className="pt-0 pb-1 px-6">
      <div 
        className="flex backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-16 relative overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Card Star Clusters */}
        {/* Cluster 1 - Top Left */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cluster1-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${15 + Math.random() * 15}%`,
              top: `${20 + Math.random() * 15}%`,
              width: `${Math.random() * 1.2 + 0.6}px`,
              height: `${Math.random() * 1.2 + 0.6}px`,
              background: 'rgba(180, 140, 220, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(140, 100, 200, 0.5)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 2 - Top Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster2-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${70 + Math.random() * 15}%`,
              top: `${15 + Math.random() * 15}%`,
              width: `${Math.random() * 1.0 + 0.5}px`,
              height: `${Math.random() * 1.0 + 0.5}px`,
              background: 'rgba(140, 160, 220, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(100, 120, 200, 0.4)',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 3 - Bottom Left */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cluster3-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${20 + Math.random() * 20}%`,
              top: `${70 + Math.random() * 15}%`,
              width: `${Math.random() * 1.4 + 0.6}px`,
              height: `${Math.random() * 1.4 + 0.6}px`,
              background: 'rgba(200, 120, 240, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(160, 80, 220, 0.5)',
              animationDelay: `${Math.random() * 3.5}s`,
              animationDuration: `${Math.random() * 2.5 + 1.8}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 4 - Bottom Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster4-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${70 + Math.random() * 15}%`,
              top: `${75 + Math.random() * 15}%`,
              width: `${Math.random() * 1.1 + 0.4}px`,
              height: `${Math.random() * 1.1 + 0.4}px`,
              background: 'rgba(120, 180, 240, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(80, 140, 220, 0.4)',
              animationDelay: `${Math.random() * 4.5}s`,
              animationDuration: `${Math.random() * 3.5 + 2.2}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 5 - Center Left */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`cluster5-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${10 + Math.random() * 10}%`,
              top: `${45 + Math.random() * 10}%`,
              width: `${Math.random() * 0.8 + 0.4}px`,
              height: `${Math.random() * 0.8 + 0.4}px`,
              background: 'rgba(160, 100, 200, 0.5)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(120, 80, 180, 0.3)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 6 - Center Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster6-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${80 + Math.random() * 15}%`,
              top: `${40 + Math.random() * 10}%`,
              width: `${Math.random() * 1.2 + 0.6}px`,
              height: `${Math.random() * 1.2 + 0.6}px`,
              background: 'rgba(100, 140, 220, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(60, 100, 200, 0.4)',
              animationDelay: `${Math.random() * 4.2}s`,
              animationDuration: `${Math.random() * 3.2 + 2.5}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Purple Hue Background - Behind MonthlyStats */}
        <div 
          className="absolute pointer-events-none"
          style={{
            left: '70%',
            top: '20%',
            width: '30%',
            height: '60%',
            background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(40, 20, 70, 0.10) 40%, rgba(30, 15, 50, 0.08) 70%, transparent 100%)',
            filter: 'blur(8px)',
            zIndex: 0
          }}
        />
        
        {/* Cluster 7 - Behind MonthlyStats (Right side) */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`monthly-stats-cluster-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${75 + Math.random() * 20}%`,
              top: `${30 + Math.random() * 40}%`,
              width: `${Math.random() * 1.5 + 0.8}px`,
              height: `${Math.random() * 1.5 + 0.8}px`,
              background: 'rgba(150, 120, 200, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(120, 80, 180, 0.6), 0 0 8px rgba(100, 60, 160, 0.3)',
              animationDelay: `${Math.random() * 3.8}s`,
              animationDuration: `${Math.random() * 2.8 + 2.2}s`,
              zIndex: 1
            }}
          />
        ))}
        <div className="relative z-10 flex gap-16 w-full">
          <VoiceAICard />
          <MonthlyCalendar onDayClick={handleDayClick} />
          <MonthlyStats onHistoryClick={onHistoryClick} />
        </div>
      </div>
    </div>
  )
}

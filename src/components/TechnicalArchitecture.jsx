import ArchitectureCard from './ArchitectureCard';

const TechnicalArchitecture = () => {
  return (
    <section id="architecture-section" className="py-12 md:py-20" style={{ background: '#000000' }}>
      {/* Section Header */}
      <div className="container mx-auto max-w-6xl px-3 md:px-6 mb-8 md:mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-8" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
            filter: 'brightness(1.15)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Technical Architecture
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-medium px-4" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.25)',
            filter: 'brightness(1.1)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Built on a robust, scalable infrastructure designed for privacy and performance
          </p>
        </div>
      </div>

      {/* Architecture Card */}
      <ArchitectureCard />
    </section>
  );
};

export default TechnicalArchitecture;

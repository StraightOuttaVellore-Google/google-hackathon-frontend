import TechArchitectureSwiper from './TechArchitectureSwiper';

const TechnicalArchitecture = () => {
  return (
    <section id="architecture-section" className="py-20" style={{ background: '#000000' }}>
      {/* Section Header */}
      <div className="container mx-auto max-w-6xl px-6 mb-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
            filter: 'brightness(1.15)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Technical Architecture
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.25)',
            filter: 'brightness(1.1)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Built on a robust, scalable infrastructure designed for privacy and performance
          </p>
        </div>
      </div>

      {/* Full-width Swiper */}
      <div className="w-screen -mx-6">
        <TechArchitectureSwiper />
      </div>
    </section>
  );
};

export default TechnicalArchitecture;

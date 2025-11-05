const TechCard = ({ title, subtext, imgSrc, href }) => {
  return (
    <div className="w-full flex flex-col px-4" style={{ minHeight: 'fit-content', marginTop: 0, paddingTop: 0 }}>
      {/* Transparent parent container */}
      <div className="relative w-full flex flex-col" style={{ minHeight: 'fit-content', marginTop: 0, paddingTop: 0 }}>
        
        {/* Image Card - Black card with image */}
        <div 
          className="bg-black rounded-xl md:rounded-2xl p-0 flex items-center justify-center overflow-hidden mx-auto"
          style={{ 
            width: 'clamp(280px, 85vw, 990px)',
            aspectRatio: '16 / 9',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          <img 
            src={imgSrc} 
            alt="" 
            className="w-full h-full object-cover rounded-xl md:rounded-2xl" 
            style={{ filter: 'brightness(1.3) contrast(1.1)' }}
          />
        </div>
        
        {/* Text Card - Transparent card with text */}
        <div className="bg-transparent rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center text-center" style={{ marginTop: 'clamp(1rem, 3vw, 3rem)' }}>
          <h3 
            className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 text-white"
            style={{
              fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
              filter: 'brightness(2.0)',
              WebkitFontSmoothing: 'antialiased',
              color: '#ffffff'
            }}
          >
            {title}
          </h3>
          
          <p 
            className="text-sm md:text-lg lg:text-2xl font-medium mb-2 text-white"
            style={{
              fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.25)',
              filter: 'brightness(1.8)',
              WebkitFontSmoothing: 'antialiased',
              color: '#ffffff'
            }}
          >
            {subtext}
          </p>
          
          {/* Optional link */}
          {href && (
            <a 
              href={href} 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm md:text-base lg:text-lg font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechCard;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TechCard from './TechCard';

const CARDS = [
  {
    id: "frontend",
    title: "Frontend",
    subtext: "React, TypeScript",
    href: "https://react.dev/",
    imgSrc: "/images/img1.png",
  },
  {
    id: "backend",
    title: "Backend",
    subtext: "Node.js, Python",
    href: "https://nodejs.org/",
    imgSrc: "/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.PNG",
  },
  {
    id: "aiml",
    title: "AI/ML",
    subtext: "TensorFlow, PyTorch",
    href: "https://pytorch.org/",
    imgSrc: "/images/img1.png",
  },
  {
    id: "database",
    title: "Database",
    subtext: "PostgreSQL, Redis",
    href: "https://www.postgresql.org/",
    imgSrc: "/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.PNG",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    subtext: "AWS, Docker",
    href: "https://aws.amazon.com/",
    imgSrc: "/images/img1.png",
  },
  {
    id: "security",
    title: "Security",
    subtext: "AES-256, OAuth 2.0",
    href: "https://oauth.net/2/",
    imgSrc: "/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.PNG",
  },
  {
    id: "edge",
    title: "Edge Computing",
    subtext: "Local voice processing",
    href: "#edge",
    imgSrc: "/images/img1.png",
  },
  {
    id: "microservices",
    title: "Microservices",
    subtext: "Scalable modular architecture",
    href: "#microservices",
    imgSrc: "/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.PNG",
  },
];

// Create circular arrangement for seamless looping
// Only 8 cards: 1,2,3,4,5,6,7,8
// Start with 4 centered (index 3), 3 on left (index 2), 5 on right (index 4)
const CIRCULAR_CARDS = CARDS;

const TechArchitectureSwiper = () => {
  return (
    <div className="w-full">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        loopAdditionalSlides={2}
        loopFillGroupWithBlank={false}
        spaceBetween={20}
        breakpoints={{
          640: {
            spaceBetween: 30,
          },
          768: {
            spaceBetween: 35,
          },
          1024: {
            spaceBetween: 40,
          },
        }}
        speed={300}
        allowTouchMove={true}
        threshold={5}
        initialSlide={3}
        centeredSlidesBounds={false}
        watchSlidesProgress={true}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="tech-architecture-swiper"
        style={{
          '--swiper-pagination-color': '#3b82f6',
          '--swiper-pagination-bullet-inactive-color': 'rgba(255, 255, 255, 0.3)',
          '--swiper-pagination-bullet-inactive-opacity': '1',
        }}
      >
        {CIRCULAR_CARDS.map((card, index) => (
          <SwiperSlide key={`${card.id}-${index}`} className="!w-[85vw] sm:!w-[75vw] md:!w-[70vw] lg:!w-[60vw] xl:!w-[55vw] 2xl:!w-[50vw]">
            <TechCard 
              title={card.title}
              subtext={card.subtext}
              imgSrc={card.imgSrc}
              href={card.href}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TechArchitectureSwiper;

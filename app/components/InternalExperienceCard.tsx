import { Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { InternalExperience } from '../types/experience';
import Image from 'next/image';
// import { GlowingEffect } from './ui/glowing-effect';

const AnimatedSVGBackground = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1">
            <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#EC4899;#3B82F6" dur="8s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2">
            <animate attributeName="stop-color" values="#8B5CF6;#EC4899;#3B82F6;#8B5CF6" dur="8s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.1">
            <animate attributeName="stop-color" values="#EC4899;#3B82F6;#8B5CF6;#EC4899" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2">
            <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#EC4899;#3B82F6" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <filter id="blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Animated Circles */}
      <circle cx="50" cy="50" r="30" fill="url(#gradient1)" filter="url(#blur)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 300,200; 0,250; 0,0"
          dur="12s"
          repeatCount="indefinite"
        />
        <animate attributeName="r" values="30;60;30" dur="4s" repeatCount="indefinite" />
      </circle>

      <circle cx="350" cy="100" r="40" fill="url(#gradient2)" filter="url(#blur)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -250,150; -100,0; 0,0"
          dur="10s"
          repeatCount="indefinite"
        />
        <animate attributeName="r" values="40;80;40" dur="5s" repeatCount="indefinite" />
      </circle>

      <circle cx="200" cy="250" r="25" fill="url(#gradient1)" filter="url(#blur)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 100,-200; -150,-100; 0,0"
          dur="8s"
          repeatCount="indefinite"
        />
        <animate attributeName="r" values="25;50;25" dur="3s" repeatCount="indefinite" />
      </circle>


      <path
        d="M 0,150 Q 100,50 200,150 T 400,150"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      >
        <animate
          attributeName="d"
          values="M 0,150 Q 100,50 200,150 T 400,150;M 0,150 Q 100,250 200,150 T 400,150;M 0,150 Q 100,50 200,150 T 400,150"
          dur="6s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </path>

      <path
        d="M 0,100 Q 200,200 400,100"
        stroke="url(#gradient2)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          values="M 0,100 Q 200,200 400,100;M 0,100 Q 200,0 400,100;M 0,100 Q 200,200 400,100"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>


      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + i * 45}
          cy={50 + (i % 2) * 200}
          r="3"
          fill={`url(#gradient${(i % 2) + 1})`}
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`0,0; 0,${-20 - i * 5}; 0,0`}
            dur={`${2 + i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur={`${1.5 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

export default function InternalExperienceCard({ experience }: { experience: InternalExperience }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
  }, [hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform ${isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'
        } ${isHovered ? '-translate-y-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: isVisible ? '0ms' : '200ms'
      }}
    >

      <div className="absolute inset-0 overflow-hidden">
        <AnimatedSVGBackground />
      </div>
     
      <div className="relative z-10">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={experience.image || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop"}
            alt={experience.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <h3
              className={`text-white text-xl font-bold mb-2 transition-all duration-500 ${isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-4 opacity-0'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              {experience.title}
            </h3>
          </div>

          <div
            className={`absolute top-4 right-4 transition-all duration-500 ${isVisible
                ? 'translate-y-0 opacity-100 scale-100'
                : '-translate-y-4 opacity-0 scale-95'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800">Premium</span>
            </div>
          </div>
        </div>

        <div className="p-4 relative">

          <p
            className={`text-gray-600 text-base mb-4 leading-relaxed transition-all duration-500 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
              }`}
            style={{ transitionDelay: '500ms' }}
          >
            {experience.description || "Experience luxury and comfort in our premium facilities"}
          </p>

          <div
            className={`flex items-center justify-between transition-all duration-500 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">2-3 hours</span>
            </div>

            <button className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg overflow-hidden group">
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-300 ${isHovered
            ? 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'
            : ''
          }`}
      />
    </div>
  );
}
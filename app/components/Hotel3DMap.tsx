import { Camera, Sparkles, Eye, RotateCcw, ZoomIn, MapPin, Star, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Spotlight } from "./ui/Spotlight";



const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};



export default function Hotel3DMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [rotationX, setRotationX] = useState(-20);
  const [rotationY, setRotationY] = useState(15);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRotating) {
        setRotationY(prev => (prev + 1) % 360);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  const resetView = () => {
    setRotationX(-20);
    setRotationY(15);
    setCurrentView('main');
  };

  const amenities = [
    { icon: Coffee, label: "Restaurant", position: { top: '20%', left: '25%' }, color: 'bg-amber-500', delay: 1000 },
    { icon: Dumbbell, label: "Fitness Center", position: { top: '35%', right: '20%' }, color: 'bg-red-500', delay: 1200 },
    { icon: Car, label: "Parking", position: { bottom: '25%', left: '15%' }, color: 'bg-gray-600', delay: 1400 },
    { icon: Wifi, label: "WiFi Zone", position: { top: '60%', right: '35%' }, color: 'bg-blue-500', delay: 1600 },
    { icon: Star, label: "Spa", position: { top: '45%', left: '60%' }, color: 'bg-pink-500', delay: 1800 },
    { icon: MapPin, label: "Pool", position: { bottom: '40%', right: '25%' }, color: 'bg-cyan-500', delay: 2000 }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes building-rise {
          0% { transform: translateY(100px) scaleY(0); opacity: 0; }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-building-rise {
          animation: building-rise 1s ease-out forwards;
        }
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-purple-500 mb-4"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-white/20"></div>
            </div>
            <p className="text-white text-lg font-semibold animate-pulse">Loading 3D Hotel View...</p>
          </div>
        </div>
      )}

      <div className={`absolute inset-0 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Spotlight />
        <FloatingParticles />

        <div
          ref={containerRef}
          className="relative w-full h-full perspective-1000"
          onMouseLeave={resetView}
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
            style={{
              transform: `translate(-50%, -50%) perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
            }}
          >

            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-lg shadow-2xl hover:scale-105 cursor-pointer transition-all duration-500 animate-building-rise"
                  style={{
                    width: `${140 - i * 6}px`,
                    height: `${25 + (i < 6 ? i * 2 : (12 - i) * 2)}px`,
                    bottom: `${i * 22}px`,
                    left: `${i * 3}px`,
                    animationDelay: `${i * 150}ms`,
                    zIndex: 20 - i,
                    transform: `translateZ(${i * 2}px)`
                  }}
                >

                  <div className="absolute inset-0 bg-white/10 rounded-lg border border-white/20">

                    <div className="flex items-center justify-around h-full px-2">
                      {[...Array(Math.floor((140 - i * 6) / 25))].map((_, windowIndex) => (
                        <div
                          key={windowIndex}
                          className={`w-3 h-3 rounded-sm ${Math.random() > 0.7 ? 'bg-yellow-300/80' : 'bg-blue-200/40'
                            } animate-pulse`}
                          style={{ animationDelay: `${Math.random() * 3}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold opacity-90">
                    {i < 6 ? `Floor ${12 - i}` : `Floor ${12 - i}`}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg animate-glow-pulse"></div>
                </div>
              ))}

              <div
                className="absolute bg-gradient-to-r from-pink-500/90 to-red-500/90 rounded-lg shadow-2xl animate-building-rise"
                style={{
                  width: '80px',
                  height: '15px',
                  bottom: '264px',
                  left: '18px',
                  zIndex: 25,
                  animationDelay: '1.8s'
                }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs font-bold">Rooftop</div>
                </div>
              </div>

              <div
                className="absolute bg-gray-400 animate-building-rise"
                style={{
                  width: '2px',
                  height: '30px',
                  bottom: '279px',
                  left: '57px',
                  zIndex: 26,
                  animationDelay: '2s'
                }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 ${isRotating ? 'animate-spin' : ''
                }`}
              title="Auto Rotate"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={resetView}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              title="Reset View"
            >
              <Eye className="w-5 h-5" />
            </button>

            <button
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              title="Take Screenshot"
            >
              <Camera className="w-5 h-5" />
            </button>

            <button
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              title="Magic View"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
            <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Grand Luxury Hotel
            </h3>
            <div className="space-y-1 text-sm opacity-90">
              <p>• 12 Floors of Excellence</p>
              <p>• Premium Amenities</p>
              <p>• Interactive 3D View</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
            <p className="opacity-70">Move mouse to explore • Click controls to interact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
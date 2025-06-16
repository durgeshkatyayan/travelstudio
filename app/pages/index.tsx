import { useEffect } from 'react';
import InternalExperienceCard from '../components/InternalExperienceCard';
import Hotel3DMap from '../components/Hotel3DMap';
import { useExperiencesStore } from '../store/useExperiencesStore';
import { CardSpotlight } from '../components/ui/card-spotlight';
import { Spotlight } from '../components/ui/Spotlight';
import ExternalExperienceList from '../components/ExternalExperienceList';


export default function ExplorePage() {
  
  const { fetchExperiences, internalExperiences, externalExperiences } = useExperiencesStore();
  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* <h1 className="text-3xl font-bold text-center mb-6">Explore Our Hotel</h1> */}

      <CardSpotlight className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <Spotlight />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60" />
            </div>
          ))}
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Explore Our Hotel
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary experiences that await you in our luxury resort
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                Start Exploring
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/50 font-semibold">
                View Map
              </button>
            </div>
          </div>
        </div>
      </CardSpotlight>

      <div className="relative py-20 px-4 md:px-10 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Internal Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in luxury with our exclusive in-house experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {internalExperiences.map((exp) => (
              <InternalExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </div>


      <div className="py-20 px-4 md:px-10 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              External Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Venture beyond our walls and discover the beauty of the surrounding area
            </p>
          </div>

          <ExternalExperienceList experiences={externalExperiences} />
        </div>
      </div>


      <div className="py-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Interactive 3D Map
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navigate through our hotel with our immersive 3D map experience
            </p>
          </div>

          <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <Hotel3DMap />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>


  );
}

import { MapPin, Star } from 'lucide-react';
import { ExternalExperience } from '../types/experience';
import Image from 'next/image';

export default function ExternalExperienceList({ experiences }: { experiences: ExternalExperience[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((exp, index: number) => (
          <div
            key={exp.id}
            className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-700 animate-fade-in-up`}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={'https'}
                alt={exp.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.name}</h3>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{exp.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
          <span className="relative z-10">Explore</span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
        </button>
      </div>
    </>
  );
}

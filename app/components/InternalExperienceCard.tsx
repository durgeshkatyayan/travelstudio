import Image from 'next/image';
import { InternalExperience } from '../types/experience';

export default function InternalExperienceCard({ experience }: { experience: InternalExperience }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {experience.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{experience.description}</p>
      </div>
    </div>
  );
}

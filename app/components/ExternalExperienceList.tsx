import { ExternalExperience } from '../types/experience';

interface Props {
  experiences: ExternalExperience[];
  loading: boolean;
}

export default function ExternalExperienceList({ experiences, loading }: Props) {
  return (
    <div className="space-y-4">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white/70 p-6 rounded-2xl shadow-md border border-white/40"
          >
            <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-16 bg-yellow-200 rounded"></div>
          </div>
        ))
      ) : (
        experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-blue-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {exp.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{exp.distance}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-yellow-500 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  ⭐ {exp.rating}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

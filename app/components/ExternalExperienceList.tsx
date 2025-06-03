export default function ExternalExperienceList({ experiences }: { experiences: any[] }) {
   return (
    <div className="space-y-4">
      {experiences.map((exp, index: number) => (
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
      ))}
    </div>
  );
}
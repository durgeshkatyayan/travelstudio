export default function ExternalExperienceList({ experiences }: { experiences: any[] }) {
  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div key={exp.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold">{exp.name}</h4>
            <p className="text-sm text-gray-500">{exp.distance}</p>
          </div>
          <div className="text-yellow-500 font-bold">⭐ {exp.rating}</div>
        </div>
      ))}
    </div>
  );
}
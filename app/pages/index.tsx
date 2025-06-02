import { useEffect } from 'react';
import InternalExperienceCard from '../components/InternalExperienceCard';
import ExternalExperienceList from '../components/ExternalExperienceList';
import Hotel3DMap from '../components/Hotel3DMap';
import { useExperiencesStore } from '../store/useExperiencesStore';

export default function ExplorePage() {
  const { fetchExperiences, internalExperiences, externalExperiences } = useExperiencesStore();

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Hotel</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Internal Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internalExperiences.map((exp) => (
            <InternalExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">External Experiences</h2>
        <ExternalExperienceList experiences={externalExperiences} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3D Hotel Map</h2>
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Hotel3DMap />
        </div>
      </div>
    </div>
  );
}

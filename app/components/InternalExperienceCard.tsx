import Image from 'next/image';

export default function InternalExperienceCard({ experience }: { experience: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={experience.image}
        alt={experience.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
        <p className="text-gray-600 text-sm">{experience.description}</p>
      </div>
    </div>
  );
}
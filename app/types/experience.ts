// types/experience.ts

export interface InternalExperience {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ExternalExperience {
  id: string;
  name: string;
  distance: string;
  rating: number;
}

import { create } from "zustand";

interface Experience {
    id: number;
    title?: string;
    description?: string;
    image?: string;
    name?: string;
    distance?: string;
    rating?: number;
}

interface Store {
    internalExperiences: Experience[];
    externalExperiences: Experience[];
    selectedRoom: string | null;
    currentIndex: number;
    fetchExperiences: () => Promise<void>;
    setSelectedRoom: (room: string) => void;
    setCurrentIndex: (index: number) => void;
}

export const useExperiencesStore = create<Store>((set) => ({
    internalExperiences: [],
    externalExperiences: [],
    selectedRoom: null,
    currentIndex: 0,

    fetchExperiences: async () => {
    try {
        const res = await fetch("/api/experiences");
        const data = await res.json();
// console.log(data)
        set({
            internalExperiences: data.internalExperiences,
            externalExperiences: data.externalExperiences,
        });
    } catch (error) {
        console.error("Error fetching experiences:", error);
    }
},


    setSelectedRoom: (room: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedRoom", room);
        }
        set({ selectedRoom: room, currentIndex: 0 });
    },

    setCurrentIndex: (index: number) => set({ currentIndex: index }),
}));

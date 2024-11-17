export interface CreateLocation {
    userName: string;
    location: {
        coordinates: [number, number];
    };
}
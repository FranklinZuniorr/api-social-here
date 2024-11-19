export interface CreateChat {
    userName: string;
    message: string;
    location: {
        coordinates: [number, number];
    };
};
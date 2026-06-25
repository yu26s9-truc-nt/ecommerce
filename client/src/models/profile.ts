export type Profile = {
    userId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
};
 
export type ProfileUpdateRequest = Omit<Profile, "userId">;
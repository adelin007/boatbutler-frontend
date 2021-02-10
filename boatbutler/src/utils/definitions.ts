export const BOAT_BUTLER_API = process.env.NODE_ENV === "production" ? "https://boatbutler.herokuapp.com/" : "http://localhost:3001";


export enum MediaType{
    IMAGE = "IMAGE",
    VIDEO = "VIDEO"
}
export interface JobMediaInterface{
    type: MediaType;
    url: string;
}
export enum JobCategory{
    A = "A",
    B = "B"
}
export enum JobSubCategory{
    SUB_A = "SUB_A",
    SUB_B = "SUB_B"
}
export interface JobInterface{
    _id: string;
    allow_contact_by_app: boolean,
    category: JobCategory,
    subcategory: JobSubCategory,
    is_emergency: boolean;
    title: string;
    description: string;
    lat: number;
    lng: number;
    price: number;
    due_date: string;
    due_time: string;
    is_done: boolean;
    user_id: string; 
    awarded_company_id: string;
    boat_id: string;
    job_media: [JobMediaInterface];
   
} 
export interface JobWithBoatDetails{
    job: JobInterface;
    boat: BoatInterface;
    user_contact_details: string;
}
export interface BoatInterface{
    _id: string;
    name: string;
    year: number;
    boat_type: BoatType;
    user_id: string;
    address: string;
    city: string;
    description: string;
}
export enum BoatType{
    SPEED_BOAT = "SPEED_BOAT",
    SAIL_BOAT = "SAIL_BOAT",
    YACHT = "YACHT"
}

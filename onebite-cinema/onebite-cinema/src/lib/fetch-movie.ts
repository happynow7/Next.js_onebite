import { MovieData } from "@/types";

export default async function fetchMovies(): Promise<MovieData[]> {
    let url = `http://localhost:12345/movie`;


    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Loading Failed..");

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}
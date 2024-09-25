import { MovieData } from "@/types";

export default async function fetchRandomMovie(): Promise<
    MovieData[]
> {
    const url = `https://onebite-cinema-server-delta.vercel.app/movie/random`;

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
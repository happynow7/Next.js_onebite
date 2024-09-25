import { MovieData } from "@/types";

export default async function fetchOneMovie(
    id: number
): Promise<MovieData | null> {
    const url = `https://onebite-cinema-server-delta.vercel.app/movie/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Loading Failed..");

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}
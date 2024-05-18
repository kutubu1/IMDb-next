import Results from "./components/Results";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  let results = [];
  try {
    const genre = searchParams?.genre || 'fetchTrending';
    const endpoint =
      genre === 'fetchTopRated' ? 'movie/top_rated' : 'trending/all/week';
    
    const res = await fetch(
      `https://api.themoviedb.org/v1/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`, {revalidate: 10}
    );
   

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const data = await res.json();
    results = data.results;
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  return (
    <div>
      <h1>Home</h1>
      <Results results={results} />
    </div>
  );
}

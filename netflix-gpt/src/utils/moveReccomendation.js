import { API_OPTIONS } from "./constants";

const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTJjYjA0ZmI1YjU4MTkwMDNiNGVkZDgzMjg1YTJhZSIsIm5iZiI6MTUyNDkwOTI5MS42MjUsInN1YiI6IjVhZTQ0NGViOTI1MTQxNmI3NDAwNDQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biJBiyi6C0UcCCZMWlDS1hsnYve9UxER6X4GKIjtfqY";

const API_OPTIONS_WITH_TOKEN = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: bearerToken,
  },
};

// Genre map
const genreMap = {
  funny: 35,
  comedy: 35,
  action: 28,
  romance: 10749,
  romantic: 10749,
  drama: 18,
  horror: 27,
};

// Language map
const languageMap = {
  indian: "hi",
  hindi: "hi",
  malayalam: "ml",
  tamil: "ta",
  telugu: "te",
  english: "en",
  hollywood: "en",
};

// Brand keywords
const brandMap = {
  marvel: "marvel",
  dc: "dc",
  pixar: "pixar",
  disney: "disney",
};

// Time keywords
const timeKeywords = {
  now_running: ["now", "now running", "now-playing", "nowplaying"],
  new: ["new", "latest", "recent"],
  old: ["old", "older"],
  retro: ["retro", "classic", "vintage"],
};

function detectTimeModifier(prompt) {
  const p = prompt.toLowerCase();
  if (timeKeywords.now_running.some((k) => p.includes(k))) return "now_running";
  if (timeKeywords.retro.some((k) => p.includes(k))) return "retro";
  if (timeKeywords.old.some((k) => p.includes(k))) return "old";
  if (timeKeywords.new.some((k) => p.includes(k))) return "new";
  return null;
}

async function searchMovieByName(name) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    name
  )}&page=1`;
  const res = await fetch(url, API_OPTIONS);
  const data = await res.json();
  if (!data || !data.results) return [];
  // return full original titles
  return data.results.slice(0, 10).map((m) => m.title || m.name);
}

async function getMoviesFromPrompt(prompt) {
  const movieNameMatches = await searchMovieByName(prompt);
  if (movieNameMatches.length) {
    return movieNameMatches.join(", ");
  }

  // If no direct matches, then process filters
  const words = prompt.toLowerCase().split(/\s+/);
  let genreId = null;
  let langCode = null;
  let brandKeyword = null;

  for (const word of words) {
    if (genreMap[word]) genreId = genreMap[word];
    if (languageMap[word]) langCode = languageMap[word];
    if (brandMap[word]) brandKeyword = brandMap[word];
  }

  const timeMod = detectTimeModifier(prompt);
  const now = new Date();
  const currentYear = now.getFullYear();

  let url;
  const params = new URLSearchParams();
  params.set("sort_by", "popularity.desc");
  params.set("page", "1");

  if (langCode) params.set("with_original_language", langCode);
  if (genreId) params.set("with_genres", genreId);

  if (brandKeyword) {
    const keywordSearchUrl = `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(
      brandKeyword
    )}`;
    const keywordRes = await fetch(keywordSearchUrl, API_OPTIONS);
    const keywordData = await keywordRes.json();
    if (keywordData?.results?.length) {
      const keywordId = keywordData.results[0].id;
      params.set("with_keywords", keywordId);
    }
  }

  if (timeMod === "now_running") {
    const region =
      prompt.toLowerCase().includes("indian") ||
      prompt.toLowerCase().includes("india")
        ? "IN"
        : undefined;
    url = `https://api.themoviedb.org/3/movie/now_playing?${params.toString()}`;
    if (region) url += `&region=${region}`;
  } else {
    if (timeMod === "new") {
      const fromYear = currentYear - 2;
      params.set("primary_release_date.gte", `${fromYear}-01-01`);
    } else if (timeMod === "old") {
      const toYear = currentYear - 20;
      params.set("primary_release_date.lte", `${toYear}-12-31`);
    } else if (timeMod === "retro") {
      const toYear = currentYear - 30;
      params.set("primary_release_date.lte", `${toYear}-12-31`);
      params.set("sort_by", "vote_count.desc");
    }

    url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
  }

  const res = await fetch(url, API_OPTIONS);
  const data = await res.json();
  if (!data || !data.results) return "No results found.";
  return data.results
    .slice(0, 5)
    .map((m) => m.title || m.name)
    .join(", ");
}

// Example calls

export default getMoviesFromPrompt;

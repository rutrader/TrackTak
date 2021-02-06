import ratingSpreadsJson from "../data/ratingSpreads.json";

const ratingSpreads = ratingSpreadsJson
  .map((ratingSpread) => ({
    rating: ratingSpread.rating,
    spread: parseFloat(ratingSpread.spread) / 100,
  }))
  .reverse();

export default ratingSpreads;

const movieComparer = (card, request) => {

  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
  } = card;

  if (country && country.toLowerCase().match(request)) {
    return true;
  }
  if (director && director.toLowerCase().match(request)) {
    return true;
  }
  if (year && year.match(request)) {
    return true;
  }
  if (description && description.toLowerCase().includes(request)) {
    return true;
  }
  if (nameRU && nameRU.toLowerCase().match(request)) {
    return true;
  }
  if (nameEN && nameEN.toLowerCase().match(request)) {
    return true;
  }
  return false;
};

const moviesFilter = (cards, request) => {
  return cards.filter((card) =>
    movieComparer(card, request.toLowerCase())
  );
};

export default moviesFilter;

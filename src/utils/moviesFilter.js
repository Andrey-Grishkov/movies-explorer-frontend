const SmallDuration = 40;

const movieComparer = (movie, request, isSmall) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
  } = movie;

  if (country && country.toLowerCase().match(request)) {
    return true;
  }
  if (director && director.toLowerCase().match(request)) {
    return true;
  }
  if (isSmall) {
    if (duration > SmallDuration) {
      return false;
    }
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

// return !!(nameEN && nameEN.toLowerCase().match(request));

const moviesFilter = (cards, request, isSmall) => {
  return cards.filter((movie) =>
    movieComparer(movie, request.toLowerCase(), isSmall)
  );
};

export default moviesFilter;

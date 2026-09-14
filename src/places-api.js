// Centralized Overture Places API helpers.
//
// Keeping the API calls in this file makes the rest of the application easier
// to understand: index.js can focus on the user interface and analysis logic,
// while this file focuses on getting Overture Places data.

const OVERTURE_PLACES_URL = 'https://api.overturemapsapi.com/places';

// The project already used this Overture API key. It is kept here so both the
// original Travel Manager searches and the new Lodging Explorer searches use
// the same API configuration.
const OVERTURE_API_KEY =
  'live_9QVKZDoN0bYVmfxnr8JXWzPkkpPHIBt9iVf0u4p53GwVAvX0lUpnpvk1ZeJqxD8H';

/**
 * Find places using the original Travel Manager behaviour.
 *
 * This function intentionally keeps the existing country + category search
 * contract so all of the original selectors continue to work.
 */
export function findPlaces(category, country) {
  const url = new URL(OVERTURE_PLACES_URL);

  url.searchParams.set('country', country);
  url.searchParams.set('categories', category);

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': OVERTURE_API_KEY,
    },
  });
}

/**
 * Find places around one exact latitude/longitude.
 *
 * Overture's Places API supports radius searches in metres. This is used by
 * Overture Lodging Explorer to ask specifically for the L0 "lodging" group
 * around the place the user clicked.
 *
 * @param {number} latitude - Latitude of the clicked Travel Manager place.
 * @param {number} longitude - Longitude of the clicked Travel Manager place.
 * @param {number} radiusInMeters - Search radius in metres.
 * @param {number} limit - Maximum number of places returned by Overture.
 */
export function findLodgingNearPlace(
  latitude,
  longitude,
  radiusInMeters,
  limit = 25000
) {
  const url = new URL(OVERTURE_PLACES_URL);

  url.searchParams.set('lat', latitude);
  url.searchParams.set('lng', longitude);
  url.searchParams.set('radius', radiusInMeters);
  url.searchParams.set('categories', 'lodging');
  url.searchParams.set('limit', limit);
  url.searchParams.set('format', 'json');

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': OVERTURE_API_KEY,
    },
  });
}

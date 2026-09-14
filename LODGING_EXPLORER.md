# Overture Lodging Explorer

Overture Lodging Explorer keeps the original Overture Travel Manager workflows and adds a proximity-analysis layer for lodging.

## What was added

1. **Original Travel Manager searches remain available**
   - Country selection remains unchanged.
   - All existing place-category selectors remain available.
   - Existing place details, country information and pet-breed information remain available.

2. **L0 lodging proximity analysis**
   - Click any place returned by a Travel Manager category search.
   - The application automatically searches Overture's `lodging` category around that place.
   - The radius is configurable in metres.
   - The default radius is **1,000 metres**.
   - The analysis can be recalculated without selecting the place again.

3. **New Primary Category insights and Nearby Lodges directory**
   - Nearby lodging records are grouped using the new Overture taxonomy's primary category:
     `properties.taxonomy.primary`.
   - The interface reports:
     - total nearby lodging places;
     - number of distinct New Primary Categories;
     - nearest lodging distance;
     - the most common lodging type;
     - count and percentage for every nearby lodging type.
   - A **Nearby Lodges** section now lists every nearby lodging place on the left.
   - Clicking a lodge populates a detail panel on the right with Place Name, Distance from selected place, New Primary Category, Freeform, Locality, Postal Code, Region and Country.
   - A link beneath the New Primary Category mix jumps directly to the Nearby Lodges section.

4. **Client-side radius validation**
   - The API performs the radius search.
   - The browser also calculates Haversine distances and removes records outside the requested radius when coordinates are available.

## Taxonomy source

The February 2026 Overture taxonomy PDF supplied with this project defines `lodging` as Group (L0). Its lodging hierarchy includes categories such as Bed and Breakfast, Cabin, Campground, Cottage, Country House, Holiday Park, Hostel, Hotel, Motel, Houseboat, Inn, Lodge, Mountain Hut, Private Lodging, Resort, Retreat, RV Park, Ryokan, Self Catering Accommodation, and Service Apartment, with more specific descendants such as Beach Resort, Ski Resort, Guest House, Holiday Rental Home, and Health Retreat.

The application's accommodation selector has been expanded to use the corresponding current taxonomy values.

## Main files

### `src/places-api.js`

Contains the Overture API calls:

- `findPlaces(category, country)` preserves the original country/category search.
- `findLodgingNearPlace(latitude, longitude, radiusInMeters)` performs the new proximity search using the top-level `lodging` category.

### `src/index.js`

Contains the application logic:

- extracts Overture point coordinates;
- calls the lodging search after a place is clicked;
- calculates Haversine distances;
- reads `taxonomy.primary`;
- calculates counts and percentages;
- renders the lodging insight cards and category table.

The functions are intentionally separated so the data retrieval, calculation and rendering responsibilities are easy to follow.

### `src/style.css`

The interface now uses a completely different charcoal, violet, indigo and soft-white visual theme. New classes provide the analysis toolbar, insight cards, selected-place panel, category table, Nearby Lodges directory and responsive behaviour. CSS is deliberately left readable and unminified.

### `src/accomodationCategories.json`

Updated to include the lodging hierarchy represented in the supplied February 2026 taxonomy.

## Overture taxonomy terminology

The current Overture Places documentation describes `taxonomy.hierarchy` as the ordered path beginning with the top-level category and `taxonomy.primary` as the most specific primary category. This project uses the API's `taxonomy.primary` for the requested New Primary Category percentages.

## Running the project

```bash
npm install
npm start
```

For a production build:

```bash
npm run build
```

The original project already contains an Overture API key in its client-side API helper. The new feature uses the same configuration so the existing application continues to work.

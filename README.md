# Overture Lodging Explorer

**Overture Lodging Explorer** is a browser-based place discovery and lodging intelligence application built on the Overture Places data model. It retains the original Overture Travel Manager place-search experience while adding a lodging-focused analysis layer around every place selected by the user.

The central idea is simple:

> **Search for a place → select a result → understand the lodging around it.**

When a user clicks a place returned by the Travel Manager search, the application uses that place's coordinates to find nearby Overture **L0 `lodging`** records. It then calculates the nearby lodging mix, reports New Primary Category counts and percentages, identifies the nearest lodging, and exposes a detailed Nearby Lodges directory.

---

## Table of Contents

1. [Key Features](#key-features)
2. [How the Application Works](#how-the-application-works)
3. [Lodging Analysis](#lodging-analysis)
4. [Nearby Lodges](#nearby-lodges)
5. [Distance Calculation](#distance-calculation)
6. [Project Structure](#project-structure)
7. [Important Source Files](#important-source-files)
8. [Data and Taxonomy](#data-and-taxonomy)
9. [User Interface](#user-interface)
10. [Installation](#installation)
11. [Development](#development)
12. [Production Build](#production-build)
13. [API Configuration](#api-configuration)
14. [Application Flow](#application-flow)
15. [Data Handling and Fallbacks](#data-handling-and-fallbacks)
16. [Accessibility and Interaction](#accessibility-and-interaction)
17. [Troubleshooting](#troubleshooting)
18. [Customization Guide](#customization-guide)
19. [Technical Notes](#technical-notes)
20. [Future Improvements](#future-improvements)
21. [Credits](#credits)

---

## Key Features

### Original place discovery

The project preserves the main place-discovery workflow from Overture Travel Manager:

- Select a country.
- Select a place category.
- Search for matching places.
- Review the returned place results.
- Click a place to view its information.
- Continue using the application's existing category and country datasets.

### Lodging intelligence around selected places

After a place is selected, the application automatically:

1. Reads the selected place's coordinates.
2. Searches Overture for L0 `lodging` places around those coordinates.
3. Uses the selected radius, which defaults to **1,000 metres**.
4. Calculates distances from the selected place to returned lodging records.
5. Filters records that fall outside the requested radius when sufficient coordinates are available.
6. Groups nearby lodging by `taxonomy.primary`.
7. Calculates the percentage represented by each lodging category.
8. Identifies the nearest lodging.
9. Renders a Nearby Lodges directory containing the individual lodging records.

### New Primary Category mix

The lodging insight area provides a category breakdown containing:

- New Primary Category
- Count
- Percentage of all nearby L0 lodging records

The application also highlights the most common lodging category when nearby records are available.

### Nearby Lodges directory

The **Nearby Lodges** section provides two coordinated panels:

- **Left panel:** a list/table of all nearby lodging records found for the selected place.
- **Right panel:** detailed information for the lodge selected from the left panel.

The detail panel includes:

- Place Name
- Distance from selected place
- New Primary Category
- Freeform
- Locality
- Postal Code
- Region
- Country

The lodge list is ordered from nearest to farthest based on the application's calculated geographic distance.

### Automatic navigation

Selecting a place in the main place-results table automatically moves the user down to the lodging insights area after the place is selected and its lodging analysis begins.

A dedicated **Explore all Nearby Lodges →** link appears beneath the New Primary Category mix and takes the user directly to the Nearby Lodges section.

### Responsive interface

The interface includes responsive layouts for smaller screens while retaining the desktop-oriented two-panel experience where there is enough screen width.

---

## How the Application Works

The application is divided into three broad responsibilities:

### 1. Data retrieval

`src/places-api.js` contains the Overture Places API helpers. Keeping API requests in one module makes the application easier to maintain because UI code does not need to construct API requests directly.

### 2. Analysis and state management

`src/index.js` controls:

- Search interactions.
- Selected-place state.
- Coordinate extraction.
- Lodging API requests.
- Geographic distance calculations.
- Category aggregation.
- Percentage calculations.
- Rendering of lodging insights.
- Rendering of Nearby Lodges.
- Navigation between the main results and insights.

### 3. Presentation

`src/index.html` defines the page structure and `src/style.css` controls the visual presentation.

The CSS is intentionally readable and unminified so that future developers can understand and modify it easily.

---

## Lodging Analysis

The primary lodging analysis begins when the user clicks a place in the normal search results.

### Radius

The interface contains a radius control measured in metres.

Current defaults and limits are:

| Setting | Value |
|---|---:|
| Default radius | 1,000 m |
| Minimum radius | 50 m |
| Maximum radius | 50,000 m |
| Input step | 50 m |

The user can change the radius and recalculate the lodging analysis without selecting the original place again.

### L0 lodging search

The lodging query asks Overture for the top-level lodging group using the API category value:

```text
lodging
```

This is deliberately different from searching for one individual lodging type such as hotel or hostel. The purpose is to retrieve the L0 lodging population around the selected place and then inspect the more specific primary categories within that population.

### New Primary Category

For each lodging record, the application primarily reads:

```text
properties.taxonomy.primary
```

The code also contains fallbacks for alternate response shapes/legacy category structures so that the UI can remain useful if a returned record has a slightly different structure.

The displayed category name is formatted for readability. For example, an API value such as `service_apartment` becomes **Service Apartment** in the interface.

### Percentage calculation

For each category:

```text
percentage = (category count / total nearby lodging count) × 100
```

Percentages are displayed to one decimal place.

For example, if three lodging records are found:

```text
Service Apartment: 2
Hostel:            1
```

then the displayed mix is:

```text
Service Apartment: 66.7%
Hostel:            33.3%
```

---

## Nearby Lodges

The Nearby Lodges directory is designed to turn the aggregate insight into an actionable list of individual places.

### Left panel

The left panel lists every lodging record that survives the radius validation. Each row includes enough information to distinguish the lodge quickly, including its name, distance and New Primary Category.

The records are sorted by distance so the closest lodging appears first.

### Right panel

Clicking a lodge in the left panel updates the detail panel on the right without requiring another API request.

The detail view is populated from the selected lodging record and displays:

| Field | Description |
|---|---|
| Place Name | Overture place name |
| Distance from selected place | Calculated geographic distance |
| New Primary Category | `taxonomy.primary` when available |
| Freeform | Free-form place information when available |
| Locality | Locality/city information |
| Postal Code | Postal/postcode information |
| Region | Region/state/province information |
| Country | Country information |

If a field is unavailable in a record, the interface uses a safe fallback rather than allowing the page to break.

---

## Distance Calculation

The application does not rely solely on the ordering of the API response to determine the nearest lodging.

Instead, it calculates the geographic distance between:

- the selected place's latitude/longitude, and
- each nearby lodging place's latitude/longitude.

The calculation uses the **Haversine formula**, which is appropriate for measuring the shortest surface distance between two geographic coordinates on Earth.

Conceptually:

```text
selected place
      |
      | geographic distance
      v
nearby lodging
```

The smallest calculated distance becomes **Nearest lodging**.

### Important limitation

This is a straight-line geographic distance, sometimes called great-circle distance. It is **not**:

- driving distance;
- walking distance;
- cycling distance;
- travel time;
- road-network distance.

A lodge that is geographically close may therefore require a longer real-world journey depending on roads, rivers, barriers or other geographic constraints.

---

## Project Structure

The important application files are organized approximately as follows:

```text
Overture-Lodging-Explorer/
├── src/
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   ├── places-api.js
│   ├── cat-api.js
│   ├── dog-api.js
│   ├── country-flag.js
│   ├── accomodationCategories.json
│   ├── countries_sorted_alphabetical.json
│   ├── activeLife.json
│   ├── artsAndEntertainment.json
│   ├── attractionsAndActivitiesCategories.json
│   ├── automotive.json
│   ├── beauty_and_spa.json
│   ├── business_to_business.json
│   ├── eat_and_drink.json
│   ├── education.json
│   ├── financial_service.json
│   ├── health_and_medical.json
│   ├── home_service.json
│   ├── mass_media.json
│   ├── pets.json
│   ├── private_establishments_and_corporates.json
│   ├── professional_services.json
│   ├── public_service_and_government.json
│   ├── real_estate.json
│   ├── religious_organization.json
│   ├── retail.json
│   ├── travel.json
│   └── images/
│       ├── Logo.png
│       ├── OLE Logo.jpg
│       ├── Hero Animation.png
│       ├── Countries.png
│       ├── Accomodation.png
│       ├── Active Life.png
│       ├── Arts and Entertainment.png
│       ├── Attractions and Activities.png
│       ├── Automotive.png
│       ├── Beauty and Spa.png
│       ├── Business to Business.png
│       ├── Eat and Drink.png
│       ├── Education.png
│       ├── Financial Service.png
│       ├── Health and Medical.png
│       ├── Home Service.png
│       ├── Mass Media.png
│       ├── Pets.png
│       ├── Private Establishments and Corporations.png
│       ├── Professional Service.png
│       ├── Public Service and Government Services.png
│       ├── Real Estate.png
│       ├── Religious Organization.png
│       ├── Retail.png
│       ├── Satisfied_Customer.png
│       └── Travel.png
├── package.json
└── README.md
```

> The exact repository may also contain source-control metadata and generated/dependency directories. Those are not required to understand the application itself.

---

## Important Source Files

### `src/index.js`

This is the main application controller.

It handles the majority of the browser-side application behaviour, including:

- initializing selectors;
- handling category searches;
- rendering place results;
- handling selected places;
- extracting coordinates;
- starting lodging analysis;
- calculating distances;
- aggregating lodging categories;
- rendering the insights cards;
- rendering the New Primary Category mix;
- rendering the Nearby Lodges list;
- rendering the selected lodge detail panel;
- scrolling the user to the insights area after place selection.

The lodging-specific functions are intentionally separated and heavily commented so the logic can be followed without having to understand the entire application at once.

### `src/places-api.js`

This module centralizes the Overture Places requests.

The important functions are:

#### `findPlaces(category, country)`

Preserves the original Travel Manager search behaviour by searching for a category within the selected country.

#### `findLodgingNearPlace(latitude, longitude, radiusInMeters)`

Requests L0 lodging around a selected latitude/longitude using the configured radius.

### `src/index.html`

Contains the application shell, including:

- page header/navigation;
- country selector area;
- category selector area;
- hero area;
- place result area;
- selected place information;
- lodging radius controls;
- Lodging Insights area;
- New Primary Category mix;
- Nearby Lodges section;
- nearby lodge detail panel.

### `src/style.css`

Contains the application's visual system and responsive rules.

The current design uses a lodging/travel-oriented dark interface with violet/lavender highlights, soft-white surfaces and warm gold accents.

The stylesheet is deliberately not minified.

### `src/accomodationCategories.json`

Contains the accommodation/lodging categories used by the application.

The list was aligned with the supplied lodging taxonomy material and includes categories such as:

- Bed and Breakfast
- Cabin
- Campground
- Cottage
- Country House
- Holiday Park
- Hostel
- Hotel
- Motel
- Houseboat
- Inn
- Lodge
- Mountain Hut
- Private Lodging
- Guest House
- Holiday Rental Home
- Resort
- Beach Resort
- Ski Resort
- Retreat
- Health Retreat
- RV Park
- Ryokan
- Self Catering Accommodation
- Service Apartment

---

## Data and Taxonomy

The lodging functionality is based on the concept of **Group (L0) Lodging** supplied for this project.

The application's primary category analysis uses the Overture taxonomy's primary category field. The intended hierarchy is:

```text
L0: lodging
   └── more specific lodging categories
         └── New Primary Category used for the mix
```

The application therefore does not interpret every returned lodging record as simply "Hotel". Instead, it attempts to preserve the more specific primary category supplied by the data.

The supplied February 2026 lodging taxonomy material was also used when updating the accommodation category dataset.

---

## User Interface

The interface has been redesigned specifically for lodging exploration while retaining the project's existing functional structure.

### Hero area

The hero section introduces the product as a place and lodging discovery experience rather than presenting a technical API explanation.

The project also includes lodging-focused visual assets, including a hero image and lodging-related branding.

### Insights area

The Lodging Insights area provides a quick visual summary:

- total nearby lodging;
- number of primary types;
- nearest lodging distance;
- most common lodging category;
- complete category count/percentage table.

### Nearby Lodges area

The Nearby Lodges area is intentionally split into two panels so that users can browse the full list while simultaneously inspecting one selected lodging record.

### Colour system

The current interface uses a substantially different colour direction from the original Travel Manager design, with a dark base and violet/lavender emphasis supported by warm gold and soft-white elements.

Category imagery was also updated to use the lodging-focused visual treatment requested for the project.

---

## Installation

### Requirements

You should have:

- Node.js installed;
- npm available from the terminal;
- an active internet connection when the application needs to access external API resources.

### Install dependencies

From the project root:

```bash
npm install
```

### Start the development server

```bash
npm start
```

Parcel will serve the application locally and rebuild source changes during development.

The development URL is normally similar to:

```text
http://localhost:1234
```

The exact port may vary if the default port is already in use.

---

## Development

A typical development workflow is:

1. Run `npm install` once.
2. Run `npm start`.
3. Open the local Parcel URL in a browser.
4. Select a country.
5. Select a place category.
6. Run the search.
7. Click a place in the results table.
8. The application scrolls to the Lodging Insights area.
9. Review the nearby lodging count and category mix.
10. Use **Explore all Nearby Lodges →** to browse individual lodging records.
11. Click a lodge in the Nearby Lodges table to inspect its detailed information.
12. Adjust the radius and recalculate when a different search area is needed.

---

## Production Build

To create a production build:

```bash
npm run build
```

Parcel will process the application according to the configuration in `package.json`.

The project's build script currently uses the original GitHub Pages-oriented public URL configuration. If the repository is renamed or deployed somewhere else, review the `homepage` and `build` settings in `package.json`.

---

## API Configuration

The Overture Places API calls are centralized in:

```text
src/places-api.js
```

The project currently uses the API configuration inherited from the existing Travel Manager project.

### Security consideration

Because this is a browser application, any API key embedded directly in frontend JavaScript can potentially be inspected by users through browser developer tools or downloaded source assets.

For a production application, a safer architecture is:

```text
Browser
   ↓
Your backend / serverless function
   ↓
Overture Places API
```

The backend can keep the Overture credential outside the browser and enforce usage limits, authentication, caching and other controls.

Do not commit a newly issued secret credential to a public repository.

---

## Application Flow

The complete lodging workflow can be summarized as follows:

```text
User selects country
        ↓
User selects place category
        ↓
Application searches for places
        ↓
Place results are rendered
        ↓
User clicks a place
        ↓
Selected place is stored
        ↓
Coordinates are extracted
        ↓
Page scrolls to Lodging Insights
        ↓
L0 lodging search is requested
        ↓
Returned lodging records are normalized
        ↓
Distances are calculated
        ↓
Records outside the requested radius are removed
        ↓
New Primary Categories are grouped
        ↓
Counts + percentages are calculated
        ↓
Insights are rendered
        ↓
Nearby Lodges directory is populated
        ↓
User clicks a nearby lodge
        ↓
Selected lodge details appear on the right
```

---

## Data Handling and Fallbacks

Real-world place data is not always perfectly uniform. The application therefore avoids assuming that every response will have exactly the same shape.

### Response collection

The lodging analysis includes logic capable of handling common collection shapes such as:

- a direct array;
- GeoJSON `features`;
- a `places` collection;
- a `data` collection.

### Coordinates

The application attempts to obtain point coordinates from the selected place and lodging records. If coordinates cannot be obtained for a particular record, the application avoids performing an invalid Haversine calculation.

### Missing names and fields

The UI uses safe fallback values when place data is incomplete. This prevents a missing optional field from breaking the complete lodging analysis.

### Category fallback

The preferred category source is the current taxonomy primary field. Legacy category structures are treated as fallbacks rather than the primary source.

---

## Accessibility and Interaction

The Nearby Lodges list supports normal mouse interaction and keyboard selection.

Interactive lodge rows can be activated using:

- mouse click;
- keyboard `Enter`;
- keyboard `Space`.

The interface also provides visible states for loading, errors and empty lodging results so the user can distinguish between:

- analysis still running;
- an API/request problem;
- no lodging found within the selected radius.

---

## Troubleshooting

### `npm start` does not work

First confirm dependencies are installed:

```bash
npm install
```

Then retry:

```bash
npm start
```

If the port is occupied, stop the process using the port or allow Parcel to select another available port.

### Lodging analysis shows an error

Check:

1. Your internet connection.
2. Whether the Overture API is reachable.
3. Whether the configured API credential is valid.
4. Whether the selected place has usable latitude/longitude coordinates.
5. The browser developer console for the underlying request error.

### No lodging appears

A zero result does not necessarily mean there is no accommodation in the real world. It means the application did not receive usable matching L0 lodging records inside the requested radius.

Try increasing the radius.

### The nearest lodging looks farther away than expected

Remember that the application uses straight-line geographic distance rather than road distance. A map application using driving or walking directions can therefore report a longer route.

### A category displays as `Unknown category`

This generally means the returned record did not expose a usable primary category in the expected taxonomy fields. Inspect the API response to determine which taxonomy fields are available for that record.

---

## Customization Guide

### Change the default radius

In `src/index.html`, locate the lodging radius input and change its default `value`.

For example:

```html
<input
  class="lodging-radius-input"
  id="lodging-radius-input"
  type="number"
  value="1000"
  min="50"
  max="50000"
  step="50"
/>
```

### Change radius limits

The same input controls can be changed to establish a different minimum, maximum or increment.

The JavaScript should also be reviewed if those limits are duplicated in validation logic.

### Change the number of API records requested

The lodging API helper in `src/places-api.js` contains the default lodging result limit. Change it carefully because larger requests can increase response size and browser processing time.

### Change the New Primary Category formatting

The category display formatting is handled in `src/index.js`. This is the appropriate place to customize how taxonomy values such as underscore-separated identifiers are presented to users.

### Change the visual theme

Use `src/style.css`.

The stylesheet intentionally uses named classes and readable declarations rather than compressed/minified CSS, making visual customization straightforward.

### Replace images

The lodging-related images live under:

```text
src/images/
```

When replacing an image, keep the filename/path expected by the corresponding HTML or JavaScript reference unless you also update that reference.

---

## Technical Notes

### Why calculate the distance in the browser?

The API performs the initial geographic radius search, but the application also calculates distances client-side. This provides a consistent distance value for:

- the nearest-lodging insight;
- ordering the Nearby Lodges list;
- displaying the distance for a selected lodge;
- validating the returned records against the requested radius.

### Why use `taxonomy.primary`?

The requested lodging analysis is intended to understand the mix of specific lodging types around a selected place. A top-level `lodging` result alone does not provide that useful breakdown.

Using the taxonomy's primary category allows the application to answer questions such as:

- How many different lodging types are nearby?
- Which lodging type is most common?
- What percentage of nearby lodging belongs to each type?

### Performance considerations

Large radii can return many lodging records. The application therefore:

- requests a bounded number of records;
- calculates distances in the browser;
- filters records outside the radius;
- renders the resulting nearby set rather than attempting to display unrelated records.

For very large datasets, a future version could add pagination, virtualization or server-side aggregation.

### Data quality considerations

The accuracy of the insights depends on the quality and completeness of the Overture place records returned by the API. The application calculates its metrics from the records it receives; it does not independently verify whether every real-world lodging establishment has been represented in the returned dataset.

---

## Future Improvements

Potential enhancements include:

- Interactive map showing the selected place and nearby lodging.
- Map markers for each Nearby Lodge.
- Distance rings matching the selected radius.
- Sorting and filtering the Nearby Lodges table.
- Search within the nearby lodging list.
- Pagination or virtual scrolling for very large result sets.
- Export of lodging insights to CSV or JSON.
- Comparison of multiple selected places.
- Historical lodging-density analysis.
- Server-side API proxying and credential protection.
- Cached lodging searches for repeated coordinates/radii.
- Walking/driving distance integration through a dedicated routing service.
- Charts for New Primary Category percentages.
- Mobile-first refinements for the Nearby Lodges two-panel layout.

---

## Credits

### Overture Maps

The project uses Overture Places data and taxonomy concepts for place and lodging discovery.

### Original project

This application evolved from **Overture Travel Manager**. The lodging functionality was added while retaining the original place-search workflow.

### Project direction

The application is now positioned as a lodging exploration and geographic insight tool rather than a simple place-category browser.

---

## Summary

Overture Lodging Explorer combines place discovery with proximity-based lodging intelligence.

The most important user journey is:

**Search → Click a place → See lodging insights → Explore nearby lodges → Inspect individual lodging details.**

The codebase keeps API access, analysis logic and presentation responsibilities reasonably separated, uses descriptive variable/function names, and includes comments around the lodging-specific calculations so future developers can extend the application without having to reverse-engineer the feature.

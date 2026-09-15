import Notiflix from 'notiflix';
import { findPlaces, findLodgingNearPlace } from './places-api.js';
import { findFlag } from './country-flag.js';


import Countries from './countries_sorted_alphabetical.json';


import accommodationCategories from './accomodationCategories.json';
import activeLifeCategories from './activeLife.json';
import artsAndEntertainmentCategories from './artsAndEntertainment.json';
import attractionsAndActivitiesCategories from './attractionsAndActivitiesCategories.json';
import automotiveCategories from './automotive.json';
import beautyAndSpaCategories from './beauty_and_spa.json';
import businessToBusinessCategories from './business_to_business.json';
import eatAndDrinkCategories from './eat_and_drink.json';
import educationCategories from './education.json';
import financialServiceCategories from './financial_service.json';
import healthAndMedicalCategories from './health_and_medical.json';
import homeServiceCategories from './home_service.json';
import massMediaCategories from './mass_media.json';
import petCategories from './pets.json';
import privateCorporationsCategories from './private_establishments_and_corporates.json';
import professionalServicesCategories from './professional_services.json';
import realEstateCategories from './real_estate.json';
import religiousOrganizationCategories from './religious_organization.json';
import retailCategories from './retail.json';
import publicServiceAndGovernmentCategories from './public_service_and_government.json';
import travelCategories from './travel.json';


const countryFlagImageWrapper = document.querySelector('.countryFlagWrapper');
const topCountryFlagImageWrapper = document.querySelector('.topCountryFlagWrapper');
const accommodationSelector = document.querySelector('.accomodation-select');
const activeLifeSelector = document.querySelector('.activeLife-select');
const artsAndEntertainmentSelector = document.querySelector('.artsAndEntertainment-select');
const attractionsAndActivitiesSelector = document.querySelector('.attractionsAndActivities-select');
const automotiveSelector = document.querySelector('.automotive-select');
const beautyAndSpaSelector = document.querySelector('.beautyAndSpa-select');
const businessToBusinessSelector = document.querySelector('.businessToBusiness-select');
const eatAndDrinkSelector = document.querySelector('.eatAndDrink-select');
const educationSelector = document.querySelector('.education-select');
const financialServiceSelector = document.querySelector('.financialService-select');
const healthAndMedicalSelector = document.querySelector('.healthAndMedical-select');
const homeServiceSelector = document.querySelector('.homeService-select');
const massMediaSelector = document.querySelector('.massMedia-select');
const petSelector = document.querySelector('.pet-select');
const privateCorporationsSelector = document.querySelector('.privateCorporations-select');
const professionalServicesSelector = document.querySelector('.professionalServices-select');
const realEstateSelector = document.querySelector('.realEstate-select');
const religiousOrganizationSelector = document.querySelector('.religiousOrganization-select');
const retailSelector = document.querySelector('.retail-select');
const publicServiceAndGovernmentSelector = document.querySelector('.publicServiceAndGovernment-select');
const travelSelector = document.querySelector('.travel-select');
const countrySelector = document.querySelector('.country-select');





  function renderCategoryOptions(selector, categories, categoryName) {
    //selector.innerHTML = '';

    const placeholder = document.createElement('option');
    //const navLink = document.createElement('a');
    //navLink.setAttribute('href', '#placeInfo');
    placeholder.setAttribute('disabled', '');
    placeholder.setAttribute('selected', 'selected');
    placeholder.setAttribute('value', '');
    placeholder.textContent = categoryName;
    placeholder.style.fontWeight = 'bold';
    selector.append(placeholder);

    categories.forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('value', category.value);
      option.textContent = category.label;
      option.style.fontWeight = '700';
      selector.append(option);
    });
}

  function renderCountryOptions(selector, countries, Instruction) {
     //selector.innerHTML = '';

     const placeholder = document.createElement('option');
     placeholder.setAttribute('disabled', '');
     placeholder.setAttribute('selected', 'selected');
     placeholder.setAttribute('value', '');
     placeholder.textContent = Instruction;
     placeholder.style.fontWeight = 'bold';
     selector.append(placeholder);

     countries.forEach(country => {
       const option = document.createElement('option');
       option.setAttribute('value', country.alpha_2);
       option.textContent = country.name;
       option.style.fontWeight = '700';
       selector.append(option);
     });
}
   
renderCountryOptions(countrySelector, Countries, "Choose a country" );

renderCategoryOptions(accommodationSelector, accommodationCategories, "Accomodation");
renderCategoryOptions(activeLifeSelector, activeLifeCategories, 'Active Life');
renderCategoryOptions(artsAndEntertainmentSelector, artsAndEntertainmentCategories, 'Arts and Entertainment');
renderCategoryOptions(attractionsAndActivitiesSelector, attractionsAndActivitiesCategories, 'Attraction and Activities');
renderCategoryOptions(automotiveSelector, automotiveCategories, 'Automotive');
renderCategoryOptions(beautyAndSpaSelector, beautyAndSpaCategories, 'Beauty and Spa');
renderCategoryOptions(businessToBusinessSelector, businessToBusinessCategories, 'Business To Business');
renderCategoryOptions(eatAndDrinkSelector, eatAndDrinkCategories, 'Eat and Drink');
renderCategoryOptions(educationSelector, educationCategories, 'Education');
renderCategoryOptions(financialServiceSelector, financialServiceCategories, 'Financial Services');
renderCategoryOptions(healthAndMedicalSelector, healthAndMedicalCategories, 'Health and Medical');
renderCategoryOptions(homeServiceSelector, homeServiceCategories, 'Home Services');
renderCategoryOptions(massMediaSelector, massMediaCategories, 'Mass Media');
renderCategoryOptions(petSelector, petCategories, 'Pet');
renderCategoryOptions(privateCorporationsSelector, privateCorporationsCategories, 'Private Corporations');
renderCategoryOptions(professionalServicesSelector, professionalServicesCategories, 'Professional Services');
renderCategoryOptions(publicServiceAndGovernmentSelector, publicServiceAndGovernmentCategories, 'Public/Government Services');
renderCategoryOptions(realEstateSelector, realEstateCategories, 'Real Estate');
renderCategoryOptions(religiousOrganizationSelector, religiousOrganizationCategories, 'Religious Organizations');
renderCategoryOptions(retailSelector, retailCategories, 'Retail');
renderCategoryOptions(travelSelector, travelCategories, 'Travel');







const altLink = document.querySelector('.place-alt-link');
const detailsArea = document.querySelector('.place-details');

const placeArea = document.createElement('div');
const placeTable = document.createElement('table');
const placeTableHead = document.createElement('thead');
placeTableHead.innerHTML = `<tr>
<th class="place-results-heading"><h3>Place Name</h3></th>
<th class="place-results-heading"><h3>Social Link</h3></th>
</tr>`;
const placeTableBody = document.createElement('tbody');
const placeDetails = document.createElement('div');

placeArea.style.display = 'none';
placeArea.style.width = '100%';
placeArea.style.height = '100%';

placeTable.style.display = 'none';
placeDetails.style.display = 'none';


const placeInnerContr = document.querySelector('.place-table-wrapper');

placeInnerContr.append(placeArea);
placeArea.append(placeTable);
placeTable.append(placeTableHead);
placeTable.append(placeTableBody);
placeArea.append(placeDetails);

placeDetails.innerHTML = `
  <div class="place-details-placeholder">Click on a Place Name</div>
`;



let selectedCountry = null;

let placesArray;



// -----------------------------------------------------------------------------
// OVERTURE LODGING EXPLORER
// -----------------------------------------------------------------------------
// The following helpers power the new feature without changing the original
// Travel Manager search flow.
//
// Important terminology:
// - "L0 lodging" means the top-level `lodging` group from the February 2026
//   Overture taxonomy supplied with this project.
// - "New Primary Category" means the most specific primary category in the
//   new Overture taxonomy, normally available at:
//       place.properties.taxonomy.primary
// - We calculate percentages from the lodging records returned for the
//   selected radius. The percentage denominator is therefore the total number
//   of nearby lodging records returned by Overture.

const lodgingRadiusInput = document.querySelector('.lodging-radius-input');
const analyzeLodgingButton = document.querySelector('.analyze-lodging-button');
const lodgingAnalysisStatus = document.querySelector('.lodging-analysis-status');
const nearbyLodgesTableBody = document.querySelector('.nearby-lodges-table-body');
const nearbyLodgesCount = document.querySelector('.nearby-lodges-count');
const nearbyLodgeDetailPanel = document.querySelector('.nearby-lodge-detail-panel');

let selectedPlaceForLodgingAnalysis = null;

/**
 * Safely get the coordinates from an Overture Place.
 *
 * The API returns point geometry. We support the normal GeoJSON-style
 * `geometry.coordinates` shape and a few defensive fallbacks so the UI does
 * not break if a response uses a slightly different representation.
 */
function getPlaceCoordinates(place) {
  const coordinates = place?.geometry?.coordinates;

  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    const longitude = Number(coordinates[0]);
    const latitude = Number(coordinates[1]);

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      return { latitude, longitude };
    }
  }

  // Some responses may expose latitude/longitude directly.
  const latitude = Number(
    place?.geometry?.latitude ??
      place?.latitude ??
      place?.properties?.latitude
  );
  const longitude = Number(
    place?.geometry?.longitude ??
      place?.longitude ??
      place?.properties?.longitude
  );

  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return { latitude, longitude };
  }

  return null;
}

/**
 * Convert a snake_case Overture category into a readable label.
 *
 * Example:
 *   "bed_and_breakfast" -> "Bed And Breakfast"
 */
function formatLodgingCategory(category) {
  if (!category) {
    return 'Unknown';
  }

  return String(category)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase());
}

/**
 * Get the New Primary Category from the new Overture taxonomy.
 *
 * The February 2026 taxonomy PDF describes `New Primary Category` as the
 * category column beneath the new hierarchy. Overture's current Places
 * response represents that primary taxonomy category as
 * `properties.taxonomy.primary`.
 *
 * The old `categories.primary` field is retained only as a compatibility
 * fallback for older API responses.
 */
function getNewPrimaryCategory(place) {
  return (
    place?.properties?.taxonomy?.primary ??
    place?.taxonomy?.primary ??
    place?.properties?.categories?.primary ??
    place?.categories?.primary ??
    'unknown'
  );
}

/**
 * Haversine distance between two geographic points, returned in metres.
 *
 * This gives us a transparent client-side distance check in addition to the
 * API's radius filter. It is also useful for showing "nearest lodging" in the
 * insights panel.
 */
function calculateDistanceInMeters(
  firstLatitude,
  firstLongitude,
  secondLatitude,
  secondLongitude
) {
  const earthRadiusInMeters = 6371000;
  const latitudeDifference =
    ((secondLatitude - firstLatitude) * Math.PI) / 180;
  const longitudeDifference =
    ((secondLongitude - firstLongitude) * Math.PI) / 180;

  const firstLatitudeInRadians = (firstLatitude * Math.PI) / 180;
  const secondLatitudeInRadians = (secondLatitude * Math.PI) / 180;

  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitudeInRadians) *
      Math.cos(secondLatitudeInRadians) *
      Math.sin(longitudeDifference / 2) ** 2;

  return (
    2 *
    earthRadiusInMeters *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

/**
 * Normalise different possible Overture response shapes into an array.
 */
function getPlacesFromResponse(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.features)) {
    return responseData.features;
  }

  if (Array.isArray(responseData?.places)) {
    return responseData.places;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
}

/**
 * Build the complete lodging insight model for one clicked Travel Manager
 * place.
 *
 * The returned object is deliberately plain and readable. Keeping the
 * calculation separate from the DOM rendering makes the feature much easier
 * to test and maintain.
 */
function buildLodgingInsights(lodgingPlaces, selectedPlace) {
  const selectedCoordinates = getPlaceCoordinates(selectedPlace);

  const nearbyLodging = lodgingPlaces
    .map(lodgingPlace => {
      const lodgingCoordinates = getPlaceCoordinates(lodgingPlace);

      if (!selectedCoordinates || !lodgingCoordinates) {
        return {
          place: lodgingPlace,
          distanceInMeters: null,
          category: getNewPrimaryCategory(lodgingPlace),
        };
      }

      return {
        place: lodgingPlace,
        distanceInMeters: calculateDistanceInMeters(
          selectedCoordinates.latitude,
          selectedCoordinates.longitude,
          lodgingCoordinates.latitude,
          lodgingCoordinates.longitude
        ),
        category: getNewPrimaryCategory(lodgingPlace),
      };
    })
    .filter(item => {
      // If coordinates are available, enforce the radius again client-side.
      // This prevents an unexpectedly broad API response from contaminating
      // the statistics.
      if (item.distanceInMeters === null) {
        return true;
      }

      return item.distanceInMeters <= Number(lodgingRadiusInput.value);
    })
    .sort((first, second) => {
      if (first.distanceInMeters === null) return 1;
      if (second.distanceInMeters === null) return -1;
      return first.distanceInMeters - second.distanceInMeters;
    });

  const categoryCounts = new Map();

  nearbyLodging.forEach(item => {
    categoryCounts.set(
      item.category,
      (categoryCounts.get(item.category) || 0) + 1
    );
  });

  const totalLodgingPlaces = nearbyLodging.length;

  const categoryBreakdown = Array.from(categoryCounts.entries())
    .map(([category, count]) => ({
      category,
      displayName: formatLodgingCategory(category),
      count,
      percentage:
        totalLodgingPlaces === 0 ? 0 : (count / totalLodgingPlaces) * 100,
    }))
    .sort((first, second) => second.count - first.count);

  const distances = nearbyLodging
    .map(item => item.distanceInMeters)
    .filter(Number.isFinite)
    .sort((first, second) => first - second);

  return {
    totalLodgingPlaces,
    categoryBreakdown,
    nearestLodgingDistance: distances.length > 0 ? distances[0] : null,
    lodgingPlaces: nearbyLodging,
  };
}

/**
 * Render the lodging analysis into the clicked-place panel.
 */
function renderNearbyLodgeDetail(lodgingItem) {
  const lodge = lodgingItem.place;
  const address = lodge?.properties?.addresses?.[0] ?? {};
  const lodgeName = lodge?.properties?.names?.primary ?? 'Unknown';
  const lodgeCategory = formatLodgingCategory(lodgingItem.category);
  const distance = Number.isFinite(lodgingItem.distanceInMeters)
    ? `${Math.round(lodgingItem.distanceInMeters).toLocaleString()} m`
    : 'Unavailable';

  nearbyLodgeDetailPanel.innerHTML = `
    <div class="nearby-lodge-detail-content">
      <div class="nearby-lodge-detail-heading">
        <span class="lodging-analysis-kicker">SELECTED NEARBY LODGE</span>
        <h3>${lodgeName}</h3>
      </div>

      <table class="nearby-lodge-detail-table">
        <tbody>
          <tr>
            <th>Place Name</th>
            <td>${lodgeName}</td>
          </tr>
          <tr>
            <th>Distance from selected place</th>
            <td>${distance}</td>
          </tr>
          <tr>
            <th>New Primary Category</th>
            <td>${lodgeCategory}</td>
          </tr>
          <tr>
            <th>Freeform</th>
            <td>${address.freeform ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Locality</th>
            <td>${address.locality ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Postal Code</th>
            <td>${address.postcode ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Region</th>
            <td>${address.region ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>${address.country ?? 'Unknown'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Render every lodging place in the left-hand Nearby Lodges table.
 *
 * Each row stores its index in the `nearbyLodging` array. That keeps the
 * click handler simple and avoids putting a large Overture object in HTML.
 */
function renderNearbyLodgesTable(lodgingPlaces) {
  nearbyLodgesCount.textContent = `${lodgingPlaces.length.toLocaleString()} ${
    lodgingPlaces.length === 1 ? 'place' : 'places'
  }`;

  if (lodgingPlaces.length === 0) {
    nearbyLodgesTableBody.innerHTML = `
      <tr>
        <td colspan="3" class="nearby-lodges-empty">
          No lodging places were found within this radius.
        </td>
      </tr>
    `;
    nearbyLodgeDetailPanel.innerHTML = `
      <div class="nearby-lodge-detail-placeholder">
        <span class="lodging-analysis-kicker">LODGE DETAILS</span>
        <h3>No nearby lodge found</h3>
        <p>Try increasing the radius to find more lodging places.</p>
      </div>
    `;
    return;
  }

  nearbyLodgesTableBody.innerHTML = lodgingPlaces
    .map((lodgingItem, index) => {
      const lodgeName =
        lodgingItem.place?.properties?.names?.primary ?? 'Unknown';
      const category = formatLodgingCategory(lodgingItem.category);
      const distance = Number.isFinite(lodgingItem.distanceInMeters)
        ? `${Math.round(lodgingItem.distanceInMeters).toLocaleString()} m`
        : 'Unavailable';

      return `
        <tr class="nearby-lodge-row" data-lodging-index="${index}" tabindex="0">
          <td>${lodgeName}</td>
          <td>${distance}</td>
          <td>${category}</td>
        </tr>
      `;
    })
    .join('');

  const firstLodge = lodgingPlaces[0];
  renderNearbyLodgeDetail(firstLodge);

  nearbyLodgesTableBody
    .querySelectorAll('.nearby-lodge-row')
    .forEach(row => {
      const showLodgeDetails = () => {
        const lodgingIndex = Number(row.dataset.lodgingIndex);
        const selectedLodge = lodgingPlaces[lodgingIndex];

        if (!selectedLodge) {
          return;
        }

        nearbyLodgesTableBody
          .querySelectorAll('.nearby-lodge-row')
          .forEach(tableRow => tableRow.classList.remove('is-selected'));

        row.classList.add('is-selected');
        renderNearbyLodgeDetail(selectedLodge);
      };

      row.addEventListener('click', showLodgeDetails);
      row.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showLodgeDetails();
        }
      });
    });

  nearbyLodgesTableBody
    .querySelector('.nearby-lodge-row')
    ?.classList.add('is-selected');
}

/**
 * Render the summary insights and the New Primary Category mix.
 */
function renderLodgingInsights(insights, radiusInMeters) {
  const categoryRows =
    insights.categoryBreakdown.length > 0
      ? insights.categoryBreakdown
          .map(
            category => `
              <tr>
                <td class="lodging-category-name">${category.displayName}</td>
                <td>${category.count}</td>
                <td>${category.percentage.toFixed(1)}%</td>
              </tr>
            `
          )
          .join('')
      : `
          <tr>
            <td colspan="3" class="lodging-empty-cell">
              No lodging places were returned within this radius.
            </td>
          </tr>
        `;

  const topCategory = insights.categoryBreakdown[0];

  lodgingAnalysisStatus.innerHTML = `
    <div class="lodging-analysis-header">
      <div>
        <p class="lodging-analysis-kicker">L0 LODGING INSIGHTS</p>
        <h3>Nearby lodging around this place</h3>
        <p>
          Radius: <strong>${Number(radiusInMeters).toLocaleString()} m</strong>
        </p>
      </div>
      <div class="lodging-total-badge">
        <strong>${insights.totalLodgingPlaces}</strong>
        <span>lodging places</span>
      </div>
    </div>

    <div class="lodging-insight-cards">
      <article class="lodging-insight-card">
        <span>Nearby lodging</span>
        <strong>${insights.totalLodgingPlaces}</strong>
      </article>

      <article class="lodging-insight-card">
        <span>Primary types</span>
        <strong>${insights.categoryBreakdown.length}</strong>
      </article>

      <article class="lodging-insight-card">
        <span>Nearest lodging</span>
        <strong>
          ${
            insights.nearestLodgingDistance === null
              ? '—'
              : `${Math.round(insights.nearestLodgingDistance).toLocaleString()} m`
          }
        </strong>
      </article>
    </div>

    <div class="lodging-top-insight">
      ${
        topCategory
          ? `<strong>${topCategory.displayName}</strong> is the most common
             New Primary Category nearby, representing
             <strong>${topCategory.percentage.toFixed(1)}%</strong>
             (${topCategory.count} of ${insights.totalLodgingPlaces}).`
          : 'There is not enough nearby lodging data to identify a dominant category.'
      }
    </div>

    <div class="lodging-breakdown-wrapper">
      <div class="lodging-breakdown-heading">
        <h4>New Primary Category mix</h4>
        <span>Count + percentage of nearby L0 lodging</span>
      </div>

      <div class="lodging-table-scroll">
        <table class="lodging-breakdown-table">
          <thead>
            <tr>
              <th>New Primary Category</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            ${categoryRows}
          </tbody>
        </table>
      </div>

      <a class="nearby-lodges-link" href="#nearbyLodges">
        Explore all Nearby Lodges →
      </a>
    </div>
  `;

  renderNearbyLodgesTable(insights.lodgingPlaces);
}

/**
 * Fetch and analyse L0 lodging for the currently selected place.
 */
async function analyzeLodgingAroundSelectedPlace() {
  if (!selectedPlaceForLodgingAnalysis) {
    Notiflix.Notify.warning('Click a place first.');
    return;
  }

  const radiusInMeters = Number(lodgingRadiusInput.value);

  if (!Number.isFinite(radiusInMeters) || radiusInMeters < 50) {
    Notiflix.Notify.warning('Enter a radius of at least 50 metres.');
    return;
  }

  const coordinates = getPlaceCoordinates(selectedPlaceForLodgingAnalysis);

  if (!coordinates) {
    lodgingAnalysisStatus.innerHTML = `
      <div class="lodging-analysis-error">
        <strong>Location coordinates are unavailable.</strong>
        <p>
          Overture did not provide coordinates for this selected place, so
          nearby lodging cannot be calculated.
        </p>
      </div>
    `;
    return;
  }

  lodgingAnalysisStatus.innerHTML = `
    <div class="lodging-analysis-loading">
      Searching Overture L0 lodging within
      <strong>${radiusInMeters.toLocaleString()} m</strong>...
    </div>
  `;

  analyzeLodgingButton.disabled = true;

  try {
    const response = await findLodgingNearPlace(
      coordinates.latitude,
      coordinates.longitude,
      radiusInMeters
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const lodgingPlaces = getPlacesFromResponse(responseData);

    const insights = buildLodgingInsights(
      lodgingPlaces,
      selectedPlaceForLodgingAnalysis
    );

    renderLodgingInsights(insights, radiusInMeters);
  } catch (error) {
    lodgingAnalysisStatus.innerHTML = `
      <div class="lodging-analysis-error">
        <strong>Unable to retrieve nearby lodging.</strong>
        <p>
          Check your network/API access and try the analysis again.
        </p>
      </div>
    `;

    Notiflix.Notify.failure('Could not load nearby lodging.');
    console.error('Lodging analysis error:', error);
  } finally {
    analyzeLodgingButton.disabled = false;
  }
}

analyzeLodgingButton.addEventListener('click', analyzeLodgingAroundSelectedPlace);

// Expose the original place-click handler globally because the existing table
// markup calls it through onclick="selectPlace(event)".
window.selectPlace = event => {
  const id = event.currentTarget.getAttribute('data-id');

  selectedPlaceForLodgingAnalysis = placesArray.find(place => place.id === id);

  const selectedPlace = selectedPlaceForLodgingAnalysis;
  const selectedCountryDetails = Countries.find(
    country => country.alpha_2 === selectedCountry
  );

  const placeCoordinates = getPlaceCoordinates(selectedPlace);
  const primaryCategory = getNewPrimaryCategory(selectedPlace);
  const address = selectedPlace?.properties?.addresses?.[0] ?? {};

  placeDetails.innerHTML = `
    <div class="selected-place-panel">
      <div class="selected-place-summary">
        <div class="selected-place-heading">
          <span class="selected-place-eyebrow">SELECTED PLACE</span>
          <h3>${selectedPlace?.properties?.names?.primary ?? 'Unknown'}</h3>
        </div>

        <table class="selected-place-table">
          <tr>
            <th>Category</th>
            <td>${formatLodgingCategory(primaryCategory)}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>${address.freeform ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Locality</th>
            <td>${address.locality ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Region</th>
            <td>${address.region ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Postal Code</th>
            <td>${address.postcode ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>${selectedCountryDetails?.name ?? address.country ?? 'Unknown'}</td>
          </tr>
          <tr>
            <th>Coordinates</th>
            <td>
              ${
                placeCoordinates
                  ? `${placeCoordinates.latitude.toFixed(6)}, ${placeCoordinates.longitude.toFixed(6)}`
                  : 'Unavailable'
              }
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;

  // Move the user directly to the insights area after clicking a place name.
  // The flag remains above the place list, while the analysis becomes the
  // immediate destination of the click.
  lodgingAnalysisStatus.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  analyzeLodgingAroundSelectedPlace();
};


countrySelector.addEventListener('change', event => {
  countryDogBreeds = [];

  countryCatBreeds = [];

  countryDogBreedsElement = [];

  countryCatBreedsElement = [];

  allPetBreeds = [];
  //const countryName = Countries.find((country) => {return event.target.value === country.alpha_2});
  selectedCountry = event.target.value;
  window.selectedCountryCode = selectedCountry;
  //console.log(selectedCountry);
  countryFlagImageWrapper.style.display = 'block';
  topCountryFlagImageWrapper.style.display = 'block';
  placeTable.style.display = 'none';
  placeDetails.style.display = 'none';
  placeArea.style.display = 'none';
  altLink.style.display = 'block';
  detailsArea.style.height = '500px';
  placeInnerContr.style.alignItems = "center";
  placeInnerContr.style.justifyContent = 'center';
  placeDetails.innerHTML = `
  <div class="place-details-placeholder">Click on a Place Name</div>
`;
  
   Notiflix.Loading.hourglass('Fetching country Information...', {
     svgColor: '#FFD369',
     fontFamily: 'DM Sans',
   });
  findFlag(selectedCountry)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(res => {
      
      //console.log(res);
      countryFlag = res;
      countryFlagImageWrapper.innerHTML = `<img src="${countryFlag.rectangle_image_url}" alt='Country flag' style="height: 200px">`;
      topCountryFlagImageWrapper.innerHTML = `<img src="${countryFlag.rectangle_image_url}" alt='Country flag' style="height: 200px">`;
      Notiflix.Notify.success('Country Information retreived');
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Cannot find info on Country'
      );
      event.target.value="";
      console.error(`Error message ${error}`);
    });

     
       
     })

   
  

function categoryEventListener(selector) {
  
  selector.addEventListener('change', event => {
    if (selectedCountry === null) {
      Notiflix.Notify.failure('Choose a country first');
      event.target.value = '';
      return;
    }
    detailsArea.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // A new category search creates a new list of selectable places.
    // Clear the previous lodging analysis so it cannot be mistaken for the
    // newly loaded category.
    selectedPlaceForLodgingAnalysis = null;
    lodgingAnalysisStatus.innerHTML = `
      <div class="lodging-analysis-placeholder">
        Select a place from the new results to analyze nearby L0 lodging.
      </div>
    `;
    nearbyLodgesCount.textContent = '0 places';
    nearbyLodgesTableBody.innerHTML = `
      <tr>
        <td colspan="3" class="nearby-lodges-empty">
          Select a place above to load nearby lodging.
        </td>
      </tr>
    `;
    nearbyLodgeDetailPanel.innerHTML = `
      <div class="nearby-lodge-detail-placeholder">
        <span class="lodging-analysis-kicker">LODGE DETAILS</span>
        <h3>Select a nearby lodge</h3>
        <p>The selected lodge's Overture details will appear here.</p>
      </div>
    `;

  
    Notiflix.Loading.hourglass('Loading data, please wait...', {
      svgColor: '#FFD369',
      fontFamily: 'DM Sans',
    });
    findPlaces(event.target.value, selectedCountry)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        placesArray = res;
    Notiflix.Loading.remove();
        //console.log(res);
        placeArea.style.display = 'flex';
    altLink.style.display = 'none';
    detailsArea.style.height = "fit-content";
    placeTable.style.display = 'block';
        placeTable.className = 'place-results-table';
        placeArea.className = 'place-results-area';
        placeDetails.className = 'place-results-detail';
        placeDetails.style.display = 'block';
        event.target.value = '';
        //placeDetails.innerHTML = placeDetailsElements;
        
        
    const foundPlaces = res.map(place => {
      const placeName = place?.properties?.names?.primary ?? 'Unknown';
      const socialLink = place?.properties?.socials?.[0];

      return `
        <tr>
          <td
            class="place-results-name"
            data-id="${place.id}"
            onclick="selectPlace(event)"
          >
            ${placeName}
          </td>
          <td class="place-results-social">
            ${
              socialLink
                ? `<a href="${socialLink}" target="_blank" rel="noopener noreferrer">CLICK HERE</a>`
                : '—'
            }
          </td>
        </tr>
      `;
    }).join('');
    if (foundPlaces.length !== 0) {
      placeTableBody.innerHTML = foundPlaces;

      
    }
    else {
      placeTableBody.innerHTML = `<tr>
        <td colspan="2" class="place-results-empty">No places found.</td>
      </tr>`;
    }
  })
      .catch(error => {
        //loaderMsg.classList.add('hide');
        //errorMsg.classList.remove('hide');
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        event.target.value = '';
        console.error(`Error message ${error}`);
      });
  });
}





categoryEventListener(accommodationSelector);
categoryEventListener(activeLifeSelector);
categoryEventListener(artsAndEntertainmentSelector);
categoryEventListener(attractionsAndActivitiesSelector);
categoryEventListener(automotiveSelector);
categoryEventListener(beautyAndSpaSelector);
categoryEventListener(businessToBusinessSelector);
categoryEventListener(eatAndDrinkSelector);
categoryEventListener(educationSelector);
categoryEventListener(financialServiceSelector);
categoryEventListener(healthAndMedicalSelector);
categoryEventListener(homeServiceSelector);
categoryEventListener(massMediaSelector);
categoryEventListener(petSelector);
categoryEventListener(privateCorporationsSelector);
categoryEventListener(professionalServicesSelector);
categoryEventListener(publicServiceAndGovernmentSelector);
categoryEventListener(realEstateSelector);
categoryEventListener(religiousOrganizationSelector);
categoryEventListener(retailSelector);
categoryEventListener(travelSelector);

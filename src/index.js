import Notiflix from 'notiflix';
import { findPlaces } from './places-api.js';
import { createApiKey } from './theauthapi.js';
import { getImages } from './images-api.js';
import { findFlag } from './country-flag.js';
import { findInfo } from './country-info.js';
import { fetchCatBreeds } from './cat-api.js';
import { fetchDogBreeds } from './dog-api.js';

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
import Countries from './countries_sorted_alphabetical.json';


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
<th style="color: #0F4C75; text-align: center; border: 1px solid #ffff; font-weight: 700;"><h3>Place Name</h3></th>
<th style="color: #0F4C75; text-align: center; border: 1px solid #ffff; font-weight: 700;"><h3>Social Link</h3></th>
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

placeDetails.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height:100%;">
<div style="background-color: #49e2e6; color: #ffff; border: 1px solid #ffff; padding: 30px; border-radius: 10px; text-shadow: 3px 3px 20px #721111, 5px 5px 5px #000;">Click on a Place Name</div>
</div>`;


let dogBreeds;
let catBreeds;
let selectedPlace;

const apiGenTable = document.querySelector('.api-gen-table-wrapper');

const apiViewTable = document.querySelector('.api-view-table-wrapper');

const apiUseTable = document.querySelector('.api-use-table-wrapper');

apiUseTable.style.display = "none";


const keySideEffects = () => {
  if (JSON.parse(localStorage.getItem('myApiKey'))) {
    const keyDetails = JSON.parse(localStorage.getItem('myApiKey'));
    apiGenTable.style.display = 'none';

    const userLocale = navigator.language; // e.g., "en-US" or "fr-FR"
    const myDate = new Date(keyDetails.createdAt);

    const formatter = new Intl.DateTimeFormat(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // Optional: include seconds
      hour12: true, // Optional: use 12-hour clock (set to false for 24-hour clock)
    });
    const createdDate = formatter.format(myDate);

    apiViewTable.innerHTML = `
     <table class="api-view-table" style="border-collapse: collapse; background-color: #ffd369; border: 1px solid #ffff;">
              <caption style="color: rgb(15, 76, 117); font-family: Sacramento; background-color: #ffd369; font-size: 35px; border: 1px solid #ffff; font-weight: 700;">View your API Details</caption>
              <tr>
                <th style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff; font-weight: 700;">API KEY NAME:</th>
                <td style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff;">${keyDetails.name}</td>
              </tr>
              <tr>
                <th style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff; font-weight: 700;">API KEY:</th>
                <td style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff;">${keyDetails.key}</td>
              </tr>
              <tr>
                <th style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff; font-weight: 700;">CUSTOM ACCOUNT ID:</th>
                <td style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff;">${keyDetails.customAccountId}</td>
              </tr>

              <tr>
                <th style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff; font-weight: 700;">CUSTOM METADATA:</th>
                <td style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff;">${keyDetails.customMetaData.metadata_val}</td>
              </tr>

              <tr>
                <th style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff; font-weight: 700;">CREATED AT:</th>
                <td style="color: rgb(15, 76, 117); text-align: left; border: 1px solid #ffff;">${createdDate}</td>
              </tr>
            </table>
  `;
    
apiUseTable.style.display = 'flex';
  }
}

keySideEffects();

/*if (localStorage.getItem('hasKey') === null) {
  apiViewTable.style.display = 'none';
}*/

const keyName = document.querySelector('.keyName');
const keyId = document.querySelector('.keyId');
const keyMetaData = document.querySelector('.keyMetaData');

const apiGenTableButton = document.querySelector('.api-gen-table-wrapper-button');

const apiUseTableButton = document.querySelector(".api-use-table-wrapper-button");

const keyValue = document.querySelector('.keyValue');

const imageGallery = document.querySelector('.image-gallery');

const apiDetailsArea = document.querySelector('.api-details');

let selectedCountry = null;

let selectedCountryName = null;

let placesArray;

let myPlaceObj;

let countryFlag;

let countryDogBreeds;

let countryCatBreeds;

let countryDogBreedsElement;

let countryCatBreedsElement;

let allPetBreeds;

window.selectPlace = (event) => {
  
  const id = event.currentTarget.getAttribute('data-id');
  myPlaceObj = placesArray.find(place => place.id === id);
  const mySelectedCountry = Countries.find(country => country.alpha_2 === selectedCountry);
  //console.log(myPlaceObj);
  placeDetails.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; border-radius: 30px; border: 1px solid #0F4C75; padding: 20px; ">
                         
                         <div style="display: flex; flex-direction: column; gap:15px; align-items: center; ">
                         
                         <table style="border-collapse: collapse; width: 500px;">

                         <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Place Name:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">  ${
                          myPlaceObj?.properties?.names?.primary ?? 'Unknown'
                        }</td>
                        </tr>

                           <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Category:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          myPlaceObj.properties.addresses[0].freeform
                            ? myPlaceObj.properties.categories.primary
                            : 'Null'
                        }</td>
                        </tr>

                        <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Freeform:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          myPlaceObj.properties.addresses[0].freeform
                            ? myPlaceObj.properties.addresses[0].freeform
                            : 'Null'
                        }</td>
                        </tr>

                          <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Locality:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          myPlaceObj.properties.addresses[0].locality
                            ? myPlaceObj.properties.addresses[0].locality
                            : 'Null'
                        }</td>
                        </tr>

                         <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Postal Code:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          myPlaceObj.properties.addresses[0].postcode
                            ? myPlaceObj.properties.addresses[0].postcode
                            : 'Null'
                        }</td>
                        </tr>

                          <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Reigon:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          myPlaceObj.properties.addresses[0].region
                            ? myPlaceObj.properties.addresses[0].region
                            : 'Null'
                        }</td>
                        </tr>

                          <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Country:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          mySelectedCountry.name
                        }</td>
                        </tr>

                           <tr>
                        <th style="color: #0F4C75; text-align: left; border: 1px solid #ffff; font-weight: 700; width:120px;"><h3>Breeds:</h3></th>
                        <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;">${
                          allPetBreeds != 0 ? allPetBreeds.join(', ') : 'Null'
                        }</td>
                        </tr>

            

                         </table>
                         
                         
                         </div>

                      
                         </div>
                         </div>
                         </div>`;
}

countrySelector.addEventListener('change', event => {
  countryDogBreeds = [];

  countryCatBreeds = [];

  countryDogBreedsElement = [];

  countryCatBreedsElement = [];

  allPetBreeds = [];
  //const countryName = Countries.find((country) => {return event.target.value === country.alpha_2});
  selectedCountry = event.target.value;
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
  placeDetails.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height:100%;">
<div style="background-color: #49e2e6; color: #ffff; border: 1px solid #ffff; padding: 30px; border-radius: 10px; text-shadow: 3px 3px 20px #721111, 5px 5px 5px #000;">Click on a Place Name</div>
</div>`;
  Notiflix.Loading.hourglass('Fetching country Information...');
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

  
   fetchDogBreeds()
     .then(response => {
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       return response.json();
     })
     .then(users => {
       //Notiflix.Loading.remove();
       dogBreeds = users;
       //console.log(dogBreeds);

       countryDogBreeds = dogBreeds.filter(
         breed => breed.country_code === selectedCountry
       );

       countryDogBreedsElement = countryDogBreeds.map(breed => {
         return `<span>${breed.name}</span>`;
       });

       //console.log(countryDogBreedsElement.join(', '));

       /*countryBreeds = dogBreeds.filter(breed => {
         if (breed.country_code === selectedCountry) {
           console.log(breed.name);
           return;
         }*/
       //console.log(countryBreeds.name.join(','));
     })
     .catch(error => {
       Notiflix.Loading.remove();
       Notiflix.Notify.failure('Cannot find Dog Breeds!');

       console.error(`Error message ${error}`);
     });

     fetchCatBreeds()
       .then(response => {
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const str = response.json();
         //console.log(str);
         return str;
       })
       .then(users => {
         Notiflix.Loading.remove();
         catBreeds = users;
         //console.log(catBreeds);

         countryCatBreeds = catBreeds.filter(
           breed => breed.country_code === selectedCountry
         );

         countryCatBreedsElement = countryCatBreeds.map((breed) => {
           return `<span>${breed.name}</span>`;
         });

         //console.log(countryCatBreedsElement.join(', '));

         allPetBreeds = [...countryCatBreedsElement, ...countryDogBreedsElement];

         //console.log(allPetBreeds);
       })
       .catch(error => {
         Notiflix.Loading.remove();
         Notiflix.Notify.failure(
           'Cannot find Cat Breeds!'
         );

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
      block: 'start', // or 'center', 'end', 'nearest'
    });
    //console.log('click');
    Notiflix.Loading.hourglass('Loading data, please wait...');
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
        placeTable.style.borderCollapse = 'collapse';
        placeTable.style.border = '3px solid #ffff';
        placeTable.style.padding = '10px';
        placeTable.style.borderRadius = '10px';
        placeTable.style.backgroundColor = '#FFD369';
        placeTable.style.color = '#49e2e6';
        placeTable.style.color = '535px';
        placeArea.style.alignItems = 'start';
        placeArea.style.justifyContent = 'space-between';
        placeTable.style.height = '300px';
        placeTable.style.overflowX = 'auto';
        placeTable.style.overflowY = 'auto';
        placeTable.style.boxShadow = '0 4px 6px -1px #0000004d, 0 2px 4px -1px #0003, 0 10px 12px -6px #0006';
        placeDetails.style.display = 'block';
        placeDetails.style.width = '600px';
        placeDetails.style.height = '300px';
        placeDetails.style.overflowX = 'auto';
        placeDetails.style.overflowY = 'auto';
        placeDetails.style.borderRadius = '10px';
        placeDetails.style.border = '3px solid #ffff';
        placeDetails.style.backgroundColor = '#FFD369';
         placeDetails.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.4) 0px 10px 12px -6px';
        event.target.value = '';
        //placeDetails.innerHTML = placeDetailsElements;
        
        
    const foundPlaces = res.map((place) => {
      if (place.properties.socials[0]) {
        return `
      <tr>
                    <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff; max-width: 400px; cursor: pointer;" onmouseover="this.style.background='#49e2e6';"
  onmouseout="this.style.background='#FFD369';" data-id="${place.id}" onclick="selectPlace(event)">${place.properties.names.primary}</td>
  
                    <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;"><a href="${place.properties.socials[0]}" target='_blank'>CLICK HERE</a></td>
      </tr>
                  `;};
    }).join('');
    if (foundPlaces.length !== 0) {
      placeTableBody.innerHTML = foundPlaces;

      
    }
    else {
      placeTableBody.innerHTML = `<tr>
                                  <td style="color: #49e2e6; text-align: center; border: 1px solid #ffff;">Null</td>
                                  <td style="color: #49e2e6; text-align: center; border: 1px solid #ffff;">Null</td>
                                  </tr>
      `;
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

apiGenTableButton.addEventListener("click", async () => {
  if ((keyName.value.trim() === "" || keyId.value.trim() === "" || keyMetaData.value.trim() === "")) {
    Notiflix.Notify.warning('All feilds are required!');
    return
  }
  Notiflix.Loading.hourglass('Creating Api Key, please wait...');
  try {
    const key = await createApiKey(
      keyName.value.trim(),
      keyId.value.trim(),
      keyMetaData.value.trim()
    );
    localStorage.setItem('myApiKey', JSON.stringify(key));
    Notiflix.Loading.remove();
    Notiflix.Notify.success('API Key created and stored successfully!');
    keySideEffects();
  } catch (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Failed to create API Key');
    console.error('Error creating API key:', error);
  }
});


apiUseTableButton.addEventListener("click", async() => { 
  if (keyValue.value.trim() === "") {
   Notiflix.Notify.warning('Enter Api Key!');
   return;
  }
  Notiflix.Loading.hourglass('Getting Images, please wait...');
  
 try {
    const Images = await getImages(keyValue.value.trim());
    console.log('Images aquired:', Images);
   apiDetailsArea.style.height = "fit-content";
    const myImages = Images
      .map(Image => {
        return `
        <li style="width: 370px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #ffd369; color: rgb(15, 76, 117); padding: 10px; border: 1px solid #ffff; border-radius: 10px;"><img src=${Image.link} style="width: 300px; height: 300px; border: 1px solid #ffff;"/> 
        <span>${Image.name}</span></li>
        `;
      })
     .join('');
   
   imageGallery.style.border = '1px solid #ffff';
   imageGallery.style.padding = '20px';
   imageGallery.style.borderRadius = '20px';
   imageGallery.innerHTML = myImages;

    Notiflix.Loading.remove();
    Notiflix.Notify.success('View response in your browser console!');
  } catch (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Failed to get Images');
    console.error('Error getting Images:', error);
  }

});




  



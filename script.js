const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = []; 

// Unsplash API
const count = 30;
const apiKey = 'A8w76a9WHyUfNy7j7lp_sYRX6BzBukbrFjl3jZ1ygh0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to set Attriburtes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);1
  }
}

// create Elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular, 
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listerer, check when each is finished loading
    img.addEventListener('load', imageLoaded())
    // Put <img> inside <a>,  then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos(){
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error) {

  }
}

//Check to see if scrolling near bottom near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos();
  }
});

// on load

getPhotos();
const navItems = document.querySelectorAll(".nav-item");
const textBox = document.getElementById("text-box");
const imageBox = document.getElementById("image-box");
const aboutBox = document.getElementById("about-box");
const servicesBox = document.getElementById("services-box");
const landingVideo = document.getElementById("landing-video");


const collections = {
  logotypes: [
    "logo1.png", "logo2.png", "logo3.png", "logo4.png",
    "logo5.png", "logo6.png", "logo7.png", "logo8.png",
  ],
  "type-design": [
    "type1.png", "type2.png", "type3.png", "type4.png",
    "type5.png", "type6.png", "type7.png",
  ],
  posters: [
    "poster1.png", "poster2.png", "poster3.png", "poster4.png",
    "poster5.png", "poster6.png", "poster7.png", "poster8.png",
    "poster9.png", "poster10.png",
  ],
  photography: [
    "photo1.PNG", "photo2.PNG", "photo3.png", "photo4.png",
    "photo5.png", "photo6.JPG", "photo7.png", "photo8.JPEG",
    "photo9.PNG", "photo10.png", "photo11.PNG", "photo12.png",
    "photo13.png", "photo14.JPG", "photo15.JPEG", "photo16.png",
    "photo17.JPG", "photo18.png", "photo19.JPEG", "photo20.png",
  ],
  fashion: [
    "fashion1.PNG", "fashion2.PNG", "fashion3.PNG", "fashion4.PNG",
    "fashion5.PNG", "fashion6.PNG", "fashion7.PNG",
  ],
  melanQ: [
    "1.png", "2.png", "3.png", "4.png",
    "5.png", "6.png", "7.png", "8.png",
    "9.png", "10.png", "11.png", "12.png",
    "13.png", "14.png", "15.png", "16.png",
    "17.png", "18.png", "19.png", "20.png",
    "21.png", "22.png", "23.png", "24.png",
    "25.png", "26.png", "27.png", "28.png",
    "29.png", "30.png",
  ],
  about: [
    "about.PNG", "moodboard.PNG"
  ],
  contact: [
    "services.PNG",
  ],
};

const defaultBackground = {
  backgroundColor: "#1E1E1E",
  color: "white",
};

const whiteBackground = {
  backgroundColor: "white",
  color: "black",
};

// Initialize content boxes as hidden and show landing video
document.addEventListener('DOMContentLoaded', () => {
    [aboutBox, servicesBox, textBox, imageBox].forEach(box => {
        if (box) {
            box.style.display = 'none';
            box.classList.remove('visible');
        }
    });
    if (landingVideo) {
        landingVideo.classList.remove('hidden');
    }
});

// Handle nav-item clicks
navItems.forEach((nav) => {
  nav.addEventListener("click", () => {
    const section = nav.textContent.trim().toLowerCase();

    // Reset active states
    navItems.forEach((item) => item.classList.remove("active"));
    nav.classList.add("active");

    // Hide landing video when any section is selected
    if (landingVideo) {
        landingVideo.classList.add('hidden');
    }

    // Hide all boxes
    [aboutBox, servicesBox, textBox, imageBox].forEach(box => {
      if (box) {
        box.style.display = 'none';
        box.classList.remove('visible');
      }
    });

    // Show the appropriate section
    if (section === "about") {
      handleAbout();
    } else if (section === "services") {
      handleServices();
    } else if (section === "projects") {
      handleProjects();
    } else if (section === "collections") {
      handleCollections();
    }
  });
});

function handleAbout() {
  if (aboutBox) {
    aboutBox.style.display = "flex";
    aboutBox.classList.add("visible");
  }
}

function handleServices() {
  if (servicesBox) {
    servicesBox.style.display = "flex";
    servicesBox.classList.add("visible");
  }
}

function handleProjects() {
  if (textBox) {
    textBox.innerHTML = `
      <div class="collection-buttons">
        <button class="collection-button" data-collection="melanQ">MelanQ</button>
      </div>
    `;
    textBox.style.display = "flex";
    textBox.classList.add("visible");

    document.querySelectorAll(".collection-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const collectionName = btn.getAttribute("data-collection");

        textBox.style.display = "none";
        textBox.classList.remove("visible");

        if (imageBox) {
          imageBox.style.display = "grid";
          imageBox.classList.add("visible");
          imageBox.classList.add("projects-gallery");
          imageBox.style.backgroundColor = "white";
          imageBox.style.color = "black";

          imageBox.innerHTML = collections[collectionName]
            .map((image) => `<img src="images/${image}" alt="${collectionName} Image">`)
            .join("");
        }
      });
    });
  }
}

function handleCollections() {
  if (textBox) {
    textBox.innerHTML = `
      <div class="collection-buttons">
        <button class="collection-button" data-collection="logotypes">Logotypes</button>
        <button class="collection-button" data-collection="type-design">Type Design</button>
        <button class="collection-button" data-collection="posters">Posters</button>
        <button class="collection-button" data-collection="photography">Photography</button>
        <button class="collection-button" data-collection="fashion">Fashion</button>
      </div>
    `;
    textBox.style.display = "flex";
    textBox.classList.add("visible");

    document.querySelectorAll(".collection-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const collectionName = btn.getAttribute("data-collection");

        textBox.style.display = "none";
        textBox.classList.remove("visible");

        if (imageBox) {
          imageBox.style.display = "grid";
          imageBox.classList.add("visible");

          if (collectionName === "logotypes" || collectionName === "type-design") {
            imageBox.style.backgroundColor = "white";
            imageBox.style.color = "black";
          } else {
            imageBox.style.backgroundColor = defaultBackground.backgroundColor;
            imageBox.style.color = defaultBackground.color;
          }

          imageBox.innerHTML = collections[collectionName]
            .map((image) => `<img src="images/${image}" alt="${collectionName} Image">`)
            .join("");
        }
      });
    });
  }
}

function handleDefaultSection(section) {
  textBox.style.display = "flex";
  textBox.classList.remove("hidden");
  textBox.textContent = `${section.charAt(0).toUpperCase() + section.slice(1)} section content goes here.`;
}

// Handle footer item behavior
const footerItems = document.querySelectorAll(".footer-item");

footerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    const isActive = item.classList.contains("active");

    footerItems.forEach((footer) => {
      footer.classList.remove("active");
      if (footer.id == "footer-item-cotact") footer.textContent = "Contact";
    });

    if (!isActive) {
      item.classList.add("active");
      item.innerHTML = `
        Nick Rozhkovskyi<br>
        +420722059544<br>
        myk.rozhkvsk@gmail.com<br>
        Czech Republic, Prague city<br>
      `;
      imageBox.style.height = "200px";
    } else {
      item.textContent = "Contact";
      imageBox.style.height = "auto";
    }
  });
});

document.addEventListener("click", () => {
  footerItems.forEach((footer) => {
    footer.classList.remove("active");
    if (footer.id == "footer-item-cotact") footer.textContent = "Contact";
  });
  imageBox.style.height = "auto";
});












// const navItems = document.querySelectorAll(".nav-item");
// const textBox = document.getElementById("text-box");
// const imageBox = document.getElementById("image-box");

// const collections = {
//   logotypes: [
//     "logo1.png", "logo2.png", "logo3.png", "logo4.png", 
//     "logo5.png", "logo6.png", "logo7.png", "logo8.png", 
//   ],
//   "type-design": [
//     "type1.png", "type2.png", "type3.png", "type4.png", 
//     "type5.png", "type6.png", "type7.png",
//   ],
//   posters: [
//     "poster1.png","poster2.png","poster3.png","poster4.png",
//     "poster5.png","poster6.png","poster7.png","poster8.png",
//     "poster9.png","poster10.png",
//   ],
//   photography: [
//     "photo1.PNG", "photo2.PNG", "photo3.png", "photo4.png", 
// "photo5.png", "photo6.JPG", "photo7.png", "photo8.JPEG", 
// "photo9.PNG", "photo10.png", "photo11.PNG", "photo12.png", 
// "photo13.png", "photo14.JPG", "photo15.JPEG", "photo16.png", 
// "photo17.JPG", "photo18.png", "photo19.JPEG", "photo20.png"

//   ],
//   fashion: [
//     "fashion1.PNG", "fashion2.PNG", "fashion3.PNG", "fashion4.PNG",
//     "fashion5.PNG", "fashion6.PNG", "fashion7.PNG",
//   ]
// };

// collections.melanQ = [
//   "melanQ1.png", "melanQ2.png", "melanQ3.png", "melanQ4.png",
//   "melanQ5.png", "melanQ6.png", "melanQ7.png", "melanQ8.png"
// ];

// const defaultBackground = {
//   backgroundColor: "#1E1E1E",
//   color: "white",
// };

// const whiteBackground = {
//   backgroundColor: "white",
//   color: "black",
// };


// // Event listener for nav-items
// navItems.forEach((nav) => {
//   nav.addEventListener("click", () => {
//     const section = nav.textContent.trim().toLowerCase();

//     // Reset active states
//     navItems.forEach((item) => item.classList.remove("active"));
//     nav.classList.add("active");

//     if (section === "projects") {
//       // Add MelanQ button dynamically
//       textBox.innerHTML = `
//         <div class="collection-buttons">
//           <button class="collection-button" data-collection="melanQ">MelanQ</button>
//         </div>
//       `;
//       textBox.classList.remove("hidden");
//       imageBox.classList.add("hidden");
//       imageBox.innerHTML = ""; // Clear previous images
//       imageBox.style.backgroundColor = defaultBackground.backgroundColor;
//       imageBox.style.color = defaultBackground.color;

//       // Event listener for MelanQ button
//       document.querySelectorAll(".collection-button").forEach((btn) => {
//         btn.addEventListener("click", () => {
//           const collectionName = btn.getAttribute("data-collection");

//           // Show gallery for MelanQ
//           textBox.classList.add("hidden");
//           imageBox.classList.remove("hidden");

//           // Load images for MelanQ collection
//           imageBox.innerHTML = collections[collectionName]
//             .map((image) => `<img src="images/${image}" alt="${collectionName} Image">`)
//             .join("");
//         });
//       });
//     } else if (section === "collections") {
//       // Existing collections functionality
//       textBox.innerHTML = `
//         <div class="collection-buttons">
//           <button class="collection-button" data-collection="logotypes">Logotypes</button>
//           <button class="collection-button" data-collection="type-design">Type Design</button>
//           <button class="collection-button" data-collection="posters">Posters</button>
//           <button class="collection-button" data-collection="photography">Photography</button>
//           <button class="collection-button" data-collection="fashion">Fashion</button>
//         </div>
//       `;
//       textBox.classList.remove("hidden");
//       imageBox.classList.add("hidden");
//       imageBox.innerHTML = ""; // Clear previous images
//       imageBox.style.backgroundColor = defaultBackground.backgroundColor;
//       imageBox.style.color = defaultBackground.color;

//       // Collection buttons functionality
//       document.querySelectorAll(".collection-button").forEach((btn) => {
//         btn.addEventListener("click", () => {
//           const collectionName = btn.getAttribute("data-collection");

//           // Load selected collection
//           textBox.classList.add("hidden");
//           imageBox.classList.remove("hidden");

//           imageBox.innerHTML = collections[collectionName]
//             .map((image) => `<img src="images/${image}" alt="${collectionName} Image">`)
//             .join("");
//         });
//       });
//     } else {
//       // Non-collections sections
//       textBox.classList.remove("hidden");
//       imageBox.classList.add("hidden");
//       textBox.textContent = `${section.charAt(0).toUpperCase() + section.slice(1)} section content goes here.`;
//     }
//   });
// });














// navItems.forEach((nav) => {
//   nav.addEventListener("click", () => {
//     const section = nav.textContent.trim().toLowerCase();

//     // Reset active states
//     navItems.forEach((item) => item.classList.remove("active"));
//     nav.classList.add("active");

//     // Handle Collections Section
//     if (section === "collections") {
//       textBox.innerHTML = `
//         <div class="collection-buttons">
//           <button class="collection-button" data-collection="logotypes">Logotypes</button>
//           <button class="collection-button" data-collection="type-design">Type Design</button>
//           <button class="collection-button" data-collection="posters">Posters</button>
//           <button class="collection-button" data-collection="photography">Photography</button>
//           <button class="collection-button" data-collection="fashion">Fashion</button>
//         </div>
//       `;
//       textBox.classList.remove("hidden");
//       imageBox.classList.add("hidden");
//       imageBox.innerHTML = ""; // Clear previous images
//       imageBox.style.backgroundColor = defaultBackground.backgroundColor;
//       imageBox.style.color = defaultBackground.color;

//       // Add Event Listener for Collection Buttons
//       document.querySelectorAll(".collection-button").forEach((btn) => {
//         btn.addEventListener("click", () => {
//           const collectionName = btn.getAttribute("data-collection");

//           // Hide Button Box and Show Image Box
//           textBox.classList.add("hidden");
//           imageBox.classList.remove("hidden");

//           // Change Background for Specific Collections
//           if (collectionName === "logotypes" || collectionName === "type-design") {
//             imageBox.style.backgroundColor = whiteBackground.backgroundColor;
//             imageBox.style.color = whiteBackground.color;
//           } else {
//             imageBox.style.backgroundColor = defaultBackground.backgroundColor;
//             imageBox.style.color = defaultBackground.color;
//           }

//           // Load Images for the Selected Collection
//           imageBox.innerHTML = collections[collectionName]
//             .map((image) => `<img src="images/${image}" alt="${collectionName} Image">`)
//             .join("");
//         });
//       });
//     } else {
//       // Non-Collections Sections
//       textBox.classList.remove("hidden");
//       imageBox.classList.add("hidden");
//       textBox.textContent = `${section.charAt(0).toUpperCase() + section.slice(1)} section content goes here.`;
//     }
//   });
// });


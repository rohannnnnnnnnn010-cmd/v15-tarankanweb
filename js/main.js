document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

//   const forms = document.querySelectorAll('form[data-inquiry]');
//   forms.forEach(form => {
//     form.addEventListener('submit', e => {
//       e.preventDefault();
//       const status = form.querySelector('.form-status');
//       if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//       }
//       const data = Object.fromEntries(new FormData(form).entries());
//       console.log('Tarankan inquiry:', data);
//       if (status) {
//         status.textContent = 'Thank you. Your inquiry has been recorded on this demo site. Connect this form to your email/backend before launch.';
//         status.style.marginTop = '15px';
//       }
//       form.reset();
//     });
//   });

    const forms = document.querySelectorAll('form[data-inquiry]');

forms.forEach(form => {

    form.addEventListener('submit', async e => {

        e.preventDefault();

        const status = form.querySelector('.form-status');
        const submitButton = form.querySelector('button[type="submit"]');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }


        if (status) {
            status.textContent = 'Sending your inquiry...';
            status.style.marginTop = '15px';
        }


        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }


        const formData = new FormData(form);


        /*
         * Automatically tell PHP which page submitted
         * the inquiry.
         */
        formData.append(
            'source_page',
            window.location.pathname
        );


        try {

            const response = await fetch(
                'send-inquiry.php',
                {
                    method: 'POST',
                    body: formData
                }
            );


            const result = await response.json();


            if (!response.ok || !result.success) {

                throw new Error(
                    result.message ||
                    'Unable to send inquiry.'
                );
            }


            if (status) {
                status.textContent =
                    result.message;

                status.style.marginTop = '15px';
            }


            form.reset();


        } catch (error) {

            console.error(
                'Inquiry error:',
                error
            );


            if (status) {
                status.textContent =
                    error.message ||
                    'Something went wrong. Please try again.';

                status.style.marginTop = '15px';
            }

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Inquiry';
            }

        }

    });

});

  document.querySelectorAll('[data-reveal]').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, {threshold:.15});
    io.observe(el);
  });
});



/* =========================================
   EXPORT MARKETS - SCROLL MAP
   ========================================= */

// document.addEventListener("DOMContentLoaded", async function () {

//     const mapContainer = document.getElementById("marketsMapSvg");

//     if (!mapContainer) return;

//     try {

//         const response = await fetch("assets/markets/tarankan-world-map.svg");

//         if (!response.ok) {
//             throw new Error("Could not load world map SVG.");
//         }

//         const svgText = await response.text();

//         mapContainer.innerHTML = svgText;

//         const usa = mapContainer.querySelector("#market-usa");
//         const germany = mapContainer.querySelector("#market-germany");
//         const uae = mapContainer.querySelector("#market-uae");
//         const africa = mapContainer.querySelector("#market-africa");
//         const bangladesh = mapContainer.querySelector("#market-bangladesh");

//         const countries = [
//             {
//                 map: usa,
//                 label: document.querySelector(".market-label-usa")
//             },
//             {
//                 map: germany,
//                 label: document.querySelector(".market-label-germany")
//             },
//             {
//                 map: uae,
//                 label: document.querySelector(".market-label-uae")
//             },
//             {
//                 map: africa,
//                 label: document.querySelector(".market-label-africa")
//             },
//             {
//                 map: bangladesh,
//                 label: document.querySelector(".market-label-bangladesh")
//             }
//         ];

//         const section = document.querySelector(".markets-animation");

//         if (!section) return;

//         function updateMarkets() {

//             const rect = section.getBoundingClientRect();

//             const scrollableHeight =
//                 section.offsetHeight - window.innerHeight;

//             const progress =
//                 Math.min(
//                     Math.max(-rect.top / scrollableHeight, 0),
//                     1
//                 );

//             const totalCountries = countries.length;

//             /*
//              * Divide the scroll into 5 equal stages.
//              */
//             // const activeCount = Math.min(
//             //     Math.floor(progress * totalCountries) + 1,
//             //     totalCountries
//             // );
//             const activeCount = Math.floor(progress * totalCountries);

//             /*
//              * Keep all previous countries active.
//              */
//             countries.forEach(function (country, index) {

//                 const isActive = index < activeCount;

//                 if (country.map) {
//                     country.map.classList.toggle(
//                         "is-active",
//                         isActive
//                     );
//                 }

//                 if (country.label) {
//                     country.label.classList.toggle(
//                         "active",
//                         isActive
//                     );
//                 }

//             });
//         }

//         window.addEventListener(
//             "scroll",
//             updateMarkets,
//             { passive: true }
//         );

//         window.addEventListener(
//             "resize",
//             updateMarkets
//         );

//         updateMarkets();

//     } catch (error) {

//         console.error(
//             "Export market map could not be loaded:",
//             error
//         );

//     }

// });

/* =========================================
   EXPORT MARKETS - RESPONSIVE MAP
   ========================================= */

// document.addEventListener("DOMContentLoaded", async function () {

//     const mapContainer = document.getElementById("marketsMapSvg");

//     if (!mapContainer) return;

//     try {

//         /* -----------------------------------------
//            LOAD SVG
//            ----------------------------------------- */

//         const response = await fetch(
//             "assets/markets/tarankan-world-map.svg"
//         );

//         if (!response.ok) {
//             throw new Error("Could not load world map SVG.");
//         }

//         const svgText = await response.text();

//         mapContainer.innerHTML = svgText;


//         /* -----------------------------------------
//            COUNTRY ELEMENTS
//            ----------------------------------------- */

//         const countries = [
//             {
//                 id: "market-usa",
//                 label: document.querySelector(".market-label-usa")
//             },
//             {
//                 id: "market-germany",
//                 label: document.querySelector(".market-label-germany")
//             },
//             {
//                 id: "market-uae",
//                 label: document.querySelector(".market-label-uae")
//             },
//             {
//                 id: "market-africa",
//                 label: document.querySelector(".market-label-africa")
//             },
//             {
//                 id: "market-bangladesh",
//                 label: document.querySelector(".market-label-bangladesh")
//             }
//         ];


//         /* -----------------------------------------
//            GET ACTUAL SVG ELEMENTS
//            ----------------------------------------- */

//         countries.forEach(function (country) {

//             country.map =
//                 mapContainer.querySelector("#" + country.id);

//         });


//         /* -----------------------------------------
//            HELPERS
//            ----------------------------------------- */

//         function activateCountry(country) {

//             if (!country || !country.map) return;

//             country.map.classList.add("is-active");

//             if (country.label) {
//                 country.label.classList.add("active");
//             }
//         }


//         function deactivateCountry(country) {

//             if (!country || !country.map) return;

//             country.map.classList.remove("is-active");

//             if (country.label) {
//                 country.label.classList.remove("active");
//             }
//         }


//         function toggleCountry(country) {

//             if (!country || !country.map) return;

//             const active =
//                 country.map.classList.contains("is-active");

//             if (active) {
//                 deactivateCountry(country);
//             } else {
//                 activateCountry(country);
//             }
//         }


//         function clearAllCountries() {

//             countries.forEach(function (country) {
//                 deactivateCountry(country);
//             });

//         }


//         /* -----------------------------------------
//            DEVICE DETECTION
//            ----------------------------------------- */

//         const mouseQuery = window.matchMedia(
//             "(hover: hover) and (pointer: fine)"
//         );


//         /* -----------------------------------------
//            MOUSE / TRACKPAD MODE
//            ----------------------------------------- */

//         function enableMouseMode() {

//             countries.forEach(function (country) {

//                 if (!country.map) return;

//                 country.map.style.cursor = "pointer";


//                 country.map.addEventListener(
//                     "mouseenter",
//                     function () {

//                         /*
//                          * Only the country currently
//                          * under the mouse is active.
//                          */

//                         clearAllCountries();

//                         activateCountry(country);

//                     }
//                 );


//                 country.map.addEventListener(
//                     "mouseleave",
//                     function () {

//                         deactivateCountry(country);

//                     }
//                 );

//             });

//         }


//         /* -----------------------------------------
//            TOUCH / NO-MOUSE MODE
//            ----------------------------------------- */

//         function enableTouchMode() {

//             countries.forEach(function (country) {

//                 if (!country.map) return;

//                 country.map.style.cursor = "pointer";


//                 country.map.addEventListener(
//                     "click",
//                     function (event) {

//                         /*
//                          * Prevent accidental propagation.
//                          */

//                         event.preventDefault();

//                         /*
//                          * Tapping toggles this country.
//                          * Other countries stay active.
//                          */

//                         toggleCountry(country);

//                     }
//                 );

//             });


//             /* -----------------------------------------
//                FAST FIRST-ENTRY REVEAL
//                ----------------------------------------- */

//             const mapSection =
//                 document.querySelector(".markets-animation");

//             if (!mapSection) return;


//             let hasRevealed = false;


//             const observer =
//                 new IntersectionObserver(
//                     function (entries) {

//                         const entry = entries[0];

//                         if (
//                             !entry.isIntersecting ||
//                             hasRevealed
//                         ) {
//                             return;
//                         }

//                         hasRevealed = true;


//                         /*
//                          * Reveal quickly so the page
//                          * never feels stuck.
//                          */

//                         countries.forEach(
//                             function (country, index) {

//                                 setTimeout(
//                                     function () {

//                                         activateCountry(country);

//                                     },
//                                     index * 120
//                                 );

//                             }
//                         );


//                         observer.disconnect();

//                     },
//                     {
//                         threshold: 0.25
//                     }
//                 );


//             observer.observe(mapSection);

//         }


//         /* -----------------------------------------
//            START CORRECT MODE
//            ----------------------------------------- */

//         if (mouseQuery.matches) {

//             enableMouseMode();

//         } else {

//             enableTouchMode();

//         }


//         /* -----------------------------------------
//            HANDLE DEVICE / WINDOW CHANGES
//            ----------------------------------------- */

//         function handleDeviceChange() {

//             /*
//              * Reloading the page isn't necessary.
//              * Just clear the current state.
//              */

//             clearAllCountries();

//         }


//         if (mouseQuery.addEventListener) {

//             mouseQuery.addEventListener(
//                 "change",
//                 handleDeviceChange
//             );

//         } else {

//             mouseQuery.addListener(
//                 handleDeviceChange
//             );

//         }

//     } catch (error) {

//         console.error(
//             "Export market map error:",
//             error
//         );

//     }

// });

/* =========================================
   EXPORT MARKETS - SCROLL REVEAL
   ========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const mapContainer = document.getElementById("marketsMapSvg");

    if (!mapContainer) return;

    try {

        /* Load SVG */
        const response = await fetch(
            "assets/markets/tarankan-world-map.svg"
        );

        if (!response.ok) {
            throw new Error("Could not load world map SVG.");
        }

        const svgText = await response.text();

        mapContainer.innerHTML = svgText;

        


        /* Countries in reveal order */
        const countries = [
            {
                map: mapContainer.querySelector("#market-usa"),
                label: document.querySelector(".market-label-usa")
            },
            {
                map: mapContainer.querySelector("#market-brazil"),
                label: document.querySelector(".market-label-brazil")
            },
            {
                map: mapContainer.querySelector("#market-germany"),
                label: document.querySelector(".market-label-germany")
            },
            {
                map: mapContainer.querySelector("#market-uae"),
                label: document.querySelector(".market-label-uae")
            },
            {
                map: mapContainer.querySelector("#market-africa"),
                label: document.querySelector(".market-label-africa")
            },
            {
                map: mapContainer.querySelector("#market-bangladesh"),
                label: document.querySelector(".market-label-bangladesh")
            }
        ];


        /* Activate one country */
        function activateCountry(country) {

            if (country.map) {
                country.map.classList.add("is-active");
            }

            if (country.label) {
                country.label.classList.add("active");
            }

        }


        /* Map section */
        const mapSection =
            document.querySelector(".markets-animation");

        if (!mapSection) return;


        let hasStarted = false;


        /* Start animation when map enters viewport */
        const observer = new IntersectionObserver(
            function (entries) {

                const entry = entries[0];

                if (!entry.isIntersecting || hasStarted) {
                    return;
                }

                hasStarted = true;

                /*
                 * Countries appear one by one.
                 * Change 140 to control the speed.
                 */
                countries.forEach(function (country, index) {

                    setTimeout(function () {

                        activateCountry(country);

                    }, index * 200);

                });

                observer.disconnect();

            },
            {
                threshold: 0.25
            }
        );


        observer.observe(mapSection);


    } catch (error) {

        console.error(
            "Export market map error:",
            error
        );

    }

});
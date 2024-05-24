const alert = document.getElementById('alert');
const logoAS = document.getElementById('logoAS');
const toggleTheme = document.getElementById('toggleTheme');
const checkboxTheme = document.getElementById('checkboxTheme');
const checkboxIdiom = document.getElementById('checkboxIdiom');
const englishSVG = document.querySelector('.englishSVG');
const english = document.querySelector('.english');
const flags = document.getElementById('flags');
const textsToChange = document.querySelectorAll("[data-section]");
const navLinks = document.querySelectorAll('.nav-link');
const navbarResponsive = document.querySelector('.navbar-collapse');
const openMenuResponsive = document.getElementById('openMenuResponsive');
const closeMenuResponsive = document.getElementById('closeMenuResponsive');
const screenWidth = window.innerWidth;  
const listItem = document.querySelectorAll('nav ul li');
const menuBackDrop = document.querySelector('#menu-backdrop');
const btnCV = document.getElementById('btnCV');
const navbar = document.querySelector('.navbar');

function addEffectNavbar() {
  navbar.classList.add('scrolling');
  navbar.style.background = 'rgba(0, 0, 0, 0.2)';
}

function removeEffectNavbar() {
  navbar.classList.remove('scrolling');
  navbar.style.background = 'var(--blueStrong-blueLight)'
}

// Función para cambiar el fondo del navbar al hacer scroll
function handleScroll() {
  if (window.scrollY > 0) {
    addEffectNavbar();
  } else {
      removeEffectNavbar();
    }
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', function () {
  var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Al hacer clic en slide poner en el centro
  var slides = document.querySelectorAll('.swiper-slide');  
  slides.forEach(function (slide, index) {
    slide.addEventListener('click', function () {
      TrandingSlider.slideTo(index);
    });
  });
});

// Cards footer
const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

// Cambiar el título de la pestaña
let previousTitle = document.title;
window.addEventListener('blur', () => {
  previousTitle = document.title
  document.title = `😱 ¡No te vayas!`
})

window.addEventListener('focus', () => {
  document.title = previousTitle;
})

// Posicionarse en el inicio de la página
const irInicio = () => {
  document.documentElement.scrollTo(0, 0)
}

// Mostrar alerta al hacer clic en el logo AS
logoAS.addEventListener('click', () => {
  alert.className = "alert alert-primary alert-dismissible show" 
  document.documentElement.scrollTo(0, 0)
})


// Cambiar dark/light mode
checkboxTheme.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
  }
});


// Cambiar idioma inglés/español
checkboxIdiom.addEventListener('change', function() {
  let language = ""

  if (this.checked) {
    language = 'es'
    btnCV.setAttribute('href', './documents/ANTONIO SILVA FRONT-END CV Español.pdf')
  } else {
      language = 'en'
      btnCV.setAttribute('href', './documents/ANTONIO SILVA FRONT-END CV English.pdf')
    }

  const changeLanguage = async () => {
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json()
  
    for(const textToChange of textsToChange) {    
      const section = textToChange.dataset.section
      const value = textToChange.dataset.value
      
      textToChange.innerHTML = texts[section][value]
    }
  }

  changeLanguage()
});

// Cambiar opacidad del SVG ingles cuando esta checked el input
checkboxIdiom.addEventListener('change', () => {
  if (checkboxIdiom.checked) {
    englishSVG.style.opacity = '0.5'; 
    english.style.opacity = '0.5'; 
  } else {
    englishSVG.style.opacity = '1'; 
    english.style.opacity = '1'; 
  }
});

function closeNavMobile() {
  toggleTheme.style.display = 'none'
  flags.style.display = 'none'    
  navbarResponsive.classList.remove('show');
  closeMenuResponsive.classList.toggle('hide');
  openMenuResponsive.classList.toggle('hide');
}

// Evento "click" a cada enlace para cerrar la navbar
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log(screenWidth);
    
    if (screenWidth < 767) {
      addEffectNavbar();
      closeNavMobile();
    }
  });
});

// Comportamiento botón menú responsive
openMenuResponsive.addEventListener('click' , () => {
  removeEffectNavbar();
  closeMenuResponsive.classList.toggle('hide');
  openMenuResponsive.classList.toggle('hide');
  toggleTheme.style.display = 'block'
  flags.style.display = 'flex'
});

closeMenuResponsive.addEventListener('click' , () => {
  addEffectNavbar();
  closeNavMobile();
});

// Hover li items Navbar
  if (screenWidth > 770) {
    listItem.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const { left, top, width, height } = item.getBoundingClientRect()
              
        menuBackDrop.style.setProperty('--left', `${left}px`)
        menuBackDrop.style.setProperty('--top', `${top}px`)
        menuBackDrop.style.setProperty('--width', `${width}px`)
        menuBackDrop.style.setProperty('--height', `${height}px`)
        menuBackDrop.style.opacity = '1'
        menuBackDrop.style.visibility = 'visible'
      })

      item.addEventListener('mouseleave', () => {
        menuBackDrop.style.opacity = '0'
        menuBackDrop.style.visibility = 'hidden'
      })
    })
  }
  
/*   Descargar todas las imágenes de una página web
  $$('img').forEach(img => {
    const src = img.src
    const [filename] = src.split('.').reverse()
    const [name] = filename.split('.')

    const a = document.createElement('a')
    a.setAttribute('href', src)
    a.setAttribute('downoload', name)
    a.click()
  }) */
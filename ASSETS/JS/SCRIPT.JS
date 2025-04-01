/*SLIDE TOP*/ 
const imgs = document.querySelectorAll('.img-select a');
const imgBnts = [...imgs];

let imgId = 1;




const images =[
  { 'id': '1', 'url': './ASSETS/img/slide/1.jpg'},
  { 'id': '1', 'url': './ASSETS/img/slide/2.jpg'},
  { 'id': '1', 'url': './ASSETS/img/slide/3.jpg'},
  { 'id': '1', 'url': './ASSETS/img/slide/4.jpg'},
  { 'id': '1', 'url': './ASSETS/img/slide/5.webp'},
];

const containerItems = document.querySelector("#container-items");

const loadImages = (images) =>{
  images.forEach(image => {
   containerItems.innerHTML += ` 
   <div class='items'>
   <img src='${image.url}'>
   </div>
   `;
  });
};

loadImages(images, containerItems);
let items = document.querySelectorAll(".items");
const previous = () =>{
  const lastItem = items[items.length - 1];
  containerItems.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".items");
};

const next = () =>{
  containerItems.appendChild(items[0]);
  items = document.querySelectorAll(".items");
};

document.querySelector("#previous").addEventListener("click", previous);

document.querySelector("#next").addEventListener("click", next);



let autoPlayInterval;

const startAutoPlay = () =>{
  autoPlayInterval = setInterval(() =>{
    next();
  }, 3000);
};

const stopAutoPlay = () =>{
  clearInterval(autoPlayInterval);
};

startAutoPlay();

const interactiveElements = [containerItems, ...
  document.querySelectorAll('.conteiner-shadow, .items, .items img')];
  interactiveElements.forEach(element =>{
    element.addEventListener("mouseenter",
     stopAutoPlay
    );
    element.addEventListener("mouseleave",
      startAutoPlay
    );
  });

containerItems.addEventListener("mouseover", stopAutoPlay);
containerItems.addEventListener("mouseout", startAutoPlay);
/*FIM DO SIDE TOP*/
/////
////
////
/*slide Equipe*/
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const fristCardwidth = carousel.querySelector(".card").offsetwidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildreans = [...carousel.children];

let isdragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

    let cardPerView = Math.round(carousel.offsetwidth / fristCardwidth);

    carouselChildreans.slice(-cardPerView).reverse().forEach(card => {
      carousel.insetAdjacenteHTML("afterbegin", card.outerHTML);
    });

    carouselChildreans.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacenteHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetwidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn =>{
      btn.addEventListener("click", () =>{
            carousel.scrollLeft += btn.id == "left" ? -fristCardwidth : fristCardwidth;
      });
    });

    const dragStart = (e) =>{
      isdragging= true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft= carousel.scrollLeft;
    };

    //Função enquanto o usuário arrasta
    const dragging = (e) =>{
      if (!isdragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
    };

    //Função quando o usuário para

    const dragStop = () =>{
      isdragging = false;
      carousel.classList.remove("dragging");
    };

    const intiniteScroll = () => {
      //Se o carrossel estiver no inicio, rola para o final
      if (carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollleft = carousel.scrollWidth - (2 * carouselWidth);
        carousel.classList.remove("no-transition");
      }
      //se o carrosel estiver no final, rola para o inicio
      else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetwidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetwidth;
        carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) AutoPlay();
    };


    const AutoPlay =()=>{
    
      if (window.innerWidth <800 || !isAutoPlay ) return;
      timeoutId = setTimeout(() => carousel.scrollLeft += fristCardwidth, 2500);


    };

    AutoPlay();

    carousel.addEventListener("mousedown",dragStart);
    carousel.addEventListener("mousemove",dragging);
    carousel.addEventListener("mouseup",dragStop);
    carousel.addEventListener("scroll",intiniteScroll);

    wrapper.addEventListener("mouseenter", () =>
    clearTimeout (timeoutId));

    wrapper.addEventListener("mouseleave", AutoPlay);
    /*Fim da slide Equipe*/ 
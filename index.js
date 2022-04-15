 


 const API_KEY='api_key=4621eb930eceb8d23839805cd87e953a';
 const BASE_URL='https://api.themoviedb.org/3/';
 const API_URL=BASE_URL+'discover/movie?sort_by=popularity.desc&'+API_KEY;
 const TREND_URL=BASE_URL+'trending/all/day?'+API_KEY;
 const NOW_URL=BASE_URL+'movie/now_playing?'+API_KEY;
 const IMG_URL='https://image.tmdb.org/t/p/w500';
 const form=document.getElementById('form');
 const search=document.getElementById('search');
 const SEARCH_URL='https://api.themoviedb.org/3/search/movie?'+API_KEY+'&query=';
 const main=document.getElementById('main');
 const main1=document.getElementById('main1');
 const main2=document.getElementById('main2');
 const prevBtn=document.getElementById('prev-btn');
 const nextBtn=document.getElementById('next-btn');
 const current=document.getElementById('current');
 const sliderContainer=document.querySelector('.slider-container');
 var genreContainer=document.querySelector('.genre-container');

//languages buttons
const langBtn=document.querySelectorAll('.language');
const showLangBtn=document.getElementById('current-language');




getMovies(API_URL);
getMovies1(TREND_URL);
getMovies2(NOW_URL);

 function getMovies(url){
     lastUrl=url
     fetch(url).then(res => res.json()).then(data =>{
         
        showMovies(data.results);
        

     })
 }
 function getMovies1(url1){
  lastUrl1=url1
  fetch(url1).then(res => res.json()).then(data =>{
      
     showMovies1(data.results);
     

  })
}
function getMovies2(url2){
  lastUrl2=url2
  fetch(url2).then(res => res.json()).then(data =>{
      
     showMovies2(data.results);
     

  })
}

 function showMovies(data){
    main.innerHTML=``;
     data.forEach(movie=>{
         const {title,poster_path,overview,vote_average,genre_ids}=movie;
         const movieElement=document.createElement('div');
         movieElement.classList.add('movie');
         movieElement.innerHTML=`
         
           <img src="${IMG_URL+poster_path}" alt="">
           <div class="movie-info">
                <h3 >${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
           ${overview}
            <button class="know-more-btn">
                Know More
            </button>
           </div>
  `
  main.appendChild(movieElement);
  
     })
     handleGenre();
 }
 function showMovies1(data){
  main1.innerHTML=``;
   data.forEach(movie=>{
       const {title,poster_path,overview,vote_average,genre_ids}=movie;
       const movieElement=document.createElement('div');
       movieElement.classList.add('movie');
       movieElement.innerHTML=`
       
         <img src="${IMG_URL+poster_path}" alt="">
         <div class="movie-info">
              <h3 >${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
         </div>
         <div class="overview">
         ${overview}
          <button class="know-more-btn">
              Know More
          </button>
         </div>
`
main1.appendChild(movieElement);

   })
   handleGenre();
}
function showMovies2(data){
  main2.innerHTML=``;
   data.forEach(movie=>{
       const {title,poster_path,overview,vote_average,genre_ids}=movie;
       const movieElement=document.createElement('div');
       movieElement.classList.add('movie');
       movieElement.innerHTML=`
       
         <img src="${IMG_URL+poster_path}" alt="">
         <div class="movie-info">
              <h3 >${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
         </div>
         <div class="overview">
         ${overview}
          <button class="know-more-btn">
              Know More
          </button>
         </div>
`
main2.appendChild(movieElement);

   })
   handleGenre();
}
 function getColor(vote){
    if(vote>=8){
        return 'green';
    }else if(vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
 }


 








// change language through out the API
var languages=[
    {
        lang:'en',
        img:'<img  class="lang-icon"src="/img/united-kingdom.png" alt=""> ',
        content:'English'
    },
    {
        lang:'vi',
        img:'<img  class="lang-icon"src="/img/vietnam.png" alt=""> ',
        content:'Vietnamese'
    },
    {
        lang:'es',
        img:'<img  class="lang-icon"src="/img/spain.png" alt=""> ',
        content:'Spanish'
    },
]; 

var languageHolder=`<ul>
<li class="language">
    <img  class="lang-icon"src="/img/united-kingdom.png" alt="">
    English</li>
<li class="language">
    <img  class="lang-icon"src="/img/vietnam.png" alt="">
    VietNamese</li>
<li class="language">
    <img  class="lang-icon"src="/img/spain.png" alt="">
    Spanish</li>
</ul>
</li>`;

var arr = Array.prototype.slice.call(langBtn);
console.log(arr);
for (var i = 0; i < arr.length; i++) {
    (function(index) {
         arr[index].addEventListener("click", function() {
            changeLanguage(index);
            
        })
    })(i);
 }


 function changeLanguage(index){

     let url=''
        if(lastUrl.includes('&language=')){
            let urlSplit=lastUrl.split('&language=');
            let urlSplit1=urlSplit[1].split('&');
            if(urlSplit1[1]>0){
                url=urlSplit[0]+'&language='+languages[index].lang+'&'+urlSplit1[1];
            }else{
                url=urlSplit[0]+'&language='+languages[index].lang;
            }
        }else{
         url=lastUrl+'&language='+languages[index].lang;
        }
                getMovies(url);
    var textToChange=showLangBtn.childNodes[1];
        textToChange.nodeValue=languages[index].content;
 }
 function changeLanguage1(index){

  let url=''
     if(lastUrl1.includes('&language=')){
         let urlSplit=lastUrl1.split('&language=');
         let urlSplit1=urlSplit[1].split('&');
         if(urlSplit1[1]>0){
             url=urlSplit[0]+'&language='+languages[index].lang+'&'+urlSplit1[1];
         }else{
             url=urlSplit[0]+'&language='+languages[index].lang;
         }
     }else{
      url=lastUrl1+'&language='+languages[index].lang;
     }
             getMovies1(url);
 var textToChange=showLangBtn.childNodes[1];
     textToChange.nodeValue=languages[index].content;
}

 $('.slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode:true,
    prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    nextArrow: '<button class="slide-arrow next-arrow"></button>',
    autoplay:true,
    autoplaySpeed:2000,
    centerPadding:'0px',
    fade:true,
   
  });
/// categories section ///
  var category=document.querySelector('.categories');

  var genres=[
    {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
  ];

    genres.forEach(genre=>{
        const {id,name}=genre;
        const genreEl=document.createElement('li');
        genreEl.classList.add(genre.id);
        genreEl.innerHTML=`<div onclick=ChooseGenre(${id})> ${name}</div>`;

        category.appendChild(genreEl);




    });
        function ChooseGenre(id){
            
            if(!lastUrl.includes('&with_genres=')){
            var newUrl=lastUrl+'&with_genres='+id;
            }else{
                var split=lastUrl.split('&with_genres=');
                if(split[1].includes('&')){
                var split1=split[1].split('&');
                var newUrl=split[0]+split1[1]+'&with_genres='+id;
                }else{
                    var newUrl=split[0]+'&with_genres='+id;
                }
                
            }
            getMovies(newUrl);
            hamNav.classList.remove('width-full');  
        }

function handleGenre(){

    if((lastUrl.split('&').length-1)>1){
        sliderContainer.style.display="none";
        genres.forEach(genre=>{
            if(lastUrl.includes(`&with_genres=${genre.id}`)){
                genreContainer.innerHTML=`<div>
                <h1>${genre.name}</h1>
                </div>`;
                console.log('true');
            }
        })
       
    }else{
        sliderContainer.style.display = "flex"; 
        genreContainer.innerHTML='';
    }
}
/* hamburger-btn*/
var openNavBtn=document.querySelector('.hamburger-btn');
var closeNavBar=document.querySelector('.fa-xmark');
var hamNav=document.querySelector('.hamburger-navbar');
openNavBtn.addEventListener('click',function(){
  hamNav.classList.add('width-full');
  closeNavBar.classList.remove('display-none');
})
closeNavBar.addEventListener('click',function(){
  hamNav.classList.remove('width-full');
})


jQuery('section.hamburger-navbar > li a').click(function() {
  jQuery(this).siblings('ul').slideToggle(150);
});
jQuery('section.hamburger-navbar > li ul').hide();
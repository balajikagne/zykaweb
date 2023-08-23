let slides=document.getElementsByClassName("slides");
let navlinks=document.getElementsByClassName("dot");
let currentSlide=0;

function changeSlide(moveTO){
    if (moveTO>=slides.length)
    {
        moveTO=0;
    }
    if (moveTO<0)
    {
        moveTO=slides.length-1;
    }
    //this toggle function add class name if not present or remove if existing class is present
    slides[currentSlide].classList.toggle("active");//  ==>dot active
    navlinks[currentSlide].classList.toggle("activeDot")
    slides[moveTO].classList.toggle("active")
    navlinks[moveTO].classList.toggle("activeDot");
    currentSlide=moveTO;
}


document.querySelectorAll(".dot").forEach((bullet,bulletIndex)=>{
    bullet.addEventListener("click",()=>{
        if (currentSlide!==bulletIndex){
            changeSlide(bulletIndex);
        }
    })
})

window.onload=setInterval(function(){
    changeSlide(currentSlide+1)
},5000)







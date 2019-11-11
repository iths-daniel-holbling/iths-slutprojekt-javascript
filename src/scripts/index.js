import '../styles/index.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';
import anime from 'animejs';


AOS.init();
const contentWrapper = document.querySelector('.content-wrapper');

async function jsonThisRequestURL(url){
    let req = await fetch('https://api.quotable.io/random');
    let myJson = req.json();
    return myJson;
}

class Quote {
    constructor() {
        this.quote = "";
        this.author = "";
    }
    
    async updateQuote() {
        let json = await jsonThisRequestURL('https://api.quotable.io/random');
        this.quote = json.content;
        this.author = json.author;
    }

    markup() {
        return `
        <div class="quote-wrapper">
            <p class="quote" data-aos="fade-left">${this.quote}</p>
            <p class="author">- <em>${this.author}</em></p>
        </div>
        `;
    }
}



async function init(){
    let newQuote = new Quote();
    await newQuote.updateQuote();
    if(newQuote.author !== "Donald Trump"){
        contentWrapper.innerHTML = newQuote.markup();
    }
}

init();
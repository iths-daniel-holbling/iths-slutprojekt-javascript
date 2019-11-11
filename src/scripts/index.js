import '../styles/index.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';
import anime from 'animejs';


AOS.init();
const contentWrapper = document.querySelector('.content-wrapper');

async function jsonThisRequestURL(url){
    let req = await fetch(url);
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
            <p class="quote" data-aos="fade-left" data-aos-delay=500>${this.quote}</p>
            <p class="author" data-aos="fade-right" data-aos-delay=800>- <em>${this.author}</em></p>
        </div>
        `;
    }
}

async function newQuote(){
    let newQuote = new Quote();
    await newQuote.updateQuote();
    if(newQuote.author !== "Donald Trump"){
        contentWrapper.innerHTML = newQuote.markup();
    }else{
        newQuote();
    }
}

const animate = {
    out(targets){
        anime({
            targets: targets,
            translateX: 250,
            opacity: 0
        });
    },
    in(targets){
        anime({
            targets: targets,
            translateX: 0,
            opacity: 1
        });
    }
};

class Madlib {
    constructor(blanks,story) {
        this.numberOfBlanks = blanks.length;
        this.blankNames = blanks;
        this.story =  story;
    }


}

function initEventListeners(){
    let home = document.querySelector('#home');
    let madlibs = document.querySelector('#madlibs');
    home.addEventListener('click', async () => {
        animate.out(".content-wrapper");
        await newQuote();
        animate.in(".content-wrapper");
    });
    madlibs.addEventListener('click', () => {
        animate.out(".content-wrapper");
    });

}

newQuote();
initEventListeners();
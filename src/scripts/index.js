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

let madlib = {
    blankNames: ['adjective','adjective','type of bird','room in a house','verb (past tense)','verb','relatives name','noun','a liquid','verb ending in -ing','part of the body (plural preferred)','plural noun','verb ending in -ing','noun'],
    blanks: [],
    inputRender(){
        contentWrapper.innerHTML = "";
        let wrapper = document.createElement('div');
        wrapper.className = "input-wrapper";
        contentWrapper.appendChild(wrapper);
        for(let blankName of this.blankNames){
            let input = document.createElement('input');
            input.setAttribute("type","text");
            input.setAttribute("placeholder",blankName);
            input.setAttribute("data-aos","fade-up");
            wrapper.appendChild(input);
        }
        let submit = document.createElement('button');
        submit.innerText = "Create";
        wrapper.appendChild(submit);
    },
    storyMarkup(){
        return `
        It was a ${this.blanks[0]}, cold November day. I woke up to the ${this.blanks[1]} smell of ${this.blanks[2]} roasting in the ${this.blanks[3]} downstairs. I ${this.blanks[4]} down the stairs to see if I could help ${this.blanks[5]} the dinner. My mom said, "See if ${this.blanks[6]} needs a fresh ${this.blanks[7]}." So I carried a tray of glasses full of ${this.blanks[8]} into the ${this.blanks[9]} room. When I got there, I couldn't believe my ${this.blanks[10]}! There were ${this.blanks[11]} ${this.blanks[12]} on the ${this.blanks[13]}!
        `;
    }


};

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
        madlib.inputRender();
        animate.in(".content-wrapper");
    });
}

console.log(madlib);
newQuote();
initEventListeners();
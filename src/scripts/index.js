import '../styles/index.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';
import anime from 'animejs';
import Granim from 'granim';



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
            translateX: 500,
            opacity: 0,
            duration: 1000
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
    blankNames: ['adjective','adjective','type of animal','room in a house','verb (past tense)','verb','relatives name','noun','a liquid','verb ending in -ing','bodypart','plural noun','verb ending in -ing','noun'],
    blanks: [],
    inputRender(){
        contentWrapper.innerHTML = "";
        let wrapper = document.createElement('div');
        wrapper.className = "input-wrapper";
        let fieldsWrapper = document.createElement('div');
        fieldsWrapper.className = "fields-wrapper";
        contentWrapper.appendChild(wrapper);
        wrapper.appendChild(fieldsWrapper);
        for(let blankName of this.blankNames){
            let input = document.createElement('input');
            input.setAttribute("type","text");
            input.setAttribute("placeholder",blankName);
            input.setAttribute("data-aos","fade-up");
            fieldsWrapper.appendChild(input);
        }
        let submit = document.createElement('button');
        submit.innerText = "Create";
        submit.addEventListener("click", () => {
            this.blanks = [];
            let emptyFields = false;
            let fields = document.querySelectorAll('input');
            for(let field of fields){
                if(field.value === ""){
                    emptyFields = true;
                    break;
                }
                this.blanks.push(field.value);
            }

            let tempBlanks = [];
            for(let blank in this.blanks){
                if(blank !== "6"){
                    let lowerCased = this.blanks[blank].toLowerCase();
                    tempBlanks.push(lowerCased);
                }else if(blank === "6"){
                    let upperCasedTemp = this.blanks[blank];
                    let upperCased = upperCasedTemp.charAt(0).toUpperCase() + upperCasedTemp.slice(1);
                    tempBlanks.push(upperCased);
                }
            }
            this.blanks = tempBlanks;
            
            if(emptyFields === false){
                contentWrapper.innerHTML = "";
                let wrapper = document.createElement('div');
                wrapper.className = "story-wrapper";
                contentWrapper.appendChild(wrapper);
                let storyWrapper = document.createElement('div');
                storyWrapper.className = "story-hidden";
                wrapper.appendChild(storyWrapper);
                storyWrapper.innerHTML = this.storyMarkup();
                storyWrapper.className = "story";
            }else{
                if(document.querySelector('.error') === null){
                    let errorMsg = document.createElement('div');
                    errorMsg.className = "error";
                    errorMsg.innerHTML = "<p>Please fill in all the fields</p>";
                    wrapper.appendChild(errorMsg);
                    emptyFields = false;
                }else if(document.querySelector('.error') !== null){
                    let errorMsg = document.querySelector('.error');
                    anime({
                        targets: errorMsg,
                        rotate: '1turn'
                    });
                }
            };
        });
        wrapper.appendChild(submit);
    },
    storyMarkup(){
        return `
        It was a really 
        <strong data-aos="fade in" data-aos-delay=500>${this.blanks[0]}</strong>
        , cold November day. I woke up to the 
        <strong data-aos="fade in" data-aos-delay=600>${this.blanks[1]}</strong> 
        smell of 
        <strong data-aos="fade in" data-aos-delay=700>${this.blanks[2]}</strong> 
        roasting in the 
        <strong data-aos="fade in" data-aos-delay=800>${this.blanks[3]}</strong> 
        downstairs. I 
        <strong data-aos="fade in" data-aos-delay=900>${this.blanks[4]}</strong> 
        down the stairs to see if I could help 
        <strong data-aos="fade in" data-aos-delay=1000>${this.blanks[5]}</strong> 
        the dinner. My mom said, "See if 
        <strong data-aos="fade in" data-aos-delay=1100>${this.blanks[6]}</strong> 
        needs a fresh 
        <strong data-aos="fade in" data-aos-delay=1200>${this.blanks[7]}</strong>
        ." So I carried a tray of glasses full of 
        <strong data-aos="fade in" data-aos-delay=1300>${this.blanks[8]}</strong> 
        into the 
        <strong data-aos="fade in" data-aos-delay=1400>${this.blanks[9]}</strong> 
        room. When I got there, I couldn't believe my 
        <strong data-aos="fade in" data-aos-delay=1500>${this.blanks[10]}</strong>
        ! There were 
        <strong data-aos="fade in" data-aos-delay=1600>${this.blanks[11]}</strong> 
        <strong data-aos="fade in" data-aos-delay=1700>${this.blanks[12]}</strong> 
        on the 
        <strong data-aos="fade in" data-aos-delay=1800>${this.blanks[13]}</strong>
        !
        `;
    }
};

const about = {
    age(){
        let currentYear = new Date().getFullYear();
        return currentYear - 1983;
    },
    markup(){
        return `
            <div class="profile">
                <div class="picture" data-aos="zoom-in"></div>
                <h1 class="name" data-aos="slide-left">Daniel Hölbling</h1>
                <h4 data-aos="slide-right">Front End Developer in the making</h4>
                <p data-aos="fade-left" data-aos-delay=200>${this.age()} years old</p>
                <p data-aos="fade-right" data-aos-delay=250>Married man</p>
                <p data-aos="fade-left" data-aos-delay=300>Gadget man</p>
                <p data-aos="fade-right" data-aos-delay=350>Cat man</p>
            </div>
        `;
    }
};

const contact = {
    markup(){
        return `
            <div class="contact">
                <h1 data-aos="fade-in">You can reach me via</h1>
                <a href="https://github.com/iths-daniel-holbling">
                <img src="/public/img/GitHub_Logo_White.png" alt="github logo" data-aos="fade-in" data-aos-delay=100>
                </a>
                <h1 data-aos="fade-in" data-aos-delay=200>or</h1>
                <a href="https://www.linkedin.com/in/danielholbling/">
                <img src="/public/img/LI-Logo.png" alt="linkedin logo" data-aos="fade-in" data-aos-delay=300>
                </a>
            </div>
        `;
    }
};

function initEventListeners(){
    let home = document.querySelector('#home');
    let madlibs = document.querySelector('#madlibs');
    let aboutBtn = document.querySelector('#about');
    let contactBtn = document.querySelector('#contact');
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
    aboutBtn.addEventListener('click', () => {
        animate.out(".content-wrapper");
        contentWrapper.innerHTML = about.markup();
        animate.in(".content-wrapper");
    });
    contactBtn.addEventListener('click', () => {
        animate.out(".content-wrapper");
        contentWrapper.innerHTML = contact.markup();
        animate.in(".content-wrapper");
    });
}


let granimInstance = new Granim({
    element: '#logo-canvas',
    direction: 'left-right',
    states : {
        "default-state": {
            gradients: [
                ['#c3073f', '#950740'],
                ['#6f2232', '#4e4e50']
            ],
            transitionSpeed: 10000
        }
    }
});



newQuote();
initEventListeners();
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
    blankNames: ['adjective','adjective','type of animal','room in a house','verb (past tense)','verb','relatives name','noun','a liquid','verb ending in -ing','part of the body (plural preferred)','plural noun','verb ending in -ing','noun'],
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
            if(emptyFields === false){
                contentWrapper.innerHTML = "";
                let storyWrapper = document.createElement('div');
                storyWrapper.className = "story-hidden";
                contentWrapper.appendChild(storyWrapper);
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
        It was a really <strong data-aos="fade-left" data-aos-delay=500>${this.blanks[0]}</strong>, cold November day. I woke up to the <strong data-aos="fade in" data-aos-delay=600>${this.blanks[1]}</strong> smell of <strong data-aos="fade in" data-aos-delay=700>${this.blanks[2]}</strong> roasting in the <strong data-aos="fade in" data-aos-delay=800>${this.blanks[3]}</strong> downstairs. I <strong data-aos="fade in" data-aos-delay=900>${this.blanks[4]}</strong> down the stairs to see if I could help <strong data-aos="fade in" data-aos-delay=1000>${this.blanks[5]}</strong> the dinner. My mom said, "See if <strong data-aos="fade in" data-aos-delay=1100>${this.blanks[6]}</strong> needs a fresh <strong data-aos="fade in" data-aos-delay=1200>${this.blanks[7]}</strong>." So I carried a tray of glasses full of <strong data-aos="fade in" data-aos-delay=1300>${this.blanks[8]}</strong> into the <strong data-aos="fade in" data-aos-delay=1400>${this.blanks[9]}</strong> room. When I got there, I couldn't believe my <strong data-aos="fade in" data-aos-delay=1500>${this.blanks[10]}</strong>! There were <strong data-aos="fade in" data-aos-delay=1600>${this.blanks[11]}</strong> <strong data-aos="fade in" data-aos-delay=1700>${this.blanks[12]}</strong> on the <strong data-aos="fade in" data-aos-delay=1800>${this.blanks[13]}</strong>!
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
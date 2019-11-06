import '../styles/index.scss';
const contentWrapper = document.querySelector('.content-wrapper');

async function jsonThisRequestURL(url){
    let req = await fetch('https://api.quotable.io/random');
    let myJson = req.json();
    return myJson;
}





class Quote {
    constructor() {
        let myJson = jsonThisRequestURL('https://api.quotable.io/random');
        this.quote = myJson.quote;
        this.author = myJson.author;
    }
    
    async updateQuote() {
        let json = await jsonThisRequestURL('https://api.quotable.io/random');
        this.quote = json.content;
        this.author = json.author;
    }

    markup() {
        return `
        <div class="quote-wrapper">
            <p class="quote">${this.quote}</p>
            <p class="author">${this.author}</p>
        </div>
        `;
    }
}



async function init(){
    let newQuote = new Quote();
    await newQuote.updateQuote();
    contentWrapper.innerHTML = newQuote.markup();
}

init();
const quotes = [
    "The best way to predict the future is to invent it. – Alan Kay",
    "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Act as if what you do makes a difference. It does. – William James",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau"
];

const backgrounds = [
    "url(/web-dev-project/images/bg.jpeg)",
    "url(/web-dev-project/images/bg2.jpeg)",
    "url('/web-dev-project/images/bg3.jpeg')",
    "url('/web-dev-project/images/bg4.jpeg')",
    "url('/web-dev-project/images/bg5.jpeg')",
    "url('/web-dev-project/images/bg6.jpg')",
    "url('/web-dev-project/images/bg7.jpg')",
    "url('/web-dev-project/images/bg8.jpg')"
];

const quoteElement = document.getElementById('quote');
const newQuoteButton = document.getElementById('new-quote');
const copyQuoteButton = document.getElementById('copy-quote');
const loader = document.getElementById('loader');

// Show loading
function showLoading() {
    loader.style.display = 'block';
    quoteElement.style.opacity = '0'; // Hide the quote during loading
}

// Hide loading
function hideLoading() {
    loader.style.display = 'none';
    quoteElement.style.opacity = '1'; // Show the quote after loading
}

// Generate random background image
function changeBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = backgrounds[randomIndex];
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

// Generate and display a random quote
function generateRandomQuote() {
    showLoading();
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
        hideLoading();
        changeBackgroundImage();
        quoteElement.classList.add("fade-in");
        setTimeout(() => quoteElement.classList.remove("fade-in"), 500);
    }, 1500); // Simulated delay for loading effect
}

// Copy quote to clipboard
copyQuoteButton.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteElement.textContent).then(() => {
        alert("Quote copied to clipboard!");
    });
});

// Event listener for button click
newQuoteButton.addEventListener('click', generateRandomQuote);

// Generate the first quote when the page loads
generateRandomQuote();

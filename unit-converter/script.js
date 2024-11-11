function convertToFeet() {
    const meters = document.getElementById('meters').value;
    const feet = meters * 3.28084; // 1 meter = 3.28084 feet
    const resultDiv = document.getElementById('metersResult');
    resultDiv.innerText = `${meters} meters = ${feet.toFixed(2)} feet`;
    resultDiv.classList.add('show');
    clearInput('meters');
}

function convertToMiles() {
    const kilometers = document.getElementById('kilometers').value;
    const miles = kilometers * 0.621371; // 1 kilometer = 0.621371 miles
    const resultDiv = document.getElementById('kilometersResult');}
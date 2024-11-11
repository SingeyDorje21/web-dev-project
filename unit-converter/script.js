function convertToFeet() {
    const metersInput = document.getElementById('meters').value;
    const feet = metersInput * 3.28084;
    const resultDiv = document.getElementById('metersResult');
    resultDiv.innerText = `${metersInput} meters is equal to ${feet.toFixed(2)} feet`;
    resultDiv.classList.add('show');
}

function convertToMiles() {
    const kilometersInput = document.getElementById('kilometers').value;
    const miles = kilometersInput * 0.621371;
    const resultDiv = document.getElementById('kilometersResult');
    resultDiv.innerText = `${kilometersInput} kilometers is equal to ${miles.toFixed(2)} miles`;
    resultDiv.classList.add('show');
}

function convertToFahrenheit() {
    const celsiusInput = document.getElementById('celsius').value;
    const fahrenheit = (celsiusInput * 9/5) + 32;
    const resultDiv = document.getElementById('celsiusResult');
    resultDiv.innerText = `${celsiusInput}°C is equal to ${fahrenheit.toFixed(2)}°F`;
    resultDiv.classList.add('show');
}

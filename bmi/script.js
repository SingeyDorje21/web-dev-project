document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the weight and height values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calculate BMI
    const bmi = weight / (height * height);

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Your BMI is: ${bmi.toFixed(2)}`;

    // Optionally, provide BMI category
    if (bmi < 18.5) {
        resultDiv.textContent += ' (Underweight)';
    } else if (bmi < 24.9) {
        resultDiv.textContent += ' (Normal weight)';
    } else if (bmi < 29.9) {
        resultDiv.textContent += ' (Overweight)';
    } else {
        resultDiv.textContent += ' (Obesity)';
    }
});
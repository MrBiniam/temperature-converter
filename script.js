const tempInput = document.getElementById("tempInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const swapBtn = document.getElementById("swapBtn");
const resultPreview = document.getElementById("resultPreview");
const formula = document.getElementById("formula");

const unitSymbols = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
};

function convert() {
    const inputValue = tempInput.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    
    if (inputValue === "") {
        resultPreview.textContent = "--";
        formula.textContent = "Enter a temperature";
        return;
    }
    
    const temp = Number(inputValue);
    
    if (isNaN(temp)) {
        resultPreview.textContent = "--";
        formula.textContent = "Enter a valid number";
        return;
    }
    
    // Same unit, no conversion needed
    if (from === to) {
        showResult(temp, unitSymbols[to], `${temp}${unitSymbols[from]} = ${temp}${unitSymbols[to]}`);
        return;
    }
    
    let convertedTemp;
    let formulaText;
    
    // Conversion logic
    if (from === "celsius" && to === "fahrenheit") {
        convertedTemp = (temp * 9/5) + 32;
        formulaText = `(${temp}°C × 9/5) + 32 = ${convertedTemp.toFixed(2)}°F`;
    }
    else if (from === "celsius" && to === "kelvin") {
        convertedTemp = temp + 273.15;
        formulaText = `${temp}°C + 273.15 = ${convertedTemp.toFixed(2)}K`;
    }
    else if (from === "fahrenheit" && to === "celsius") {
        convertedTemp = (temp - 32) * 5/9;
        formulaText = `(${temp}°F - 32) × 5/9 = ${convertedTemp.toFixed(2)}°C`;
    }
    else if (from === "fahrenheit" && to === "kelvin") {
        convertedTemp = (temp - 32) * 5/9 + 273.15;
        formulaText = `(${temp}°F - 32) × 5/9 + 273.15 = ${convertedTemp.toFixed(2)}K`;
    }
    else if (from === "kelvin" && to === "celsius") {
        convertedTemp = temp - 273.15;
        formulaText = `${temp}K - 273.15 = ${convertedTemp.toFixed(2)}°C`;
    }
    else if (from === "kelvin" && to === "fahrenheit") {
        convertedTemp = (temp - 273.15) * 9/5 + 32;
        formulaText = `(${temp}K - 273.15) × 9/5 + 32 = ${convertedTemp.toFixed(2)}°F`;
    }
    
    showResult(convertedTemp, unitSymbols[to], formulaText);
}

function showResult(value, unit, formulaText) {
    resultPreview.textContent = value.toFixed(2) + unit;
    formula.textContent = formulaText;
}

// Swap button functionality
swapBtn.addEventListener("click", () => {
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    
    // Auto convert if there's a value
    if (tempInput.value !== "") {
        convert();
    }
});

// Enter key support
tempInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        convert();
    }
});

// Auto-convert when units change (if value exists)
fromUnit.addEventListener("change", () => {
    if (tempInput.value !== "") {
        convert();
    }
});

toUnit.addEventListener("change", () => {
    if (tempInput.value !== "") {
        convert();
    }
});

// Focus input on page load
document.addEventListener("DOMContentLoaded", () => {
    tempInput.focus();
});

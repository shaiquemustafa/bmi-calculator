const calcBtn = document.getElementById("calcBtn");
const heightInput = document.getElementById("height");
const ageInput = document.getElementById("age");
const weightInput = document.getElementById("weight");
const result = document.getElementById("result");

const calculateBmiWithAge = async (height, weight, age) => {
  try {
    const response = await fetch("/.netlify/functions/bmi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ height, weight, age }),
    });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    return await response.json();
  } catch (error) {
    return { error: "Could not reach backend. Try again." };
  }
};

calcBtn.addEventListener("click", async () => {
  const height = parseFloat(heightInput.value);
  const age = parseFloat(ageInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || !age) {
    result.textContent = "Please enter valid height, age, and weight.";
    return;
  }

  result.textContent = "Calculating...";

  const data = await calculateBmiWithAge(height, weight, age);
  if (data.error) {
    result.textContent = data.error;
    return;
  }

  result.textContent = `Your BMI is ${data.bmi} (age-adjusted: ${data.ageAdjustedBmi})`;
});

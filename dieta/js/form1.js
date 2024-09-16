//-----formulario 1-----------------------------------------------------------------------------------------------

// Obter os elementos do formulário
const genderInput = document.getElementById('gender');
const ageInput = document.getElementById('age');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const activityLevelInput = document.getElementById('activity-level');

// Verificar se há dados salvos no armazenamento local
const savedData = localStorage.getItem('calculatorData');
if (savedData) {
  const { gender, age, weight, height, activityLevel } = JSON.parse(savedData);

  genderInput.value = gender;
  ageInput.value = age;
  weightInput.value = weight;
  heightInput.value = height;
  activityLevelInput.value = activityLevel;
}

function calculate(event) {
  event.preventDefault();

  const gender = genderInput.value;
  const age = parseInt(ageInput.value);
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const activityLevel = activityLevelInput.value;

  const bmr = calculateBMR(gender, weight, height, age);//const com taxa metabolica basal estando parado
  const tdee = calculateTDEE(bmr, activityLevel);//logica com Calorias para Manutenção
  const bulkingCaloriesAdvanced = tdee + 200;
  const bulkingCalories = tdee + 500;
  const cuttingCalories1 = tdee - 300;
  const cuttingCalories = tdee - 500;
  const cuttingCalories2 = tdee * 0.8;
  const maintenanceCalories = tdee;//Calorias para Manutenção

  const bmi = calculateBMI(weight, height);
  const bmiStatus = getBMIStatus(bmi);

  const waterIntake = calculateWaterIntake(weight);

  const result = `🧍Calorias Basais: ${bmr.toFixed(2)} cal<br>
                  🍔Calorias para Bulking: ${bulkingCaloriesAdvanced.toFixed(2)} a ${bulkingCalories.toFixed(2)} cal<br>
                  💪Calorias para Manutenção: ${maintenanceCalories.toFixed(2)} cal<br>
                  🔥Calorias para Cutting: ${cuttingCalories1.toFixed(2)} a ${cuttingCalories.toFixed(2)} ou -20%:${cuttingCalories2.toFixed(2)} cal<br>
                  💝IMC: ${bmi.toFixed(2)} kg/m²<br>
                  Peso IMC esta: <span class="weight-status ${bmiStatus}">${bmiStatus.toUpperCase()}</span> - (o imc saudavel é entre 18,5 e 24,9)<br>
                  💧Quantidade de Água Recomendada: ${waterIntake.toFixed(2)} litros`;

  document.getElementById('result').innerHTML = result;

  // Salvar os dados no armazenamento local
  const data = {
    gender,
    age,
    weight,
    height,
    activityLevel
  };
  localStorage.setItem('calculatorData', JSON.stringify(data));
}

function calculateBMR(gender, weight, height, age) {//calcula taxa metabolica basal estando parado
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;//homem 
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;//mulher
  }
}

function calculateTDEE(bmr, activityLevel) {//multiplica pelo taxa metabolica basal para Calorias para Manutenção
  switch (activityLevel) {
    case 'sedentary':
      return bmr * 1.2;
    case 'lightly-active':
      return bmr * 1.375;
    case 'moderately-active':
      return bmr * 1.55;
    case 'very-active':
      return bmr * 1.725;
    case 'extra-active':
      return bmr * 1.9;
  }
}

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

function getBMIStatus(bmi) {
  if (bmi < 18.5) {
    return 'abaixo';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'ideal';
  } else {
    return 'acima';
  }
}

function calculateWaterIntake(weight) {
  return weight * 0.033;
}
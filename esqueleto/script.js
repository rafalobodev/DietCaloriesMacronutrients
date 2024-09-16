//dieta/script.js
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


//---------formulario 2-------------------------------------------------------------------------------------------

// Função para carregar os valores dos campos salvos
function loadSavedValues() {
    const weighta = localStorage.getItem('weighta');
    const calories = localStorage.getItem('calories');
    const proteinRatio = localStorage.getItem('proteinRatio');
    const fatRatio = localStorage.getItem('fatRatio');
    const muscleCalories = localStorage.getItem('muscleCalories');
    const cardioCalories = localStorage.getItem('cardioCalories');

    if (weighta) document.getElementById('weighta').value = weighta;
    if (calories) document.getElementById('calories').value = calories;
    if (proteinRatio) document.getElementById('protein-ratio').value = proteinRatio;
    if (fatRatio) document.getElementById('fat-ratio').value = fatRatio;
    if (muscleCalories) document.getElementById('muscle-calories').value = muscleCalories;
    if (cardioCalories) document.getElementById('cardio-calories').value = cardioCalories;
  }

  // Função para salvar os valores dos campos
  function saveValues() {
    const weighta = document.getElementById('weighta').value;
    const calories = document.getElementById('calories').value;
    const proteinRatio = document.getElementById('protein-ratio').value;
    const fatRatio = document.getElementById('fat-ratio').value;
    const muscleCalories = document.getElementById('muscle-calories').value;
    const cardioCalories = document.getElementById('cardio-calories').value;

    localStorage.setItem('weighta', weighta);
    localStorage.setItem('calories', calories);
    localStorage.setItem('proteinRatio', proteinRatio);
    localStorage.setItem('fatRatio', fatRatio);
    localStorage.setItem('muscleCalories', muscleCalories);
    localStorage.setItem('cardioCalories', cardioCalories);
  }

  function calculatea(event) {
    event.preventDefault();

    const weighta = parseFloat(document.getElementById('weighta').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const proteinRatio = parseFloat(document.getElementById('protein-ratio').value);
    const fatRatio = parseFloat(document.getElementById('fat-ratio').value);
    const muscleCalories = parseFloat(document.getElementById('muscle-calories').value);
    const cardioCalories = parseFloat(document.getElementById('cardio-calories').value);

    const proteinGrams = proteinRatio * weighta;
    const fatGrams = fatRatio * weighta;

    const proteinCalories = proteinGrams * 4; // 1g de proteína = 4 calorias
    const fatCalories = fatGrams * 9; // 1g de gordura = 9 calorias

    const totalExerciseCalories = muscleCalories + cardioCalories;

    const remainingCalories = calories + totalExerciseCalories;
    const carbCalories = remainingCalories - proteinCalories - fatCalories;
    const carbsGrams = carbCalories / 4; // 1g de carboidrato = 4 calorias
    const carbsPerKg = carbsGrams / weighta;

    const proteinPercentage = (proteinCalories / remainingCalories) * 100;
    const carbsPercentage = (carbCalories / remainingCalories) * 100;
    const fatPercentage = (fatCalories / remainingCalories) * 100;

    const resulta = `🍗 Quantidade de Proteína: ${proteinGrams.toFixed(2)}g (${proteinCalories.toFixed(2)} cal) - ${proteinPercentage.toFixed(2)}%<br>
                    🥔 Quantidade de Carboidratos: ${carbsGrams.toFixed(2)}g (${carbCalories.toFixed(2)} cal) - ${carbsPercentage.toFixed(2)}% (${carbsPerKg.toFixed(2)} g/kg)<br>
                    🥑 Quantidade de Gordura: ${fatGrams.toFixed(2)}g (${fatCalories.toFixed(2)} cal) - ${fatPercentage.toFixed(2)}%<br>
                    🌰 Quantidade de Fibra -->> manter o peso ganhos secos: 25g (50cal), Cutting: 30g(60cal), Bulking: 20g(40cal)<br>
                    🚶 Calorias base totais: ${calories.toFixed(2)} cal<br>
                    🏋️ Calorias queimadas em musculação: ${muscleCalories.toFixed(2)} cal<br>
                    🏃‍♀️ Calorias queimadas em cardio: ${cardioCalories.toFixed(2)} cal<br>
                    🔥 Calorias Totais: ${(calories + totalExerciseCalories).toFixed(2)} cal - 100%`;

    document.getElementById('resulta').innerHTML = resulta;

    // Salvar os valores dos campos
    saveValues();
  }

  // Carregar os valores dos campos salvos ao carregar a página
  window.addEventListener('load', loadSavedValues);

  //---------formulario 3-------------------------------------------------------------------------------------------

  let chart;

      function calculateb(event) {
        event.preventDefault();

        const totalCalories = parseFloat(document.getElementById('total-calories').value);
        const proteinPercentage = parseFloat(document.getElementById('protein-percentage').value);
        const carbsPercentage = parseFloat(document.getElementById('carbs-percentage').value);
        const fatPercentage = parseFloat(document.getElementById('fat-percentage').value);

        const totalPercentage = proteinPercentage + carbsPercentage + fatPercentage;

        if (totalPercentage !== 100) {
          alert('A soma das porcentagens de macronutrientes deve ser igual a 100%.');
          return;
        }

        const proteinGrams = (proteinPercentage / 100) * totalCalories / 4;
        const carbsGrams = (carbsPercentage / 100) * totalCalories / 4;
        const fatGrams = (fatPercentage / 100) * totalCalories / 9;

        const proteinCalories = proteinGrams * 4;
        const carbsCalories = carbsGrams * 4;
        const fatCalories = fatGrams * 9;

        const resultb = `🍗🔴Quantidade de Proteína: ${proteinGrams.toFixed(2)}g (${proteinCalories.toFixed(2)} cal, ${proteinPercentage.toFixed(2)}%)<br>
                        🥔🔵Quantidade de Carboidratos: ${carbsGrams.toFixed(2)}g (${carbsCalories.toFixed(2)} cal, ${carbsPercentage.toFixed(2)}%)<br>
                        🥑🟡Quantidade de Gordura: ${fatGrams.toFixed(2)}g (${fatCalories.toFixed(2)} cal, ${fatPercentage.toFixed(2)}%)`;

        document.getElementById('resultb').innerHTML = resultb;

        if (chart) {
          chart.data.datasets[0].data = [proteinPercentage, carbsPercentage, fatPercentage];
          chart.update();
        } else {
          const ctx = document.getElementById('macronutrients-chart').getContext('2d');
          chart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Proteína', 'Carboidratos', 'Gordura'],
              datasets: [{
                data: [proteinPercentage, carbsPercentage, fatPercentage],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }

      window.addEventListener('DOMContentLoaded', function() {
        const totalCaloriesInput = document.getElementById('total-calories');
        const proteinPercentageInput = document.getElementById('protein-percentage');
        const carbsPercentageInput = document.getElementById('carbs-percentage');
        const fatPercentageInput = document.getElementById('fat-percentage');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const progressBarText = document.getElementById('progress-bar-text');

        if (localStorage.getItem('totalCalories')) {
          totalCaloriesInput.value = localStorage.getItem('totalCalories');
        }

        if (localStorage.getItem('proteinPercentage')) {
          proteinPercentageInput.value = localStorage.getItem('proteinPercentage');
        }

        if (localStorage.getItem('carbsPercentage')) {
          carbsPercentageInput.value = localStorage.getItem('carbsPercentage');
        }

        if (localStorage.getItem('fatPercentage')) {
          fatPercentageInput.value = localStorage.getItem('fatPercentage');
        }

        totalCaloriesInput.addEventListener('input', function() {
          localStorage.setItem('totalCalories', totalCaloriesInput.value);
        });

        proteinPercentageInput.addEventListener('input', function() {
          localStorage.setItem('proteinPercentage', proteinPercentageInput.value);
          updateProgressBar();
        });

        carbsPercentageInput.addEventListener('input', function() {
          localStorage.setItem('carbsPercentage', carbsPercentageInput.value);
          updateProgressBar();
        });

        fatPercentageInput.addEventListener('input', function() {
          localStorage.setItem('fatPercentage', fatPercentageInput.value);
          updateProgressBar();
        });

        function updateProgressBar() {
          const proteinPercentage = parseFloat(proteinPercentageInput.value);
          const carbsPercentage = parseFloat(carbsPercentageInput.value);
          const fatPercentage = parseFloat(fatPercentageInput.value);

          const totalPercentage = proteinPercentage + carbsPercentage + fatPercentage;

          progressBarFill.style.width = totalPercentage + '%';
          progressBarText.textContent = totalPercentage + '%';
        }

        updateProgressBar();
      });

  //---------formulario 4-------------------------------------------------------------------------------------------

  // Função para carregar os valores dos campos salvos
  function loadSavedValuesc() {
    const weightc = localStorage.getItem('weightc');
    const proteinRatioc = localStorage.getItem('proteinRatioc');
    const carbsRatioc = localStorage.getItem('carbsRatioc');
    const fatRatioc = localStorage.getItem('fatRatioc');

    if (weightc) document.getElementById('weightc').value = weightc;
    if (proteinRatioc) document.getElementById('protein-ratioc').value = proteinRatioc;
    if (carbsRatioc) document.getElementById('carbs-ratioc').value = carbsRatioc;
    if (fatRatioc) document.getElementById('fat-ratioc').value = fatRatioc;
  }

  // Função para salvar os valores dos campos
  function saveValuesc() {
    const weightc = document.getElementById('weightc').value;
    const proteinRatioc = document.getElementById('protein-ratioc').value;
    const carbsRatioc = document.getElementById('carbs-ratioc').value;
    const fatRatioc = document.getElementById('fat-ratioc').value;

    localStorage.setItem('weightc', weightc);
    localStorage.setItem('proteinRatioc', proteinRatioc);
    localStorage.setItem('carbsRatioc', carbsRatioc);
    localStorage.setItem('fatRatioc', fatRatioc);
  }

  function calculatec(event) {
    event.preventDefault();

    const weightc = parseFloat(document.getElementById('weightc').value);
    const proteinRatioc = parseFloat(document.getElementById('protein-ratioc').value);
    const carbsRatioc = parseFloat(document.getElementById('carbs-ratioc').value);
    const fatRatioc = parseFloat(document.getElementById('fat-ratioc').value);

    const proteinGramsc = proteinRatioc * weightc;
    const carbsGramsc = carbsRatioc * weightc;
    const fatGramsc = fatRatioc * weightc;

    const proteinCaloriesc = proteinGramsc * 4; // 1g de proteína = 4 calorias
    const carbsCaloriesc = carbsGramsc * 4; // 1g de carboidrato = 4 calorias
    const fatCaloriesc = fatGramsc * 9; // 1g de gordura = 9 calorias

    const totalCaloriesc = proteinCaloriesc + carbsCaloriesc + fatCaloriesc;

    const proteinPercentagec = (proteinCaloriesc / totalCaloriesc) * 100;
    const carbsPercentagec = (carbsCaloriesc / totalCaloriesc) * 100;
    const fatPercentagec = (fatCaloriesc / totalCaloriesc) * 100;

    const resultc = `🍗Quantidade de Proteína: ${proteinGramsc.toFixed(2)}g (${proteinCaloriesc.toFixed(2)} cal) - ${proteinPercentagec.toFixed(2)}%<br>
                    🥔Quantidade de Carboidratos: ${carbsGramsc.toFixed(2)}g (${carbsCaloriesc.toFixed(2)} cal) - ${carbsPercentagec.toFixed(2)}%<br>
                    🥑Quantidade de Gordura: ${fatGramsc.toFixed(2)}g (${fatCaloriesc.toFixed(2)} cal) - ${fatPercentagec.toFixed(2)}%<br>
                    🔥Calorias Totais: ${totalCaloriesc.toFixed(2)} cal - 100%`;

    document.getElementById('resultc').innerHTML = resultc;

    // Salvar os valores dos campos
    saveValuesc();
  }

  // Carregar os valores dos campos salvos ao carregar a página
  window.addEventListener('load', loadSavedValuesc);

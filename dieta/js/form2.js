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
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
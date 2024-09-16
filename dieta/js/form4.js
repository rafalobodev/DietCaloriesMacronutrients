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

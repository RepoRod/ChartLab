var seletor = null;
var chartEditor = null;
var chartwrapper = null;
var arrayData = null;
var csv = null;
var dataTable = null;

var ptApresentacao = 100;
var ptDesign = 100;
var ptCanal = 100;
var ptMarcas = 100;
var ptCor = 100;
var ptEixos = 100;
var ptLegenda = 100;
var ptEspecifico = 100;

//CARREGAR DADOS DO ARQUIVO CSV
window.onload = function () {
  var inputFileSeletor = document.getElementById('inputFileSeletor');
  var inputFileChart = document.getElementById('inputFileChart');
  var fileName = document.getElementById('file-name');

  inputFileSeletor.addEventListener('change', (event) => {
    fileName.textContent = inputFileSeletor.value;
    lerArquivo(event);
    
  });

  inputFileChart.addEventListener('change', (event) => {
    fileName.textContent = inputFileChart.value;
    lerArquivo(event);
   
  });
}

function lerArquivo(event){
  var files = event.target.files;
  var file = files[0];
  
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event){
    csv = event.target.result;

    Papa.parse(csv, {
      header: false,
      dynamicTyping: true,
      complete: function(results) {
        arrayData = results;
        dados = arrayData.data;
      }
    });
  
    console.log(dados);
    console.log(csv);
    google.charts.setOnLoadCallback(loadEditor);
  }
}

/*inputFileSeletor.addEventListener('change', function(){
  fileName.textContent = this.value;
  google.charts.setOnLoadCallback(loadEditor);
});

inputFileChart.addEventListener('change', function(){
  fileName.textContent = this.value;
  var boxGrafico = document.getElementById('boxGrafico');
  boxGrafico.removeChild(boxGrafico.children[2]);
  var quadroChart = document.getElementById('vizChart');
  quadroChart.removeChild(quadroChart.children[0]);
  var boxDiretrizes = document.getElementById('boxDiretrizes');
  boxDiretrizes.removeChild(boxDiretrizes.children[0]);
  google.charts.setOnLoadCallback(loadEditor);

});*/

// CHAMAR O EDITOR DE GRAFICOS E VALIDADOR DE GRAFICOS

function loadEditor() {
  //dataChart();
  dataTable = new google.visualization.arrayToDataTable(arrayData.data);
  console.log(dataTable);
  // Create the chart to edit.
  wrapper = new google.visualization.ChartWrapper({
    //'chartType':'PieChart',
    'dataTable': dataTable,
    //'dataSourceUrl': 'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1',
    //'query':'SELECT A,D WHERE D > 100 ORDER BY D',
    //'options': {'title': 'blbal',height: "80%", width: "100%"}
  });

  chartEditor = new google.visualization.ChartEditor();
  google.visualization.events.addListener(chartEditor, 'ok', redrawChart);
  chartEditor.openDialog(wrapper, {});
}

// CLIQUE EM "OK" NO EDITOR, SALVA O GRÁFICO NA PÁGINA.

function redrawChart(){
  chartwrapper = chartEditor.getChartWrapper();
  console.log(chartwrapper.getOptions());
  console.log(chartwrapper.getChartType());
  validaGrafico();
  chartwrapper.setOption('height', null);
  chartwrapper.setOption('width', null);
  chartEditor.getChartWrapper().draw(document.getElementById('vizChart'));
  
}

//VALIDADOR DO GRAFICO
function validaGrafico(){
  apagaBoxDiretrizes();
  reiniciaPontos();

  verificaApresentacao();
  verificaDesign();
  verificaCanal();
  verificaMarcas();
  verificaCor();
  verificaEixos();
  verificaLegenda();
  verificaEspecifico();

  GeraPontuacao();
}

function reiniciaPontos(){
  ptApresentacao = 100;
  ptDesign = 100;
  ptCanal = 100;
  ptMarcas = 100;
  ptCor = 100;
  ptEixos = 100;
  ptLegenda = 100;
  ptEspecifico = 100;
}

function GeraPontuacao(){
  var pontuacao = (ptApresentacao + ptDesign + ptCanal + ptMarcas + ptCor + ptEixos + ptLegenda + ptEspecifico) / 8;
  if(pontuacao == 100){
    adicionaParabens();
  }
  document.getElementById("valorNota").innerHTML = Math.floor(pontuacao) + "%";
  document.getElementById("notaGeral").style.color = "rgb(56, 56, 56)";
  document.getElementById("valorNota").style.color = "rgb(56, 56, 56)";
  preencherEstrelas(pontuacao);

}

function adicionaParabens(){
  var boxDiretrizes = document.getElementById('boxDiretrizes');

  var labelParabens = document.createElement("label");
    labelParabens.classList.add("boxFlex");
    labelParabens.id = "inicioBoxDiretrizes";
  
      var imgParabens = document.createElement("img");
      imgParabens.src = "img/imgParabens.png";
      imgParabens.alt = "Imagem de Parabéns";
      imgParabens.id = "imgInicioBoxDiretrizes";

    labelParabens.appendChild(imgParabens);
  
  boxDiretrizes.appendChild(labelParabens);

}

function preencherEstrelas(pontos){
  var qtdStar = Math.floor(pontos / 20);
  console.log(qtdStar);
  for(var i = 1; i <= qtdStar; i++){
    var idStar = "star" + i;
    var star = document.getElementById(idStar);
    console.log(idStar);
    star.style.color = "#FFD700";
    star.innerHTML = "star";
  }
}

function verificaApresentacao(){
  
  document.getElementById("valorApresentacao").innerHTML = ptApresentacao + "%";
  document.getElementById("barraApresentacao").style.width = ptApresentacao + "%";

  acionarIndicador("Apresentacao");

}

function verificaDesign(){

  document.getElementById("valorDesign").innerHTML = ptDesign + "%";
  document.getElementById("barraDesign").style.width = ptDesign + "%";

  acionarIndicador("Design");
}

function verificaCanal(){

  document.getElementById("valorCanal").innerHTML = ptCanal + "%";
  document.getElementById("barraCanal").style.width = ptCanal + "%";

  acionarIndicador("Canal");
}

function verificaMarcas(){

  document.getElementById("valorMarcas").innerHTML = ptMarcas + "%";
  document.getElementById("barraMarcas").style.width = ptMarcas + "%";

  acionarIndicador("Marcas");
}

function verificaCor(){

  document.getElementById("valorCor").innerHTML = ptCor + "%";
  document.getElementById("barraCor").style.width = ptCor + "%";

  acionarIndicador("Cor");
}

function verificaEixos(){
  verificaTitulo();

  document.getElementById("valorEixos").innerHTML = ptEixos + "%";
  document.getElementById("barraEixos").style.width = ptEixos + "%";

  acionarIndicador("Eixos");
}

function verificaLegenda(){

  document.getElementById("valorLegenda").innerHTML = ptLegenda + "%";
  document.getElementById("barraLegenda").style.width = ptLegenda + "%";

  acionarIndicador("Legenda");
}

function verificaEspecifico(){

  document.getElementById("valorEspecifico").innerHTML = ptEspecifico + "%";
  document.getElementById("barraEspecifico").style.width = ptEspecifico + "%";

  acionarIndicador("Especifico");
}

function acionarIndicador (nome){
  document.getElementById("boxIcon" + nome).style.backgroundColor = "#8FD6F9";
  document.getElementById("icon" + nome).style.color = "#2983EF";
  document.getElementById("texto" + nome).style.color = "#2983EF";
  document.getElementById("borda" + nome).style.borderColor = "#2983EF";
  document.getElementById("barra" + nome).style.backgroundColor = "#2983EF";
  document.getElementById("valor" + nome).style.color = "#2983EF";
}

function verificaTitulo(){
  console.log(chartwrapper.getOption('title'))
  if (chartwrapper.getOption('title') == null){
    //var element = document.getElementById('texto');
    //texto.innerHTML = '<b>Adicione um título!</b>'
    criaQuadroDiretriz(
      'X01',
      'Não deixe de adicionar um Título ao seu gráfico',
      "O título deve indicar claramente o que é representado graficamente. Deve se destaca claramente do restante do gráfico. Evite mantê-lo perto o suficiente de qualquer linha onde possa ser agrupado perceptivamente com ela. Use um tamanho de fonte maior que também impedirá que o título seja agrupado perceptivamente com outros rótulos ou partes",
      'img/exDiretrizTitulo.png',
      'Adicione um Título');
    console.log('Falta Título');
    ptEixos = ptEixos - 50;
  } else {
    //var element = document.getElementById('texto');
    //texto.innerHTML = '<b>Corrigido</b>'
    console.log('Não Falta Título');
  }
}

function apagaBoxDiretrizes(){
  var boxDiretrizes = document.getElementById('boxDiretrizes');
  var filhos = boxDiretrizes.children.length;

  if(filhos > 0){
    for(child of boxDiretrizes.children){
      console.log('Apaguei um filho');
      child.remove();
    } 
  } else{
    console.log('Não tem filho');
  
  }
}


// ABRIR E FECHAR DO MENU LATERAL

function openNav() {
  document.getElementById("abrir").style.display = "none";
  document.getElementById("fechar").style.display = "flex";
  document.getElementById("creditos").style.display = "flex";
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.backgroundColor = '#0F67EA';
  document.getElementById("logoSimpleChart").src = "img/logo_simplechart.png";
}

function closeNav() {
  document.getElementById("abrir").style.display = "flex";
  document.getElementById("fechar").style.display = "none";
  document.getElementById("creditos").style.display = "none";
  document.getElementById("mySidenav").style.width = "65px";
  document.getElementById("mySidenav").style.backgroundColor = 'white';
  document.getElementById("logoSimpleChart").src = "img/icon_simplechart.png";
}


function criaQuadroDiretriz (id, titulo, descricao, imagemExemplo, sugestao){
    var quadroDiretriz = document.createElement("div");
    quadroDiretriz.classList.add("boxFlex");
    quadroDiretriz.classList.add("quadroDiretriz");

    var boxTituloDiretriz = document.createElement("div");
      boxTituloDiretriz.classList.add("boxFlex");
      boxTituloDiretriz.classList.add("boxTituloDiretriz");
      boxTituloDiretriz.id = 'boxTituloDiretriz' + id;
      boxTituloDiretriz.addEventListener( 'click', function expandir(){
        var nome = '#boxExpansaoDiretriz' + id;
        $(nome).toggle();
        console.log('aaaaa');
      });

      var buttonTipoDiretriz = document.createElement("div");
        buttonTipoDiretriz.classList.add("boxFlex");
        buttonTipoDiretriz.classList.add("buttonTipoDiretriz");

        var iconButtonTipoDiretriz = document.createElement("i");
          iconButtonTipoDiretriz.classList.add("material-icons-round");
          iconButtonTipoDiretriz.textContent = "border_style";
        buttonTipoDiretriz.appendChild(iconButtonTipoDiretriz); 
      
      boxTituloDiretriz.appendChild(buttonTipoDiretriz);
      
      
      var tituloDiretriz = document.createElement("div");
        tituloDiretriz.classList.add("tituloDiretriz");

        var textoTituloDiretriz = document.createElement("p");
          textoTituloDiretriz.classList.add("textoTituloDiretriz");
          textoTituloDiretriz.textContent = titulo;
        tituloDiretriz.appendChild(textoTituloDiretriz);
      
      boxTituloDiretriz.appendChild(tituloDiretriz);

      var buttonHelpDiretriz = document.createElement("div");
        buttonHelpDiretriz.classList.add("buttonHelpDiretriz");

        var iconButtonHelpDiretriz = document.createElement("i");
          iconButtonHelpDiretriz.classList.add("material-icons-round");
          iconButtonHelpDiretriz.textContent = "help";
          iconButtonHelpDiretriz.style.fontSize = '100%';
        buttonHelpDiretriz.appendChild(iconButtonHelpDiretriz);

      boxTituloDiretriz.appendChild(buttonHelpDiretriz);

    quadroDiretriz.appendChild(boxTituloDiretriz);

    var boxExpansaoDiretriz = document.createElement("div");
      boxExpansaoDiretriz.classList.add("boxFlex");
      boxExpansaoDiretriz.classList.add("boxExpansaoDiretriz");
      boxExpansaoDiretriz.id = 'boxExpansaoDiretriz' + id;

      var boxDescricaoDiretriz = document.createElement("div");
          boxDescricaoDiretriz.classList.add("boxFlex");
          boxDescricaoDiretriz.classList.add("boxDescricaoDiretriz");

          var descricaoDiretriz = document.createElement("p");
            descricaoDiretriz.classList.add("descricaoDiretriz");
            descricaoDiretriz.textContent = descricao;
          boxDescricaoDiretriz.appendChild(descricaoDiretriz);

      boxExpansaoDiretriz.appendChild(boxDescricaoDiretriz);

      var boxExemploDiretriz = document.createElement("div");
          boxExemploDiretriz.classList.add("boxFlex");
              
          var imgExemploDiretriz = document.createElement("img");
            imgExemploDiretriz.src = imagemExemplo;
            imgExemploDiretriz.alt = "Exemplo da Diretriz";
            imgExemploDiretriz.classList.add("imgExemploDiretriz");
          boxExemploDiretriz.appendChild(imgExemploDiretriz);

      boxExpansaoDiretriz.appendChild(boxExemploDiretriz);

      var boxSugestaoDiretriz = document.createElement("div");
        boxSugestaoDiretriz.classList.add("boxFlex");

        var Sugestõesh4 = document.createElement("h4");
          Sugestõesh4.textContent = "Sugestões";
        boxSugestaoDiretriz.appendChild(Sugestõesh4);

        var sugestaoDiretriz = document.createElement("div");
        sugestaoDiretriz.classList.add("boxFlex");
        sugestaoDiretriz.classList.add("sugestaoDiretriz");

          var iconSugestaoDiretriz = document.createElement("i");
            iconSugestaoDiretriz.classList.add("material-icons-round");
            iconSugestaoDiretriz.classList.add("iconSugestaoDiretriz");
            iconSugestaoDiretriz.textContent = "arrow_right_alt";
          sugestaoDiretriz.appendChild(iconSugestaoDiretriz);

          var textoSugestaoDiretriz = document.createElement("p");
            textoSugestaoDiretriz.classList.add("textoSugestaoDiretriz");
            textoSugestaoDiretriz.textContent = sugestao;
          sugestaoDiretriz.appendChild(textoSugestaoDiretriz);
        
        boxSugestaoDiretriz.appendChild(sugestaoDiretriz);

      boxExpansaoDiretriz.appendChild(boxSugestaoDiretriz);            
            
    quadroDiretriz.appendChild(boxExpansaoDiretriz);
  
  document.getElementById("boxDiretrizes").appendChild(quadroDiretriz);
}
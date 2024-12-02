//DADOS PARA CHAMADA DE API
let sheetId = "1A452g1pzmF5IAM7q6icUhgXiqtgEdmSDTJmw9arwfxQ";
let cell = "Página1!H13:J20";
let trintenaCell = "Página2!H13:J20"
let apiKey = "AIzaSyB4IiZhpNHBD2L_uDglNWowRYunIoIoNWU";

//OBTENÇÃO DE DADOS DA PLANILHA
const realizadoEstudosGet = async() => {
    let realizadoEstudos;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${cell}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            realizadoEstudos = parseFloat(data.values[0][0]);
        })
        .catch(error => console.error('Erro ao acessar planilha:', error));
    return realizadoEstudos ? realizadoEstudos.toFixed(2):null;
}

const realizadoTrintenaGet = async() => {
    let realizadoTrintena;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${trintenaCell}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            realizadoTrintena = parseFloat(data.values[0][0]);
        })
        .catch(error => console.error('Erro ao acessar planilha:', error));
    return realizadoTrintena ? realizadoTrintena.toFixed(2):null;
}

const main = async () => {
    const realizado = await realizadoEstudosGet();
    const realizadoTrint = await  realizadoTrintenaGet();

    //DEFINIÇÕES
    /******************ALTERAR LINHA ABAIXO*************************************/
    const meta = 21;
    const metaTrint = 19.17;
    /******************ALTERAR LINHA ACIMA**************************************/

    
    document.getElementById("mensal-meta-pts").textContent = meta.toFixed(2).replace('.',',') + " pts";
    document.getElementById("mensal-meta-pts2").textContent = metaTrint.toFixed(2).replace('.',',') + " pts";
    
    const porcentagem = (realizado / meta)*100;
    const porcentagemTrint = (realizadoTrint / metaTrint)*100;
    const reguaMax = 120;
    const ptsMax = 360;
    const ptsMaxTrint = 240;

    //CALCULA PONTOS PROPORCIONAIS AOS 30 PONTOS
    const pts = (ptsMax*porcentagem)/reguaMax;
    console.log('pts', pts);
    const ptsTrint = (ptsMaxTrint*porcentagemTrint)/reguaMax;
    console.log('ptsTrint', ptsTrint);
    document.getElementById("pontuacao").textContent = pts.toFixed(2).replace('.',',') + "/360,00 máx";
    document.getElementById("pontuacao2").textContent = ptsTrint.toFixed(2).replace('.',',') + "/240,00 máx";


    if (pts >= ptsMax){
        document.getElementById("pontuacao").textContent = "360,00/360,00 máx";
    }
    
    if (ptsTrint >= ptsMaxTrint){
        document.getElementById("pontuacao2").textContent = "240,00/240,00 máx";
    }

    //INSERE OS LOUROS QUANDO ATINGIDA A RÉGUA MÁXIMA
    if (porcentagem >= 120){
        document.getElementById("circle").style.display = "none";       
        document.getElementById("louros").style.display = "block";
    } else {
        document.getElementById("pontuacao").textContent = pts.toFixed(2).replace('.',',') + "/360,00 máx";
        document.getElementById("louros").style.display = "none";      
    }

    if (porcentagemTrint >= 120){
        document.getElementById("circle2").style.display = "none";       
        document.getElementById("louros2").style.display = "block";
    } else {
        document.getElementById("pontuacao2").textContent = ptsTrint.toFixed(2).replace('.',',') + "/240,00 máx";
        document.getElementById("louros2").style.display = "none";      
    }

    //MUDA COR DO CÍRCULO
    if (porcentagem >= 95){
        document.getElementById("circulo-progresso").setAttribute("stroke", "green");
    } else if (porcentagem >= 70){
        document.getElementById("circulo-progresso").setAttribute("stroke", "orange");
    }

    if (porcentagemTrint >= 95){
        document.getElementById("circulo-progresso2").setAttribute("stroke", "green");
    } else if (porcentagemTrint >= 70){
        document.getElementById("circulo-progresso2").setAttribute("stroke", "orange");
    }

    //REMOVE DECIMAIS QUANDO PORCENTAGEM >= 100
    if (porcentagem >= 100){
        document.getElementById("atingimento-percentage").textContent = porcentagem.toFixed(0) + "%";
    } else {
        document.getElementById("atingimento-percentage").textContent = porcentagem.toFixed(1) + "%";
    }
    
    if (porcentagemTrint >= 100){
        document.getElementById("atingimento-percentage2").textContent = porcentagemTrint.toFixed(0) + "%";
    } else {
        document.getElementById("atingimento-percentage2").textContent = porcentagemTrint.toFixed(1) + "%";
    }

    //PONTUAÇÃO MENSAL REALIZADA
    document.getElementById("realizado-meta-pts").textContent = realizado.replace('.',',') + " pts";
    document.getElementById("realizado-meta-pts2").textContent = realizadoTrint.replace('.',',') + " pts"
    console.log(realizado);
    /*CÁLCULO DO FILL DO CÍRCULO
    O raio da circunferência é 188.4 (r=30, circ = 2*pi*r). É necessário obter os valores da área a ser preenchida e da área vazia.
    O const fill calcula quanto o círculo será preenchido. O const empty subtrai a circuferência do valor do fill,
    obtendo o valor da área vazia.*/
    const circunference = 188.4;
    const fill = circunference*(porcentagem/100);
    const fillTrint = circunference*(porcentagemTrint/100);
    const empty = circunference-fill;
    const emptyTrint = circunference-fillTrint;


    document.getElementById("circulo-progresso").setAttribute("stroke-dasharray", `${fill} ${empty}`);
    document.getElementById("circulo-progresso2").setAttribute("stroke-dasharray", `${fillTrint} ${emptyTrint}`);

    //CALCULA PONTUAÇÃO GERAL
    const ptsGeral = pts + ptsTrint;
    const ptsGeralFixed = ptsGeral.toFixed(2);
    document.getElementById("pontuacao-geral").textContent = "Pontuação Geral: " + ptsGeralFixed.toString().replace('.',',');

};

main();


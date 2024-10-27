/**************************************************************************************************************** 
                                     ALTERAR SOMENTE VALOR ABAIXO
*****************************************************************************************************************/
const realizado = 0;
/**************************************************************************************************************** 
                                     ALTERAR SOMENTE VALOR ACIMA
*****************************************************************************************************************/
const meta = 22;
const porcentagem = (realizado / meta)*100;
const reguaMax = 120;
const ptsMax = 30;

//CALCULA PONTOS PROPORCIONAIS AOS 30 PONTOS
const pts = (ptsMax*porcentagem)/reguaMax;
console.log(pts);
document.getElementById("pontuacao").textContent = pts.toFixed(2).replace('.',',') + "/30,00 máx";

//INSERE OS LOUROS QUANDO ATINGIDA A RÉGUA MÁXIMA
if (porcentagem >= 120){
    document.getElementById("circle").style.display = "none";       
    document.getElementById("louros").style.display = "block";
} else {
    document.getElementById("pontuacao").textContent = pts.toFixed(2).replace('.',',') + "/30,00 máx";
    document.getElementById("louros").style.display = "none";      
}

//MUDA COR DO CÍRCULO
if (porcentagem >= 95 ){
    document.getElementById("circulo-progresso").setAttribute("stroke", "green");
} else if (porcentagem >= 80){
    document.getElementById("circulo-progresso").setAttribute("stroke", "orange");
}

//REMOVE DECIMAIS QUANDO PORCENTAGEM >= 100
if (porcentagem >= 100){
    document.getElementById("atingimento-percentage").textContent = porcentagem.toFixed(0) + "%";
} else {
    document.getElementById("atingimento-percentage").textContent = porcentagem.toFixed(1) + "%";
}

//PONTUAÇÃO MENSAL REALIZADA

document.getElementById("realizado-meta-pts").textContent = realizado.toFixed(0) + ",00 pts"

/*CÁLCULO DO FILL DO CÍRCULO
O raio da circunferência é 188.4 (r=30, circ = 2*pi*r). É necessário obter os valores da área a ser preenchida e da área vazia.
O const fill calcula quanto o círculo será preenchido. O const empty subtrai a circuferência do valor do fill,
obtendo o valor da área vazia.*/
const circunference = 188.4;
const fill = circunference*(porcentagem/100);
const empty = circunference-fill;

document.getElementById("circulo-progresso").setAttribute("stroke-dasharray", `${fill} ${empty}`);


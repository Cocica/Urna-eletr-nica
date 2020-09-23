const seuVoto = document.querySelector(".d-1-1 span");
const cargo = document.querySelector(".d-1-2 span");
const descricao = document.querySelector(".d-1-4");
const aviso = document.querySelector(".d-2");
const lateral = document.querySelector(".d-1-right");
const numeros = document.querySelector(".d-1-3");

let etapaAtual = 0;
let numeroAtual = "";
let votoBranco = true;
let votoFinal = [];

function iniciaEtapa() {
  let etapa = etapas[etapaAtual]; //seleciona a etapa do array de objetos presente no arquivo etapas.js
  let numeroHtml = "";
  numeroAtual = "";
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) numeroHtml += '<div class="numero pisca"></div>';
    else numeroHtml += '<div class="numero"></div>';
  }
  seuVoto.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function interfaceAtt() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numeroAtual) return true;
    else return false;
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVoto.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

    let fotosHtml = "";
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      }
    }

    lateral.innerHTML = fotosHtml;
  } else {
    seuVoto.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO </div>';
  }
}

function clicou(n) {
  const elNumero = document.querySelector(".numero.pisca");
  if (elNumero != null) {
    elNumero.innerHTML = n;
    numeroAtual = `${numeroAtual}${n}`;

    elNumero.classList.remove("pisca");
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add("pisca");
    } else interfaceAtt();
  }
}

function branco() {
  numeroAtual = "";
  votoBranco = true;
  seuVoto.style.display = "block";
  aviso.style.display = "block";
  numeros.innerHTML = "";
  descricao.innerHTML =
    '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>';
  lateral.innerHTML = "";
}

function corrige() {
  iniciaEtapa();
}

function confirma() {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;
    votoFinal.push({
      etapa: etapas[etapaAtual].titulo,
      voto: "Branco",
    });
  } else if (etapa.numeros === numeroAtual.length) {
    votoConfirmado = true;
    votoFinal.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numeroAtual,
    });
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      iniciaEtapa();
    } else {
      document.querySelector(".tela").innerHTML =
        '<div class="aviso--gigante pisca pisca"> FIM </div>';
      console.log(votoFinal);
    }
  }
}

iniciaEtapa();

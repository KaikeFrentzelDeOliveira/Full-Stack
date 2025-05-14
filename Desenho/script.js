const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

function desenhar_quadrado(x, y, tamanho, cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, tamanho, tamanho);
}

function desenhar_linha(x1, y1, x2, y2, cor) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = cor;
  ctx.stroke();
}

function desenhar_arco(x, y, raio, inicio, fim, cor) {
  ctx.beginPath();
  ctx.arc(x, y, raio, inicio, fim);
  ctx.strokeStyle = cor;
  ctx.stroke();
}

function escrever(texto, x, y) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(texto, x, y);
}

function desenhar_escada(x, y, cor, lado = "direita") {
  ctx.fillStyle = cor;
  if (lado === "direita") {
    ctx.fillRect(x, y + 30, 30, 30);
    ctx.fillRect(x + 30, y, 30, 60);
  } else if (lado === "esquerda") {
    ctx.fillRect(x + 30, y + 30, 30, 30);
    ctx.fillRect(x, y, 30, 60);
  }
}

desenhar_escada(0, 250, "yellow");
desenhar_escada(240, 240, "black");

desenhar_linha(0, 0, 150, 150, "blue");
desenhar_linha(300, 0, 150, 150, "red");
desenhar_linha(0, 150, 300, 150, "green");
desenhar_linha(150, 150, 150, 300, "black");

desenhar_quadrado(0, 0, 50, "blue");
desenhar_quadrado(250, 0, 50, "red");
desenhar_quadrado(0, 135, 40, "cyan");
desenhar_quadrado(280, 135, 30, "cyan");
desenhar_quadrado(120, 150, 30, "red");

function desenhar_circulo(x, y, raio, corPreenchimento, corContorno) {
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.fillStyle = corPreenchimento;
  ctx.fill();
  ctx.strokeStyle = corContorno;
  ctx.stroke();
}

desenhar_circulo(150, 120, 10, "cyan", "blue");
desenhar_circulo(80, 210, 10, "yellow", "green");
desenhar_circulo(220, 210, 10, "yellow", "green");

desenhar_arco(150, 150, 30, Math.PI, 0, "green");
desenhar_arco(150, 150, 50, Math.PI, 0, "green");
desenhar_arco(150, 300, 50, Math.PI, Math.PI * 2, "green");

escrever("Canvas", 120, 80);


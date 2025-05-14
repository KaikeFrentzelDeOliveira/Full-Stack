let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


// retângulos
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.fillRect(10,10,50,50);
ctx.strokeRect(0,0,70,70);
ctx.closePath();


// linhas
ctx.beginPath();
ctx.lineWidth = 4;
ctx.fillStyle = 'green';
ctx.strokeStyle = 'red';
ctx.moveTo(200,150);
ctx.lineTo(70,0);
ctx.lineTo(70,250);
ctx.lineTo(200,250);
ctx.lineTo(200,150);
ctx.fill();
ctx.stroke();
ctx.closePath();


// arcos


// texto
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.font = "50px Arial"
ctx.textAlign = "center";
ctx.fillText("Olá",200,350);
ctx.strokeText("Olá",200,350)
ctx.closePath();

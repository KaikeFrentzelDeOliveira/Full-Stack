let canvas = document.getElementById('casinha')
let ctx = canvas.getContext('2d')

//FUNDO
ctx.beginPath();
ctx.lineWidth  = 2;
ctx.fillStyle = 'cyan';
ctx.fillRect(10,10,600,600);
ctx.closePath();

//CHAO
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'gray'
ctx.fillRect (10,400,600,200)
ctx.closePath();

//CASA
ctx.beginPath();
ctx.fillStyle ='brown'
ctx.fillRect (235,250,120,150 )
ctx.closePath();

//SOL

ctx.beginPath();
ctx.fillStyle ='yellow'
ctx.arc (480,100,50,0*Math.PI,2*Math.PI)
ctx.fill();
ctx.closePath

//telhado

ctx.beginPath()
ctx.fillStyle = "red"
ctx.moveTo(210,250)
ctx.lineTo(235,200);
ctx.lineTo(300,250);
ctx.lineTo(300,250);
ctx.fill()
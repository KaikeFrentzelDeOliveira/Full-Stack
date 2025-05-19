const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

const image = new Image();
image.src = 'https://example.com/your-image.png';

image.onload = function() {
  drawImageAtMousePosition();
};

function drawImageAtMousePosition() {
  canvas.addEventListener('mousemove', function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const imgWidth = image.width;
    const imgHeight = image.height;
    const x = mouseX - imgWidth / 2;
    const y = mouseY - imgHeight / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y);
  });

  canvas.addEventListener('mouseout', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
  });
}

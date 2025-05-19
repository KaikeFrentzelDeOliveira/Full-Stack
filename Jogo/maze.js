(() => {
  const canvas = document.getElementById('mazeCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const WALL_THICKNESS = 12;
  const PLAYER_RADIUS = 12;
  const PLAYER_COLOR = '#00bbff';
  const GOAL_WIDTH = 60;
  const GOAL_HEIGHT = 60;
  const GOAL_COLOR = '#44ff55';

  const messageEl = document.getElementById('message');

  let player = {
    x: WALL_THICKNESS + PLAYER_RADIUS + 5,
    y: height - WALL_THICKNESS - PLAYER_RADIUS - 5
  };

  let dragging = false;
  let gameEnded = false;

  const walls = [
    { x: 0, y: 0, w: width, h: WALL_THICKNESS },
    { x: 0, y: height - WALL_THICKNESS, w: width, h: WALL_THICKNESS },
    { x: 0, y: 0, w: WALL_THICKNESS, h: height },
    { x: width - WALL_THICKNESS, y: 0, w: WALL_THICKNESS, h: height },

    { x: 150, y: 0, w: WALL_THICKNESS, h: 500 },
    { x: 50, y: 0, w: WALL_THICKNESS, h: 250},
    { x: 50, y: 200, w: 200, h: WALL_THICKNESS },
    { x: 50, y: 300, w: 13, h: height },
    { x: 100, y: 300, w: 13, h: 200 },
    { x: 100, y: 500 , w: 100, h: 10 },
    { x: 200, y: 310, w: 13, h: 200 },
    { x: 50, y: 550 , w: 200, h: 10 },
    { x: 250, y: 270, w: 13, h: 500},
    { x: 300, y: 200, w: 13, h: 600},
    { x: 200, y: 150 , w: 150, h: 10 },
    { x: 200, y: 0, w: WALL_THICKNESS, h: 110 },
  ];

  const goal = {
    x: width - WALL_THICKNESS - GOAL_WIDTH - 5,
    y: WALL_THICKNESS + 5,
    w: GOAL_WIDTH,
    h: GOAL_HEIGHT
  };

  function drawMaze() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ffcc';
    walls.forEach(wall => {
      ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
    });

    ctx.fillStyle = GOAL_COLOR;
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

    ctx.beginPath();
    ctx.fillStyle = PLAYER_COLOR;
    ctx.shadowColor = '#00bbff';
    ctx.shadowBlur = 15;
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function circleRectColliding(circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.w / 2);
    const distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.radius)) return false;
    if (distY > (rect.h / 2 + circle.radius)) return false;

    if (distX <= rect.w / 2) return true;
    if (distY <= rect.h / 2) return true;

    const dx = distX - rect.w / 2;
    const dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= circle.radius * circle.radius);
  }

  function checkCollisionWithWalls() {
    return walls.some(wall => circleRectColliding({x: player.x, y: player.y, radius: PLAYER_RADIUS}, wall));
  }

  function checkWin() {
    return (
      player.x + PLAYER_RADIUS > goal.x &&
      player.x - PLAYER_RADIUS < goal.x + goal.w &&
      player.y + PLAYER_RADIUS > goal.y &&
      player.y - PLAYER_RADIUS < goal.y + goal.h
    );
  }

  function gameLost() {
    gameEnded = true;
    messageEl.innerHTML = "Você perdeu!<br /><button id='restartBtn' aria-label='Reiniciar o jogo'>Jogar novamente</button>";
    messageEl.classList.add('show');
    messageEl.focus();

    const newRestartBtn = messageEl.querySelector('#restartBtn');
    newRestartBtn.addEventListener('click', () => {
      restartGame();
    });
  }

  function gameWon() {
    gameEnded = true;
    messageEl.innerHTML = "Você ganhou!<br /><button id='restartBtn' aria-label='Reiniciar o jogo'>Jogar novamente</button>";
    messageEl.classList.add('show');
    messageEl.focus();

    const newRestartBtn = messageEl.querySelector('#restartBtn');
    newRestartBtn.addEventListener('click', () => {
      restartGame();
    });
  }

  function restartGame() {
    gameEnded = false;
    player.x = WALL_THICKNESS + PLAYER_RADIUS + 5;
    player.y = height - WALL_THICKNESS - PLAYER_RADIUS - 5;
    messageEl.classList.remove('show');
    messageEl.innerHTML = '';
    drawMaze();
  }

  function isPointInCircle(x, y, circle) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  function onPointerDown(e) {
    e.preventDefault();
    if (gameEnded) return;
    const pos = getCanvasPos(e);
    if (isPointInCircle(pos.x, pos.y, { x: player.x, y: player.y, radius: PLAYER_RADIUS })) {
      dragging = true;
      movePlayer(e);
    }
  }

  function onPointerMove(e) {
    if (!dragging || gameEnded) return;
    movePlayer(e);
  }

  function onPointerUp(e) {
    dragging = false;
  }

  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    x = Math.max(PLAYER_RADIUS, Math.min(width - PLAYER_RADIUS, x));
    y = Math.max(PLAYER_RADIUS, Math.min(height - PLAYER_RADIUS, y));
    return { x, y };
  }

  function movePlayer(e) {
    const pos = getCanvasPos(e);
    player.x = pos.x;
    player.y = pos.y;

    if (checkCollisionWithWalls()) {
      gameLost();
      drawMaze();
      return;
    }

    if (checkWin()) {
      gameWon();
    }

    drawMaze();
  }

  function init() {
    drawMaze();

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    canvas.addEventListener('touchend', onPointerUp);
    canvas.addEventListener('touchcancel', onPointerUp);

    canvas.style.outline = 'none';
  }

  init();
})();
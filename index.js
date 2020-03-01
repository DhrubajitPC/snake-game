const bgColor = "#74888b";
const snakeColor = "#15EA9C";
const foodColor = "#EA1563";

window.onload = () => {
  document.addEventListener("keydown", handleKeyPress);
  const score = document.getElementById("score");
  let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 }
  ];
  let currentDirection = "right";
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  let lastTail;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let food = generateFood();

  function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(({ x, y }) => ctx.fillRect(x, y, 10, 10));
  }

  function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, 10, 10);
  }

  function getRandomPoint() {
    return {
      x: Math.floor(Math.random() * 29) * 10,
      y: Math.floor(Math.random() * 29) * 10
    };
  }

  function generateFood() {
    let food = getRandomPoint();
    let clash = false;
    for (let pos of snake) {
      if (pos.x === food.x && pos.y === food.y) {
        clash = true;
      }
    }
    if (clash) {
      generateFood();
    } else {
      return food;
    }
  }

  function handleKeyPress(e) {
    switch (e.key) {
      case "ArrowLeft":
        if (currentDirection !== "right") {
          currentDirection = "left";
        }
        break;
      case "ArrowUp":
        if (currentDirection !== "down") {
          currentDirection = "up";
        }
        break;
      case "ArrowRight":
        if (currentDirection !== "left") {
          currentDirection = "right";
        }
        break;
      case "ArrowDown":
        if (currentDirection !== "up") {
          currentDirection = "down";
        }
        break;
    }
  }

  function move() {
    const head = snake[0];
    lastTail = snake.pop(snake.length - 1);
    if (currentDirection == "left") {
      snake.unshift({ ...head, x: head.x - 10 });
    } else if (currentDirection == "right") {
      snake.unshift({ ...head, x: head.x + 10 });
    } else if (currentDirection == "up") {
      snake.unshift({ ...head, y: head.y - 10 });
    } else if (currentDirection == "down") {
      snake.unshift({ ...head, y: head.y + 10 });
    }
    eat();
    drawFood();
    drawSnake();
  }

  function endGame() {
    for (let pos of snake.slice(1)) {
      if (pos.x === snake[0].x && pos.y === snake[0].y) {
        return true;
      }
    }
    return (
      snake[0].x === 0 ||
      snake[0].x === 300 ||
      snake[0].y === 0 ||
      snake[0].y === 300
    );
  }

  function resetCanvas() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function eat() {
    if (snake[0].x === food.x && snake[1].y === food.y) {
      snake.push(lastTail);
      food = generateFood();
    }
  }

  function updateScore() {
    score.innerText = `Score: ${(snake.length - 4) * 10}`;
  }

  (function main() {
    updateScore();
    resetCanvas();
    move();
    setTimeout(() => {
      if (!endGame()) main();
    }, 100);
  })();
};

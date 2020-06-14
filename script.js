const blocks = document.querySelectorAll(".game div");

const countRow = Math.sqrt(blocks.length);

let playerIndex = Math.round(blocks.length - countRow / 2);

let move = 1;

const indexEnemy = [
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
];

const killedEnemy = [];

const moveEnemies = () => {
  const leftBlockEnemies = indexEnemy[0] % countRow === 0;
  const rightBlockEnemies =
    indexEnemy[indexEnemy.length - 1] % countRow === countRow - 1;

  if ((leftBlockEnemies && move === -1) || (rightBlockEnemies && move === 1)) {
    move = countRow;
  } else if (move === countRow) {
    move = leftBlockEnemies ? 1 : -1;
  }

  indexEnemy.forEach((index) => {
    blocks[index].classList.remove("enemy");
  });

  for (let i = 0; i < indexEnemy.length; i++) {
    indexEnemy[i] += move;
  }

  indexEnemy.forEach((index, i) => {
    if (!killedEnemy.includes(i)) {
      blocks[index].classList.add("enemy");
    }
  });

  if (blocks[playerIndex].classList.contains("enemy")) {
    alert("game over");
    endGame();
    return;
  }

  if (killedEnemy.length === indexEnemy.length) {
    alert("Ура!Победа!");
    endGame();
    return;
  }

  setTimeout(moveEnemies, 250);
};

moveEnemies();

for (const enemy of indexEnemy) {
  blocks[enemy].classList.add("enemy");
}

blocks[playerIndex].classList.add("player");

const movePlayer = (event) => {
  blocks[playerIndex].classList.remove("player");

  if (event.code === "ArrowLeft" && playerIndex > blocks.length - countRow) {
    playerIndex--;
  }

  if (event.code === "ArrowRight" && playerIndex < blocks.length - 1) {
    playerIndex++;
  }

  blocks[playerIndex].classList.add("player");
};

document.addEventListener("keydown", movePlayer);

const fire = (event) => {
  if (event.code === "Space") {
    let bulletIndex = playerIndex;

    const flyBullet = () => {
      blocks[bulletIndex].classList.remove("bullet");
      bulletIndex -= countRow;
      blocks[bulletIndex].classList.add("bullet");

      if (bulletIndex < countRow) {
        setTimeout(() => {
          blocks[bulletIndex].classList.remove("bullet");
        }, 50);
        return;
      }

      if (blocks[bulletIndex].classList.contains("enemy")) {
        const indexKilledEnemy = indexEnemy.indexOf(bulletIndex);
        blocks[bulletIndex].classList.remove("bullet");
        blocks[bulletIndex].classList.remove("enemy");
        killedEnemy.push(indexKilledEnemy);
        return;
      }

      setTimeout(flyBullet, 50);
    };

    flyBullet();
  }
};

document.addEventListener("keydown", fire);

const endGame = () => {
  document.removeEventListener("keydown", movePlayer);
  document.removeEventListener("keydown", fire);
};

import React, { Component } from "react";
class Canvas extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 500;

    const cw = canvas.width;
    const ch = canvas.height;

    const ballSize = 20;
    let ballX = cw / 2 - ballSize / 2;
    let ballY = ch / 2 - ballSize / 2;

    const paddelHeight = 100;
    const paddelWidth = 20;
    const playerX = 70;
    const aiX = 910;
    let playerY = 200;
    let aiY = 200;
    const lineWidth = 6;
    const lineHeight = 16;
    let ballSpeedX = 2;
    let ballSpeedY = 2;
    const topCanvas = canvas.offsetTop;
    let playerPoints = 0;
    let aiPoints = 0;
    let aiSpeedA = 18;
    let aiSpeedB = 12;

    function table() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, cw, ch);

      for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray";
        ctx.fillRect(
          cw / 2 - lineWidth / 2,
          linePosition,
          lineWidth,
          lineHeight
        );
      }
    }
    function speedUpY() {
      if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX = ballSpeedX + 0.5;
      } else {
        ballSpeedX = ballSpeedX - 0.5;
      }
    }
    function speedUpX() {
      if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY = ballSpeedY + 0.2;
      } else {
        ballSpeedY = ballSpeedY - 0.2;
      }
    }

    function ball() {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(ballX, ballY, ballSize, ballSize);
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUpY();
      }

      if (ballX <= 0) {
        start();
        aiPoints = aiPoints + 1;
        aiSpeedA = aiSpeedA - 2;
        aiSpeedB = aiSpeedB - 2;
        if (aiPoints === 3) {
          aiPoints = "AI WIN!!!";
          stop();
        }
      }
      if (ballX + ballSize >= cw) {
        start();
        playerPoints = playerPoints + 1;
        aiSpeedA = aiSpeedA + 2;
        aiSpeedB = aiSpeedB + 2;
        if (playerPoints === 3) {
          playerPoints = "PLAYER WIN!!!";
          stop();
        }
      }
      if (
        ballX <= playerX + paddelWidth &&
        ballX >= playerX &&
        ballY >= playerY &&
        ballY <= playerY + paddelHeight
      ) {
        ballSpeedX = -ballSpeedX;
        speedUpX();
      }
      if (
        ballX + ballSize >= aiX &&
        ballX <= aiX &&
        ballY >= aiY &&
        ballY <= aiY + paddelHeight
      ) {
        ballSpeedX = -ballSpeedX;
        speedUpX();
      }
    }
    function paddel() {
      ctx.fillStyle = "#7FFF00";
      ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);

      ctx.fillStyle = "magenta";
      ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
    }
    function playerPosition(e) {
      playerY = e.clientY - topCanvas - paddelHeight / 2;
      if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight;
      }
      if (playerY <= 0) {
        playerY = 0;
      }
    }
    function aiPosition() {
      if (ballX > 500) {
        if (aiY + paddelHeight / 2 - ballY > 200) {
          aiY -= aiSpeedA;
        } else if (aiY + paddelHeight / 2 - ballY > 50) {
          aiY -= aiSpeedB;
        } else if (aiY + paddelHeight / 2 - ballY < -200) {
          aiY += aiSpeedA;
        } else if (aiY + paddelHeight / 2 - ballY < -50) {
          aiY += aiSpeedB;
        }
      } else if (ballX <= 500 && ballX > 150) {
        if (aiY - ballY > 100) {
          aiY -= 2;
        } else if (aiY - ballY < -100) {
          aiY += 2;
        }
      }
      if (aiY >= ch - paddelHeight) {
        aiY = ch - paddelHeight;
      }
      if (aiY <= 0) {
        aiY = 0;
      }
    }
    function start() {
      ballX = cw / 2 - ballSize / 2;
      ballY = ch / 2 - ballSize / 2;
      playerY = 200;
      aiY = 200;
      ballSpeedX = 2;
      ballSpeedY = 2;
    }
    function stop() {
      ballSpeedY = 0;
      ballSpeedX = 0;
    }

    canvas.addEventListener("mousemove", playerPosition);
    function playerPoint() {
      ctx.font = "54px arial";
      ctx.fillStyle = "red";
      ctx.fillText(`${playerPoints}`, 250, 50);
    }
    function aiPoint() {
      ctx.font = "54px arial";
      ctx.fillStyle = "red";
      ctx.fillText(`${aiPoints}`, 750, 50);
    }
    function game() {
      table();
      ball();
      paddel();
      aiPosition();
      playerPoint();
      aiPoint();
    }

    setInterval(game, 1000 / 60);
  }

  render() {
    return (
      <div>
        <canvas ref="canvas"></canvas>
      </div>
    );
  }
}

export default Canvas;

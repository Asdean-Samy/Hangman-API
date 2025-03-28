import React, { useEffect, useRef } from "react";

interface HangmanCanvasProps {
  errorsLeft: number;
  secretWord: string;
  guessedLetters: string;
}

const HangmanCanvas: React.FC<HangmanCanvasProps> = ({ errorsLeft, secretWord, guessedLetters }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Effacer le canvas avant de redessiner
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la structure de base
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(150, 300);
    ctx.moveTo(100, 300);
    ctx.lineTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 80);
    ctx.stroke();

    // Fonction pour dessiner une partie du pendu
    const drawPart = (fn: () => void) => {
      if (errorsLeft < 10) fn();
    };

    // Dessiner la tête
    drawPart(() => {
      ctx.beginPath();
      ctx.arc(200, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Dessiner le corps
    drawPart(() => {
      ctx.moveTo(200, 120);
      ctx.lineTo(200, 200);
      ctx.stroke();
    });

    // Bras gauche
    drawPart(() => {
      ctx.moveTo(200, 140);
      ctx.lineTo(170, 170);
      ctx.stroke();
    });

    // Bras droit
    drawPart(() => {
      ctx.moveTo(200, 140);
      ctx.lineTo(230, 170);
      ctx.stroke();
    });

    // Jambe gauche
    drawPart(() => {
      ctx.moveTo(200, 200);
      ctx.lineTo(170, 250);
      ctx.stroke();
    });

    // Jambe droite
    drawPart(() => {
      ctx.moveTo(200, 200);
      ctx.lineTo(230, 250);
      ctx.stroke();
    });

    // Dessiner les lettres trouvées
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    secretWord.split("").forEach((letter, index) => {
      const x = 50 + index * 30;
      const y = 350;
      if (guessedLetters.includes(letter)) {
        ctx.fillText(letter, x, y);
      } else {
        ctx.fillText("_", x, y);
      }
    });

  }, [errorsLeft, secretWord, guessedLetters]);

  return <canvas ref={canvasRef} width={400} height={400} style={{ border: "1px solid black" }} />;
};

export default HangmanCanvas;

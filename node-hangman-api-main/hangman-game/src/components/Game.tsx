import React from "react";
import HangmanCanvas from "./HangmanCanvas";
import { useHangman } from "../hooks/useHangman";  

const Game: React.FC = () => {
  const { secretWord, guessedLetters, errorsLeft, checkWinner, checkGameOver } = useHangman();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hangman Game</h1>
      
      {/* Convertit secretWord en string si c'est un tableau */}
      <HangmanCanvas 
        secretWord={Array.isArray(secretWord) ? secretWord.join("") : secretWord} 
        guessedLetters={Array.isArray(guessedLetters) ? guessedLetters.join("") : guessedLetters} 
        errorsLeft={errorsLeft} 
      />

      <p>Erreurs restantes : {errorsLeft}</p>

      {checkWinner() && <h2>🎉 Bravo, tu as gagné !</h2>}
      {checkGameOver() && <h2>💀 Perdu ! Le mot était : {secretWord}</h2>}
    </div>
  );
};

export default Game;

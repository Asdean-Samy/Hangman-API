import { useState, useEffect } from "react";

interface HangmanState {
  secretWord: string;
  guessedLetters: string;
  errorsLeft: number;
}

const useHangman = () => {
  const [state, setState] = useState<HangmanState>({
    secretWord: "",
    guessedLetters: "",
    errorsLeft: 10,
  });

  useEffect(() => {
    fetch("http://localhost:3333/") // Assurez-vous que l'API fonctionne
      .then((res) => res.json())
      .then((data) => {
        setState((prev) => ({ ...prev, secretWord: data.word }));
      });
  }, []);

  const checkIfLetter = (keyCode: number) => keyCode >= 65 && keyCode <= 90;

  const checkClickedLetters = (letter: string) =>
    !state.guessedLetters.includes(letter);

  const addCorrectLetter = (letter: string) => {
    setState((prev) => ({
      ...prev,
      guessedLetters: prev.guessedLetters + letter,
    }));
  };

  const addWrongLetter = (letter: string) => {
    setState((prev) => ({
      ...prev,
      errorsLeft: prev.errorsLeft - 1,
    }));
  };

  const checkGameOver = () => state.errorsLeft <= 0;

  const checkWinner = () =>
    state.secretWord.split("").every((letter) =>
      state.guessedLetters.includes(letter)
    );

  return {
    state,
    checkIfLetter,
    checkClickedLetters,
    addCorrectLetter,
    addWrongLetter,
    checkGameOver,
    checkWinner,
  };
};

export default useHangman;

import { useState, useEffect } from "react";
import getWordFromAPI from "../utils/getWordFromAPI";

export const useHangman = () => {
  const [secretWord, setSecretWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorsLeft, setErrorsLeft] = useState(6);

  // Charger un mot depuis l'API
  useEffect(() => {
    const fetchWord = async () => {
      const newWord = await getWordFromAPI();
      setSecretWord(newWord);
      setGuessedLetters([]); // Réinitialisation
      setErrorsLeft(6);
    };

    fetchWord();
  }, []);

  // Gérer la saisie clavier
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (/^[a-z]$/.test(letter) && !guessedLetters.includes(letter)) {
        setGuessedLetters((prev) => [...prev, letter]);

        if (!secretWord.includes(letter)) {
          setErrorsLeft((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [guessedLetters, secretWord]);

  // Vérifier si le joueur a gagné
  const checkWinner = () => {
    return secretWord && secretWord.split("").every((letter) => guessedLetters.includes(letter));
  };

  // Vérifier si le jeu est perdu
  const checkGameOver = () => errorsLeft <= 0;

  return { secretWord, guessedLetters, errorsLeft, checkWinner, checkGameOver };
};

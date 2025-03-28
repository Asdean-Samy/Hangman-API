const getWordFromAPI = async (): Promise<string> => {
    try {
      const response = await fetch("https://random-word-api.herokuapp.com/word?lang=fr");
      const data = await response.json();
      return data[0]; // Retourne le premier mot
    } catch (error) {
      console.error("Erreur lors de la récupération du mot :", error);
      return "erreur"; // Valeur par défaut en cas d'erreur
    }
  };
  
  export default getWordFromAPI;
  
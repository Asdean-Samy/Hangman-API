import axios from "axios";

export const fetchWord = async (): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:3333/", { locale: "fr-FR" });
    return response.data.word;
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
    return "erreur"; // Mot par défaut en cas d'échec
  }
};

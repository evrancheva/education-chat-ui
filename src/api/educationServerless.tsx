const ENDPOINT_URL: string = import.meta.env.VITE_EDUCATION_URL || "";

const askQuestion = async (q: string): Promise<string> => {
  try {
    const url = `${ENDPOINT_URL}/ask?q=${encodeURIComponent(q)}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { askQuestion };

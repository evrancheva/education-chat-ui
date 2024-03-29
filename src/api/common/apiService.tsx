const getPostData = async (
  apiUrlEndpoint: string,
  body: string
): Promise<string> => {
  try {
    const response = await fetch(apiUrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getPostData;

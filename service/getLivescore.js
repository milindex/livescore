async function getLiveScore() {
  const url = `https://www.hindustantimes.com/static-content/10s/cricket-liupre.json`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching live score: ${error.message}`);
  }
}

export default getLiveScore;

const apiData = (() => {
  const apiKey = 'EXVyZJ61yFONDqsxQDEV';

  const apiUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`;

  async function getData(url = apiUrl) {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error('No valid response from the server');
  }

  async function postData(data, url = apiUrl) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    await response.json();
  }

  return {
    getData,
    postData,
  };
})();

export default apiData;

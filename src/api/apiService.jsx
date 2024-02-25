import md5 from 'md5';

const makeApiRequest = async (requestData) => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);

  try {
    const response = await fetch('http://api.valantis.store:40000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': authString
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong:', error);
    return null;
  }
};

export default makeApiRequest;

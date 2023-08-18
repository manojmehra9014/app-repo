export const getTodaysEvent = async (date) => {
  try {
    return await fetch('http://13.200.103.27:8001/api/get-event', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

export const getPersonalizedEvents = async (data) => {
  try {
    const queryParams = new URLSearchParams({
      political_party: data.political_party,
      state: data.state,
      district: data.district,
      vidhan_shabha: data.vidhan_shabha,
      leader: data.leader,
      date: data.date,
    });
    const url = `http://13.200.103.27:8001/api/get-personalized-events?${queryParams.toString()}`;
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

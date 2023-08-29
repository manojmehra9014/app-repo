import { API_ENDPOINTS, getPersonalizedEventsaApi } from './Api_enpoint';
export const getTodaysEvent = async (date) => {
  try {
    return await fetch(API_ENDPOINTS.GET_EVENTS, {
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
    const url = `${API_ENDPOINTS.GET_PERSONALIZED_EVENT}?${queryParams.toString()}`;
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

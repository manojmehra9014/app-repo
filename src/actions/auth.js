import { API_ENDPOINTS , BASE_URL }from './Api_enpoint';
export const image_bg_remove_api = async (image, phoneNumber) => {
  try {
    if (!image) {
      console.error('No image selected!');
      return;
    }

    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const currentTimestamp = new Date().getTime(); // gets the current time in milliseconds
    const fileName = `91${phoneNumber}_${currentTimestamp}.${fileType}`;

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: fileName,
      type: `image/${fileType}`,
    });
    const response = await fetch(
      API_ENDPOINTS.REMOVE_BACKGROUND,
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const resp = await response.json();
    // console.log(resp);
    return resp.s3_object_url;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserStatus = async (phone_number) => {
  try {
    return await fetch(API_ENDPOINTS.USER_STATUS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number }),
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

export const sendOtpApi = async (phoneNumber) => {
  try {
    return await fetch(API_ENDPOINTS.SEND_OTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    })
      .then((response) => {
        // console.log(response ,"sendopt api resp")
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (e) {
    console.log(e);
    return {
      error: 'error',
      message: e,
    };
  }
};

export const registerUser = async (data) => {
  try {
    console.log('line 51');
    return await fetch(API_ENDPOINTS.REGISTER_USER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response, 'api resp');
        return response.json();
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  } catch (e) {
    console.log(e);
    return {
      error: 'error',
      message: e,
    };
  }
};
// phone_number

export const loginUser = async (phoneNumber, password) => {
  try {
    return await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phoneNumber, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  } catch (e) {
    console.log(e);
    return {
      error: 'error',
      message: e,
    };
  }
};



export const currentUser = async (authToken) => {
  try {
    return await fetch(API_ENDPOINTS.CURRENT_USER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authtoken: authToken,
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


export const allStatesname = async () => {
  try {
    return await fetch(API_ENDPOINTS.GET_STATES, {
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
export const allDistrickName = async (state) => {
  try {
    const apiUrl = `${API_ENDPOINTS.GET_DISTRICTS}?state_name=${encodeURIComponent(state)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const allvidhanSabhaName = async (district) => {
  try {
    const apiUrl = `${API_ENDPOINTS.GET_VIDHAN_SHABHAS}?district_name=${encodeURIComponent(district)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

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
      'htpp://13.200.103.27:8001/api/remove_background',
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
    return await fetch('http://13.200.103.27:8001/api/user-status', {
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
    return await fetch('http://13.200.103.27:8001/api/send-otp', {
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
    return await fetch('http://13.200.103.27:8001/api/register-user', {
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
    return await fetch('http://13.200.103.27:8001/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phoneNumber, password: password }),
    })
      .then((response) => {
        // console.log(response)
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

// export const registerUser = async (authtoken) => {
//   try {
//     return await fetch('http://13.200.103.27:8001/api/register-user', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         authtoken,
//       },
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

export const currentUser = async (authToken) => {
  try {
    return await fetch('http://13.200.103.27:8001/api/current-user', {
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
    return await fetch('http://13.200.103.27:8001/api/get-states', {
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
    const apiUrl = `http://13.200.103.27:8001/api/get-districts?state_name=${encodeURIComponent(state)}`;
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

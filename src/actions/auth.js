export const image_bg_remove_api = async (profile) => {
  try {
    console.log("line ye hoga ", profile);
    const formData = new FormData();
    formData.append('image', {
      image: profile
    });
    console.log(formData);
    const response = await fetch('http://13.200.103.27:5000/api/remove_background', {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();
    // setProfile(responseData);
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
};



// export const image_bg_remove_api = async (profile) => {
//   try {
//     const data = new FormData('image', 'profile');
//     console.log("line 4");
//     // data.append('image', image);
//     let res = await fetch('http://13.200.103.27:5000/api/remove_background',
//       {
//         method: 'post',
//         body: data,
//         headers: {
//           'Content-Type': 'multipart/form-data; ',
//         },
//       }
//     );
//     console.log("line 15")
//       const responseJson = await res.json(); // If the response is JSON
//       console.log('Success:', responseJson);

//     // console.log(data, 'res data from api ');
//     return responseJson;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

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
        console.log(response, "api resp");
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
//     return await fetch('http://192.168.29.89:8001/api/register-user', {
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
// 192.168.29.89:8001/api/user-status

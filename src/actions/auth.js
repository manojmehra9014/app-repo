export const checkUserStatus = async (phone_number) => {
  try {
    return await fetch('http://192.168.29.89:8001/api/user-status', {
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
    return await fetch('http://192.168.29.89:8001/api/send-otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    })
      .then((response) => {
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
    console.log(data);
    return await fetch('http://192.168.29.89:8001/api/register-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
// phone_number

export const loginUser = async (phoneNumber, password) => {
  try {
    return await fetch('http://192.168.29.89:8001/api/login', {
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
    return await fetch('http://192.168.29.89:8001/api/current-user', {
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

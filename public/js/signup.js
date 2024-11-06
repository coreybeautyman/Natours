/*eslint-disable*/
import axios from 'axios';
import '@babel/polyfill';
import { showAlert } from './alerts';
import { login } from './login';

export const signup = async (
  name,
  email,
  password,
  passwordConfirm,
  photo = 'default.jpg',
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
        photo,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Welcome ${name.split(' ')[0]}`);
      window.setTimeout(() => {
        login(email, password);
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

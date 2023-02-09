import { useState } from 'react'
import axios from 'axios';

export default function Home() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('Login')
  const [message, setMessage] = useState('')

  const register = () => {
    return axios
      .post('http://localhost:4000/users/register', {
        username: username,
        password: password,
        email: email
      })
      .then((res) => {
        setMessage(res.data.message)
        setStatus("Login")
        return res.data;
      })
      .catch((err) => {
        setMessage(err.response.data.message)
        return err.response.data;
      });
  };

  const login = () => {
    return axios
      .post('http://localhost:4000/users/login', {
        username: username,
        password: password
      })
      .then((res) => {
        setToken(res.data.data.token)
        return res.data;
      })
      .catch((err) => {
        setMessage(err.response.data.message)
        return err.response.data;
      });
  };

  // const userProfile = () => {
  //   return axios
  //     .get('http://localhost:4000/users/user-profile', {
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       }
  //     })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  // };

  if (token) {
    return (
      <section className="grid h-screen place-items-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hi (username)</h2><br />
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are signed in as (email).</p>
          <button
            type="button"
            onClick={() => setToken('')}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Logout
          </button>
        </div>
      </section>
    )
  }
  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome</h2><br />
        <div style={{ color: '#dc2626' }}>{message}</div>
        <form>
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required onChange={(e) => setUsername(e.target.value)} />
          </div>
          {
            status === "Login" ?
              <></>
              :
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@mail.com" required onChange={(e) => setEmail(e.target.value)} />
              </div>
          }
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required onChange={(e) => setPassword(e.target.value)} />
          </div>
        </form>
        {
          status === "Login" ?
            <button
              type="button"
              onClick={() => login()}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Login
            </button>
            :
            <button
              type="button"
              onClick={() => register()}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Register
            </button>
        }
        <br/>
        <br/>
        <button
          type="button"
          onClick={() => {
            if (status === 'Login') setStatus("Register");
            else setStatus("Login");
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {status === 'Login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </section >
  );
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const axios = require('axios').default;

axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const MainScreen = () => {
  const backgroundStyle = {
    padding: 10,
    alignItems: 'center',
  };
  const [netInfo, setNetInfo] = useState();
  NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    if (state.isConnected !== netInfo) {
      setNetInfo(state.isConnected);
    }
  });
  function getTodos() {
    // axios({
    //   method: 'get',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   params: {
    //     _limit: 5
    //   }
    // })
    //   .then(res => (res))
    //   .catch(err => console.error(err));

    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        timeout: 5000,
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  // POST REQUEST
  function addTodo() {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false,
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
      .patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true,
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  // DELETE REQUEST
  function removeTodo() {
    axios
      .delete('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  // SIMULTANEOUS DATA
  function getData() {
    //   axios
    //     .all([
    //       axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    //       axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    //     ])
    //     .then(axios.spread((todos, posts) => console.log(posts, todos)))
    //     .catch(err => console.error(err));
    // }

    function getTodoConcurrent() {
      return axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    }

    function getPostConcurrent() {
      return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    }

    Promise.all([getTodoConcurrent(), getPostConcurrent()]).then(function (
      results,
    ) {
      const todo = results[0];
      const post = results[1];
      console.log(todo, post);
    });
  }

  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'sometoken',
      },
    };

    axios
      .post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title: 'New Todo',
          completed: false,
        },
        config,
      )
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
        title: 'Hello World',
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      }),
    };

    axios(options).then(res => console.log(res));
  }

  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss', {
        validateStatus: function (status) {
          return status < 500; // Reject only if status is greater or equal to 500
        },
      })
      .then(res => console.log(res))
      .catch(err => {
        if (err.code === 'ERR_NETWORK') {
          alert('NO CONNECTION');
          return;
        } else {
          if (err.response) {
            // Server responded with a status other than 200 range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if (err.response.status === 404) {
              alert('Error: Page Not Found');
            }
          } else if (err.request) {
            // Request was made but no response
            console.error(err.request);
          } else {
            console.error(err.message);
          }
        }
      });
  }

  // INTERCEPTING REQUESTS & RESPONSES
  // axios.interceptors.request.use(
  //   config => {
  //     console.log(
  //       `${config.method.toUpperCase()} request sent to ${
  //         config.url
  //       } at ${new Date().getTime()}`
  //     );

  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   }
  // );

  // axios.interceptors.request.eject();

  // AXIOS INSTANCE
  // Alter defaults after instance has been created
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  return (
    <View style={backgroundStyle}>
      {netInfo ? null : <Text style={{color: 'red'}}> NO CONNECTION </Text>}
      <TouchableOpacity style={styles.getButton} onPress={getTodos}>
        <Text>GET</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={addTodo}>
        <Text>POST</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={updateTodo}>
        <Text>PUT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={removeTodo}>
        <Text>DELETE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={getData}>
        <Text>GET 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={customHeaders}>
        <Text>CUSTOME HEADER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={transformResponse}>
        <Text>TRANSFORMING</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getButton} onPress={errorHandling}>
        <Text>HANDLING ERROR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  getButton: {
    backgroundColor: 'lightblue',
    width: '40%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default MainScreen;

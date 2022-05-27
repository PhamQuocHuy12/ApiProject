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
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const axios = require('axios').default;

axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const MainScreen = () => {
  const [netInfo, setNetInfo] = useState();
  const [response, setResponse] = useState({});
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

    //     const controller = new AbortController()
    // const timeoutId = setTimeout(() => controller.abort(), 5000)
    // fetch(url, { signal: controller.signal }).then(response => {
    // })

    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=1', {
        timeout: 5000,
      })
      .then(res => {
        console.log(res);
        setResponse(res);
      })
      .catch(err => console.error(err));
  }

  // POST REQUEST
  function addTodo() {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false,
      })
      .then(res => {
        console.log(res);
        setResponse(res);
      })
      .catch(err => console.error(err));
  }

  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
      .patch('https://jsonplaceholder.typicode.com/todos/1', {
        data: {
          title: 'Updated Todo',
          completed: true,
        },
      })
      .then(res => {
        console.log(res);
        setResponse(res);
      })
      .catch(err => console.error(err));
  }

  // DELETE REQUEST
  function removeTodo() {
    axios
      .delete('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        console.log(res);
        setResponse(res);
      })
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
      return axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2');
    }

    function getPostConcurrent() {
      return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=2');
    }

    Promise.all([getTodoConcurrent(), getPostConcurrent()]).then(function (
      results,
    ) {
      const todo = results[0];
      const post = results[1];
      console.log(todo, post);
      // setResponse({...results, data: results.data});
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
      .then(res => {
        console.log(res);
        setResponse(res);
      })
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

    axios(options).then(res => {
      console.log(res);
      setResponse(res);
    });
  }

  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss', {
        validateStatus: function (status) {
          return status < 500; // Reject only if status is greater or equal to 500
        },
      })
      .then(res => {
        console.log(res);
        setResponse(res);
      })
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

  const toText = text => {
    if (text !== undefined) {
      return JSON.stringify(text);
    } else {
      return '';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.backgroundStyle}>
      {netInfo ? null : <Text style={{color: 'red'}}> NO CONNECTION </Text>}
      <View style={styles.controller}>
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
      <Text style={styles.text}>{`Data: ${toText(response.data)}`}</Text>
      <Text style={styles.text}>{`Status: ${toText(response.status)}`}</Text>
      <Text style={styles.text}>{`Headers: ${toText(response.headers)}`}</Text>
      <Text style={styles.text}>{`Code: ${toText(response.code)}`}</Text>
      <Text style={styles.text}>{`Message: ${toText(response.message)}`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  controller: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    flexWrap: 'wrap',
    maxHeight: 200,
    backgroundColor: 'gray',
    borderRadius: 15,
  },
  getButton: {
    backgroundColor: 'lightblue',
    width: '40%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    color: 'black',
  },
});

export default MainScreen;

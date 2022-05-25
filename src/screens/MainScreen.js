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
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
const axios = require('axios').default;

axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const MainScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
    alignItems: 'center',
  };


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
        timeout: 5000
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  
  // POST REQUEST
  function addTodo() {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
      .patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
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
    axios
      .all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      ])
      .then(axios.spread((todos, posts) => console.log(posts, todos)))
      .catch(err => console.error(err));
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'sometoken'
      }
    };
  
    axios
      .post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title: 'New Todo',
          completed: false
        },
        config
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
        title: 'Hello World'
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
  
    axios(options).then(res => console.log(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss', {
        // validateStatus: function(status) {
        //   return status < 500; // Reject only if status is greater or equal to 500
        // }
      })
      .then(res => console.log(res))
      .catch(err => {
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
      });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
  
    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
      })
      .then(res => console.log(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  
    if (true) {
      source.cancel('Request canceled!');
    }
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
  
  // AXIOS INSTANCE
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

  return (
    <View style={backgroundStyle}>
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
        <TouchableOpacity style={styles.getButton} onPress={cancelToken}>
          <Text>CANCEL TOKEN</Text>
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

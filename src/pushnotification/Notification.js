import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppRoutes from '../navigation/Routes';

export const store = createStore(applyMiddleware(thunk));

class Notification extends Component {

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    )

  }
}
export default pushNotification = Notification;
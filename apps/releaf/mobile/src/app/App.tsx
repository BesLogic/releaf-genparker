import React from 'react';
import { Navigation } from './navigation/Navigation';

import { store } from './store/store';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
};

export default App;

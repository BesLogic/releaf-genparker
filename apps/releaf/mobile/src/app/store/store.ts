import { configureStore } from '@reduxjs/toolkit';
import treeDefinitionsReducer from './slices/treeDefinitionSlice';
import { treeDefinitionListenerMiddleware } from './middlewares/treeDefinitionMiddleWare';

export const store = configureStore({
  reducer: {
    treeDefinitions: treeDefinitionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(treeDefinitionListenerMiddleware.middleware),
});
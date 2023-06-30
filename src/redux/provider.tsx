'use client';

import 'reflect-metadata';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from './store';

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

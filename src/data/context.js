import { createContext } from 'react';
import refdata from './refdata.yml';

export const RefdataContext = createContext({ refdata });

export const SessionContext = createContext([]);

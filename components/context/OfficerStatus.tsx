import { createContext } from 'react';

export const OfficerStatusContext = createContext({
  isDirector: false,
  isOfficer: false
});
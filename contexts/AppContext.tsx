import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  registeredEvents: string[];
  savedEvents: string[];
  followedOrgs: string[];
  playerXP: number;
  feedFilter: 'local' | 'national' | 'international';
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  saveEvent: (eventId: string) => void;
  unsaveEvent: (eventId: string) => void;
  followOrg: (orgId: string) => void;
  unfollowOrg: (orgId: string) => void;
  setFeedFilter: (filter: 'local' | 'national' | 'international') => void;
  addXP: (amount: number) => void;
}

const AppContext = createContext<AppState>({
  registeredEvents: [],
  savedEvents: [],
  followedOrgs: [],
  playerXP: 4820,
  feedFilter: 'local',
  registerForEvent: () => {},
  unregisterFromEvent: () => {},
  saveEvent: () => {},
  unsaveEvent: () => {},
  followOrg: () => {},
  unfollowOrg: () => {},
  setFeedFilter: () => {},
  addXP: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [followedOrgs, setFollowedOrgs] = useState<string[]>([]);
  const [playerXP, setPlayerXP] = useState(4820);
  const [feedFilter, setFeedFilter] = useState<'local' | 'national' | 'international'>('local');

  useEffect(() => {
    AsyncStorage.getItem('registeredEvents').then(d => {
      if (d) setRegisteredEvents(JSON.parse(d));
    });
    AsyncStorage.getItem('savedEvents').then(d => {
      if (d) setSavedEvents(JSON.parse(d));
    });
    AsyncStorage.getItem('followedOrgs').then(d => {
      if (d) setFollowedOrgs(JSON.parse(d));
    });
    AsyncStorage.getItem('playerXP').then(d => {
      if (d) setPlayerXP(JSON.parse(d));
    });
  }, []);

  useEffect(() => { AsyncStorage.setItem('registeredEvents', JSON.stringify(registeredEvents)); }, [registeredEvents]);
  useEffect(() => { AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents)); }, [savedEvents]);
  useEffect(() => { AsyncStorage.setItem('followedOrgs', JSON.stringify(followedOrgs)); }, [followedOrgs]);
  useEffect(() => { AsyncStorage.setItem('playerXP', JSON.stringify(playerXP)); }, [playerXP]);

  const registerForEvent = (eventId: string) => {
    setRegisteredEvents(prev => prev.includes(eventId) ? prev : [...prev, eventId]);
  };

  const unregisterFromEvent = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
  };

  const saveEvent = (eventId: string) => {
    setSavedEvents(prev => prev.includes(eventId) ? prev : [...prev, eventId]);
  };

  const unsaveEvent = (eventId: string) => {
    setSavedEvents(prev => prev.filter(id => id !== eventId));
  };

  const followOrg = (orgId: string) => {
    setFollowedOrgs(prev => prev.includes(orgId) ? prev : [...prev, orgId]);
  };

  const unfollowOrg = (orgId: string) => {
    setFollowedOrgs(prev => prev.filter(id => id !== orgId));
  };

  const addXP = (amount: number) => {
    setPlayerXP(prev => prev + amount);
  };

  return (
    <AppContext.Provider value={{
      registeredEvents, savedEvents, followedOrgs, playerXP, feedFilter,
      registerForEvent, unregisterFromEvent, saveEvent, unsaveEvent,
      followOrg, unfollowOrg, setFeedFilter, addXP,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

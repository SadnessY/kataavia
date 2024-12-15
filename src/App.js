import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './App.module.scss';
import Logo from './components/logo';
import Filter from './components/fitler';
import Tabs from './components/tabs';
import TicketsList from './components/tickets-list';
import Showmore from './components/showmore';
import { fetchSearchId } from './redux/slices/ticketsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchSearchId());
    return () => {
      promise.abort();
    };
  });

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Logo />
      </header>
      <main className={classes.main}>
        <aside className={classes.sidebar}>
          <Filter />
        </aside>
        <div className={classes.content}>
          <Tabs />
          <TicketsList className={classes.Tickets} />
          <Showmore />
        </div>
      </main>
    </div>
  );
}

export default App;

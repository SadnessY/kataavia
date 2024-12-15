/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import TicketsItem from '../tickets-item';
import {
  fetchTickets,
  selectFetchingCountToRender,
  selectFetchingError,
  selectFetchingSearchId,
  selectFetchingStop,
  selectRequestCount,
} from '../../redux/slices/ticketsSlice';
import selectFilteredAndSorted from '../../redux/selectors/filteredAndSorted';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const countToRender = useSelector(selectFetchingCountToRender);
  const searchId = useSelector(selectFetchingSearchId);
  const stop = useSelector(selectFetchingStop);
  const error = useSelector(selectFetchingError);
  const tickets = useSelector(selectFilteredAndSorted);
  const requestCount = useSelector(selectRequestCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId, requestCount]);

  const content = (
    <ul className={classes['tickets-list']}>
      {tickets?.slice(0, countToRender).map((ticket) => (
        <TicketsItem key={ticket.id} data={ticket} />
      ))}
    </ul>
  );

  return (
    <div className={classes['tickets-container']}>
      <div style={{ display: stop && error.length === 0 && 'none' }} className={classes.indicator}>
        {!stop && !error.length && <Loader />}
        {error.length > 0 && error}
      </div>
      {tickets && !tickets?.length && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
      {tickets?.length > 0 && content}
    </div>
  );
}

export default TicketsList;

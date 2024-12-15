import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFetchingCountToRender, setCountToRender } from '../../redux/slices/ticketsSlice';
import selectFilteredAndSorted from '../../redux/selectors/filteredAndSorted';

import classes from './Showmore.module.scss';

function Showmore() {
  const tickets = useSelector(selectFilteredAndSorted);
  const countToRender = useSelector(selectFetchingCountToRender);
  const dispatch = useDispatch();

  if (!tickets || tickets.length < countToRender) {
    return null;
  }

  return (
    <button type="button" className={classes.showmore} onClick={() => dispatch(setCountToRender(countToRender + 5))}>
      Показать еще 5 билетов!
    </button>
  );
}

export default Showmore;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSortingType, setSort } from '../../redux/slices/sortingSlice';
import { setCountToRender } from '../../redux/slices/ticketsSlice';

import classes from './Tabs.module.scss';

function Tabs() {
  const sorting = useSelector(selectSortingType);
  const dispatch = useDispatch();

  const handleClick = (tabLabel) => {
    dispatch(setSort(tabLabel));
    dispatch(setCountToRender(5));
  };

  return (
    <ul className={classes.tabs}>
      <li key="cheapest" className={classes['tabs-item']}>
        <button
          className={[classes['tabs-button'], sorting === 'cheapest' && classes.active].join(' ')}
          onClick={() => handleClick('cheapest')}
          type="button"
        >
          Самый дешевый
        </button>
      </li>

      <li key="fastest" className={classes['tabs-item']}>
        <button
          className={[classes['tabs-button'], sorting === 'fastest' && classes.active].join(' ')}
          onClick={() => handleClick('fastest')}
          type="button"
        >
          Самый быстрый
        </button>
      </li>

      <li key="optimal" className={classes['tabs-item']}>
        <button
          className={[classes['tabs-button'], sorting === 'optimal' && classes.active].join(' ')}
          onClick={() => handleClick('optimal')}
          type="button"
        >
          Оптимальный
        </button>
      </li>
    </ul>
  );
}

export default Tabs;

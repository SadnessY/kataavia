/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilters, toggleAllTransfers, toggleTransfersCount } from '../../redux/slices/filterSlice';
import { setCountToRender } from '../../redux/slices/ticketsSlice';

import classes from './Filter.module.scss';

function Filter() {
  const transfers = useSelector(selectFilters);
  const dispatch = useDispatch();

  const filterItems = [
    { label: 'Все', id: 'check-all' },
    { label: 'Без пересадок', id: 'check-0', transfersCount: 0 },
    { label: '1 пересадка', id: 'check-1', transfersCount: 1 },
    { label: '2 пересадки', id: 'check-2', transfersCount: 2 },
    { label: '3 пересадки', id: 'check-3', transfersCount: 3 },
  ];

  const changeAll = (e) => {
    dispatch(toggleAllTransfers(e.target.checked));
    dispatch(setCountToRender(5));
  };

  const changeOne = (value) => {
    dispatch(toggleTransfersCount(value));
    dispatch(setCountToRender(5));
  };

  return (
    <div className={classes.filter}>
      <h3 className={classes['filter-title']}>Количество пересадок</h3>
      <ul className={classes['filter-checkboxes']}>
        {filterItems.map((item) => (
          <li key={item.id} className={classes['filter-checkbox']}>
            <input
              type="checkbox"
              id={item.id}
              name="transfer"
              className={classes['checkbox-input']}
              onChange={item.id === 'check-all' ? changeAll : () => changeOne(item.transfersCount)}
              checked={
                item.id === 'check-all'
                  ? transfers.every((transfer) => transfer === true)
                  : transfers[item.transfersCount]
              }
            />
            <label htmlFor={item.id} className={classes['checkbox-label']}>
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;

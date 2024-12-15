import React from 'react';

import classes from './TicketsItem.module.scss';

function TicketsItem({ data }) {
  const { price, imageUrl, segments, id } = data;

  return (
    <div className={classes['tickets-item']}>
      <div className={classes['tickets-item-header']}>
        <span className={classes['tickets-item-price']}>{price} Р</span>
        <img src={imageUrl} alt={id} className={classes['tickets-item-logo']} />
      </div>
      <ul className={classes['ticket-info']}>
        {segments.map((item) => (
          <li key={item.id} className={classes['ticket-info-item']}>
            <span className={classes['ticket-info-item-top']}>
              {item.origin} – {item.destination}
            </span>
            <span className={classes['ticket-info-item-top']}>В пути</span>
            <span className={classes['ticket-info-item-top']}>пересадки: {item.stops.length}</span>
            <span className={classes['ticket-info-item-bottom']}>{`${item.startTime} - ${item.finishTime}`}</span>
            <span
              className={classes['ticket-info-item-bottom']}
            >{`${Math.floor(item.duration / 60)}ч ${item.duration % 60 < 10 ? '0' : ''}${item.duration % 60}м`}</span>
            <span className={classes['ticket-info-item-bottom']}>{item.stops.join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketsItem;

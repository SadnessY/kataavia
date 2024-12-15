/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import { format, toDate } from 'date-fns';

class TicketsAPI {
  constructor(baseUrl = 'https://aviasales-test-api.kata.academy') {
    this.baseUrl = baseUrl;
  }

  getConvertedTickets(tickets) {
    return tickets.map((ticket) => ({
      id: (Math.random() * 100000).toFixed(),
      price: ticket.price,
      imageUrl: `https://pics.avs.io/99/36/${ticket.carrier}.png`,
      segments: ticket.segments.map((item) => {
        const dateTime = new Date(item.date).getTime();
        return {
          id: Math.random() * 10000,
          origin: item.origin,
          destination: item.destination,
          stops: item.stops,
          startTime: format(toDate(dateTime), 'kk:mm'),
          finishTime: format(toDate(dateTime + item.duration * 60 * 1000), 'kk:mm'),
          duration: item.duration,
        };
      }),
    }));
  }

  async fetchSearchId(signal) {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'GET',
      signal,
    });

    if (!response.ok) {
      throw new Error('Не удалось получить SearchId');
    }

    const { searchId } = await response.json();
    return searchId;
  }

  async fetchTicketsById(id) {
    const response = await fetch(`${this.baseUrl}/tickets?searchId=${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Не удалось загрузить данные...');
    }

    const { tickets, stop } = await response.json();
    return { stop, tickets: this.getConvertedTickets(tickets) };
  }
}

export default new TicketsAPI();

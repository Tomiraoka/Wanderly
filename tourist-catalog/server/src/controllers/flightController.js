const axios = require('axios');

exports.searchFlights = async (req, res, next) => {
  try {
    const { origin, dest } = req.query;

    if (!origin || !dest) {
      return res.status(400).json({ message: 'Пожалуйста, укажите откуда и куда' });
    }

    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.FLIGHT_API_KEY,
        dep_iata: origin,
        arr_iata: dest,  
      }
    });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
       return res.json([]); 
    }

    const flights = response.data.data.map(flight => {
      const depTime = new Date(flight.departure.scheduled).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      const arrTime = new Date(flight.arrival.scheduled).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      return {
        _id: flight.flight.iata || Math.random().toString(),
        airline: flight.airline.name || 'Неизвестная авиакомпания',
        logo: `https://ui-avatars.com/api/?name=${flight.airline.name}&background=random`,
        from: `${flight.departure.iata}`,
        to: `${flight.arrival.iata}`,
        departureTime: depTime !== 'Invalid Date' ? depTime : '---',
        arrivalTime: arrTime !== 'Invalid Date' ? arrTime : '---',
        duration: 'Прямой рейс', 
        price: Math.floor(Math.random() * 150000) + 35000, 
        stops: 0
      };
    });

    res.json(flights);
  } catch (error) {
    console.error('Ошибка AviationStack API:', error.response?.data || error.message);
    res.status(500).json({ message: 'Ошибка при получении данных о рейсах' });
  }
};
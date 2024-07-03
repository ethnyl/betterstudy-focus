import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const StyledCalendarContainer = styled.div`
  height: 100%;

  .rbc-calendar {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
  }

  .rbc-header {
    background-color: ${props => props.theme.cardBackground};
  }

  .rbc-event {
    background-color: ${props => props.theme.buttonBackground};
  }

  .rbc-today {
    background-color: ${props => props.theme.cardBackground};
  }
`;

function Calendar() {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  return (
    <StyledCalendarContainer>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        selectable
      />
    </StyledCalendarContainer>
  );
}

export default Calendar;
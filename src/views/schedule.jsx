import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import moment from 'moment';
import { Close } from '@mui/icons-material';
import { IconButton, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { format } from 'src/utils';
import AppEventCard from 'src/components/AppEventCard';
import axios from 'axios';

export function ScheduleView() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  async function updateEvents() {
    setLoading(true);
    const today = new Date();
    axios
      .get('/api/schedule', {
        params: {
          year: today.getFullYear(),
          month: today.getMonth() + 1,
        },
      })
      .then(({ data }) => {
        const events = {};
        for (const evt of data) {
          const dateTime = new Date(evt.start.dateTime);
          const year = dateTime.getFullYear();
          const month = dateTime.getMonth() + 1;
          const date = dateTime.getDate();
          if (!events[year]) events[year] = {};
          if (!events[year][month]) events[year][month] = {};
          if (!events[year][month][date]) events[year][month][date] = [evt];
          else {
            const exist = events[year][month][date].find((event) => event.id === evt.id);
            if (!exist) events[year][month][date].push(evt);
          }
        }
        setEvents(events);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    updateEvents();
  }, []);
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedEvents = useMemo(() => {
    if (!selectedDate) return null;
    return events[selectedDate.getFullYear()]?.[selectedDate.getMonth() + 1]?.[selectedDate.getDate()] || [];
  }, [selectedDate, events]);
  const todayEvents = useMemo(() => {
    const today = new Date();
    return events[today.getFullYear()]?.[today.getMonth() + 1]?.[today.getDate()] || [];
  }, [events]);
  return (
    <div className="flex">
      <div
        className={'transition-all h-screen w-0 bg-white overflow-hidden' + (selectedDate !== null ? ' w-[300px]' : '')}
      >
        <div className="flex justify-end p-2">
          <IconButton size="28" color="primary" onClick={() => setSelectedDate(null)}>
            <Close />
          </IconButton>
        </div>
        <div className="p-4 pt-0">
          <h1 className="text-black text-xl m-0">Today's Events</h1>
          {todayEvents && todayEvents.length !== 0 ? (
            todayEvents.map((evt, i) => <AppEventCard key={i} event={evt} />)
          ) : (
            <div className=" text-gray-400 text-center my-3">none</div>
          )}
          {selectedDate && (
            <h1 className="text-black text-xl m-0 mt-5">{moment(selectedDate).format('yyyy-MM-DD')} Events</h1>
          )}
          {selectedEvents && selectedEvents.length !== 0 ? (
            selectedEvents.map((evt, i) => <AppEventCard key={i} event={evt} />)
          ) : (
            <div className=" text-gray-400 text-center my-3">none</div>
          )}
        </div>
      </div>

      <Calendar
        value={selectedDate}
        calendarType="US"
        onClickDay={setSelectedDate}
        minDetail="year"
        className='full'
        navigationLabel={({ label }) => (
          <div className='flex items-center justify-center'>
            <div>{label}</div>
            {loading && <CircularProgress color="primary" className='ml-2' size={10} />}
          </div>
        )}
        tileClassName={({ date, activeStartDate }) => {
          return date.getTime() === selectedDate?.getTime()
            ? 'today'
            : date.getMonth() !== activeStartDate.getMonth()
            ? 'disabled'
            : '';
        }}
        tileContent={({ date, view }) => {
          if (view !== 'month') return;
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          if (!events[year] || !events[year][month] || !events[year][month][day]) return <></>;
          return (
            <>
              {events[year][month][day].map((evt, i) => (
                <div key={i} className="flex items-center last:mb-2">
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#CC3363]" />
                  <div className="ml-2 hidden flex-shrink-0 text-sm lg:block">{format(evt.start.dateTime)}</div>
                  <div className="ml-2 text-xs line-clamp-1 md:text-sm">{evt.summary}</div>
                </div>
              ))}
            </>
          );
        }}
        formatDay={(_, date) => <div className="react-calendar__tile-title">{date.getDate()}</div>}
      />
    </div>
  );
}

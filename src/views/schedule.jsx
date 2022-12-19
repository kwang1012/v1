import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import moment from 'moment';
export const format = (date) => {
  if (typeof date === 'string') date = new Date(date);
  if (date.getMinutes()) return moment(date).format('h:m a');
  else return moment(date).format('h a');
};

export function ScheduleView({ events }) {
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      value={date}
      calendarType="US"
      onClickDay={setDate}
      tileContent={({ date }) => {
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
  );
}

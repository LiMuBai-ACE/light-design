import { DatePicker } from 'light-design';
import React, { useState } from 'react';

const Demo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );

  const handleDateChange = (date: string | undefined) => {
    setSelectedDate(date);
    console.log('date', date);
  };

  return <DatePicker value={selectedDate} onChange={handleDateChange} />;
};

export default Demo;

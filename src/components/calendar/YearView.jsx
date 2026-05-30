import React from 'react';
import { isToday } from './calendarUtils';

const YearView = ({
    currentDate,
    isDateBooked,
    getAppointmentsForDate,
    handleDateClick
}) => {
    const year = currentDate.getFullYear();
    const months = [];

    for (let month = 0; month < 12; month++) {
        months.push({
            name: new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' }),
            number: month,
            date: new Date(year, month, 1)
        });
    }

    const getDaysInMonth = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 41);

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            days.push(new Date(date));
        }
        return days;
    };

    const isCurrentMonth = (date, monthNumber) => date.getMonth() === monthNumber;

    return (
        <div className="p-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {months.map((month) => {
                        const days = getDaysInMonth(year, month.number);

                        return (
                            <div key={month.number} className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 shadow-md border border-indigo-200">
                                <h3 className="text-sm font-bold mb-3 text-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 rounded-lg">
                                    {month.name}
                                </h3>

                                <div className="grid grid-cols-7 mb-2 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                        <div key={index} className="text-xs font-semibold text-white text-center p-1">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((date, index) => {
                                        const isCurrentMonthDay = isCurrentMonth(date, month.number);
                                        const isTodayDate = isToday(date);
                                        const hasAppointments = isDateBooked(date);
                                        const appointments = getAppointmentsForDate(date);

                                        return (
                                            <div
                                                key={index}
                                                className={`h-7 flex items-center justify-center text-xs cursor-pointer transition-all duration-200 relative rounded ${!isCurrentMonthDay
                                                    ? 'text-gray-400'
                                                    : isTodayDate
                                                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg'
                                                        : hasAppointments
                                                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md hover:from-indigo-600 hover:to-indigo-800'
                                                            : 'text-gray-700 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-indigo-200 hover:shadow-sm'
                                                    }`}
                                                onClick={() => isCurrentMonthDay && handleDateClick(date)}
                                            >
                                                {date.getDate()}
                                                {appointments.length > 0 && !isTodayDate && isCurrentMonthDay && (
                                                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center shadow-lg" style={{ fontSize: '8px' }}>
                                                        {appointments.length}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default YearView;

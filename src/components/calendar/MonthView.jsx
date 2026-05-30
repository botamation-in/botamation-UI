import React from 'react';
import {
    commonStyles,
    renderCalendarHeader,
    renderAppointmentBadge,
    isToday
} from './calendarUtils';

const MonthView = ({
    currentDate,
    isDateBooked,
    getAppointmentsForDate,
    handleDateClick
}) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        days.push(new Date(date));
    }

    const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth();

    return (
        <div className="p-3">
            <div className={commonStyles.calendarContainer}>
                {renderCalendarHeader()}
                <div className="grid grid-cols-7">
                    {days.map((date, index) => {
                        const isCurrentMonthDay = isCurrentMonth(date);
                        const isTodayDate = isToday(date);
                        const hasAppointments = isDateBooked(date);
                        const appointments = getAppointmentsForDate(date);

                        return (
                            <div
                                key={index}
                                className={`min-h-[50px] border-b border-r border-gray-200 p-1.5 transition-all duration-200 cursor-pointer group relative ${!isCurrentMonthDay
                                    ? 'bg-gray-50/50'
                                    : hasAppointments
                                        ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                                        : 'bg-white hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-indigo-50'
                                    }`}
                                onClick={() => isCurrentMonthDay && handleDateClick(date)}
                            >
                                <div className="flex items-start justify-between h-full">
                                    <div className="flex flex-col h-full">
                                        <span
                                            className={`text-xs font-semibold mb-1 transition-colors ${!isCurrentMonthDay
                                                ? 'text-gray-400'
                                                : isTodayDate
                                                    ? 'text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg'
                                                    : hasAppointments
                                                        ? 'text-indigo-700 font-bold'
                                                        : 'text-gray-900'
                                                }`}
                                        >
                                            {date.getDate()}
                                        </span>
                                        {isCurrentMonthDay && renderAppointmentBadge(appointments.length)}
                                    </div>
                                </div>
                                {hasAppointments && isCurrentMonthDay && (
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MonthView;

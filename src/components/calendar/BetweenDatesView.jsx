import React from 'react';
import { isToday } from './calendarUtils';

const BetweenDatesView = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    isDateBooked,
    getAppointmentsForDate,
    handleDateClick
}) => {
    const days = [];
    const currentDay = new Date(startDate);

    while (currentDay <= endDate) {
        days.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return (
        <div className="p-2 max-w-full mx-auto">
            {/* Date Range Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                        type="date"
                        value={startDate.toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gradient-to-r from-gray-50 to-white cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                        type="date"
                        value={endDate.toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gradient-to-r from-gray-50 to-white cursor-pointer"
                    />
                </div>
            </div>

            {/* Between Dates Calendar */}
            <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3">
                    <h3 className="text-base font-bold text-white text-center">
                        Days Between {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </h3>
                    <p className="text-xs text-indigo-200 text-center mt-1">
                        {days.length} day{days.length !== 1 ? 's' : ''} selected
                    </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-12 gap-6 p-6">
                    {days.map((date, index) => {
                        const isTodayDate = isToday(date);
                        const hasAppointments = isDateBooked(date);
                        const appointments = getAppointmentsForDate(date);

                        return (
                            <div
                                key={index}
                                className={`min-h-[40px] border border-gray-200 rounded-lg p-1 transition-all duration-200 cursor-pointer group ${hasAppointments
                                    ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 shadow-sm hover:shadow-md'
                                    : 'bg-white hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-indigo-50 hover:shadow-sm'
                                    }`}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className="text-center w-full">
                                    <div className="text-xs font-medium text-gray-600">
                                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </div>
                                    <div className={`mt-0.5 text-sm font-bold ${isTodayDate
                                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto text-xs shadow-lg'
                                        : 'text-gray-900'
                                        }`}>
                                        {date.getDate()}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                        {date.toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                </div>
                                <div className="text-xs text-center mt-1">
                                    {appointments.length > 0 ? (
                                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-1 py-0.5 rounded-full font-medium shadow-sm text-xs">
                                            {appointments.length}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs">-</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {days.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Please select a valid date range</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BetweenDatesView;

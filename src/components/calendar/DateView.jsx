import React from 'react';
import { isToday } from './calendarUtils';

const DateView = ({
    specificDate,
    setSpecificDate,
    isDateBooked,
    getAppointmentsForDate,
    handleDateClick
}) => {
    const isTodayDate = isToday(specificDate);
    const hasAppointments = isDateBooked(specificDate);
    const appointments = getAppointmentsForDate(specificDate);

    return (
        <div className="p-2 max-w-md mx-auto">
            <div className="max-w-xs mx-auto mb-6 mt-6">
                <input
                    type="date"
                    value={specificDate.toISOString().split('T')[0]}
                    onChange={(e) => setSpecificDate(new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gradient-to-r from-gray-50 to-white text-sm cursor-pointer"
                />
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3">
                    <h3 className="text-base font-bold text-white text-center">
                        {specificDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h3>
                    <p className="text-xs text-indigo-200 text-center mt-1">
                        {isTodayDate ? 'Today' : 'Selected Date'}
                    </p>
                </div>

                <div className="p-4">
                    <div
                        className={`min-h-[80px] max-w-xs mx-auto border-2 rounded-lg p-3 transition-all duration-200 cursor-pointer group ${hasAppointments
                            ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-300 hover:from-indigo-100 hover:to-indigo-200 shadow-md hover:shadow-lg'
                            : 'bg-white border-gray-300 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-indigo-50 hover:shadow-md'
                            }`}
                        onClick={() => handleDateClick(specificDate)}
                    >
                        <div className="text-center">
                            <div className="text-xs font-semibold text-gray-600 mb-1">
                                {specificDate.toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className={`text-xl font-bold mb-1 ${isTodayDate
                                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto shadow-lg'
                                : 'text-gray-900'
                                }`}>
                                {specificDate.getDate()}
                            </div>
                            <div className="text-sm text-gray-700 mb-2 font-medium">
                                {specificDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>

                            <div className="text-xs">
                                {appointments.length > 0 ? (
                                    <div className="space-y-1">
                                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-3 py-1 rounded-full font-bold shadow-md text-xs">
                                            {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
                                        </div>
                                        <p className="text-gray-600 text-xs">Click to view details</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full font-bold shadow-md text-xs">
                                            Available
                                        </span>
                                        <p className="text-gray-500 text-xs">No appointments for this date</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateView;

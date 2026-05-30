import React from 'react';

// Shared utility functions for appointment calendar views

// Helper function to format date to YYYY-MM-DD without timezone issues
export const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Check if date is today
export const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

// Common styling classes
export const commonStyles = {
    calendarContainer: 'bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden',
    headerGradient: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
    dayCell: 'min-h-[50px] border-b border-r border-gray-200 p-1.5 transition-all duration-200 cursor-pointer group relative',
    bookingBadge: 'inline-flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-xs px-2 py-0.5 rounded-full shadow-md font-medium',
    todayIndicator: 'text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg',
    weekHeader: 'px-2 py-2 text-xs font-semibold text-white text-center border-r border-indigo-500/30 last:border-r-0'
};

// Reusable calendar header component
export const renderCalendarHeader = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className={`grid grid-cols-7 ${commonStyles.headerGradient}`}>
            {weekDays.map((day) => (
                <div key={day} className={commonStyles.weekHeader}>
                    <span className="hidden sm:block">{day.substring(0, 3)}</span>
                    <span className="sm:hidden">{day.substring(0, 1)}</span>
                </div>
            ))}
        </div>
    );
};

// Render appointment count badge
export const renderAppointmentBadge = (appointmentCount) => {
    if (appointmentCount === 0) return null;

    return (
        <div className="mt-auto">
            <div className={commonStyles.bookingBadge}>
                <span className="w-1 h-1 bg-white rounded-full mr-1 animate-pulse"></span>
                {appointmentCount}
            </div>
        </div>
    );
};

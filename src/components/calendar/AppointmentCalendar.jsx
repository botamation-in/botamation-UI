import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/20/solid';
import { Combobox } from '../Combobox';
import { formatDateToString } from './calendarUtils';
import MonthView from './MonthView';
import WeekView from './WeekView';
import YearView from './YearView';
import BetweenDatesView from './BetweenDatesView';
import DateView from './DateView';

const VIEW_OPTIONS = ['Week view', 'Month view', 'Year view', 'Between dates', 'Date view'];

/**
 * AppointmentCalendar
 *
 * Reusable calendar UI component. Handles all navigation, view switching,
 * and loading state. Data fetching is fully injected via props.
 *
 * Props:
 *   onFetchDates(startDate, endDate) → Promise<{ appointments, appointmentsByDate, uniqueDates }>
 *   onDateClick(date, appointments)  → called when a booked date cell is clicked
 *   height                           → CSS height string, default "72vh"
 *   defaultView                      → initial view string, default "Month view"
 */
const AppointmentCalendar = ({
    onFetchDates,
    onDateClick,
    height = '72vh',
    defaultView = 'Month view',
}) => {
    const [currentView, setCurrentView] = useState(defaultView);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [appointmentsByDate, setAppointmentsByDate] = useState({});
    const [uniqueDates, setUniqueDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [specificDate, setSpecificDate] = useState(new Date());

    // ── Date range for current view ──────────────────────────────
    const getViewDateRange = () => {
        switch (currentView) {
            case 'Week view': {
                const start = new Date(currentDate);
                start.setDate(currentDate.getDate() - currentDate.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                return { start, end };
            }
            case 'Month view':
                return {
                    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                    end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
                };
            case 'Year view':
                return {
                    start: new Date(currentDate.getFullYear(), 0, 1),
                    end: new Date(currentDate.getFullYear(), 11, 31),
                };
            case 'Between dates':
                return { start: new Date(startDate), end: new Date(endDate) };
            case 'Date view':
                return { start: new Date(specificDate), end: new Date(specificDate) };
            default:
                return {
                    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                    end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
                };
        }
    };

    // ── Fetch data whenever view or navigation changes ───────────
    useEffect(() => {
        if (!onFetchDates) return;
        const { start, end } = getViewDateRange();
        setLoading(true);
        onFetchDates(start, end)
            .then((data) => {
                if (data) {
                    setAppointments(data.appointments || []);
                    setAppointmentsByDate(data.appointmentsByDate || {});
                    setUniqueDates(data.uniqueDates || []);
                }
            })
            .catch(() => {
                setAppointments([]);
                setAppointmentsByDate({});
                setUniqueDates([]);
            })
            .finally(() => setLoading(false));
    }, [currentView, currentDate, startDate, endDate, specificDate]);

    // ── Helper: is a date booked ─────────────────────────────────
    const isDateBooked = (date) => {
        const dateStr = formatDateToString(date);
        return uniqueDates.includes(dateStr) || Object.prototype.hasOwnProperty.call(appointmentsByDate, dateStr);
    };

    const getAppointmentsForDate = (date) => {
        const dateStr = formatDateToString(date);
        return appointmentsByDate[dateStr] || [];
    };

    const handleDateClick = (date) => {
        if (isDateBooked(date) && onDateClick) {
            onDateClick(date, getAppointmentsForDate(date));
        }
    };

    // ── Navigation ───────────────────────────────────────────────
    const goToPrevious = () => {
        if (currentView === 'Between dates') {
            const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            setStartDate(d => { const n = new Date(d); n.setDate(n.getDate() - diff); return n; });
            setEndDate(d => { const n = new Date(d); n.setDate(n.getDate() - diff); return n; });
            return;
        }
        if (currentView === 'Date view') {
            setSpecificDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
            return;
        }
        setCurrentDate(prev => {
            const n = new Date(prev);
            if (currentView === 'Week view') n.setDate(n.getDate() - 7);
            else if (currentView === 'Month view') n.setMonth(n.getMonth() - 1);
            else if (currentView === 'Year view') n.setFullYear(n.getFullYear() - 1);
            return n;
        });
    };

    const goToNext = () => {
        if (currentView === 'Between dates') {
            const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            setStartDate(d => { const n = new Date(d); n.setDate(n.getDate() + diff); return n; });
            setEndDate(d => { const n = new Date(d); n.setDate(n.getDate() + diff); return n; });
            return;
        }
        if (currentView === 'Date view') {
            setSpecificDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; });
            return;
        }
        setCurrentDate(prev => {
            const n = new Date(prev);
            if (currentView === 'Week view') n.setDate(n.getDate() + 7);
            else if (currentView === 'Month view') n.setMonth(n.getMonth() + 1);
            else if (currentView === 'Year view') n.setFullYear(n.getFullYear() + 1);
            return n;
        });
    };

    // ── Format header date label ─────────────────────────────────
    const formatCurrentDate = () => {
        switch (currentView) {
            case 'Week view': {
                const s = new Date(currentDate);
                s.setDate(currentDate.getDate() - currentDate.getDay());
                const e = new Date(s);
                e.setDate(s.getDate() + 6);
                return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            }
            case 'Month view':
                return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            case 'Year view':
                return currentDate.getFullYear().toString();
            case 'Between dates':
                return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            case 'Date view':
                return specificDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            default:
                return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
    };

    const navLabel = currentView === 'Week view' ? 'Week'
        : currentView === 'Month view' ? 'Month'
        : currentView === 'Year view' ? 'Year'
        : currentView === 'Between dates' ? 'Period'
        : 'Date';

    // ── Render active view ───────────────────────────────────────
    const renderView = () => {
        const commonProps = { isDateBooked, getAppointmentsForDate, handleDateClick };
        switch (currentView) {
            case 'Week view':       return <WeekView currentDate={currentDate} {...commonProps} />;
            case 'Month view':      return <MonthView currentDate={currentDate} {...commonProps} />;
            case 'Year view':       return <YearView currentDate={currentDate} {...commonProps} />;
            case 'Between dates':   return <BetweenDatesView startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} {...commonProps} />;
            case 'Date view':       return <DateView specificDate={specificDate} setSpecificDate={setSpecificDate} {...commonProps} />;
            default:                return <MonthView currentDate={currentDate} {...commonProps} />;
        }
    };

    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20" style={{ height }}>
            {/* Header */}
            <header className="flex flex-none items-center justify-between bg-white border-b border-gray-300 px-4 py-4 shadow-lg">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
                        <CalendarIcon className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            <time>{formatCurrentDate()}</time>
                        </h1>
                        <p className="text-xs text-gray-600">{currentView}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    {/* Prev / Next */}
                    <div className="relative flex items-center rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-md border border-indigo-200">
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="flex items-center justify-center px-3 py-1.5 rounded-l-lg text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200"
                        >
                            <ChevronLeftIcon className="size-3 mr-1" />
                            <span className="text-xs font-medium hidden sm:block">Previous {navLabel}</span>
                            <span className="text-xs font-medium sm:hidden">Prev</span>
                        </button>
                        <button
                            type="button"
                            onClick={goToNext}
                            className="flex items-center justify-center px-3 py-1.5 rounded-r-lg text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200 border-l border-indigo-200"
                        >
                            <span className="text-xs font-medium hidden sm:block">Next {navLabel}</span>
                            <span className="text-xs font-medium sm:hidden">Next</span>
                            <ChevronRightIcon className="size-3 ml-1" />
                        </button>
                    </div>
                    {/* View switcher */}
                    <div className="w-40">
                        <Combobox
                            options={VIEW_OPTIONS.map(v => ({ value: v, label: v }))}
                            value={currentView}
                            onChange={(val) => setCurrentView(val)}
                        />
                    </div>
                </div>
            </header>

            {/* Calendar body */}
            <div className="isolate flex-1 flex flex-col min-h-0 overflow-hidden bg-gradient-to-br from-indigo-50/20 via-white to-indigo-50/10">
                <div className="flex-1 min-h-0 overflow-auto">
                    {renderView()}
                </div>

                {/* Loading overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300"></div>
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent absolute top-0"></div>
                            </div>
                            <div className="text-center">
                                <span className="text-lg font-semibold text-gray-900">Loading calendar...</span>
                                <p className="text-sm text-gray-600 mt-1">Please wait while we fetch your data</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentCalendar;

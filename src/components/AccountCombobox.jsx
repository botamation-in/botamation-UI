import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/* ============================================================
   AccountCombobox
   Dark-styled account switcher for use inside the Header.
   Matches the lead-app design: dark pill input, white dropdown.

   Props:
     accounts            – array of account objects
     selectedAcctNo      – acctNo of the currently active account
     selectedAcctName    – display name of the currently active account
     loading             – show loading state
     onSelect(account)   – called when user picks an account
     onLinkNew()         – called when "Link another account" is clicked
     onUnlink(account)   – (optional) show an unlink button per account
   ============================================================ */

export function AccountCombobox({
  accounts = [],
  selectedAcctNo = '',
  selectedAcctName = '',
  loading = false,
  onSelect,
  onLinkNew,
  onUnlink,
}) {
  const displayName = selectedAcctName || selectedAcctNo || '';
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(displayName);
  const ref = useRef(null);
  const inputRef = useRef(null);

  // Keep input in sync with selection when closed
  useEffect(() => {
    if (!open) setInputValue(displayName);
  }, [displayName, open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = accounts.filter((acc) => {
    const q = inputValue.toLowerCase();
    const name = (acc.accountName || acc.acctName || '').toLowerCase();
    return name.includes(q) || (acc.acctNo || '').toLowerCase().includes(q);
  });

  const handleFocus = () => {
    setInputValue('');
    setOpen(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setOpen(true);
  };

  const handleSelect = (acc) => {
    onSelect?.(acc);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Dark pill input */}
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-500 transition-all duration-200 focus-within:border-indigo-500 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onFocus={handleFocus}
          onChange={handleChange}
          disabled={loading}
          className="w-[15vw] min-w-[7rem] max-w-[11rem] text-xs font-medium text-white bg-transparent outline-none placeholder-gray-500 truncate"
          placeholder={loading ? 'Loading...' : 'Search account...'}
          autoComplete="off"
        />
        <svg
          className={`w-3 h-3 text-gray-400 flex-shrink-0 transition-transform duration-200 cursor-pointer ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onMouseDown={(e) => {
            e.preventDefault();
            if (open) {
              setOpen(false);
            } else {
              setOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-1 w-full min-w-[200px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Linked Accounts
          </p>

          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-[11px] text-gray-400 text-center">No results</p>
            ) : (
              filtered.map((acc) => {
                const isActive = acc.acctNo === selectedAcctNo;
                return (
                  <div
                    key={acc.acctNo || acc.acctId}
                    className={`w-full px-3 py-2 text-xs transition-colors flex items-center gap-2 group ${
                      isActive
                        ? 'bg-indigo-50 font-bold text-indigo-700'
                        : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {/* Select area */}
                    <button
                      className="flex-1 text-left flex flex-col min-w-0"
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(acc); }}
                    >
                      <span className="truncate">{acc.accountName || acc.acctName || acc.acctNo}</span>
                      {(acc.accountName || acc.acctName) && (
                        <span className="text-[10px] text-slate-400 truncate">{acc.acctNo}</span>
                      )}
                    </button>

                    {/* Active checkmark */}
                    {isActive && (
                      <svg className="w-3 h-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}

                    {/* Optional unlink button */}
                    {onUnlink && (
                      <button
                        className="ml-1 p-0.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                        title="Unlink"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onUnlink(acc);
                          setOpen(false);
                        }}
                      >
                        {/* X icon (inline SVG to avoid external dep) */}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Link another account */}
          {onLinkNew && (
            <div className="border-t border-slate-100 mt-1 pt-1 pb-1">
              <button
                onMouseDown={(e) => { e.preventDefault(); onLinkNew(); setOpen(false); }}
                className="w-full px-3 py-2 text-left text-xs text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2 group"
              >
                <svg className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Link another account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

AccountCombobox.propTypes = {
  accounts:       PropTypes.arrayOf(PropTypes.object),
  selectedAcctNo: PropTypes.string,
  selectedAcctName: PropTypes.string,
  loading:        PropTypes.bool,
  onSelect:       PropTypes.func,
  onLinkNew:      PropTypes.func,
  onUnlink:       PropTypes.func,
};

export default AccountCombobox;

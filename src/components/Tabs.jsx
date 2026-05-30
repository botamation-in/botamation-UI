import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/tabs.css';

/**
 * Tabs — wrapper that renders a bottom-border tab bar.
 *
 * Usage:
 *   <Tabs>
 *     <Tab active={activeTab === 'a'} onClick={() => setActiveTab('a')}>Tab A</Tab>
 *     <Tab active={activeTab === 'b'} onClick={() => setActiveTab('b')}>Tab B</Tab>
 *   </Tabs>
 */
export function Tabs({ className = '', children, ...rest }) {
  const classes = ['tabs', className].filter(Boolean).join(' ');
  return (
    <div className={classes} role="tablist" {...rest}>
      {children}
    </div>
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
  children:  PropTypes.node,
};

/**
 * Tab — a single tab button inside <Tabs>.
 *
 * Props:
 *   active   – boolean  marks this tab as selected
 *   disabled – boolean
 *   onClick  – () => void
 */
export function Tab({ active = false, className = '', children, ...rest }) {
  const classes = [
    'tab',
    active ? 'tab--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}

Tab.propTypes = {
  active:    PropTypes.bool,
  className: PropTypes.string,
  onClick:   PropTypes.func,
  disabled:  PropTypes.bool,
  children:  PropTypes.node,
};

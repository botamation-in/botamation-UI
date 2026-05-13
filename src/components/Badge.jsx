import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/badge.css';

/**
 * Badge — small inline label/chip.
 *
 * Props:
 *   variant  – 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'  (default: 'default')
 *   size     – 'sm' | 'md' | 'lg'  (default: 'md')
 *   dot      – prepend a coloured dot  (default: false)
 *   outline  – outlined style instead of filled  (default: false)
 *   className – extra classes
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  outline = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ds-badge',
    `ds-badge--${variant}`,
    size !== 'md' ? `ds-badge--${size}` : '',
    outline ? 'ds-badge--outline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && <span className="ds-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

Badge.propTypes = {
  variant:   PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  size:      PropTypes.oneOf(['sm', 'md', 'lg']),
  dot:       PropTypes.bool,
  outline:   PropTypes.bool,
  className: PropTypes.string,
  children:  PropTypes.node,
};

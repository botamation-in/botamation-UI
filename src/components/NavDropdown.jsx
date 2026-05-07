import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/dropdown.css';

/* ============================================================
   NavDropdown — CSS-token based dropdown for use in navigation
   (Header, AppNavbar). Uses a trigger-prop API identical to the
   lead app's local Dropdown component.
   ============================================================ */

/**
 * NavDropdown
 *
 * Props:
 *   trigger   – React node that opens the menu (required)
 *   align     – 'left' | 'right' | 'center'  (default 'left')
 *   direction – 'bottom' | 'top'              (default 'bottom')
 *   children  – <NavDropdownItem>, <NavDropdownSeparator> etc.
 */
export function NavDropdown({
  trigger,
  align = 'left',
  direction = 'bottom',
  className = '',
  children,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const menuClasses = [
    'ds-dropdown__menu',
    `ds-dropdown__menu--${align}`,
    `ds-dropdown__menu--${direction}`,
  ].join(' ');

  return (
    <div
      ref={ref}
      className={['ds-dropdown', open ? 'ds-dropdown--open' : '', className].filter(Boolean).join(' ')}
    >
      <div onClick={() => setOpen((v) => !v)} aria-haspopup="true" aria-expanded={open}>
        {trigger}
      </div>

      {open && (
        <div
          className={menuClasses}
          role="menu"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** Individual menu item */
export function NavDropdownItem({
  as: Component = 'button',
  danger = false,
  active = false,
  disabled = false,
  icon,
  shortcut,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ds-dropdown__item',
    danger   ? 'ds-dropdown__item--danger'  : '',
    active   ? 'ds-dropdown__item--active'  : '',
    disabled ? 'ds-dropdown__item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const props =
    Component === 'button'
      ? { type: 'button', disabled, ...rest }
      : { 'aria-disabled': disabled || undefined, ...rest };

  return (
    <Component className={classes} role="menuitem" {...props}>
      {icon && <span className="ds-dropdown__item-icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {shortcut && <kbd className="ds-dropdown__shortcut">{shortcut}</kbd>}
    </Component>
  );
}

/** Thin horizontal rule between groups */
export function NavDropdownSeparator({ className = '', ...rest }) {
  return <hr className={['ds-dropdown__separator', className].filter(Boolean).join(' ')} {...rest} />;
}

/** Small all-caps label above a group of items */
export function NavDropdownHeading({ className = '', children, ...rest }) {
  return (
    <div className={['ds-dropdown__heading', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

// ---- Prop types --------------------------------------------------------------
NavDropdown.propTypes = {
  trigger:   PropTypes.node.isRequired,
  align:     PropTypes.oneOf(['left', 'right', 'center']),
  direction: PropTypes.oneOf(['bottom', 'top']),
  className: PropTypes.string,
  children:  PropTypes.node,
};

NavDropdownItem.propTypes = {
  as:        PropTypes.elementType,
  danger:    PropTypes.bool,
  active:    PropTypes.bool,
  disabled:  PropTypes.bool,
  icon:      PropTypes.node,
  shortcut:  PropTypes.string,
  className: PropTypes.string,
  children:  PropTypes.node,
};

NavDropdownSeparator.propTypes = { className: PropTypes.string };
NavDropdownHeading.propTypes   = { className: PropTypes.string, children: PropTypes.node };

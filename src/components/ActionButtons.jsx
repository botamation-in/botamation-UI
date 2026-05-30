import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/action-buttons.css';

/* ── Shared SVG paths ────────────────────────────────────────── */

const EditIcon = () => (
  <svg
    className="action-btn__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="action-btn__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

/* ── EditButton ──────────────────────────────────────────────── */

export const EditButton = forwardRef(function EditButton(
  { className = '', title = 'Edit', children, ...rest },
  ref
) {
  const classes = ['action-btn', 'action-btn--edit', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type="button" className={classes} title={title} {...rest}>
      {children ?? <EditIcon />}
    </button>
  );
});

EditButton.displayName = 'EditButton';

EditButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

/* ── DeleteButton ────────────────────────────────────────────── */

export const DeleteButton = forwardRef(function DeleteButton(
  { className = '', title = 'Delete', children, ...rest },
  ref
) {
  const classes = ['action-btn', 'action-btn--delete', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type="button" className={classes} title={title} {...rest}>
      {children ?? <DeleteIcon />}
    </button>
  );
});

DeleteButton.displayName = 'DeleteButton';

DeleteButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

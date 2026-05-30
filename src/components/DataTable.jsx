import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/datatable.css';

/**
 * DataTable
 *
 * A reusable data table component with an indigo header, striped rows,
 * and optional edit / delete action buttons per row.
 *
 * Props:
 *   columns      – Array<{ key: string, label: string, render?: (value, row) => ReactNode }>
 *   rows         – Array<object>   data rows; each object keyed by column.key
 *   rowKey       – string | ((row) => string)   unique key for each row (default: 'id')
 *   onEdit       – (row) => void   called when the edit icon is clicked
 *   onDelete     – (row) => void   called when the delete icon is clicked
 *   actions      – boolean         show the Actions column (default: true when onEdit/onDelete provided)
 *   loading      – boolean         show a loading state
 *   emptyMessage – string          message shown when rows is empty
 *   className    – string
 */
export function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  onEdit,
  onDelete,
  actions,
  loading = false,
  emptyMessage = 'No data available.',
  className = '',
}) {
  const showActions = actions !== undefined ? actions : !!(onEdit || onDelete);
  const getKey = typeof rowKey === 'function' ? rowKey : (row) => row[rowKey];

  return (
    <div className={['ds-datatable-wrapper', className].filter(Boolean).join(' ')}>
      <table className="ds-datatable">
        <thead className="ds-datatable__head">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="ds-datatable__th">
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="ds-datatable__th ds-datatable__th--actions">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="ds-datatable__body">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="ds-datatable__td ds-datatable__td--empty"
              >
                <span className="ds-datatable__loading-dot" />
                <span className="ds-datatable__loading-dot" />
                <span className="ds-datatable__loading-dot" />
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="ds-datatable__td ds-datatable__td--empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={getKey(row) ?? rowIndex} className="ds-datatable__row">
                {columns.map((col) => (
                  <td key={col.key} className="ds-datatable__td">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                  </td>
                ))}
                {showActions && (
                  <td className="ds-datatable__td ds-datatable__td--actions">
                    {onEdit && (
                      <button
                        type="button"
                        className="ds-datatable__action-btn ds-datatable__action-btn--edit"
                        onClick={() => onEdit(row)}
                        title="Edit"
                        aria-label="Edit row"
                      >
                        {/* Pencil icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.586 3.586a2 2 0 112.828 2.828l-9 9A2 2 0 0115.5 16.5H4.5a1 1 0 01-1-1v-1a2 2 0 01.586-1.414l9-9z" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className="ds-datatable__action-btn ds-datatable__action-btn--delete"
                        onClick={() => onDelete(row)}
                        title="Delete"
                        aria-label="Delete row"
                      >
                        {/* Trash icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h2a1 1 0 011 1v.5h3.5a.5.5 0 010 1h-.5l-.72 9.36A2 2 0 0112.29 16H7.71a2 2 0 01-1.99-1.14L5 5.5h-.5a.5.5 0 010-1H8V4a1 1 0 011-1zm-2.5 3l.6 7.8h5.8l.6-7.8H6.5z" />
                        </svg>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key:    PropTypes.string.isRequired,
      label:  PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ),
  rows:         PropTypes.arrayOf(PropTypes.object),
  rowKey:       PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onEdit:       PropTypes.func,
  onDelete:     PropTypes.func,
  actions:      PropTypes.bool,
  loading:      PropTypes.bool,
  emptyMessage: PropTypes.string,
  className:    PropTypes.string,
};

export default DataTable;

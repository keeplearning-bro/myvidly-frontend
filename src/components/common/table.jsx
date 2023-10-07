import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ columns, data, onSort, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table >);
}

export default Table;
import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, data, sortColumn, onSort, user }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} user={user} />
    </table>
  );
};

export default Table;

import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../services/authService';
import Table from '../common/table';
import CheckBox from '../common/CheckBox';

const getCustomerName = (customer) => {
  const user = auth.getCurrentUser();
  if (user)
    return <Link to={`/customers/${customer._id}`}>{customer.name}</Link>;
  return customer.name;
};

function CustomerTable({ customers, sortColumn, onSort, onDelete }) {
  const columns = [
    {
      path: 'name',
      label: 'Name',
      content: (customer) => getCustomerName(customer),
    },
    {
      path: 'phone',
      label: 'Phone Number',
    },
    {
      path: 'hasBook',
      label: 'Has a Book',
      content: (customer) => (
        <CheckBox style={{ cursor: 'auto' }} checked={customer.hasBook} />
      ),
    },
  ];

  const deleteColumn = {
    key: 'delete',
    content: (customer) => (
      <button className="btn btn-danger" onClick={() => onDelete(customer)}>
        Delete
      </button>
    ),
  };

  const user = auth.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <React.Fragment>
      <Table
        columns={columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </React.Fragment>
  );
}

export default CustomerTable;

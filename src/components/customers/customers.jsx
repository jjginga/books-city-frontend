import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

import CustomerTable from './CustomerTable';
import Pagination from '../common/pagination';
import paginate from '../../utils/paginate';
import SearchBox from '../common/searchBox';

import { getCustomers, deleteCustomer } from '../../services/customerService';
import authService from '../../services/authService';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function populateCustomers() {
      const { data } = await getCustomers();
      setCustomers(data);
    }
    populateCustomers();
  });

  const handleDelete = async (customer) => {
    const originalCustomers = customers;
    const c = originalCustomers.filter((c) => {
      return c._id !== customer._id;
    });

    setCustomers(c);

    try {
      await deleteCustomer(customer._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This customer has already been deleted.');

      setCustomers(originalCustomers);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    setSortColumn(column);
  };

  const getPageData = () => {
    let filtered = customers;

    if (searchQuery)
      filtered = customers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);

    return { count: filtered.length, data };
  };

  const renderMessage = (count) => {
    if (count === 0) return 'There are no customers';

    return `There are ${count} customers.`;
  };

  const user = authService.getCurrentUser();
  const { count, data } = getPageData();

  return (
    <React.Fragment>
      <div className="row">
        {user && (
          <Link
            to="/customers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Customer
          </Link>
        )}
      </div>
      <div className="row">
        <p>{renderMessage(count)}</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="row">
        <CustomerTable
          customers={data}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      </div>
      <div className="row d-flex justify-content-center">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </React.Fragment>
  );
}

export default Customers;

import http from './httpService';

const url = '/customers';

function customerUrl(id) {
  return `${url}/${id}`;
}

export function getCustomers() {
  return http.get(url);
}

export function getCustomer(id) {
  return http.get(customerUrl(id));
}

export async function saveCustomer(customer) {
  if (customer._id) {
    const updatedCustomer = { ...customer };
    delete updatedCustomer._id;
    return http.put(customerUrl(customer._id), updatedCustomer);
  }

  return http.post(url, customer);
}

export function deleteCustomer(id) {
  return http.delete(customerUrl(id));
}

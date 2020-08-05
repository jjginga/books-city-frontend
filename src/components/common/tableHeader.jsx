import React from 'react';

function TableHeader({ sortColumn, onSort, columns }) {
  const raiseSort = (path) => {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;

    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;

// class TableHeader extends Component {
//   raiseSort = (path) => {
//     const sortColumn = { ...this.props.sortColumn };
//     if (sortColumn.path === path) {
//       sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
//     } else {
//       sortColumn.path = path;
//       sortColumn.order = 'asc';
//     }
//     this.props.onSort(sortColumn);
//   };

//   renderSortIcon = (column) => {
//     const { sortColumn } = this.props;

//     if (column.path !== sortColumn.path) return null;

//     if (sortColumn.order === 'asc')
//       return <i className="fa fa-sort-asc" aria-hidden="true"></i>;

//     return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
//   };

//   render() {
//     return (
//       <thead>
//         <tr>
//           {this.props.columns.map((column) => (
//             <th
//               className="clickable"
//               key={column.path || column.key}
//               onClick={() => this.raiseSort(column.path)}
//             >
//               {column.label} {this.renderSortIcon(column)}
//             </th>
//           ))}
//         </tr>
//       </thead>
//     );
//   }
// }

// export default TableHeader;

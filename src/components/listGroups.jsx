import React, { Component } from 'react';

class ListGroups extends Component {
  render() {
    const {
      items,
      selectedItem,
      onItemSelect,
      textProperty,
      valueProperty,
    } = this.props;

    return (
      <React.Fragment>
        <ul className="list-group">
          {items.map((item) => {
            return (
              <li
                key={item[valueProperty]}
                className={
                  item !== selectedItem
                    ? 'list-group-item'
                    : 'list-group-item active'
                }
                onClick={() => onItemSelect(item)}
              >
                {item[textProperty]}
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

ListGroups.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default ListGroups;

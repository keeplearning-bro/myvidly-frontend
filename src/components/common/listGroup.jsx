import React, { Component } from 'react';
class ListGroup extends Component {
  state = {}
  render() {
    const { items, textProperty, valueProperty, onItemSelected, selectedItem } = this.props
    return (
      < ul className="list-group" >
        {
          items.map(item =>
            <li
              key={item[textProperty]}
              className={selectedItem._id === item._id ? "list-group-item active" : "list-group-item"}
              aria-current="true"
              onClick={() => onItemSelected(item)}
            >{item[valueProperty]}</li>
          )
        }
      </ ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "_id",
  valueProperty: "name",
}

export default ListGroup;
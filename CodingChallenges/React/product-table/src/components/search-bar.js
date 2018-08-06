import React from "react";

// Fake API result
const products = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7"
  }
];

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      inStockOnly: false
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  onChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.search
    );
  }

  search() {
    const makeFilter = (inStockOnly, query) => {
      if (inStockOnly) {
        if (query) {
          return product =>
            product.name.toUpperCase().indexOf(query.toUpperCase()) >= 0 &&
            product.stocked;
        } else {
          return product => product.stocked;
        }
      } else if (query) {
        return product =>
          product.name.toUpperCase().indexOf(query.toUpperCase()) >= 0;
      } else return () => true;
    };

    const res = products.filter(
      makeFilter(this.state.inStockOnly, this.state.query)
    );
    this.props.onProductsChange(res);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.onChange}
          placeholder="Search..."
          style={{ marginBottom: "10px", height: "20px" }}
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="inStockOnly"
            checked={this.state.inStockOnly}
            onChange={this.onChange}
            style={{ marginBottom: "10px" }}
          />{" "}
          Only show products in stock
        </label>
      </div>
    );
  }
}

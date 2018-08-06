import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search-bar";
import ProductTable from "./components/product-table";
import "./index.css";

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
        products: []
    }
    this.onProductsChange = this.onProductsChange.bind(this)
  }

  onProductsChange(products) {
      this.setState({
          products
      })
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar onProductsChange={this.onProductsChange}/>
        <ProductTable products={this.state.products}/>
      </React.Fragment>
    );
  }
}


ReactDOM.render(<FilterableProductTable />, document.getElementById("root"));

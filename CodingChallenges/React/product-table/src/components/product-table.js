import React from "react";

const ProductCategoryRow = props => (
  <tr>
    <td colSpan={2}>
      <b>{props.name}</b>
    </td>
  </tr>
);

const ProductRow = props => {
  const style = !props.product.stocked ? { color: "red" } : null;

  return (
    <tr>
      <td style={style}>{props.product.name}</td>
      <td>{props.product.price}</td>
    </tr>
  );
};

export default class ProductTable extends React.Component {
  render() {
    let category = "";
    return (
      <table>
        <tbody>
          <tr style={{ backgroundColor: "yellow" }}>
            <th>Name</th>
            <th>Price</th>
          </tr>
          {this.props.products.map((product, index) => {
            let categoryRow;
            if (product.category !== category) {
              categoryRow = <ProductCategoryRow name={product.category} />;
              category = product.category;
            }
            const productRow = <ProductRow product={product} />;
            return (
              <React.Fragment key={categoryRow ? category : product.name}>
                {categoryRow}
                {productRow}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
}

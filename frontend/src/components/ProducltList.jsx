import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    addItems();
  }, []);
  const addItems = () => {
    fetch("http://localhost:3000/products", {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.data ? data.data.products : []));
  };
  const deleteItem = async (id) => {
    let result = await fetch(`http://localhost:3000/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (result.ok) {
      alert("Product Deleted Successfully");
      addItems();
    } else {
      console.log("Failed to delete");
    }
  };
  const changeHandler = async (event) => {
    let key = event.target.value;
    if (!key) {
      return addItems();
    }
    let result = await fetch(`http://localhost:3000/products/search/${key}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result.data.products);
  };
  return (
    <div className="products">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search Products"
        className="search_input"
        onChange={changeHandler}
      />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product's Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Company</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.company}</td>
                <td>
                  <button
                    type="button"
                    className="operations"
                    onClick={() => deleteItem(product._id)}
                  >
                    Delete
                  </button>
                  <button type="button" className="operations">
                    <Link className="btn_link" to={`/update/${product._id}`}>
                      Update
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

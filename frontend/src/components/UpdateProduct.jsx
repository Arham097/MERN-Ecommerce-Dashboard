import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const productName = useRef();
  const productPrice = useRef();
  const productCategory = useRef();
  const productCompany = useRef();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    console.log(param.id);
    getProductById();
  }, []);

  const getProductById = async () => {
    let result = await fetch(`http://localhost:3000/products/${param.id}`);
    result = await result.json();
    console.log(result.data.product);
    const { name, price, category, company } = result.data.product;
    productName.current.value = name;
    productPrice.current.value = price;
    productCategory.current.value = category;
    productCompany.current.value = company;
  };

  const onClickUpdate = async () => {
    const name = productName.current.value;
    const price = productPrice.current.value;
    const category = productCategory.current.value;
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const company = productCompany.current.value;

    const result = await fetch(
      `http://localhost:3000/products/update/${param.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name,
          price,
          category,
          userId,
          company,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    if (data.status === "failed") {
      const message = data.message.split(" ");
      let newMessage = [];
      for (let i = message.length - 4; i < message.length; i++) {
        newMessage.push(message[i]);
      }
      const alertMessage = newMessage.join(" ");
      alert(alertMessage);
      return false;
    }
    if (data.status === "success") {
      alert("Product Updated Successfully");
      navigate("/");
    }
  };
  return (
    <div className="updateProduct">
      <h1>Update Product</h1>
      <input
        type="text"
        ref={productName}
        className="inputBox"
        placeholder="Enter Product's Name"
      />
      <input
        type="text"
        ref={productPrice}
        className="inputBox"
        placeholder="Enter Product's Price"
      />
      <input
        type="text"
        ref={productCategory}
        className="inputBox"
        placeholder="Enter Product's Category"
      />
      <input
        type="text"
        ref={productCompany}
        className="inputBox"
        placeholder="Enter Product's Company"
      />
      <button
        type="button"
        className="appButton"
        onClick={() => {
          onClickUpdate();
        }}
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;

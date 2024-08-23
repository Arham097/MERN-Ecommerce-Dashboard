import { useRef, useState } from "react";

const AddProduct = () => {
  const productName = useRef();
  const productPrice = useRef();
  const productCategory = useRef();
  const productCompany = useRef();

  const onClickAddProd = async () => {
    const name = productName.current.value;
    const price = productPrice.current.value;
    const category = productCategory.current.value;
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const company = productCompany.current.value;

    const result = await fetch("http://localhost:3000/products/add-product", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        category,
        userId,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    if (data.status === "failed") {
      const message = data.message.split(" ");
      let newMessage = [];
      for (let i = message.length - 4; i < message.length; i++) {
        newMessage.push(message[i]);
      }
      const alertMessage = newMessage.join(" ");
      alert(alertMessage);
    }
    alert("Product Added Successfully");
    productName.current.value = "";
    productPrice.current.value = "";
    productCategory.current.value = "";
    productCompany.current.value = "";
  };

  return (
    <div className="addProduct">
      <h1>Add Product</h1>
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
      <button type="button" className="appButton" onClick={onClickAddProd}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

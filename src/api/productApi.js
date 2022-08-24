import axios from "axios";

export const getProducts = async () => {
  const { data: products } = await axios.get("http://localhost:3004/product");
  return products;
};
export const DelProduct = async (id) => {
  await axios.delete(`http://localhost:3004/product/${id}`);
};
export const UpdateProduct = async (id, descript, phone) => {
  const { data: products } = await axios.get(
    `http://localhost:3004/product/${id}`
  );
  // console.log(products);
  await axios.put(`http://localhost:3004/product/${id}`, {
    ...products,
    description: descript,
    phoneNumber: phone,
  });
};

export const postProduct = async (product) => {
  await axios.post("http://localhost:3004/product", product);
};
export const getUsers = async () => {
  const { data: users } = await axios.get("http://localhost:3004/users");
  return users;
};
export const postUsers = async (user) => {
  const leet = await axios.post("http://localhost:3004/users", user);
  // console.log(leet);
};

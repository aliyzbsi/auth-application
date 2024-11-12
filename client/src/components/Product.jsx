import axios from "axios";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/productContext";
import { useEffect } from "react";

function Product() {
  const { register, handleSubmit } = useForm();
  const { product, setProduct } = useProduct();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5002/api/products", data);
      console.log("Form verisi:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/products");
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h2>Ürün Ekle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" {...register("name", { required: true })} />
        </label>
        <label>
          Price:
          <input
            type="number"
            {...register("price", { required: true, min: 0 })}
          />
        </label>
        <label>
          Description:
          <input type="text" {...register("description")} />
        </label>
        <label>
          Stock:
          <input type="number" {...register("stock", { min: 0 })} />
        </label>
        <label>
          Category:
          <input type="text" {...register("category")} />
        </label>
        <button type="submit">Ürünü Kaydet</button>
      </form>
      <div>
        <h1>Ürünler</h1>
        {product?.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

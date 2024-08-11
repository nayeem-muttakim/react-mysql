import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "./upload";

const Post = () => {
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      const name = form.name.value;
      const datum_code = form.rating.value;
      const imageData = form.image.files[0];

      const imageUp = await uploadImages(imageData);
      // console.log(image) 
      const image=imageUp.url
      const product = {
        name,
        datum_code,
        image,
      };

      axios
        .post("http://localhost:5500/api/data", product)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="hero  bg-base-200">
      <div
        className="hero-content flex-col 
        "
      >
        <div className="text-center ">
          <h1 className="text-4xl font-bold">Post a Product</h1>
        </div>
        <div className="card  w-[450px] shadow-2xl bg-base-100">
          <form onSubmit={handlePost} className="card-body ">
            <div className="form-control gap-3">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                required
              />

              <input
                name="rating"
                type="text"
                placeholder="Datum Code"
                className="input input-bordered w-full"
                required
              />

              <input
                type="file"
                name="image"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-blue-600 text-white">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uploadImages } from "./upload";

const Update = () => {
  const { id } = useParams();
  const [prod, setProd] = useState({});
  useEffect(() => {
    axios(`http://localhost:5500/api/data/${id}`)
      .then((res) => setProd(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  //   console.log(prod);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const name = form.name.value;
      const datum_code = form.rating.value;
      const imageData = form.image.files[0];

      let image = prod?.image;
      if (imageData) {
        const imageUp = await uploadImages(imageData);
        image = imageUp.url;
      }

      const product = {
        name,
        datum_code,
        image,
      };

      axios
        .put(`http://localhost:5500/api/data/${id}`, product)
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
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
          <h1 className="text-4xl font-bold">Update ID:{id}</h1>
        </div>
        <div className="card  w-[450px] shadow-2xl bg-base-100">
          <form onSubmit={handleUpdate} className="card-body ">
            <div className="form-control gap-3">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                defaultValue={prod?.name}
              />

              <input
                name="rating"
                type="text"
                placeholder="Datum Code"
                className="input input-bordered w-full"
                defaultValue={prod.datum_code}
              />
              <img src={prod?.image} alt="" />
              <input
                type="file"
                name="image"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-blue-600 text-white">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;

import axios from "axios";
import { Link } from "react-router-dom";

const DatumDetail = ({ datum }) => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5500/api/data/${id}`).then((res) => {
      if (res.data === "Deleted Successfully") {
        location.reload();
      }
    });
  };
  const { id, name, datum_code, image } = datum;

  return (
    <div className="mx-auto">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{datum_code}</p>
          
              <img key={image} src={image} />
         
          <div className="btn-group flex justify-between">
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-info  text-white"
            >
              Delete
            </button>
            <Link to={`/update/${id}`}>
              <button className="btn btn-warning ">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatumDetail;

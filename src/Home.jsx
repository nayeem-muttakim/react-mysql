import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import DatumDetail from "./datumDetail";

const Home = () => {
  const [prodData, setProdData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/data")
      .then((res) => setProdData(res.data));
  }, []);

  if (prodData == 0) {
    return (
      <div className="hero h-[500px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-red-500">Sorry</h1>
            <p className="py-6 text-2xl">
              No products to show.<br></br>
              <span className="text-4xl">Big surprise incoming</span>.<br></br>
              Stay with us
            </p>
            <Link to="/post">
              <button className="btn btn-primary">Post</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" ">
      <header className="shadow-sm">
        <nav className="m-auto flex max-w-[1440px] items-center justify-between px-3 py-5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg bg-slate-300 px-3 py-2 text-2xl font-semibold tracking-tight"
          >
            Product List
          </Link>
          <Link to="/post">
            <button className="btn btn-primary">Post</button>
          </Link>
        </nav>
      </header>
      <div className="grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-4 lg:px-48 ">
        {prodData?.map((datum) => (
          <DatumDetail key={datum.id} datum={datum} />
        ))}
      </div>
    </div>
  );
};

export default Home;

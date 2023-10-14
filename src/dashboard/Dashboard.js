import styles from "./Dashboard.module.css";
import {
  FaGlassMartiniAlt,
  FaHamburger,
  FaCookieBite,
  FaRegClock,
  FaPlus,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getDashboardData } from "./service";
import { useEffect, useState } from "react";
import logo from "..//assets/images/logo.png";

// import AddPostModal from "../addPostModal/AddPostModal";

export default function Dashboard() {
  const [post, setPost] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function getPosts() {
    const data = await getDashboardData();
    if (!data) {
      return;
    }
    setPost(data);
  }

  const filtered = post?.filter((item) => {
    return Object.keys(item).some((key) => {
      return item[key]
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  });

  useEffect(() => {
    getPosts();
  }, []);

  const filters = [
    {
      name: "snack",
      icon: <FaCookieBite className="text-4xl text-amber-700" />,
    },
    {
      name: "drink",
      icon: <FaGlassMartiniAlt className="text-4xl text-amber-700" />,
    },
    { name: "food", icon: <FaHamburger className="text-4xl text-amber-700" /> },
  ];

  return (
    <div className="">
      <div className={styles.header + " pt-4 pb-10 px-10"}>
        <div className="nav flex justify-between">
          <img src={logo} alt="logo" className="w-32" />
          <button className="btn" onClick={() => setIsOpen(true)}>
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-20">
          <h1 className="text-white font-black text-5xl uppercase">
            Explore Foods
          </h1>
          <p className="text-white font-medium text-xl my-5">
            Lorem ipsum sit amet
          </p>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="carousel carousel-center max-w-md space-x-4 p-4 bg-white rounded-box">
          {filters.map((el, id) => (
            <div
              key={id}
              className="carousel-item flex flex-col justify-center items-center rounded-box py-4 px-7 gap-2 bg-gray-100"
              onClick={() => setSearch(el.name)}
            >
              {el.icon}
              <p className="rounded-box text-base font-semibold uppercase">
                {el.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 gap-8 flex flex-wrap justify-center">
        {filtered?.length > 0
          ? filtered?.map((el, id) => (
              <div key={id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={el.img} alt={el.img} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{el.title}</h2>
                  <p className="text-start">
                    {el.city} <br />
                    <span className="badge badge-outline font-bold text-lg text-amber-700">
                      {el.price}€
                    </span>
                  </p>
                  <div className="flex justify-between items-end">
                    <div className="flex justify-center gap-2">
                      <div className="">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={el.avatarUrl} alt={el.avatarUrl} />
                          </div>
                        </div>
                        <p>{el.username}</p>
                      </div>
                      <div className="mt-1">
                        <span className="flex items-center gap-1 text-xs">
                          <FaLocationDot className="text-amber-700" />
                          {el.city}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <FaRegClock className="text-amber-700" /> {el.time}
                        </span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <div className="badge badge-outline">{el.location}</div>
                      <div className="badge badge-outline">{el.tag}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "No results found according to filter"}
      </div>
      {/* {isOpen && <AddPostModal onClose={setIsOpen} />} */}
    </div>
  );
}

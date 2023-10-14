import styles from "./Dashboard.module.css";
import { FaGlassMartiniAlt, FaHamburger, FaCookieBite } from "react-icons/fa";
import { getDashboardData } from "./service";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [post, setPost] = useState(null);

  async function getPosts() {
    const data = await getDashboardData();
    if (!data) {
      return;
    }
    setPost(data);
  }

  useEffect(() => {
   getPosts()
   console.log('hey', post);
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
      <div className={styles.header + " pt-4  px-10 pb-10"}>
        <div className="nav text-start">
          <p className="">EatAway</p>
        </div>
        <div className="flex flex-col justify-center items-center my-20">
          <h1 className="text-white font-black text-5xl uppercase">
            Explore Foods
          </h1>
          <p className="text-white font-medium text-xl my-5">
            Lorem ipsum sit amet
          </p>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="carousel carousel-center max-w-md space-x-4 p-4 bg-white rounded-box">
          {filters.map((el, id) => (
            <div key={id} className="carousel-item flex flex-col justify-center items-center rounded-box py-4 px-7 gap-2 bg-gray-100">
              {el.icon}
              <p className="rounded-box text-base font-semibold uppercase">
                {el.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {post?.length > 0 ? post?.map((el, id) => (
          <div key={id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={el.img} alt={el.img} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {el.title}
              </h2>
              <p>{el.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{el.tag}</div>
              </div>
            </div>
          </div>
        )) : 'yok'}
      </div>
    </div>
  );
}

import styles from './Dashboard.module.css';
import {
  FaGlassMartiniAlt,
  FaHamburger,
  FaCookieBite,
  FaRegClock,
  FaPlus,
  FaRegTimesCircle,
} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { getDashboardData } from './service';
import { useEffect, useState } from 'react';
import logo from '..//assets/images/logo.png';

import AddPostModal from '../addPostModal/AddPostModal';
import { Watch } from 'react-loader-spinner';

export default function Dashboard() {
  const [post, setPost] = useState(null);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  async function getPosts() {
    const data = await getDashboardData();
    if (!data) {
      return;
    }
    setPost(data);
  }

  const filtered = post?.filter(item => {
    return Object.keys(item).some(key => {
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
      name: 'snack',
      icon: <FaCookieBite className="text-4xl text-accent" />,
    },
    {
      name: 'drink',
      icon: <FaGlassMartiniAlt className="text-4xl text-accent" />,
    },
    { name: 'food', icon: <FaHamburger className="text-4xl text-accent" /> },
  ];

  return (
    <div className="">
      <header className="bg-white shadow-md relative z-10">
        <nav
          className="mx-auto flex items-center justify-between py-2 px-10 "
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Eat away</span>
              <img src={logo} alt="logo" className="w-32" />
            </a>
          </div>
          <div className="nav flex justify-between">
            <button className="btn" onClick={() => setIsOpen(true)}>
              <FaPlus />
            </button>
          </div>
        </nav>
      </header>

      <div className={styles.hero + ' p-4 pb-10 px-10'}>
        <div className="flex flex-col justify-center items-center my-20">
          <h1 className="text-white font-black text-5xl uppercase">
            Explore Foods
          </h1>
          <p className="text-white font-medium text-xl mt-5 mb-10">
            Taste the World, Speak Your Mind: Eat Away!
          </p>
          <div className="form-control w-full md:w-1/2 xl:w-1/4 relative">
            <input
              type="text"
              placeholder="Search…"
              value={search}
              className="input input-bordered w-full"
              onChange={e => {
                setSearch(e.target.value);
                !e.target.value ? setIsSearch(false) : setIsSearch(true);
              }}
            />
            {isSearch && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setIsSearch(false);
                }}
                className="absolute right-3 top-3"
              >
                <FaRegTimesCircle size={24} className="text-accent" />
              </button>
            )}
          </div>
        </div>

        <div className=" flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto p-4 gap-2 bg-white rounded-box cursor-pointer">
          {filters.map((el, id) => (
            <div
              key={id}
              className="w-full flex flex-col justify-center items-center rounded-box p-4 gap-2 bg-gray-100"
              onClick={() => {
                setSearch(el.name);
                setIsFilterClicked(true);
              }}
            >
              {el.icon}
              <p className="rounded-box text-base font-semibold uppercase">
                {el.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isFilterClicked && search && (
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setIsFilterClicked(false);
          }}
          className="flex items-center gap-2 justify-center my-4 mx-auto text-base font-semibold uppercase rounded-box p-4 bg-gray-100"
        >
          Remove filter
          <FaRegTimesCircle className="text-4xl text-accent" />
        </button>
      )}

      {post && (
        <div className="p-10 gap-8 flex flex-wrap justify-center">
          {filtered?.length > 0
            ? filtered?.map((el, id) => (
                <div key={id} className="card w-96 bg-base-100 shadow-xl">
                  <figure>
                    <img src={el.img} alt={el.img} className={styles.image} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{el.title}</h2>
                    <p className="text-start">
                      {el.description} <br />
                      <span className="badge badge-outline font-bold text-lg text-accent my-2">
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
                            <FaLocationDot className="text-accent" />
                            {el.city}
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            <FaRegClock className="text-accent" /> {el.time}
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
            : 'No results found according to filter'}
        </div>
      )}

      {!post && (
        <div className="flex justify-center my-4">
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#86A789"
            ariaLabel="watch-loading"
          />
        </div>
      )}

      {isOpen && <AddPostModal onClose={setIsOpen} isOpen={isOpen} />}
    </div>
  );
}

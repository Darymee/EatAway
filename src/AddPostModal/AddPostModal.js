import { useState } from "react";
import styles from "./AddPostModal.module.css";
import { addNewPost } from "../dashboard/service";

export default function AddPostModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username,
      email,
      avatarUrl,
      city,
      location,
      time,
      title,
      price,
      img,
      description,
      tag,
    };

    try {
      setIsDisabled(true);
      await addNewPost(newPost);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }

    setUsername("");
    setCity("");
    setAvatarUrl("");
    setImg("");
    setEmail("");
    setLocation("");
    setTitle("");
    setTime("");
    setDescription("");
    setTag("");
    setPrice(0);

    onClose(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => onClose(false)}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">New post</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <label htmlFor="username" className="mb-2 block text-left ">
              Name:
            </label>
            <input
              id="username"
              type="text"
              placeholder="Sarah... "
              required
              className="input input-bordered w-full max-w-s"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="mb-2 block text-left ">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="sarah@gmail.com"
              className="input input-bordered w-full max-w-s"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="avatarUrl" className="mb-2 block text-left ">
              Avatar url:
            </label>
            <input
              id="avatarUrl"
              type="text"
              placeholder="https://static-prod.adweek.com/wp-content/uploads/2023/01/WhatsApp-Avatar-Profile-Photo-Hero-1240x697.png.webp"
              required
              className="input input-bordered w-full max-w-s"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="city" className="mb-2 block text-left ">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Linz"
              required
              className="input input-bordered w-full max-w-s"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="location" className="mb-2 block text-left ">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Bakery Sweet Dreams"
              required
              className="input input-bordered w-full max-w-s"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="time" className="mb-2 block text-left ">
              Time
            </label>
            <input
              id="time"
              type="time"
              required
              className="input input-bordered w-full max-w-s"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="mb-2 block text-left ">
              Price, €
            </label>
            <input
              id="price"
              type="number"
              required
              className="input input-bordered w-full max-w-s"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="title" className="mb-2 block text-left ">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="input input-bordered w-full max-w-s"
              placeholder="Strawberry Cake To Go!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="img" className="mb-2 block text-left ">
              Image url
            </label>
            <input
              id="img"
              type="text"
              required
              className="input input-bordered w-full max-w-s"
              placeholder="https://mrgrill.ua/storage/products/images/big/CrRPyOfO7R0BKu5AvMIX3cuY7UmYVDMA6rLJtZlo.png.webp?v=1667685432"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="mb-2 block text-left ">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              required
              className="input input-bordered w-full max-w-s"
              placeholder="I bought this tasty cake with 20% discount!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="img" className="mb-2 block text-left ">
              Tag
            </label>
            <select
              id="tag"
              className="input input-bordered w-full max-w-s"
              required
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Choose your tag</option>
              <option value="drink">Drink</option>
              <option value="snack">Snack</option>
              <option value="food">Food</option>
            </select>
          </div>
          <input
            type="submit"
            value="Add new post"
            disabled={isDisabled}
            className={
              styles.btnSubmit +
              " bg-amber-700 px-4 py-2 rounded mt-4 text-white cursor-pointer"
            }
          />
        </form>
      </div>
    </div>
  );
}

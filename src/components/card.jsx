import React from "react";
import images from "../assets/sosmed.jpg";

export default function Card({ image, date, title }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg my-2">
      <a href="#">
        <img className="rounded-t-lg" src={images} alt={title} />
      </a>
      <div className="p-5">
        <p className="mb-3 text-gray-700">{date}</p>
        <a href="#">
          <h5
            className="mb-2 text-2xl font-bold text-gray-900 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h5>
        </a>
      </div>
    </div>
  );
}

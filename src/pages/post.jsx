import React, { useState, useEffect } from "react";
import Card from "../components/card";
import Pagination from "../components/pagination";
import axios from "axios";
import { formatDate } from "../utils/date";

export default function Post() {
  const [filter, setFilter] = useState(() => {
    return parseInt(localStorage.getItem("filter"), 10) || 10;
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dateFilter, setDateFilter] = useState(() => {
    return localStorage.getItem("dateFilter") || "newest";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage"), 10) || 1;
  });

  useEffect(() => {
    axios
      .get("https://suitmedia-backend.suitdev.com/api/ideas", {
        params: {
          "page[number]": 1,
          "page[size]": filter,
          append: ["small_image", "medium_image"],
          sort: dateFilter === "newest" ? "-published_at" : "published_at",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setData(response.data.data);
        setTotal(response.data.meta.total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filter, dateFilter]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
    localStorage.setItem("dateFilter", dateFilter);
    localStorage.setItem("currentPage", currentPage);
  }, [filter, dateFilter, currentPage]);

  const validTotal = typeof total === "number" && !isNaN(total) ? total : 0;
  const validFilter = typeof filter === "number" && !isNaN(filter) ? filter : 10;
  const totalPages = Math.ceil(validTotal / 8);
  const start = (currentPage - 1) * 8 + 1;
  const end = Math.min(currentPage * 8, validTotal);
  const paginatedData = data.slice((currentPage - 1) * 8, currentPage * 8).map((item) => ({
    ...item,
    small_image: item.small_image[0]?.url || "",
  }));

  return (
    <div>
      <div className="filter-controls p-4 mx-4 md:mx-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
        <section className="flex-1">
          <p className="text-sm md:text-base">
            Showing {start}-{end} of {validTotal}
          </p>
        </section>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <section className="flex items-center">
            <label htmlFor="filter" className="mr-2 text-sm md:text-base">
              Show per page:
            </label>
            <select
              id="filter"
              value={validFilter}
              onChange={(e) => {
                setFilter(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              className="border px-4 py-1 rounded-full text-sm md:text-base"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </section>
          <section className="flex items-center">
            <label htmlFor="dateFilter" className="mr-2 text-sm md:text-base">
              Sort by:
            </label>
            <select
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-4 py-1 rounded-full text-sm md:text-base"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mx-24">
        {paginatedData.map((card, index) => (
          <Card key={index} image={card.small_image} date={formatDate(card.published_at)} title={card.title} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

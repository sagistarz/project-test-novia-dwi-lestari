import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  let pageNumbers = [];

  if (totalPages <= 4) {
    pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);
  } else {
    pageNumbers.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages) {
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="p-4 mx-24 flex justify-center items-center gap-2">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="px-2 py-2">
        &lt;&lt;
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-2">
        &lt;
      </button>

      {pageNumbers.map((number, index) => (
        <button key={index} onClick={() => onPageChange(number)} className={`px-2 py-2 rounded-lg ${number === currentPage ? "bg-orange-500 text-white" : ""}`}>
          {number}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-2">
        &gt;
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="px-2 py-2">
        &gt;&gt;
      </button>
    </div>
  );
}

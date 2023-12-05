import React, { useState } from "react";

import "./styles.css";

function OverviewFilters({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(filters.status ?? "");

  return (
    <div className="filter">
      <button onClick={() => setIsOpen((prev) => !prev)} className="filter_btn">
        FILTER
      </button>
      {isOpen && (
        <div id="dropdown" className="filter_dropdown">
          <select
            name="status"
            id="status"
            value={active}
            onChange={(e) => setActive(e.target.value.toString())}
            placeholder="choose status"
          >
            <option value="">Choose Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <div className="filters_action">
            <button
              className="close_btn"
              onClick={() => {
                setIsOpen(false);
                setActive("");
                setFilters("");
              }}
            >
              Reset
            </button>
            <button
              className="apply_btn"
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: active }));
                setIsOpen(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewFilters;

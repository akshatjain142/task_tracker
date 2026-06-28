function FilterSortSearch({ filters, onChange }) {
  const handleChange = (event) => {
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div className="filter-row">
      <label>
        Search
        <input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search tasks"
        />
      </label>
      <label>
        Status
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </label>
      <label>
        Sort
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="">Recent</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </label>
    </div>
  );
}

export default FilterSortSearch;

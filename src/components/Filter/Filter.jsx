import { useDispatch, useSelector } from "react-redux";
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
  clearFilters,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

function Filter() {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            onChange={handleTitleFilterChange}
            type="text"
            placeholder="Filter by title..."
          />
        </div>
        <div className="filter-group">
          {" "}
          <input
            value={authorFilter}
            onChange={handleAuthorFilterChange}
            type="text"
            placeholder="Filter by author..."
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              onChange={handleOnlyFavoriteFilterChange}
              checked={onlyFavoriteFilter}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;

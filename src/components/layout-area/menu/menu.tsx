import "./menu.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { searchSlice } from "../../../redux/search-slice";

export function Menu() {
    const searchText = useSelector<AppState, string>((state) => state.searchText);
    const dispatch = useDispatch();

    function handleSearchChange(text: string): void {
        dispatch(searchSlice.actions.setSearchText(text));
    }

    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/reports">Reports</NavLink>
            <NavLink to="/recommendations">Recommendations</NavLink>
            <NavLink to="/about">About</NavLink>
            <input
                type="text"
                placeholder="Search coins..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
        </div>
    );
}
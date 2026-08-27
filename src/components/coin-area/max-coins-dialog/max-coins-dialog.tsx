import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { SelectedCoinsState } from "../../../redux/selected-coins-slice";
import { selectedCoinsSlice } from "../../../redux/selected-coins-slice";
import "./max-coins-dialog.css";

export function MaxCoinsDialog() {
  const selectedCoins = useSelector<AppState, SelectedCoinsState>(
    (state) => state.selectedCoins,
  );
  const dispatch = useDispatch();

  if (!selectedCoins.pendingCoin) {
    return null;
  }

  function removeAndAdd(idToRemove: string): void {
    dispatch(selectedCoinsSlice.actions.removeCoinAndAddPending(idToRemove));
  }

  return (
    <div className="MaxCoinsDialog-overlay">
      <div className="MaxCoinsDialog">
        <h3>Maximum Coins Reached</h3>
        <p>
          You can select up to 5 coins. To add {selectedCoins.pendingCoin.name},
          please choose one to remove:
        </p>
        <ul>
          {selectedCoins.coins.map((c) => (
            <li key={c.id}>
              <span>{c.name}</span>
              <button
                onClick={() => removeAndAdd(c.id)}
                aria-label={`Remove ${c.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CoinModel } from "../../../models/coin-model";
import { CoinPriceModel } from "../../../models/coin-price-model";
import { coinService } from "../../../services/coin-service";
import { AppState } from "../../../redux/app-state";
import { SelectedCoinsState } from "../../../redux/selected-coins-slice";
import { selectedCoinsSlice } from "../../../redux/selected-coins-slice";
import "./coin-card.css";

type CoinCardProps = {
    coin: CoinModel;
};

export function CoinCard(props: CoinCardProps) {
    const [price, setPrice] = useState<CoinPriceModel | null>(null);
    const [error, setError] = useState<string>("");

    const selectedCoins = useSelector<AppState, SelectedCoinsState>(
        (state) => state.selectedCoins
    );

    const dispatch = useDispatch();

    const isSelected = selectedCoins.coins.some(
        (c) => c.id === props.coin.id
    );

    function toggleMoreInfo(): void {
        if (price) {
            setPrice(null);
            setError("");
            return;
        }

        setError("");

        coinService
            .getCoinPrice(props.coin.id)
            .then((coinPrice) => setPrice(coinPrice))
            .catch(() =>
                setError("Failed to load coin prices. Please try again later.")
            );
    }

    function toggleSelected(): void {
        dispatch(
            selectedCoinsSlice.actions.toggleSelectedCoin(props.coin)
        );
    }

    return (
        <div className="CoinCard">
            <div>
                <span>{props.coin.symbol}</span>
                <span>{props.coin.name}</span>
            </div>

            <div>
                <img src={props.coin.image} alt={props.coin.name} />
            </div>

            <label>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={toggleSelected}
                    aria-label={`Select ${props.coin.name}`}
                />
                <span></span>
            </label>

            <button onClick={toggleMoreInfo}>
                {price ? "Close Info" : "More Info"}
            </button>

            {error && <p>{error}</p>}

            {price && (
                <div>
                    <p>$ {price.usd}</p>
                    <p>€ {price.eur}</p>
                    <p>₪ {price.ils}</p>
                </div>
            )}
        </div>
    );
}
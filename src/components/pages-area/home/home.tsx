import { useEffect, useState } from "react";
import "./home.css";
import { coinService } from "../../../services/coin-service";
import { CoinModel } from "../../../models/coin-model";
import { CoinCard } from "../../coin-area/coin-card/coin-card";
import { MaxCoinsDialog } from "../../coin-area/max-coins-dialog/max-coins-dialog";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { coinSlice } from "../../../redux/coin-slice";

export function Home() {
    const coins = useSelector<AppState, CoinModel[]>((state) => state.coins);
    const searchText = useSelector<AppState, string>((state) => state.searchText);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();

    // Fetch coins only if they are not already stored in Redux:
    useEffect(() => {
        if (coins.length > 0) {
            return;
        }

        coinService
            .getAllCoins()
            .then((allCoins) => dispatch(coinSlice.actions.initCoins(allCoins)))
            .catch(() =>
                setError("Failed to load cryptocurrencies. Please try again later.")
            );
    }, [coins.length, dispatch]);

    const filteredCoins = coins.filter(
        (c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()) ||
            c.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="Home">
            {error && <p>{error}</p>}

            {filteredCoins.map((c) => (
                <CoinCard key={c.id} coin={c} />
            ))}

            <MaxCoinsDialog />
        </div>
    );
}
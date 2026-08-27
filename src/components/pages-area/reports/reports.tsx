import { useEffect, useState } from "react";
import "./reports.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { SelectedCoinsState } from "../../../redux/selected-coins-slice";
import { coinService } from "../../../services/coin-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type HistoryPoint = {
  time: string;
  [symbol: string]: string | number;
};

export function Reports() {
  const selectedCoins = useSelector<AppState, SelectedCoinsState>(
    (state) => state.selectedCoins,
  );

  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (selectedCoins.coins.length === 0) {
      setHistory([]);
      setError("");
      return;
    }

    setError("");

    let intervalId: number;
    let isActive = true;

    // Get the symbols of all selected coins:
    const symbols = selectedCoins.coins.map((c) => c.symbol);

    // Map the selected coins to their CoinLore IDs:
    coinService
      .getCoinloreIds(symbols)
      .then((coinloreIds) => {
        if (!isActive) {
          return;
        }

        if (coinloreIds.length === 0) {
          setError("No report data is available for the selected coins.");
          return;
        }

        // Fetch all selected coin prices once per second:
        intervalId = window.setInterval(() => {
          coinService
            .getRealtimePrices(coinloreIds)
            .then((result) => {
              const point: HistoryPoint = {
                time: new Date().toLocaleTimeString(),
              };

              result.forEach((p) => {
                point[p.symbol] = Number(p.price_usd);
              });

              setHistory((prev) => [...prev, point].slice(-30));
            })
            .catch((err) => console.log(err));
        }, 1000);
      })
      .catch(() =>
        setError("Failed to load report data. Please try again later."),
      );

    // Stop polling when leaving the page:
    return () => {
      isActive = false;

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [selectedCoins.coins]);

  return (
    <div className="Reports">
      {error && <p>{error}</p>}

      {selectedCoins.coins.length === 0 && (
        <p>Select coins on the Home page to see real-time reports.</p>
      )}

      {history.length > 0 && (
        <div>
          <h3>Real-Time Reports (USD)</h3>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />

              <YAxis scale="log" domain={[0.001, "auto"]} allowDataOverflow />

              <Tooltip formatter={(value) => `$ ${value}`} />
              <Legend />

              {selectedCoins.coins.map((c, index) => (
                <Line
                  key={c.symbol}
                  type="monotone"
                  dataKey={c.symbol.toUpperCase()}
                  stroke={
                    ["#8884d8", "#82ca9d", "#ff7300", "#0088FE", "#FF0000"][
                      index
                    ]
                  }
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

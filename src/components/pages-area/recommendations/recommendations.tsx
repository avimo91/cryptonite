import { useState } from "react";
import "./recommendations.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { SelectedCoinsState } from "../../../redux/selected-coins-slice";
import { coinService } from "../../../services/coin-service";
import { AiRecommendationModel } from "../../../models/ai-recommendation-model";

export function Recommendations() {
  const selectedCoins = useSelector<AppState, SelectedCoinsState>(
    (state) => state.selectedCoins,
  );

  const [selectedId, setSelectedId] = useState<string>("");
  const [recommendation, setRecommendation] =
    useState<AiRecommendationModel | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function getRecommendation(): Promise<void> {
    if (!selectedId) {
      return;
    }

    try {
      setLoading(true);
      setRecommendation(null);
      setError("");

      // Get the coin data and request an AI recommendation:
      const aiData = await coinService.getCoinAiData(selectedId);
      const result = await coinService.getAiRecommendation(aiData);

      setRecommendation(result);
    } catch {
      setError("Failed to get AI recommendation. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Recommendations">
      {error && <p>{error}</p>}

      {selectedCoins.coins.length === 0 && (
        <p>Select coins on the Home page to get AI recommendations.</p>
      )}

      {selectedCoins.coins.length > 0 && (
        <div>
          {selectedCoins.coins.map((c) => (
            <label key={c.id}>
              <input
                type="radio"
                name="coin"
                value={c.id}
                checked={selectedId === c.id}
                onChange={() => setSelectedId(c.id)}
              />

              {c.name}
            </label>
          ))}

          <button onClick={getRecommendation} disabled={!selectedId || loading}>
            {loading ? "Loading..." : "Get Recommendation"}
          </button>
        </div>
      )}

      {recommendation && (
        <div className="Recommendations-result">
          <h3>{recommendation.verdict}</h3>
          <p>{recommendation.explanation}</p>
          <small>This is not real financial advice.</small>
        </div>
      )}
    </div>
  );
}

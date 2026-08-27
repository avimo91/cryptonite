import axios from "axios";
import { CoinModel } from "../models/coin-model";
import { CoinPriceModel } from "../models/coin-price-model";
import { CoinloreAssetModel } from "../models/coinlore-asset-model";
import { CoinRealtimePriceModel } from "../models/coin-realtime-price-model";
import { CoinAiDataModel } from "../models/coin-ai-data-model";
import { AiRecommendationModel } from "../models/ai-recommendation-model";
import { appConfig } from "../utils/app-config";
import { jsonSanitizer } from "../utils/json-sanitizer";

class CoinService {
  // Fetch all coins:
  public async getAllCoins(): Promise<CoinModel[]> {
    const response = await axios.get<CoinModel[]>(appConfig.coinsUrl);
    const coins = response.data;

    return coins;
  }

  // Fetch the current coin prices:
  public async getCoinPrice(id: string): Promise<CoinPriceModel> {
    const response = await axios.get(appConfig.coinDetailsUrl + id);

    const price: CoinPriceModel = {
      usd: response.data.market_data.current_price.usd,
      eur: response.data.market_data.current_price.eur,
      ils: response.data.market_data.current_price.ils,
    };

    return price;
  }

  // Get CoinLore IDs by coin symbols:
  public async getCoinloreIds(symbols: string[]): Promise<string[]> {
    const response = await axios.get(appConfig.coinloreAssetsUrl);
    const allAssets: CoinloreAssetModel[] = response.data.data;

    const coinloreIds = symbols
      .map((symbol) => {
        const match = allAssets.find(
          (asset) => asset.symbol.toLowerCase() === symbol.toLowerCase(),
        );

        return match ? match.id : null;
      })
      .filter((id): id is string => id !== null);

    return coinloreIds;
  }

  // Fetch real-time prices for all selected coins:
  public async getRealtimePrices(
    coinloreIds: string[],
  ): Promise<CoinRealtimePriceModel[]> {
    const idsParam = coinloreIds.join(",");

    const response = await axios.get<CoinRealtimePriceModel[]>(
      appConfig.coinloreTickerUrl + idsParam,
    );

    return response.data;
  }

  // Fetch the market data required for the AI:
  public async getCoinAiData(id: string): Promise<CoinAiDataModel> {
    const response = await axios.get(
      appConfig.coinMarketDataUrl + id + "?market_data=true",
    );

    const data = response.data;

    const aiData: CoinAiDataModel = {
      name: data.name,
      current_price_usd: data.market_data.current_price.usd,
      market_cap_usd: data.market_data.market_cap.usd,
      volume_24h_usd: data.market_data.total_volume.usd,
      price_change_percentage_30d_in_currency:
        data.market_data.price_change_percentage_30d_in_currency.usd,
      price_change_percentage_60d_in_currency:
        data.market_data.price_change_percentage_60d_in_currency.usd,
      price_change_percentage_200d_in_currency:
        data.market_data.price_change_percentage_200d_in_currency.usd,
    };

    return aiData;
  }

  // Get an AI recommendation for a coin:
  public async getAiRecommendation(
    coinData: CoinAiDataModel,
  ): Promise<AiRecommendationModel> {
    const systemPrompt =
      'You are a financial assistant that analyzes cryptocurrency data and gives a short investment recommendation. Always respond with a single valid JSON object in this exact format, and nothing else: { "verdict": "Buy" or "Don\'t Buy", "explanation": "a short paragraph explaining why" }.';

    const userPrompt =
      "Here is the data for the coin: " +
      JSON.stringify(coinData) +
      ". Based on this data, should I buy this coin or not? Respond only with the JSON object.";

    const body = {
      model: appConfig.openaiModel,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    };

    const options = {
      headers: {
        Authorization: "Bearer " + appConfig.openaiApiKey,
      },
    };

    // Send the coin data to OpenAI:
    const response = await axios.post(appConfig.openaiUrl, body, options);

    const rawText = response.data.choices[0].message.content;

    // Sanitize the AI response:
    const recommendation =
      jsonSanitizer.sanitize<AiRecommendationModel>(rawText);

    return recommendation;
  }
}

export const coinService = new CoinService();

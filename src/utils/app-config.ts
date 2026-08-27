class AppConfig {
    public readonly coinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    public readonly coinDetailsUrl = "https://api.coingecko.com/api/v3/coins/";
    public readonly coinloreAssetsUrl = "https://api.coinlore.net/api/assets/";
    public readonly coinloreTickerUrl = "https://api.coinlore.net/api/ticker/?id=";
    public readonly coinMarketDataUrl = "https://api.coingecko.com/api/v3/coins/";
    public readonly openaiUrl = "https://api.openai.com/v1/chat/completions";
    public readonly openaiModel = "gpt-4o-mini";
    public readonly openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
}

export const appConfig = new AppConfig();
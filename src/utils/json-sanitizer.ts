class JsonSanitizer {

    // Extract and parse the JSON object from the AI response:
    public sanitize<T>(text: string): T {
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        const json = text.substring(start, end + 1);

        return JSON.parse(json);
    }
}

export const jsonSanitizer = new JsonSanitizer();
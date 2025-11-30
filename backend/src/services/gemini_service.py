from google import genai

class GeminiService:
    def do_ask(contents):
        client = genai.Client()

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents
        )

        return response.text

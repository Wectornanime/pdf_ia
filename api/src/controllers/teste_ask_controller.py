from src.services.supabase_sevice import SupabaseService
from src.services.gemini_service import GeminiService as gemini

from src.models.session_model import CreateSessionAskModel
from src.utils.embed_text import embed_text

class TesteAskController:
    def handle(id: str, data: CreateSessionAskModel):
        contents = list()
        supabase = SupabaseService()
        session = supabase.get_session_by_id(id=id)
        messages = supabase.get_session_messages(session_id=id)

        for message in messages:
            contents.append(f'{message['role'].upper()}: {message['content']}')

        if len(session) > 0:
            embedded_text = embed_text(data.ask)
            chunks = supabase.get_chunks_by_pdf_path(embedded_text=embedded_text, pdf_path=session[0]['pdf_path'])

            print(chunks)

        # contents.append(f'USER: {data.ask}')
        # supabase.save_user_message(session=id, message=data.ask)

        # answer = gemini.do_ask(contents=contents)
        # supabase.save_model_message(session=id, message=answer)

        # return { 'answer': answer }

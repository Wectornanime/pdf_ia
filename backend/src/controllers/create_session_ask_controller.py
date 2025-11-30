from services.supabase_sevice import SupabaseService
from services.gemini_service import GeminiService as gemini

from models.session_model import CreateSessionAskModel

class CreateSessionAskController:
    def handle(id: str, data: CreateSessionAskModel):
        contents = list()
        supabase = SupabaseService()

        messages = supabase.get_session_messages(session_id=id)
        for message in messages:
            contents.append(f'{message['role'].upper()}: {message['content']}')
        contents.append(f'USER: {data.ask}')

        supabase.save_user_message(session=id, message=data.ask)

        answer = gemini.do_ask(contents=contents)
        supabase.save_model_message(session=id, message=answer)

        return { 'answer': answer }

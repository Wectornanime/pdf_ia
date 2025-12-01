from src.models.session_model import CreateSessionModel
from src.services.supabase_sevice import SupabaseService
from src.services.gemini_service import GeminiService

class CreateSessionController:
    def handle(data: CreateSessionModel):
        contents = list()
        supabase = SupabaseService()

        new_session = supabase.new_session()
        session = new_session.data[0]['id']
        supabase.save_user_message(message=data.ask, session=session)

        contents.append(data.ask)
        answer = GeminiService.do_ask(contents=contents)
        supabase.save_model_message(message=answer, session=session)

        return {
            'sessionId': session,
            'answer': answer,
            }

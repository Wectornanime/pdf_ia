from src.services.supabase_sevice import SupabaseService

class GetSessionController:
    def handle(id: str):
        supabase = SupabaseService()
        messages = supabase.get_session_messages(session_id=id)

        return messages

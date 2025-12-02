from src.services.supabase_sevice import SupabaseService

class ListSessionsController:
    def handle():
        supabase = SupabaseService()

        sessions = supabase.list_sessions()

        return sessions

from supabase import create_client, Client
import os

class SupabaseService:
    def __init__(self):
        url = os.getenv('SUPABASE_URL')
        key = os.getenv('SUPABASE_ANON_KEY')

        self.supabase: Client = create_client(url, key)

    def new_session(self):
        resultado = (
            self.supabase
            .table('sessions')
            .insert({'pdf_path': 'teste'})
            .execute()
        )
        return resultado

    def save_user_message(self, message, session):
        resultado = (
            self.supabase
            .table('messages')
            .insert({
                'session_id': session,
                'content': message,
                'role': 'user',
                })
            .execute()
        )
        return resultado

    def save_model_message(self, message, session):
        resultado = (
            self.supabase
            .table('messages')
            .insert({
                'session_id': session,
                'content': message,
                'role': 'model',
                })
            .execute()
        )
        return resultado

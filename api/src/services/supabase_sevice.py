from supabase import create_client, Client
import os

class SupabaseService:
    def __init__(self):
        url = os.getenv('SUPABASE_URL')
        key = os.getenv('SUPABASE_ANON_KEY')

        self.supabase: Client = create_client(url, key)

    def new_session(self, pdf_path='teste'):
        resultado = (
            self.supabase
            .table('sessions')
            .insert({'pdf_path': pdf_path})
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

    def get_session_messages(self, session_id):
        try:
            resultado = (
                self.supabase
                .table('messages')
                .select('*')
                .eq('session_id', session_id)
                .order('created_at', desc=False)
                .execute()
            )
            return resultado.data or []
        except:
            return []
        
    def upload_file_to_bucket(self, path, file):
        resultado = (
            self.supabase
            .storage.from_('ia-gemini_bucket')
            .upload(
                path=path,
                file=file,
                file_options={
                    "content-type": "application/pdf"
                }
            )
        )
        return resultado
    
    def save_chunks_into_documents(self, pdf_path, content, metadata, embedding):
        resultado = (
            self.supabase
            .table('documents')
            .insert({
                'pdf_path': pdf_path,
                'content': content,
                'metadata': metadata,
                'embedding': embedding,
            })
            .execute()
        )
        return resultado

    def get_chunks_by_pdf_path(self, embedded_text, pdf_path, k=5):
        result = self.supabase.rpc(
            "match_documents_by_pdf",
            {
                "query_embedding": embedded_text,
                "match_count": k,
                "pdf_path": pdf_path
            }
        ).execute()
        return result.data
    
    def get_session_by_id(self, id):
        try:
            resultado = (
                self.supabase
                .table('sessions')
                .select('*')
                .eq('id', id)
                .execute()
            )
            return resultado.data or []
        except:
            return []

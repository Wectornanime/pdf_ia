from datetime import datetime as dt
from fastapi import UploadFile, File
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from src.utils.embed_text import embed_text
from src.services.supabase_sevice import SupabaseService

class TesteController:
    async def handle(file: UploadFile = File(...)):
        supabase = SupabaseService()

        timestamp = dt.now().timestamp()
        temp_file_name = f'{timestamp}_{file.filename}'
        temp_file_path = f'temp/{temp_file_name}'

        with open(temp_file_path, "wb") as f:
            f.write(await file.read())

        with open(temp_file_path, "rb") as f:
            supabase.upload_file_to_bucket(file=f, path=temp_file_name)

        loader = PyPDFLoader(temp_file_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=700,
            chunk_overlap=150
        )
        chunks = splitter.split_documents(documents)

        for i, chunk in enumerate(chunks):
            supabase.save_chunks_into_documents(
                pdf_path=temp_file_name,
                content=chunk.page_content,
                metadata=chunk.metadata,
                embedding = embed_text(chunk.page_content)
            )
        
        new_session = supabase.new_session(pdf_path=temp_file_name)
        session = new_session.data[0]['id']

        return { 'sessionId': session }
from fastapi import UploadFile, File
from fastapi import APIRouter

from src.controllers.create_session_controller import CreateSessionController
from src.controllers.get_session_controller import GetSessionController
from src.controllers.create_session_ask_controller import CreateSessionAskController
from src.controllers.list_sessions_controller import ListSessionsController
from src.controllers.teste_controller import TesteController
from src.controllers.teste_ask_controller import TesteAskController

from src.models.session_model import CreateSessionModel, CreateSessionAskModel

api = APIRouter(prefix="/api")

@api.post('/session')
def post_session(data: CreateSessionModel):
    return CreateSessionController.handle(data)

@api.get('/session')
def get_sessions():
    return ListSessionsController.handle()

@api.get('/session/{id}')
def get_session_id(id: str):
    return GetSessionController.handle(id)

@api.post('/session/{id}/ask')
def post_session_id_ask(id: str, data: CreateSessionAskModel):
    return CreateSessionAskController.handle(id, data)

@api.post('/teste')
async def post_teste(file: UploadFile = File(...)):
    return await TesteController.handle(file)

@api.post('/teste/{id}/ask')
async def post_teste_id_ask(id: str, data: CreateSessionAskModel):
    return await TesteAskController.handle(id=id, data=data)

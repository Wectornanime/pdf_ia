from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from datetime import datetime as dt

from src.controllers.create_session_controller import CreateSessionController
from src.controllers.get_session_controller import GetSessionController
from src.controllers.create_session_ask_controller import CreateSessionAskController
from src.controllers.teste_controller import TesteController
from src.controllers.teste_ask_controller import TesteAskController

from src.models.session_model import CreateSessionModel, CreateSessionAskModel

from src.utils.check_temp_path import check_temp_path

load_dotenv()
check_temp_path()
app = FastAPI()

@app.post('/session')
def post_session(data: CreateSessionModel):
    return CreateSessionController.handle(data)

@app.get('/session/{id}')
def get_session_id(id: str):
    return GetSessionController.handle(id)

@app.post('/session/{id}/ask')
def post_session_id_ask(id: str, data: CreateSessionAskModel):
    return CreateSessionAskController.handle(id, data)

@app.post('/teste')
async def post_teste(file: UploadFile = File(...)):
    return await TesteController.handle(file)

@app.post('/teste/{id}/ask')
async def post_teste_id_ask(id: str, data: CreateSessionAskModel):
    return await TesteAskController.handle(id=id, data=data)

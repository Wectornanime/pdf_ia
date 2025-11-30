from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from datetime import datetime as dt

from controllers.create_session_controller import CreateSessionController
from controllers.get_session_controller import GetSessionController
from controllers.create_session_ask_controller import CreateSessionAskController
from controllers.teste_controller import TesteController

from models.session_model import CreateSessionModel, CreateSessionAskModel

load_dotenv()
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
    # content = await file.read()

    # with open(f'{dt.now().timestamp()}-{file.filename}', 'wb') as f:
    #     f.write(content)

    # return {'filename': file.filename, 'size': len(content)}


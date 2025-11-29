from dotenv import load_dotenv
from fastapi import FastAPI

from controllers.create_session_controller import CreateSessionController

from models.session_model import CreateSessionModel

load_dotenv()
app = FastAPI()

@app.post('/session')
def post_session(data: CreateSessionModel):
    return CreateSessionController.handle(data)

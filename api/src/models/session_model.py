from pydantic import BaseModel

class CreateSessionModel(BaseModel):
    ask: str

class CreateSessionAskModel(BaseModel):
    ask: str

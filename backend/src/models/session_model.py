from pydantic import BaseModel

class CreateSessionModel(BaseModel):
    ask: str

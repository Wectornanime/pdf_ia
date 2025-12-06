import os
from dotenv import load_dotenv
from fastapi import FastAPI, FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

from src.api_router import api

from src.utils.check_temp_path import check_temp_path

load_dotenv()
check_temp_path()
app = FastAPI()

client_origin = os.getenv("FRONTEND_URL")

origins = [
    "http://localhost:5173",
    "http://localhost",
    client_origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # libera domínios específicos
    allow_credentials=True,         # permite envio de cookies/autenticação
    allow_methods=["*"],            # libera todos os métodos (GET, POST, etc)
    allow_headers=["*"],            # libera todos os headers
)

app.include_router(api)

# app.mount("/", StaticFiles(directory="static", html=True), name="static")

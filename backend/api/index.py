from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginInput(BaseModel):
    email: str
    password: str


@app.get("/")
def root():
    return {"message": "Backend online"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/auth/login")
def login(data: LoginInput):
    if data.email == "admin@mevion.com" and data.password == "123456":
        return {
            "user": {
                "name": "Administrador",
                "email": data.email,
                "type": "admin",
            },
            "token": "fake-jwt-token",
        }

    raise HTTPException(status_code=401, detail="E-mail ou senha inválidos")
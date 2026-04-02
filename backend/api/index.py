from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import create_access_token, verify_token
from database import Base, SessionLocal, engine
from models import User
from security import hash_password, verify_password

app = FastAPI()

Base.metadata.create_all(bind=engine)

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


class CreateUserInput(BaseModel):
    name: str
    email: str
    password: str
    type: str


@app.get("/")
def root():
    return {"message": "Backend online"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/auth/login")
def login(data: LoginInput):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        db.close()
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos")

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "type": user.type,
        }
    )

    response = {
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "type": user.type,
        },
        "token": token,
    }

    db.close()
    return response


@app.post("/users")
def create_user(data: CreateUserInput):
    db = SessionLocal()

    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        type=data.type,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "type": user.type,
    }

    db.close()
    return response


@app.get("/auth/me")
def get_me(payload: dict = Depends(verify_token)):
    return {
        "message": "Token válido",
        "user": payload,
    }
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import create_access_token, verify_token
from database import SessionLocal
from models import Client, Company, User
from security import hash_password, verify_password

app = FastAPI()

# Base.metadata.create_all(bind=engine)

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


class CompanyInput(BaseModel):
    nomeFantasia: Optional[str] = ""
    razaoSocial: Optional[str] = ""
    cnpj: Optional[str] = ""
    inscricaoEstadual: Optional[str] = ""
    telefone: Optional[str] = ""
    email: Optional[str] = ""
    segmento: Optional[str] = ""
    observacoes: Optional[str] = ""


class ClientInput(BaseModel):
    nomeCompleto: str
    dataNascimento: Optional[str] = ""
    cpf: Optional[str] = ""
    sexo: Optional[str] = ""
    emailLogin: str
    senha: str
    status: Optional[str] = ""
    potencialCompra: Optional[str] = ""
    companies: List[CompanyInput] = []


class DeleteClientInput(BaseModel):
    admin_password: str


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
        "name": user.name,
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


@app.get("/clients")
def get_clients():
    db = SessionLocal()

    clients = db.query(Client).all()

    response = []
    for client in clients:
        response.append(
            {
                "id": client.id,
                "nomeCompleto": client.nome_completo,
                "dataNascimento": client.data_nascimento,
                "cpf": client.cpf,
                "sexo": client.sexo,
                "emailLogin": client.email_login,
                "senha": client.senha,
                "status": client.status,
                "potencialCompra": client.potencial_compra,
                "companies": [
                    {
                        "id": company.id,
                        "nomeFantasia": company.nome_fantasia,
                        "razaoSocial": company.razao_social,
                        "cnpj": company.cnpj,
                        "inscricaoEstadual": company.inscricao_estadual,
                        "telefone": company.telefone,
                        "email": company.email,
                        "segmento": company.segmento,
                        "observacoes": company.observacoes,
                    }
                    for company in client.companies
                ],
            }
        )

    db.close()
    return response


@app.post("/clients")
def create_client(data: ClientInput):
    db = SessionLocal()

    existing_client = db.query(Client).filter(
        Client.email_login == data.emailLogin
    ).first()
    if existing_client:
        db.close()
        raise HTTPException(status_code=400, detail="E-mail de login já cadastrado")

    existing_user = db.query(User).filter(User.email == data.emailLogin).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Já existe usuário com esse e-mail")

    client = Client(
        nome_completo=data.nomeCompleto,
        data_nascimento=data.dataNascimento,
        cpf=data.cpf,
        sexo=data.sexo,
        email_login=data.emailLogin,
        senha=data.senha,
        status=data.status,
        potencial_compra=data.potencialCompra,
    )

    db.add(client)

    user = User(
        name=data.nomeCompleto,
        email=data.emailLogin,
        password=hash_password(data.senha),
        type="cliente",
    )

    db.add(user)

    for company_data in data.companies:
        company = Company(
            nome_fantasia=company_data.nomeFantasia,
            razao_social=company_data.razaoSocial,
            cnpj=company_data.cnpj,
            inscricao_estadual=company_data.inscricaoEstadual,
            telefone=company_data.telefone,
            email=company_data.email,
            segmento=company_data.segmento,
            observacoes=company_data.observacoes,
        )
        client.companies.append(company)

    db.commit()
    db.refresh(client)

    response = {
        "id": client.id,
        "nomeCompleto": client.nome_completo,
        "dataNascimento": client.data_nascimento,
        "cpf": client.cpf,
        "sexo": client.sexo,
        "emailLogin": client.email_login,
        "senha": client.senha,
        "status": client.status,
        "potencialCompra": client.potencial_compra,
        "companies": [
            {
                "id": company.id,
                "nomeFantasia": company.nome_fantasia,
                "razaoSocial": company.razao_social,
                "cnpj": company.cnpj,
                "inscricaoEstadual": company.inscricao_estadual,
                "telefone": company.telefone,
                "email": company.email,
                "segmento": company.segmento,
                "observacoes": company.observacoes,
            }
            for company in client.companies
        ],
    }

    db.close()
    return response


@app.put("/clients/{client_id}")
def update_client(client_id: int, data: ClientInput):
    db = SessionLocal()

    client = db.query(Client).filter(Client.id == client_id).first()

    if not client:
        db.close()
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    existing_client = (
        db.query(Client)
        .filter(Client.email_login == data.emailLogin, Client.id != client_id)
        .first()
    )
    if existing_client:
        db.close()
        raise HTTPException(status_code=400, detail="E-mail de login já cadastrado")

    client.nome_completo = data.nomeCompleto
    client.data_nascimento = data.dataNascimento
    client.cpf = data.cpf
    client.sexo = data.sexo
    client.email_login = data.emailLogin
    client.senha = data.senha
    client.status = data.status
    client.potencial_compra = data.potencialCompra

    user = db.query(User).filter(User.email == client.email_login).first()
    if user:
        user.name = data.nomeCompleto
        user.email = data.emailLogin
        user.password = hash_password(data.senha)
        user.type = "cliente"

    client.companies.clear()

    for company_data in data.companies:
        company = Company(
            nome_fantasia=company_data.nomeFantasia,
            razao_social=company_data.razaoSocial,
            cnpj=company_data.cnpj,
            inscricao_estadual=company_data.inscricaoEstadual,
            telefone=company_data.telefone,
            email=company_data.email,
            segmento=company_data.segmento,
            observacoes=company_data.observacoes,
        )
        client.companies.append(company)

    db.commit()
    db.refresh(client)

    response = {
        "id": client.id,
        "nomeCompleto": client.nome_completo,
        "dataNascimento": client.data_nascimento,
        "cpf": client.cpf,
        "sexo": client.sexo,
        "emailLogin": client.email_login,
        "senha": client.senha,
        "status": client.status,
        "potencialCompra": client.potencial_compra,
        "companies": [
            {
                "id": company.id,
                "nomeFantasia": company.nome_fantasia,
                "razaoSocial": company.razao_social,
                "cnpj": company.cnpj,
                "inscricaoEstadual": company.inscricao_estadual,
                "telefone": company.telefone,
                "email": company.email,
                "segmento": company.segmento,
                "observacoes": company.observacoes,
            }
            for company in client.companies
        ],
    }

    db.close()
    return response


@app.delete("/clients/{client_id}")
def delete_client(
    client_id: int,
    data: DeleteClientInput,
    payload: dict = Depends(verify_token),
):
    db = SessionLocal()

    user_id = payload.get("sub")
    user_type = payload.get("type")

    if user_type != "admin":
        db.close()
        raise HTTPException(status_code=403, detail="Apenas admin pode excluir clientes")

    admin_user = db.query(User).filter(User.id == int(user_id)).first()

    if not admin_user:
        db.close()
        raise HTTPException(status_code=404, detail="Usuário admin não encontrado")

    if not verify_password(data.admin_password, admin_user.password):
        db.close()
        raise HTTPException(status_code=401, detail="Senha do admin inválida")

    client = db.query(Client).filter(Client.id == client_id).first()

    if not client:
        db.close()
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    linked_user = db.query(User).filter(User.email == client.email_login).first()
    if linked_user:
        db.delete(linked_user)

    db.delete(client)
    db.commit()
    db.close()

    return {"message": "Cliente excluído com sucesso"}
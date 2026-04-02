from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    type = Column(String, nullable=False)


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    nome_completo = Column(String, nullable=False)
    data_nascimento = Column(String, nullable=True)
    cpf = Column(String, nullable=True)
    sexo = Column(String, nullable=True)
    email_login = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)
    status = Column(String, nullable=True)
    potencial_compra = Column(String, nullable=True)

    companies = relationship(
        "Company",
        back_populates="client",
        cascade="all, delete-orphan"
    )


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id", ondelete="CASCADE"), nullable=False)

    nome_fantasia = Column(String, nullable=True)
    razao_social = Column(String, nullable=True)
    cnpj = Column(String, nullable=True)
    inscricao_estadual = Column(String, nullable=True)
    telefone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    segmento = Column(String, nullable=True)
    observacoes = Column(Text, nullable=True)

    client = relationship("Client", back_populates="companies")
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy import Column, String, ForeignKey


class Base:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


Base = declarative_base(cls=Base)


class ExposedEntity:
    id = Column(String, primary_key=True)


class User(ExposedEntity, Base):
    pass


class Details(Base):
    user = Column(String, ForeignKey("user.id"))

    email = Column(String)
    display_name = Column(String)

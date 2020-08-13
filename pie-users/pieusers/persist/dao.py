from uuid import uuid4 as uuid

from lib.proto.common_pb2 import Uuid as UuidGrpc
from lib.proto.user_pb2 import Details as DetailsGrpc
from lib.proto.user_pb2 import User as UserGrpc
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.orm import relationship

from pieusers.persist.session import engine


class Base:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(String, primary_key=True)


Base = declarative_base(cls=Base)


class User(Base):
    details = relationship(
        "Details", uselist=False, cascade="all, delete", passive_deletes=True
    )

    @staticmethod
    def from_grpc(user):
        """Constructs a User DAO from a User GRPC message.
        Args:
            user: user grpc message to convert
        """
        id = user.id.value or str(uuid())
        return User(id=id, details=Details.from_grpc(user, id))

    def to_grpc(self):
        """Constructs a User GRPC message from this User instance.
        """
        return UserGrpc(id=UuidGrpc(value=self.id), details=self.details.to_grpc())

    def __repr__(self):
        return f"User {{id={self.id}, details={self.details}}}"


class Details(Base):
    id = Column(String, ForeignKey(User.id), primary_key=True)

    email = Column(String)
    display_name = Column(String)

    @staticmethod
    def from_grpc(user, user_id):
        """Constructs a Details DAO from a Details GRPC message.
        Args:
            user: user grpc message containing details
        """
        return Details(
            id=user_id,
            email=user.details.email,
            display_name=user.details.display_name,
        )

    def to_grpc(self):
        """Constructs a Details GRPC message from this Details instance
        """
        return DetailsGrpc(email=self.email, display_name=self.display_name)

    def __repr__(self):
        return f"Details {{id={self.id}, email={self.email}, display_name={self.display_name}}}"


Base.metadata.create_all(engine)

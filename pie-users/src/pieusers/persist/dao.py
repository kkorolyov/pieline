import logging
from time import sleep
from uuid import uuid4 as uuid

from lib.proto.common_pb2 import Uuid as UuidGrpc
from lib.proto.user_pb2 import Details as DetailsGrpc
from lib.proto.user_pb2 import User as UserGrpc
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.orm import relationship

from pieusers.persist.session import ENGINE

LOG = logging.getLogger(__name__)


class Base:
    """DAO base.
    Defines primary ID and table name conventions.
    """

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(String, primary_key=True)


Base = declarative_base(cls=Base)


class User(Base):
    """User DAO.
    """

    details = relationship(
        "Details", uselist=False, cascade="all, delete", passive_deletes=True
    )

    @staticmethod
    def from_grpc(user):
        """Constructs a User DAO from a User gRPC message.
        Args:
            user: user grpc message to convert
        Returns:
            [User]: User DAO format
        """
        id = user.id.value or str(uuid())
        return User(id=id, details=Details.from_grpc(user, id))

    def to_grpc(self) -> UserGrpc:
        """Constructs a User gRPC message from this User instance.
        Returns:
            [UserGrpc]: User gRPC message
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
        """Constructs a Details DAO from a Details gRPC message.
        Args:
            user: user grpc message containing details
            user_id: attached user ID
        Returns:
            [Details]: Details DAO format
        """
        return Details(
            id=user_id,
            email=user.details.email,
            display_name=user.details.display_name,
        )

    def to_grpc(self) -> DetailsGrpc:
        """Constructs a Details gRPC message from this Details instance
        Returns:
            [DetailsGrpc]: Details gRPC message
        """
        return DetailsGrpc(email=self.email, display_name=self.display_name)

    def __repr__(self):
        return f"Details {{id={self.id}, email={self.email}, display_name={self.display_name}}}"


while True:
    try:
        Base.metadata.create_all(ENGINE)
        LOG.info("initialized persistence metadata")
        break
    except OperationalError:
        LOG.exception("cannot connect to DB, retrying...")
        sleep(1)

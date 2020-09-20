from lib.proto.common_pb2 import Uuid
from lib.proto.user_pb2 import Details, User
from pytest import fixture

from pieusers.persist.dao import User as UserDao
from pieusers.persist.session import start_session


@fixture
def id():
    return "someId"


@fixture
def user(id):
    return User(id=Uuid(value=id), details=Details())


def test_inits_id():
    assert UserDao.from_grpc(User()).to_grpc().id.value is not None


def test_retains_id(id):
    assert UserDao.from_grpc(User(id=Uuid(value=id))).to_grpc().id.value == id


def test_reconstructs_user(user):
    with start_session() as session:
        assert session.merge(UserDao.from_grpc(user)).to_grpc() == user

from lib.proto.common_pb2 import Uuid
from lib.proto.user_pb2 import Details, User
from pytest import fixture

from pieusers.service.users import UsersServicer


@fixture
def servicer():
    return UsersServicer()


@fixture
def missingId():
    return Uuid(value="none")


@fixture
def newUser():
    return User(details=Details(email="bogoEmail", display_name="bogoDisplay"))


@fixture
def idUser():
    return User(
        id=Uuid(value="givenId"),
        details=Details(email="myEmail", display_name="moreDisplay"),
    )


def test_get_no_matches(servicer, context, missingId):
    assert not len(list(servicer.Get([missingId], context)))


def test_upsert_noop(servicer, context):
    assert not len(list(servicer.Upsert([], context)))


def test_upsert_adds(servicer, context, newUser):
    result = list(servicer.Upsert([newUser], context))

    assert len(result) == 1
    assert result[0].details == newUser.details


def test_delete_noop(servicer, context):
    assert not len(list(servicer.Delete([], context)))


def test_delete_no_matches(servicer, context, missingId):
    assert not len(list(servicer.Delete([missingId], context)))


def test_delete_matches(servicer, context, newUser):
    id = next(servicer.Upsert([newUser], context)).id

    assert len(list(servicer.Delete([id], context)))


def test_lifecycle(servicer, context, newUser):
    resultUser = next(servicer.Upsert([newUser], context))

    assert next(servicer.Get([resultUser.id], context)) == resultUser
    assert next(servicer.Delete([resultUser.id], context)) == resultUser
    assert not len(list(servicer.Get([resultUser.id], context)))

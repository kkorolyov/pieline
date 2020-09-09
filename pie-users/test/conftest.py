from collections import namedtuple

from pytest import fixture

Context = namedtuple("Context", ["get_active_span"], defaults=[lambda: None])


@fixture
def context():
    return Context()

from sqlalchemy import create_engine
from persist.dao import Base

def create_engine(*args, **kwargs):
    engine = create_engine(*args, **kwargs)

    Base.metadata.create_all(engine)

    return engine

def sqlite():
    """Constructs a new SQLite-backed session
    """
    return Session(create_engine("sqlite:///:memory:", echo=True))


class Session:
    """Persistence session providing access through DAOs
    """

    def __init__(self, engine):
        self.engine = engine


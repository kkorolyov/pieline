from contextlib import contextmanager
from os import environ

from opentracing import tags
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from pieusers.tracing import tracer

ENGINE = create_engine(environ["DB_URL"])

__Session = sessionmaker(bind=ENGINE)


@contextmanager
def start_session():
    """Starts a transaction-scoped session
    """
    session = __Session()

    scope = tracer().start_active_span("session")
    scope.span.set_tag(tags.COMPONENT, "sqlalchemy").set_tag(tags.DATABASE_TYPE, "sql")

    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        scope.span.set_tag(tags.ERROR, e)
        raise e
    finally:
        session.close()
        scope.close()

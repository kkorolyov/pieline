from contextlib import contextmanager
from os import environ

from opentracing import tags
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from pieusers.tracing import tracer

ENGINE = create_engine(environ["DB_URL"], pool_pre_ping=True)

__Session = sessionmaker(bind=ENGINE)


@contextmanager
def start_session():
    """Starts a transaction-scoped session
    """
    session = __Session()

    with tracer().start_active_span("session") as scope:
        scope.span.set_tag(tags.COMPONENT, "sqlalchemy")
        scope.span.set_tag(tags.DATABASE_TYPE, "sql")

        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

from contextlib import contextmanager

from opentracing import tags
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from pieusers.tracing import tracer

engine = create_engine("sqlite:///test.db")
Session = sessionmaker(bind=engine)


@contextmanager
def start_session():
    """Starts a transaction-scoped session
    """
    session = Session()

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

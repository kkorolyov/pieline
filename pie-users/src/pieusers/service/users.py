from logging import getLogger

from lib.proto.user_pb2_grpc import UsersServicer as ProtoUsersServicer

from pieusers.persist.dao import User
from pieusers.persist.session import start_session
from pieusers.tracing import tracer

LOG = getLogger(__name__)


class UsersServicer(ProtoUsersServicer):
    """Users servicer implementation.
    """

    def Get(self, id_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True):
            ids = [id.value for id in id_it]

            LOG.debug(f"get users for ids({ids}")

            try:
                with start_session() as session:
                    request = session.query(User)

                    if ids:
                        request = request.filter(User.id.in_(ids))

                    result = [user.to_grpc() for user in request]

                LOG.info(f"get users for ids({ids}) = {result}")

                return iter(result)
            except Exception:
                LOG.exception("get oopsie")

    def Upsert(self, user_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True):
            users = list(user_it)

            LOG.debug(f"upsert users({users}")

            try:
                with start_session() as session:
                    result = [
                        session.merge(User.from_grpc(user)).to_grpc() for user in users
                    ]

                LOG.info(f"upsert users({users}) = {result}")

                return iter(result)
            except Exception:
                LOG.exception("upsert oopsie")

    def Delete(self, id_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True):
            ids = [id.value for id in id_it]

            LOG.debug(f"delete users for ids({ids})")

            try:
                with start_session() as session:
                    request = session.query(User).filter(User.id.in_(ids))

                    result = [user.to_grpc() for user in request]

                    request.delete(synchronize_session=False)

                LOG.info(f"delete users for ids({ids}) = {result}")

                return iter(result)
            except Exception:
                LOG.exception("delete oopsie")

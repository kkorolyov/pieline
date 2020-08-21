import logging
from concurrent import futures
from os import environ

import grpc
from lib.proto.user_pb2_grpc import UsersServicer as ProtoUsersServicer
from lib.proto.user_pb2_grpc import add_UsersServicer_to_server
from opentracing import tags

from pieusers.persist.dao import User
from pieusers.persist.session import start_session
from pieusers.tracing import init_tracer, intercept_server, tracer

logger = logging.getLogger(__name__)

port = environ["PORT"]


class UsersServicer(ProtoUsersServicer):
    def Get(self, id_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True) as scope:
            ids = [id.value for id in id_it]

            logger.debug(f"get users for ids({ids}")

            try:
                with start_session() as session:
                    request = session.query(User)

                    if ids:
                        request = request.filter(User.id.in_(ids))

                    result = [user.to_grpc() for user in request]

                logger.info(f"get users for ids({ids}) = {result}")

                return iter(result)
            except Exception as e:
                scope.span.set_tag(tags.ERROR, e)
                logger.exception("get oopsie")

    def Upsert(self, user_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True) as scope:
            users = list(user_it)

            logger.debug(f"upsert users({users}")

            try:
                with start_session() as session:
                    result = [
                        session.merge(User.from_grpc(user)).to_grpc() for user in users
                    ]

                logger.info(f"upsert users({users}) = {result}")

                return iter(result)
            except Exception as e:
                scope.span.set_tag(tags.ERROR, e)
                logger.exception("upsert oopsie")

    def Delete(self, id_it, context):
        with tracer().scope_manager.activate(context.get_active_span(), True) as scope:
            ids = [id.value for id in id_it]

            logger.debug(f"delete users for ids({ids})")

            try:
                with start_session() as session:
                    request = session.query(User).filter(User.id.in_(ids))

                    result = [user.to_grpc() for user in request]

                    request.delete(synchronize_session=False)

                logger.info(f"delete users for ids({ids}) = {result}")

                return iter(result)
            except Exception as e:
                scope.span.set_tag(tags.ERROR, e)
                logger.exception("delete oopsie")


def run():
    server = intercept_server(grpc.server(futures.ThreadPoolExecutor(max_workers=10)))

    add_UsersServicer_to_server(UsersServicer(), server)

    server.add_insecure_port(f"[::]:{port}")
    server.start()
    server.wait_for_termination()


def main():
    init_tracer()
    logging.basicConfig(level=logging.INFO)
    run()


if __name__ == "__main__":
    main()

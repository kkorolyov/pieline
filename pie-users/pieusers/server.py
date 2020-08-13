import logging
from concurrent import futures

import grpc
from lib.proto.user_pb2_grpc import UsersServicer as ProtoUsersServicer
from lib.proto.user_pb2_grpc import add_UsersServicer_to_server

from pieusers.persist.dao import User
from pieusers.persist.session import start_session

logger = logging.getLogger(__name__)


class UsersServicer(ProtoUsersServicer):
    def Get(self, id_it, context):
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
        except Exception:
            logger.exception("get oopsie")

    def Upsert(self, user_it, context):
        users = list(user_it)

        logger.debug(f"upsert users({users}")

        try:
            with start_session() as session:
                result = [
                    session.merge(User.from_grpc(user)).to_grpc() for user in users
                ]

            logger.info(f"upsert users({users}) = {result}")

            return iter(result)
        except Exception:
            logger.exception("upsert oopsie")

    def Delete(self, id_it, context):
        ids = [id.value for id in id_it]

        logger.debug(f"delete users for ids({ids})")

        try:
            with start_session() as session:
                request = session.query(User).filter(User.id.in_(ids))

                result = [user.to_grpc() for user in request]

                request.delete(synchronize_session=False)

            logger.info(f"delete users for ids({ids}) = {result}")

            return iter(result)
        except Exception:
            logger.exception("delete oopsie")


def run():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    add_UsersServicer_to_server(UsersServicer(), server)

    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


def main():
    logging.basicConfig(level=logging.INFO)
    run()


if __name__ == "__main__":
    main()

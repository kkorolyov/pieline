import logging
from concurrent import futures
from contextlib import contextmanager

import grpc

from pieusers.persist.dao import Base, User
from pieusers.persist.session import start_session
from user_pb2_grpc import UsersServicer as ProtoUsersServicer
from user_pb2_grpc import add_UsersServicer_to_server


class UsersServicer(ProtoUsersServicer):
    def Get(self, id_it, context):
        try:
            with start_session() as session:
                users = (
                    session.query(User)
                    .filter(User.id.in_([id.value for id in id_it]))
                    .all()
                )
                result = [user.to_grpc() for user in users]

            return iter(result)
        except Exception:
            logging.exception("get oopsie")

    def Upsert(self, user_it, context):
        try:
            userDaos = [User.from_grpc(user) for user in user_it]

            print(f"upserting: {userDaos}")

            with start_session() as session:
                session.add_all(userDaos)
                result = [user.to_grpc() for user in userDaos]

            return iter(result)
        except Exception:
            logging.exception("upsert oopsie")

    def Delete(self, id_it, context):
        try:
            with start_session() as session:
                users = (
                    session.query(User)
                    .filter(User.id.in_([id.value for id in id_it]))
                    .all()
                )

                print(f"deleting: {users}")

                for user in users:
                    session.delete(user)

                result = [user.to_grpc() for user in users]

            return iter(result)
        except Exception:
            logging.exception("delete oopsie")


def run():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    add_UsersServicer_to_server(UsersServicer(), server)

    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    run()

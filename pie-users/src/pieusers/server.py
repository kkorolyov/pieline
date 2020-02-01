import logging
from concurrent import futures

import grpc

from persist.session import sqlite
from user_pb2_grpc import UsersServicer as ProtoUsersServicer
from user_pb2_grpc import add_UsersServicer_to_server


class UsersServicer(ProtoUsersServicer):
    def __init__(self, session):
    """Constructs a new Users Servicer.
    Args:
        session: persistence Session
    """
        self.session = session

    def Upsert(self, request_it, context):
        users = list(request_it)
        # TODO Update
        return users

    def Delete(self, request, context):
        sqlalchemy


def run():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    add_UsersServicer_to_server(UsersServicer(sqlite()), server)

    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    run()

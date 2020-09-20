import logging
from concurrent import futures
from os import environ

import grpc
from lib.proto.user_pb2_grpc import add_UsersServicer_to_server

from pieusers.service.users import UsersServicer
from pieusers.tracing import init_tracer, intercept_server

PORT = environ["PORT"]


def run():
    server = intercept_server(grpc.server(futures.ThreadPoolExecutor(max_workers=10)))

    add_UsersServicer_to_server(UsersServicer(), server)

    server.add_insecure_port(f"[::]:{PORT}")
    server.start()
    server.wait_for_termination()


def main():
    init_tracer()
    logging.basicConfig(level=logging.INFO)
    run()


if __name__ == "__main__":
    main()

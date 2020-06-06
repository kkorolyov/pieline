import logging

import grpc

from user_pb2 import Details, User
from user_pb2_grpc import UsersStub

logger = logging.getLogger(__name__)


def testUsers():
    yield User(details=Details(email="email", display_name="display"))


def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = UsersStub(channel)

        logger.info("getting existing users")
        result = list(stub.Get(iter(())))
        logger.info(f"existing users: {result}")

        users = list(testUsers())

        logger.info(f"upserting users: {users}")
        result = list(stub.Upsert(iter(users)))
        logger.info(f"upsert result: {result}")

        logger.info(f"upserting users again: {result}")
        result = list(stub.Upsert(iter(result)))
        logger.info(f"upsert again result: {result}")

        ids = [user.id for user in result]

        logger.info(f"getting users: {ids}")
        result = list(stub.Get(iter(ids)))
        logger.info(f"get result: {result}")

        logger.info(f"deleting users: {ids}")
        result = list(stub.Delete(iter(ids)))
        logger.info(f"deletion result: {result}")

        logger.info(f"getting users again: {ids}")
        result = list(stub.Get(iter(ids)))
        logger.info(f"get again result: {result}")


def main():
    logging.basicConfig(level=logging.INFO)
    run()


if __name__ == "__main__":
    main()

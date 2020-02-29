import grpc

from user_pb2 import Details, User
from user_pb2_grpc import UsersStub


def testUsers():
    yield User(details=Details(email="email", display_name="display"))


def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = UsersStub(channel)

        users = list(testUsers())

        print(f"upserting users: {users}")
        result = list(stub.Upsert(iter(users)))
        print(f"upsert result: {result}")

        ids = [user.id for user in result]

        print(f"getting users: {ids}")
        result = list(stub.Get(iter(ids)))
        print(f"get result: {result}")

        print(f"deleting users: {ids}")
        result = list(stub.Delete(iter(ids)))
        print(f"deletion result: {result}")

        print(f"getting users again: {ids}")
        result = list(stub.Get(iter(ids)))
        print(f"get again result: {result}")


if __name__ == "__main__":
    run()

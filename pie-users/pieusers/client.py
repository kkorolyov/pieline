import grpc

from common_pb2 import UuidList
from user_pb2 import Details, User
from user_pb2_grpc import UsersStub

testUsers = [User(details=Details(email="email", display_name="display"))]


def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = UsersStub(channel)

        print(f"upserting users: {testUsers}")
        result = list(stub.Upsert(iter(testUsers)))
        print(f"upsert result: {result}")

        ids = [user.id for user in result]

        print(f"deleting users: {ids}")
        result = stub.Delete(UuidList(ids=ids))
        print(f"deletion result: {list(result)}")


if __name__ == "__main__":
    run()

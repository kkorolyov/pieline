import grpc

from user_pb2 import Details, User
from user_pb2_grpc import UsersStub

def testUsers():
    yield User(details=Details(email="email", display_name="display"))

def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = UsersStub(channel)

        users_it = testUsers()

        print(f"upserting users: {users_it}")
        result = list(stub.Upsert(users_it))
        print(f"upsert result: {result}")

        ids_it = (user.id for user in result)

        print(f"deleting users: {ids_it}")
        result = list(stub.Delete(ids_it))
        print(f"deletion result: {result}")


if __name__ == "__main__":
    run()

import grpc
from users_pb2 import PingRequest
from users_pb2_grpc import UsersStub


def run():
    channel = grpc.insecure_channel("localhost:50051")
    stub = UsersStub(channel)

    print(stub.Ping(PingRequest()))


if __name__ == "__main__":
    run()

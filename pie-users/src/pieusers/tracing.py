import atexit

import grpc_opentracing.grpcext._interceptor
from grpc_opentracing import open_tracing_server_interceptor
from jaeger_client import Config
from opentracing import global_tracer


def init_tracer():
    """Initializes and registers global tracer.
    """
    tracer = Config(
        config={"sampler": {"type": "const", "param": 1}, "logging": True},
        service_name="pie-users",
        validate=True,
    ).initialize_tracer()

    atexit.register(lambda: tracer.close())


def tracer():
    """Returns the current global tracer.
    """
    return global_tracer()


class _InterceptorServer(grpc_opentracing.grpcext._interceptor._InterceptorServer):
    def __init__(self, server, interceptor):
        super().__init__(server, interceptor)

    def wait_for_termination(self, *args, **kwargs):
        return self._server.wait_for_termination(*args, **kwargs)


def intercept_server(server):
    """Attaches gRPC opentracing interceptor to a server.

    Args:
        server: gRPC server to intercept
    Returns:
        server
    """
    return _InterceptorServer(
        server, open_tracing_server_interceptor(global_tracer(), log_payloads=True)
    )

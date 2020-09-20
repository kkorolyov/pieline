from setuptools import find_namespace_packages, setup

setup(
    name="pieusers",
    version="0.1",
    description="PieLine users service",
    author="kkorolyov",
    package_dir={"": "src"},
    packages=find_namespace_packages("src"),
    install_requires=(
        "protobuf",
        "grpcio",
        "SQLAlchemy",
        "psycopg2-binary",
        "opentracing",
        "jaeger-client",
        "grpcio-opentracing",
    ),
)

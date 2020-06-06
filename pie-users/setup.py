import os

from setuptools import Command, find_namespace_packages, setup
from setuptools.command.build_py import build_py

HERE = os.path.dirname(__file__)
PROTOS_FOLDER = os.path.join(HERE, "../protos/")
TARGET_FOLDER = os.path.join(HERE, ".")


class BuildProtos(Command):
    user_options = []

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        from grpc_tools.protoc import main as protoc

        protoc(
            [
                "",
                f"-I={PROTOS_FOLDER}",
                f"--python_out={TARGET_FOLDER}",
                f"--grpc_python_out={TARGET_FOLDER}",
                f"{PROTOS_FOLDER}/common.proto",
                f"{PROTOS_FOLDER}/user.proto",
            ]
        )


class BuildPy(build_py):
    def run(self):
        self.run_command("build_protos")
        build_py.run(self)


setup(
    name="pieusers",
    version="0.1",
    description="PieLine users service",
    author="kkorolyov",
    package_dir={"": "."},
    packages=find_namespace_packages("."),
    package_data={"": ["build"]},
    install_requires=("grpcio", "grpcio-tools", "SQLAlchemy"),
    cmdclass={"build_protos": BuildProtos, "build_py": BuildPy},
    entry_points={
        "console_scripts": (
            "pie-server = pieusers.server:main",
            "pie-client = pieusers.client:main",
        )
    },
)

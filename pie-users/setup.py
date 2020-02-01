from setuptools import setup, find_namespace_packages, Command
from setuptools.command.build_py import build_py
import os
from grpc_tools.protoc import main as protoc

HERE = os.path.dirname(__file__)
PROTOS_FOLDER = os.path.join(HERE, "../protos/")
TARGET_FOLDER = os.path.join(HERE, "src/")


class BuildProtos(Command):
    user_options = []

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
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
    package_dir={"": "src"},
    packages=find_namespace_packages("src"),
    package_data={"": ["build"]},
    install_requires=("grpcio", "SQLAlchemy"),
    cmdclass={"build_protos": BuildProtos, "build_py": BuildPy},
    entry_points={
        "console_scripts": (
            "pie-server = pieusers.server:run",
            "pie-client = pieusers.client:run",
        )
    },
)

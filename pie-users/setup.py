from setuptools import find_namespace_packages, setup

setup(
    name="pieusers",
    version="0.1",
    description="PieLine users service",
    author="kkorolyov",
    package_dir={"": "."},
    packages=find_namespace_packages("."),
    install_requires=("grpcio", "SQLAlchemy"),
    entry_points={
        "console_scripts": (
            "pie-server = pieusers.server:main",
            "pie-client = pieusers.client:main",
        )
    },
)

# backend/setup.py
from setuptools import setup, find_packages

setup(
    name="travel_app",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "sqlalchemy",
        "alembic",
        "python-dotenv",
    ],
)
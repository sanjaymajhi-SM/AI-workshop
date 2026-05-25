import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

BASE_DIR = Path(__file__).resolve().parent.parent
DOTENV_PATH = BASE_DIR / ".env"

if DOTENV_PATH.exists():
    load_dotenv(DOTENV_PATH)
else:
    load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_KEY must be set. "
        "Place them in backend/.env or export them before starting the app."
    )

supabase = create_client(url, key)

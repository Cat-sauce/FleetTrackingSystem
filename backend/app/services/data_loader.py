from pathlib import Path
import pandas as pd
#loads data from csv
BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = BASE_DIR / "data" / "vehicle_data.csv"

def load_data():
    df = pd.read_csv(DATA_PATH)
    return df
from pathlib import Path
import pandas as pd
#loads data from csv
BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = BASE_DIR / "data" / "vehicle_data.csv"

print(DATA_PATH)
print(DATA_PATH.exists())

def load_data():
    df = pd.read_csv(DATA_PATH)
    print(df.columns.tolist())
    return df
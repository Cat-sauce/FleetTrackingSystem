import threading
import time
import pandas as pd
import random
from app.services.data_loader import load_data

#Replays the telemetry records to make the data feel live instead of just a static database
class ReplayEngine:

    def __init__(self):

        self.df = load_data()

        self.df["timestamp"] = pd.to_datetime(
            self.df["timestamp"]
        )

        self.df = self.df.sort_values(
            ["vehicle_id", "timestamp"]
        )

        # Store every vehicle separately
        self.vehicles = {}

        # Current playback position of every vehicle
        self.pointer = {}

        for vehicle_id, group in self.df.groupby("vehicle_id"):

            group = group.reset_index(drop=True)

            self.vehicles[vehicle_id] = group

            self.pointer[vehicle_id] = random.randint(
                0,
                len(group) - 1
            )

    # -------------------------
    # Advance Simulation
    # -------------------------

    def next_frame(self):

        for vehicle in self.pointer:

            last = len(self.vehicles[vehicle]) - 1

            if self.pointer[vehicle] < last:

                self.pointer[vehicle] += 1

            else:

                # restart trip
                self.pointer[vehicle] = random.randint(
                    0,
                    len(self.vehicles[vehicle]) - 1
                )

    # -------------------------
    # Current Fleet Snapshot
    # -------------------------

    def get_current_frame(self):

        rows = []

        for vehicle in self.pointer:

            idx = self.pointer[vehicle]

            rows.append(

                self.vehicles[vehicle].iloc[idx]

            )

        return pd.DataFrame(rows)
    def start(self):
        def loop():
            while True:
                self.next_frame()
                time.sleep(1)

        threading.Thread(
            target=loop,
            daemon=True
        ).start()

# Global replay object
engine = ReplayEngine()
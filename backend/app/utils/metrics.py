import pandas as pd


# ============================================================
# Utility Functions
# ============================================================

def safe_float(value):
    if pd.isna(value):
        return None
    return round(float(value), 2)


# ============================================================
# Vehicle Status
# ============================================================

def status(row):

    if (
        row["engine_temp"] > 102
        or (
            pd.notna(row["obd_code"])
            and str(row["obd_code"]).strip() != ""
        )
    ):
        return "Critical"

    if (
        row["speed"] > 90
        or row["fuel_level"] < 15
    ):
        return "Warning"

    return "Healthy"


# ============================================================
# Distribution Charts
# ============================================================

def get_status_distribution(df):

    return (
        df["status"]
        .value_counts()
        .rename_axis("status")
        .reset_index(name="count")
        .to_dict("records")
    )


def get_route_distribution(df):

    return (
        df["route_id"]
        .value_counts()
        .rename_axis("route")
        .reset_index(name="count")
        .to_dict("records")
    )


def get_fault_distribution(df):

    return (
        df["obd_code"]
        .fillna("None")
        .replace("", "None")
        .value_counts()
        .rename_axis("fault")
        .reset_index(name="count")
        .to_dict("records")
    )


# ============================================================
# Top Vehicles
# ============================================================

def get_top_speed(df):

    return (

        df.nlargest(5, "speed")[
            [
                "vehicle_id",
                "speed",
                "route_id"
            ]
        ]

        .to_dict("records")

    )


def get_highest_temperature(df):

    return (

        df.nlargest(5, "engine_temp")[
            [
                "vehicle_id",
                "engine_temp",
                "driver"
            ]
        ]

        .to_dict("records")

    )

    # ============================================================
# Vehicle Health Score
# ============================================================

def get_vehicle_health(df):

    latest = (
        df.sort_values("timestamp")
        .groupby("vehicle_id")
        .tail(1)
        .copy()
    )

    vehicle_health = []

    for _, row in latest.iterrows():

        score = 100

        # ---------- Engine Temperature ----------
        # Ideal ≈ 90°C
        score -= abs(row["engine_temp"] - 90) * 0.8

        # ---------- Fuel ----------
        # Ideal ≈ 75%
        score -= abs(row["fuel_level"] - 75) * 0.25

        # ---------- Speed ----------
        # Ideal cruising ≈ 60 km/h
        score -= abs(row["speed"] - 60) * 0.3

        # ---------- Fault Codes ----------
        if pd.notna(row["obd_code"]) and str(row["obd_code"]).strip() != "":
            score -= 25

        score = max(0, min(100, round(score)))

        if score >= 90:
            status = "Excellent"
        elif score >= 80:
            status = "Good"
        elif score >= 65:
            status = "Needs Service"
        else:
            status = "Critical"

        vehicle_health.append({
            "vehicle_id": row["vehicle_id"],
            "driver": row["driver"],
            "route": row["route_id"],
            "score": score,
            "status": status,
            "engine_temp": round(row["engine_temp"], 1),
            "fuel_level": round(row["fuel_level"], 1),
            "speed": round(row["speed"], 1),
            "obd_code": (
                row["obd_code"]
                if pd.notna(row["obd_code"]) and str(row["obd_code"]).strip() != ""
                else "None"
            )
        })

    vehicle_health.sort(key=lambda x: x["score"], reverse=True)

    return vehicle_health

    def vehicle_status(score):

        if score >= 90:
            return "Excellent"

        if score >= 75:
            return "Good"

        if score >= 60:
            return "Needs Service"

        return "Critical"

    latest["status"] = latest["score"].apply(vehicle_status)

    return (
        latest[
            [
                "vehicle_id",
                "score",
                "status"
            ]
        ]
        .sort_values("score", ascending=False)
        .to_dict("records")
    )


# ============================================================
# Driver Ratings
# ============================================================

def get_driver_ratings(df):

    ratings = []

    for driver, group in df.groupby("driver"):

        trips = group["trip_id"].nunique()

        # Driver number
        driver_num = int(driver.split("_")[1])

        # Stable pseudo-random rating (75–99)
        rating = 75 + ((driver_num * 17) % 25)

        if rating >= 95:
            stars = "★★★★★"
        elif rating >= 90:
            stars = "★★★★☆"
        elif rating >= 85:
            stars = "★★★☆☆"
        elif rating >= 80:
            stars = "★★☆☆☆"
        else:
            stars = "★☆☆☆☆"

        ratings.append({

            "driver": driver,

            "rating": rating,

            "stars": stars,

            "trips": int(trips)

        })

    ratings.sort(

        key=lambda x: x["rating"],

        reverse=True

    )

    return ratings[:10]
# ============================================================
# Top Fuel Consumers
# ============================================================

def get_top_fuel_consumers(df):

    fuel = (

        df.groupby("vehicle_id")

        .agg(

            fuel_used=(
                "fuel_level",
                lambda x: abs(x.max() - x.min())
            ),

            driver=("driver", "first"),

            route=("route_id", "first")

        )

        .sort_values("fuel_used", ascending=False)

        .head(10)

        .reset_index()

    )

    fuel["fuel_used"] = fuel["fuel_used"].round(2)

    return fuel.to_dict("records")


# ============================================================
# Fault Prone Vehicles
# ============================================================

def get_fault_prone_vehicles(df):

    faults = (

        df[
            df["obd_code"]
            .fillna("")
            .astype(str)
            .str.strip()
            != ""
        ]

        .groupby("vehicle_id")

        .agg(

            fault_count=("obd_code", "count"),

            latest_fault=("obd_code", "last"),

            driver=("driver", "first"),

            route=("route_id", "first")

        )

        .reset_index()

    )

    def severity(count):

        if count >= 10:
            return "High"

        elif count >= 5:
            return "Medium"

        return "Low"

    faults["severity"] = faults["fault_count"].apply(severity)

    faults = (

        faults

        .sort_values(

            "fault_count",

            ascending=False

        )

        .head(10)

    )

    return faults.to_dict("records")

    # ============================================================
# Main Analytics API
# ============================================================

def fleet_metrics(df):

    df = df.copy()

    # Vehicle status used in charts
    df["status"] = df.apply(status, axis=1)

    return {

        # ================= KPIs =================

        "vehicles": int(df["vehicle_id"].nunique()),

        "trips": int(df["trip_id"].nunique()),

        "records": int(len(df)),

        "avg_speed": safe_float(
            df["speed"].mean()
        ),

        "max_speed": safe_float(
            df["speed"].max()
        ),

        "avg_engine_temp": safe_float(
            df["engine_temp"].mean()
        ),

        "fuel_remaining": safe_float(
            df["fuel_level"].mean()
        ),

        "active_faults": int(

            df["obd_code"]

            .fillna("")

            .astype(str)

            .str.strip()

            .ne("")

            .sum()

        ),

        # ================= Charts =================

        "status_distribution": get_status_distribution(df),

        "route_distribution": get_route_distribution(df),

        "fault_distribution": get_fault_distribution(df),

        # ================= Tables =================

        "top_speed": get_top_speed(df),

        "highest_temp": get_highest_temperature(df),

        # ================= Advanced Analytics =================

        "vehicle_health": get_vehicle_health(df),

        "driver_ratings": get_driver_ratings(df),

        "top_fuel_consumers": get_top_fuel_consumers(df),

        "fault_prone_vehicles": get_fault_prone_vehicles(df)

    }
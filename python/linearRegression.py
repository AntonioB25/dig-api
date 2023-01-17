import numpy as np
import pandas as pd
import psycopg2 as pg
import sys

from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression
from sklearn import metrics
import warnings

def main(argv):

    attempt_to_predict = int(argv[0])
    pg_connect = pg.connect(
    host="localhost",
    database="digobr",
    user="postgres",
    password="password",
    port=5432)

    df = pd.read_sql('select * from game_record', con=pg_connect)

    model = LinearRegression()
    X = df['attempt'].values.reshape(-1,1)
    y = df['points'].values.reshape(-1,1)

    model.fit(X,y)

    arr = np.array([attempt_to_predict]).reshape((-1, 1))
    print(model.predict(arr)[0][0])


if __name__ == "__main__":
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        main(sys.argv[1:])
# Import datasets from the datasets folder
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
print("Hello world")
# Import the dataset
purchases_dataset = pd.read_csv('../../datasets/ecommerce-purchases-electronics.csv')
events_dataset = pd.read_csv('../../datasets/ecommerce-events-electronics.csv')

# Create a new column in the purchases dataset that contains the number of purchases per product
purchases_dataset['purchases'] = purchases_dataset.groupby('product_id')['product_id'].transform('count')

# Create a new column in the events dataset that contains the number of events per product
events_dataset['events'] = events_dataset.groupby('product_id')['product_id'].transform('count')


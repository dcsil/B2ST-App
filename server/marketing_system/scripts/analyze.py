# Import datasets from the datasets folder
import sys
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import warnings
import json

print("Starting analysis")

# Ignore warnings
warnings.filterwarnings('ignore')

# Import the dataset
purchases_dataset = pd.read_csv('datasets/ecommerce-purchases-electronics.csv')
# events_dataset = pd.read_csv('datasets/ecommerce-events-electronics.csv')


# Create a new column in the purchases dataset that contains the number of purchases per product
purchases_dataset['purchases'] = purchases_dataset.groupby('product_id')['product_id'].transform('count')
purchases_dataset = purchases_dataset.drop(['event_time', 'user_id', 'category_id'], axis=1)

categorical_features = ['order_id', 'product_id', 'category_code', 'brand', 'price', 'purchases']
le = LabelEncoder()

for i in range(len(categorical_features)):
    new = le.fit_transform(purchases_dataset[categorical_features[i]])
    purchases_dataset[categorical_features[i]] = new

# Assuming we're training on price which is in the second last column of the df
X = purchases_dataset[purchases_dataset.columns.values[:len(purchases_dataset.columns.values)-2]]
y = purchases_dataset[purchases_dataset.columns.values[len(purchases_dataset.columns.values)-2]]

# Splitting data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 25, random_state = 101)

# Train the Model
regr = RandomForestRegressor(n_estimators = 10, max_depth = 10, random_state = 101)
regr.fit(X_train, y_train.values.ravel())
print(X_test)
# Make prediction
predictions = regr.predict(X_test)
result = X_test
result['price'] = y_test
result['prediction'] = predictions.tolist()

# Define x axis
x_axis = X_test.product_id

# Build scatterplot
plt.scatter(x_axis, y_test, c = 'b', alpha = 0.5, marker = '.', label = 'Real')
plt.scatter(x_axis, predictions, c = 'r', alpha = 0.5, marker = '.', label = 'Predicted')
plt.xlabel('Product ID')
plt.ylabel('Price')
plt.grid(color = '#D3D3D3', linestyle = 'solid')
plt.legend(loc = 'lower right')
plt.show()

# Mean squared error (MSE)
mse = mean_squared_error(y_test.values.ravel(), predictions)

# R2 Score
r2 = r2_score(y_test.values.ravel(), predictions)

# Mean Absolute Error
mae = mean_absolute_error(y_test.values.ravel(), predictions)

#Print Results
print("Mean squared error (MSE): ", round(mse, 2))
print("R2 Score: ", round(r2, 2))
print("Mean Absolute Error (MAE): ", round(mae, 2))

#We have regression (r2 score) of 0.76 which is good in the sense that it indicates correlation, but we can improve it by using more data and more features

# accept user input
user_input = input("Enter input for prediction: ")
user_input_df = pd.DataFrame(json.loads(user_input), columns = ['order_id', 'product_id', 'category_code', 'brand'])
user_predictions = regr.predict(user_input_df)
print(user_predictions)

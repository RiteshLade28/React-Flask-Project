import sqlite3
from prettytable import PrettyTable

# Establish a connection to the database
conn = sqlite3.connect("ecart.db")

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Execute your query



cursor.execute(
                """
                SELECT c.categoryId, p.productId, p.name, p.newPrice, p.ratings, p.description, p.stock, c.name FROM products as p JOIN sellers as s JOIN categories as c WHERE p.sellerId = s.sellerId and p.categoryId=c.categoryId and p.sellerId = ?;
                """, (1,)
            )
# cursor.execute(
#                 """
#                 SELECT name from products where sellerId = ?;
#                 """, (1,)
#             )

# Fetch the column names
column_names = [description[0] for description in cursor.description]

# Create a new PrettyTable instance
table = PrettyTable()

# Define the table headers
unique_column_names = []
column_count = {}
for column_name in column_names:
    if column_name not in unique_column_names:
        unique_column_names.append(column_name)
    else:
        if column_name not in column_count:
            column_count[column_name] = 2
        else:
            column_count[column_name] += 1
        unique_column_names.append(f"{column_name}_{column_count[column_name]}")

table.field_names = unique_column_names

# Add rows to the table
table.add_rows(cursor.fetchall())

# Print the table
print(table)

# Close the cursor and the connection
cursor.close()
conn.close()


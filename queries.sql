-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers WHERE postalcode = "1010";
-- Find the phone number for the supplier with the id 11
SELECT phone FROM suppliers WHERE supplierID = "11";
-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM Orders ORDER BY Orderdate Limit 10;
-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM customers where city like "london" or country like "brazil" or city like "madrid";
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country) values ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", 111, "Middle Earth");
-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE customers SET PostalCode = "11122" WHERE customerID = "92";
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name



LOAD DATA LOCAL INFILE  './dummyData.csv'
INTO TABLE listing_description 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n';
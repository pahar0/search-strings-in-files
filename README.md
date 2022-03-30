# search-strings-in-files
Search multiple strings in multiple files easily.

Add into the **./files** folder all the files in what you want to search the strings. 

Edit **searchStrings** in **index.js** and set the strings you want to search for.

Use **npm run start** and check the reports created in the **./reports** folder.

Sample report:

```
example.txt
^^^^^^^^^^^

----- facilisis ----- 
total occurrences: 2 

----- scelerisque ----- 
total occurrences: 1 

----- string that doesnt appears ----- 
total occurrences: 0 

##### strings found ##### 
facilisis
scelerisque

##### strings not found ##### 
string that doesnt appears
```
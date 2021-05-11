# u11-backend
This is backend of U11-shopping-list which is build with NodeJS & Express and use JSON files as database. 


## API List
###### (1) POST - http://localhost:5000/create_account
    body {
            "username": "----",
            "password": "----"
         }





###### (2) POST - http://localhost:5000/login
      body {
              "username": "----",
              "password": "----"
           }
        
           



###### (3) POST - http://localhost:5000/new_item
    body {
            "userId": -*-*-*-*- ,
            "itemName": "RedBull",
            "amout": 1,
            "measure": "st",
            "checked": false
         }
 
 
 
 
 
###### (4) POST - http://localhost:5000/get_items
    body {
            "userId": -*-*-*-*- ,
         }
         
 
 
 
 
###### (5) PUT - http://localhost:5000/edit_item
    body {
            "userId": -*-*-*-*- ,
            "itemId": -*-*-*-*- ,
            "itemName": "Monster",
            "amout": 4,
            "measure": "st",
            "checked": false
         }
         
          
###### (6) DELETE - http://localhost:5000/delete_item
    body {
            "userId": -*-*-*-*- ,
            "itemId": -*-*-*-*- ,
         }

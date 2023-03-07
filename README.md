# API Documenration :

---
 __GET__ : _/api/films_
 Response Class (Status 200)
 Model Schema
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>},
</div>] <br>

 __GET__ : _/api/films/{id}_
 Response Class (Status 200)
 Model Schema
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---
 __POST__ : _/api/films_
 Request Class
 Model Schema
{ <div style="margin-left: 10px;">

        "name": "",
        "year": 0,
        "ganres" : []
</div>}  <br>
 Response Class (Status 200)
 Model Schema
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---
 __PUT__ : _/api/films/{id}_
 Request Class
 Model Schema
{ <div style="margin-left: 10px;">

        "name": "",
        "year": 0,
        "ganres" : []
</div>}  <br>
 Response Class (Status 200)
 Model Schema
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---

 __DELETE__ : _/api/films/{id}_
 Response Class (Status 200)
 Model Schema

{ <div style="margin-left: 10px;">

        "result"  : success
</div>} 
</div>

---

 __GET__ : _/api/ganres_
 Response Class (Status 200)
 Model Schema
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "name" : ""
</div>},
</div>] <br>

---
 __GET__ : _/api/ganre?name={comedy}_
 Response Class (Status 200)
 Model Schema
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
</div>},
</div>] <br>
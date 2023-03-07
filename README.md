# API Documenration :

---
 __GET__ : _/api/films_ <br>
 Response Class (Status 200) <br>
 Model Schema 
 <div style="margin-left: 10px;">
[<div style="margin-left: 20px;"> {

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
},
</div>] </div> 

 __GET__ : _/api/films/{id}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---
 __POST__ : _/api/films_ <Br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "name": "",
        "year": 0,
        "ganres" : []
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---
 __PUT__ : _/api/films/{id}_ <br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "name": "",
        "year": 0,
        "ganres" : []
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
        "ganres" : []
</div>} 
</div>

---

 __DELETE__ : _/api/films/{id}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>

{ <div style="margin-left: 10px;">

        "result"  : success
</div>} 
</div>

---

 __GET__ : _/api/ganres_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "name" : ""
</div>},
</div>] <br>

---
 __GET__ : _/api/ganre?name={comedy}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0,
</div>},
</div>] <br>
# API Documenration :

---
 __GET__ : _/api/films_ <br>
 Response Class (Status 200) <br>
 Model Schema 
 <div style="margin-left: 10px;">
[<div style="margin-left: 20px;"> {

        "film_id": 0,
        "title": "",
        "yr": 0,
        "genres" : []
},
</div>] </div> 

 __GET__ : _/api/films/{id}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "film_id": 0,
        "title": "",
        "yr": 0,
        "genres" : []
</div>} 
</div>

---
 __POST__ : _/api/films_ <Br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "title": "",
        "yr": 0,
        "genres" : []
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "film_id": 0,
        "title": "",
        "yr": 0,
        "genres" : []
</div>} 
</div>

---
 __PUT__ : _/api/films/{id}_ <br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "title": "",
        "yr": 0,
        "genres" : []
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "film_id": 0,
        "title": "",
        "yr": 0,
        "genres" : []
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

 __GET__ : _/api/genres_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "name" : ""
</div>},
</div>] <br>

---

 __GET__ : _/api/genres?name={comedy}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>
[<div style="margin-left: 10px;"> {<div style="margin-left: 10px;">

        "id": 0,
        "name": "",
        "year": 0
</div>},
</div>] <br>
---

 __POST__ : _/api/genres_ <Br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "name": ""
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "genre_id": 0,
        "name": ""
</div>} 
</div>
---

 __PUT__ : _/api/genres/{id}_ <br>
 Request Class <br>
 Model Schema <br>
{ <div style="margin-left: 10px;">

        "name": ""
</div>}  <br>
 Response Class (Status 200) <br>
 Model Schema <br>
<div style="margin-left: 10px;">
{ <div style="margin-left: 10px;">

        "genre_id": 0,
        "name": ""
</div>} 
</div>

---

 __DELETE__ : _/api/genres/{id}_ <br>
 Response Class (Status 200) <br>
 Model Schema <br>

{ <div style="margin-left: 10px;">

        "result"  : success
</div>} 
</div>
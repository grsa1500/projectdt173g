"use strict";

const url = "https://localhost/restAPI/webservice.php/courses";
document.getElementById("submitbutton").addEventListener("click", addCourse);

window.onload = loadCourseList;


function loadCourseList() {
 
  fetch(url)
      .then((res) => res.json())
      .then((data) => {
          let output = "";    

          data.forEach(function (course) {
              output += `<tr>
                  <td>${course.name}</td>
                  <td>${course.code}</td>
                  <td>${course.progression}</td>
                  <td><a href='${course.syllabus}' title='Kursplan för ${course.code}' target='_blank'><i class="fas fa-link"></i>  Kursplan </a></td>
                  <td class="center"><a onclick="myFunction(event)" title='Redigera ${course.code}' target='_blank'><i id="${course.id}" class="fas fa-cog"></i></a> / <a class="delete" onclick="deleteCourse(event)"  title='Ta bort  ${course.code}' target='_blank'> <i id="${course.id}" class="fas fa-trash-alt"></i></a></td>
              </tr>`;
          })
          document.getElementById("courseList").innerHTML = output;
      })
}

//Adding a course
function addCourse() {
    
    let code = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let progression = document.getElementById("progression").value;
    let syllabus = document.getElementById("syllabus").value;

   

        let jsonStr = JSON.stringify({
            "code": code,
            "name": name,
            "progression": progression,
            "syllabus": syllabus
        });


console.log(jsonStr);
        fetch(url, {
            method: 'POST',
            mode: 'cors',
           
            body: jsonStr
        }).then((res) => res.json())
            .then((data) => location.reload(true))
           
    }



    function myFunction(event) {
        let space = document.getElementById('modalspace');
        var modal = document.getElementById("myModal");
        var innermodal = document.getElementById("innermodal");
 

        modal.style.display = "flex";
       
        let id = event.target.id;

        console.log(id);

        
    var span = document.getElementsByClassName("close")[0];


    span.onclick = function() {
      modal.style.display = "none";
    }
    

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    let oneUrl = url + '/' + id;

    fetch(oneUrl)
      .then((res) => res.json())
      .then((data) => {
          

          data.forEach(function (course) {
            let name = course.name;
            let code = course.code;
            let syllabus = course.syllabus;
            let progression = course.progression;

            innermodal.innerHTML = `<section>
    <h2><i class="fa fa-cog"></i> Ändra kurs</h2>
  
    <label>
        Kurskod: <br>
        <input type="text" name="codeedit" id="codeedit" value="${code}" required/>
    </label>
    <label >
        Kursnamn: <br>
        <input type="text" name="nameedit" id="nameedit" value="${name}" required/>
    </label>
    <label>
        Progression: <br>
        <input type="text" name="progressionedit" value="${progression}" id="progressionedit"  required/>
    </label>
    <label >
        Kursplan: <br>
        <input type="text" name="syllabusedit" id="syllabusedit" value="${syllabus}" required/>
    </label>
    <input type="submit" value="Ändra" onclick="editCourse(${course.id})"  id="editbutton" class="btn btn-blue">
</section>`;
                  
          })
          
      })
    }


    function deleteCourse(event) {
        let id = event.target.id;


        let deleteUrl = url + '/' + id;

        console.log(deleteUrl);

         fetch(deleteUrl, {
             method: 'DELETE',
           
        }).then((res) => res.json())
            .then((data) => location.reload(true))
    }


    function editCourse(id) {

        console.log(id);
        let code = document.getElementById("codeedit").value;
        let name = document.getElementById("nameedit").value;
        let progression = document.getElementById("progressionedit").value;
        let syllabus = document.getElementById("syllabusedit").value;
    
       console.log(code, name, progression, syllabus);
    
            let jsonStr = JSON.stringify({
                "code": code,
                "name": name,
                "progression": progression,
                "syllabus": syllabus,
                "id": id
            });
    
    
    console.log(jsonStr);
            fetch(url, {
                method: 'PUT',
                mode: 'cors',
               
                body: jsonStr
            }).then((res) => res.json())
                .then((data) => location.reload(true))
               
        }
        

    
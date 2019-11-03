const url = "https://gsamuelsson.se/projektAPI/webservice.php";
let coursesurl =url+'/courses';
let jobsurl =  url+'/jobs';
let projectsurl = url+'/projects';

window.onload = start;

// When window loads
function start(){
    loadJobList();
loadCourseList();
loadProjectList();
}


// Getting all courses
function loadCourseList() {


    fetch(coursesurl)
        .then((res) => res.json())
        .then((data) => {
            let output = "";    
  
            data.forEach(function (course) {
                output += `<tr>
                    <td>${course.name}</td>
                    <td>${course.school}</td>
                    <td class="program">${course.program}</td>
                    <td class="points">${course.points}</td>
                    <td class="dates">${course.startyear} - ${course.endyear}</td>
                   
                </tr>`;
            })
            document.getElementById("courseList").innerHTML = output;
        })
 }


// getting all jobs
        function loadJobList() {
 
            fetch(jobsurl)
                .then((res) => res.json())
                .then((data) => {
                    let output = "";    
          
                    data.forEach(function (job) {
                        output += `<tr>
                            <td>${job.title}</td>
                            <td>${job.place}</td>
                          
                            <td>${job.startyear} - ${job.endyear}</td>
                           
                        </tr>`;
                    })
                    document.getElementById("jobList").innerHTML = output;
                })
          }
 
// Getting all projects
          function loadProjectList() {
 
            fetch(projectsurl)
                .then((res) => res.json())
                .then((data) => {
                    let output = "";    
          
                    data.forEach(function (project) {
                        output += `<div class="projekt"
                        ><br><br>
                        <div class="imgbackground">
                                <img src="img/${project.imgmobile}" alt=""   class="mobile">
                            <img src="img/${project.img}" alt=""   class="desktop"></div>
                          
                        <div class="textbox"  >
                            <h3>${project.title}</h3>
                            <div class="line"></div>
                            <p>${project.description}</p>
                                <span class="keyword">${project.keywords}</span>                      <br><br><a href="${project.url}" class="demo" target="_blank">Demo</a> <br><br>
                        </div></div>`;
                    })
                    document.getElementById("ProjectList").innerHTML = output;
                })
          }
 


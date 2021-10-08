let important=true;
let form=false;
let serverUrl= "https://fsdiapi.azurewebsites.net/";
let task=true;
function toggleImportant(){
    console.log("clicked");
    if(important===true){
        $("#iImportant").removeClass("fas").addClass("far");
        important=false;
    }else{
        $("#iImportant").removeClass("far").addClass("fas");
        important=true;
    }
}
function toggleForm(){
    if(form){
        $("form").slideUp(500);
        $("#btnAdd").text("Add Task");
        form=false;
    }else{
        $("form").slideDown(500);
        $("#btnAdd").text("Hide the Form");
        form=true;
    }         
}
function toggleTask(){
   $('.taskInfo').toggle();       
}
function save(){
    console.log("Saving Task");
    let title=$("#txtTitle").val();
    let date=$("#selDate").val();
    let location=$("#txtLocation").val();
    let priority=$("#selPriority").val();
    let color=$("#selColor").val();
    let collaborator=$("#txtCollaborator").val();
    let description=$("#txtDescription").val();
    //create a new task object using the constructor
    let task = new Task(title, important, date, location, priority, color, collaborator, description);
    
    $.ajax({
        type:"POST",
        url:serverUrl+"api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success:function(res){
            console.log("Server says", res);
            alert("The task was registered successfully!");
            let t=JSON.parse(res);
            displayTask(t);
        },
        error:function(error){
            console.log("Error saving task", error);
        }
    });
    clearForm();
    //get information from the inputs
}
function displayTask(task){
    //display obj information
    syntax=`
    <div class="task">
        <div class="title">
        <h6>${task.title}</h6>
        <button class="minTask" onclick="toggleTask();"><i class="fas fa-window-minimize"></i></button>
        </div>
        <div class="taskInfo">
        <lable>${task.location}</lable>
        <lable>${task.collaborator}</label>
        <lable>${task.description}</lable>
        <lable>${task.priority}</lable>
        <lable>${task.date}</lable>
        </div>
    </div>
    `;
    $(".pending-tasks").append(syntax);
}
function getTask(){
    $.ajax({
        type:"GET",
        url:serverUrl+"api/tasks",
        success:function(res){
            let t=JSON.parse(res);
            for(let i=0;i<t.length;i++){
                if(t[i].name==="Gary"){
                    console.log(t[i]);
                    displayTask(t[i]);
                }
            }
            console.log("Server says: "+t);
        },
        error:function(err){
            console.log("Error getting tasks: ", err);
        }
    });
}
function clearForm(){
    $("#txtTitle").val("");
    $("#selDate").val("");
    $("#txtLocation").val("");
    $("#selPriority").val("");
    $("#selColor").val("");
    $("#txtCollaborator").val("");
    $("#txtDescription").val("");
}
// $("#txtTitle").keypress(function() {$("#btnSave").keypress(save());});
function clearTaskAll(){
    console.log("Button pressed");
    $.ajax({
        type:'DELETE',
        url: serverUrl + "api/tasks/clear/Gary",
        success:function(res){
            let t= JSON.parse(res);
            console.log("All the tasks have been cleared",t);
            location.reload(true);
        },
        error: function(err){
            console.log("Something has gone wrong".err);
        }
        
    });

}

function init(){
    console.log("Calendar System");
    $("form").hide();
    getTask();
    //hook event
    $("#iImportant").click(toggleImportant);
    $("#btnAdd").click(toggleForm);
    $("#btnSave").click(save);
    $("#btnClear").click(clearTaskAll);
}

window.onload=init;
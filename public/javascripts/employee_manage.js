
let id_delete;

function deleteEmployee(){
    const url = "/manage/deleteEmployee?id="+id_delete;
    console.log("[deleteEmployee] Url: ",url);
    try {
        fetch(url).then((response)=>{
            response.json().then((data) =>{
                if(data.error){
                    console.log("[getData] Data error: ",data.error);
                } else {
                    console.log("[getData] Data: ",data);
                    if(data.sts == "OK"){
                        
                    }
                    $('#deleteEmployeeModal').modal('hide');
                    // $('#myModal').modal('hide');
                }
            })
        })
        return 1;
    } catch (error) {
        console.log("[getData] Error: ",error);
        return 0;
    }
    window.location = "http://localhost:3000/"
}

function deleteID(id){
    console.log("Delete id: ", id);
    id_delete = id;
}

$(document).ready(function(){
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
    
    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function(){
        if(this.checked){
            checkbox.each(function(){
                this.checked = true;                        
            });
        } else{
            checkbox.each(function(){
                this.checked = false;                        
            });
        } 
    });
    checkbox.click(function(){
        if(!this.checked){
            $("#selectAll").prop("checked", false);
        }
    });
});
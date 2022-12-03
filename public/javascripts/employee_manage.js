
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
                    $('#deleteEmployeeModal').modal('hide');
                    console.log("[getData] Data: ",data);
                    if(data.sts == "OK"){
                        location.reload();
                    } else {
                        $('#notification').modal();
                    }
                }
            })
        })
        return 1;
    } catch (error) {
        console.log("[getData] Error: ",error);
        return 0;
    }
}

function deleteID(id){
    console.log("Delete id: ", id);
    if(id < 10){
        id_delete = "0"+id;
    } else {
        id_delete = id;
    }
}

function notification(){

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
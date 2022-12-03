function getData(id,date){
    const url = "/view/getData?id="+id+"&date="+date;
    console.log("[getData] Url: ",url);
    try {
        fetch(url).then((response)=>{
            response.json().then((data) =>{
                if(data.error){
                    console.log("[getData] Data error: ",data.error);
                } else {
                    // console.log("[getData] Data: ",data);
                    createEmployee(data);
                    $('#search').modal('hide');
                    notification(data);
                }
            })
        })
        return 1;
    } catch (error) {
        console.log("[getData] Error: ",error);
        return 0;
    }
}

/**
 * function notification
 * Show pop up when search is not oke
 *  Class Text status: .text-success
 *                     .text-danger
 */

function notification(status){
    if(status.length < 1){
        let _temp = document.getElementById('text_notification');
        _temp.innerHTML="Can't search, ID or Date not exist in database !";
        _temp.className ="text-danger";
        $('#notification').modal();
    }
}

/**
 * Convert time formant yyyy-mm-dd -> dd/mm/yyyy
*/
function swap_date(date){
    let temp = date.split('-');
    let true_time = temp[2]+'/'+temp[1]+'/'+temp[0];
    // console.log('[true_time]: ',true_time);
    return true_time;
}

function clearOldData(){
    let mainTb = document.getElementById('mainTable');
    while(mainTb.firstChild){
        mainTb.removeChild(mainTb.lastChild);
    }
}

function createEmployee(data){
    let mainTb = document.getElementById('mainTable');
    data.forEach(element => {
        console.log("[Element data] ",element);
        let child_Tb = createTemplateData(element);
        mainTb.appendChild(child_Tb);
    });
}
/* Create template element
    <tr>
        <th></th>
        <td>Tran Van Bo</td>
        <td>12/12/2022</td>
        <td>08:05</td>
        <td>20:00</td>
        <th></th>
    </tr>
*/ 
function createTemplateData(data){

    let tr_main = document.createElement("tr");
    let th_empty = document.createElement("th");
    let td_name = document.createElement("td");
    let td_date = document.createElement("td");
    let td_time_in = document.createElement("td");
    let td_time_out = document.createElement("td");

    td_name.innerHTML = data.name;
    td_date.innerHTML = data.date;
    td_time_in.innerHTML = data.time_in;
    td_time_out.innerHTML= data.time_out;

    tr_main.appendChild(th_empty);
    tr_main.appendChild(td_name);
    tr_main.appendChild(td_date);
    tr_main.appendChild(td_time_in);
    tr_main.appendChild(td_time_out);
    // tr_main.appendChild(th_empty);
    
    return tr_main;
}

function searchUser(){
    let id_user = document.getElementById("id_user").value;
    let date = document.getElementById("date").value;
    console.log("Id: ",id_user, " date: ",date);
    if(id_user){
        clearOldData();
        if(id_user < 10){
            id_user="0"+id_user;
            console.log("ID user: ",id_user);
        }
        if(date){
            getData(id_user,swap_date(date));
        } else {
            getData(id_user,"");
        }
    }else{
        if(date){
            clearOldData();
            getData("",swap_date(date));
        } else {
           console.log("[searchUser] ===========> No get data");
        }
    }
    let v_modal = document.getElementById('search');
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
const elements = document.getElementsByClassName('allocate_value');
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('change', allocateStudent, false);
}
function allocateStudent(e) {

    let s_id = this.value;
    let i_id = this.getAttribute("data-interviewId");
    if (s_id == "") {
        return;
    }
    // send request
    const url = location.protocol + '//' + location.host + "/interviews/allocate";
    let data = { 'i_id': i_id, 's_id': s_id };
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((result) => {
        result.json().then((data) => {
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
    }).catch((error) => {
        new Noty({
            theme: 'relax',
            text: error,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    });

}
const interviews = document.getElementsByClassName('interviews_list');
for (var i = 0; i < interviews.length; i++) {
    interviews[i].addEventListener('click', assignResult, false);
}

function assignResult() {
    // send request
    const url = location.protocol + '//' + location.host + "/interviews/getAllocatedStudents";
    let data = { 'i_id': this.children[0].value };
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((result) => {
        result.json().then((data) => {
        let html="";
        for(stud of data.students){
          html=html+`<ol class="list-group list-group">
          <li class="list-group-item d-flex justify-content-between align-items-start ">
              <div class="ms-2 me-auto">
                  <div class="fw-bold">${stud.student_details.userName}</div>
                  ${stud.student_details.name}
              </div>
  
              <span class="badge "><select class="form-select assign_result " data-interviewId=${data._id} data-studentId=${stud._id} >
                      <option value="" selected>Assign Result</option>
                      <option value="PASS">
                          Pass
                      </option>
                      <option value="FAIL">
                          Fail
                      </option>
                      <option value="ON_HOLD">
                          On Hold
                      </option>
                      <option value="DID_NOT_ATTEMPT">
                          Did not attempt
                      </option>
                  </select></span>
          </li>
      </ol>`;
        }
        $("#resultAssign").html(html);
        $(".assign_result").bind("change",assignResultToDB);
        $("#interview_details_model").modal('show');
        
        })
    }).catch((error) => {
        new Noty({
            theme: 'relax',
            text: error,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    });

} 

function assignResultToDB(){
    //send request
    const url = location.protocol + '//' + location.host + "/interviews/assignResultToDB";
    let data = { 'i_id': this.getAttribute('data-interviewId') , 's_id': this.getAttribute('data-studentId'),'result':this.value };
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((result) => {
        result.json().then((data) => {
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
    }).catch((error) => {
        new Noty({
            theme: 'relax',
            text: error,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    });

} 
var show_locked = false
var hid = null;

function lockedProblemFilter(){
    if($("#b_pick_option").is(':checked')) {
        hid = $(".fa-lock").parent().parent().parent().filter("tr[class!='hide']")
        hid.attr("class", "hide")
    } else {
        if(hid != null)
            hid.attr("class", "")
    }
}

function pickOne() {
    var easy = $("#b_pick_easy").is(':checked')
    var medium = $("#b_pick_medium").is(':checked')
    var hard = $("#b_pick_hard").is(':checked')

    if (!easy && !medium && !hard) {
        $("#b_message").text("Please choose one at least.")
    } else {
        var select = ""
        select += easy ? "tr[class!='hide'] td:nth-child(6):contains('Easy')" : "";
        select += medium ? (select == "" ? "" : ",") + "tr[class!='hide'] td:nth-child(6):contains('Medium')" : "";
        select += hard ? (select == "" ? "" : ",") + "tr[class!='hide'] td:nth-child(6):contains('Hard')" : "";
        var problems = $(select).parent()
        var rnd = Math.floor(Math.random() * problems.length)
        var problem = problems.slice(rnd, rnd + 1).find("td:nth-child(3)")
        var problem_text = problem.text().trim()
        if (problem_text == "") {
            $("#b_message").text("Picked a cat :P")
        } else {
            $("#pickOneModal").modal('show')
            $("#pickModalContent").html("[" + problem_text + "]")
            $("#b_yes").bind("click", function () { window.location.href = problem.find("a").attr("href"); })
            $("#b_message").text("")
        }
    }
}

var tab_url = window.location.href;

if(tab_url.indexOf("tag") == -1) {
    // Problemset page
    $("#question-app > div > div.row").after("<div class='row' style='margin-bottom: 15px;'><div class='col-md-10 col-md-offset-2'><form class='form-inline'><div class='checkbox' style='width:12%'><label><input type='checkbox' id='b_pick_easy' checked />Easy</label></div><div class='checkbox' style='width:12%'><label><input type='checkbox' id='b_pick_medium' checked />Medium</label></div><div class='checkbox' style='width:12%'><label><input type='checkbox' id='b_pick_hard' checked />Hard</label></div><a class='btn btn-info btn-sm' id='b_pick' >Pick One</a><div class='checkbox' style='width:36%;margin-left:15px;'><label><input type='checkbox' id='b_pick_option' />Exclude Locked Problems</div></label></form></div><div class='row col-md-6'><label id='b_message'></lable></div></div>")
    $("#b_pick_option").change(lockedProblemFilter)
    $(document).on("change", "#question-app > div > div:nth-child(3) > div > table > tbody.reactable-pagination > tr > td > span.row-selector > select", lockedProblemFilter)
    $(document).on("click", ".reactable-page-button,.reactable-next-page,.reactable-previous-page", lockedProblemFilter)
    $("footer").before("<div class='modal fade' id='pickOneModal'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title'>Pick this one?</h4></div><div class='modal-body'><p id='pickModalContent'></p></div><div class='modal-footer'><button type='button' class='btn btn-success' id='b_yes'>Yes</button><button type='button' class='btn btn-primary' id='b_repick'>Repick</button><button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button></div></div></div></div>")
} else {
    // Tag page
    $("#tagCheck").before("<div class='checkbox'><label><input type='checkbox' id='b_showlocked' " + (show_locked ? "checked" : "") + "/>Show Locked Problems</label></div>")
    $(".sortable").click(function() {
        setTimeout("lockedProblemFilter()", 100)
    })
}

$("#question-app > div > div:nth-child(1) > span > a").remove()
$("#b_pick").click(pickOne)
$("#b_repick").click(pickOne)
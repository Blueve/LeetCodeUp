var show_locked = false
var hid = null;

function lockedProblemFilter(){
	if($("#b_showlocked").is(':checked'))
	{
		if(hid != null)
			hid.attr("class", "")
	}
	else
	{
		hid = $(".fa-lock").parent().parent().filter("tr[class!='hide']")
		hid.attr("class", "hide")
	}
}

function lockedProblemFilterAppend(){
	if(!$("#b_showlocked").is(':checked'))
	{
		hid = $(".fa-lock").parent().parent().filter("tr[class!='hide']")
		hid.attr("class", "hide")
	}
}

var tab_url = window.location.href;
if(tab_url.indexOf("tag") == -1) {
	$("#filterchosen").parent().after("<div class='row col-md-1'></div><div class='row col-md-4'><div class='checkbox'><label><input type='checkbox' id='b_showlocked' " + (show_locked ? "checked" : "") + "/>Show Locked Problems</label></div></div><div class='row col-md-1></div><div class='row col-md-1></div><div class='row col-md-1></div>")
	$("#searchResultRow").before("<div class='row col-md-6'><form class='form-inline'><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_easy' checked />Easy</label></div><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_medium' checked />Medium</label></div><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_hard' checked />Hard</label></div><a class='btn btn-info btn-sm' id='b_pick'>Pick One</a></form></div><div class='row col-md-6'><label id='b_message'></lable></div>")
	$("#filterchosen").change(lockedProblemFilterAppend)
} else {
	$("#tagCheck").before("<div class='checkbox'><label><input type='checkbox' id='b_showlocked' " + (show_locked ? "checked" : "") + "/>Show Locked Problems</label></div>")
	$(".sortable").click(function(){
		setTimeout("lockedProblemFilter()", 100)
	})
}

lockedProblemFilter();
$("#b_showlocked").change(lockedProblemFilter)

$("#b_pick").click(function() {
	var easy = $("#b_pick_easy").is(':checked')
	var medium = $("#b_pick_medium").is(':checked')
	var hard = $("#b_pick_hard").is(':checked')

	if(!easy && !medium && !hard) {
		$("#b_message").text("Please choose one at least.")
	} else {
		var select = ""
		select += easy ? "tr[class!='hide'] td:nth-child(7):contains('Easy')" : "";
		select += medium ? (select == "" ? "" : ",") + "tr[class!='hide'] td:nth-child(7):contains('Medium')" : "";
		select += hard ? (select == "" ? "" : ",") + "tr[class!='hide'] td:nth-child(7):contains('Hard')" : "";
		var problems = $(select).parent()
		var rnd = Math.floor(Math.random() * problems.length)
		var problem = problems.slice(rnd, rnd + 1).find("td:nth-child(3)")
		var problem_text = problem.text().trim()
		if(problem_text == "") {
			$("#b_message").text("Picked a cat :P")
		} else if(confirm("Pick [" + problem_text + "] ?")) {
			window.location.href=problem.find("a").attr("href")
		}
	}
})
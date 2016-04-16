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

$("#filterchosen").parent().after("<div class='row col-md-1'></div><div class='row col-md-4'><div class='checkbox'><label><input type='checkbox' id='b_showlocked' " + (show_locked ? "checked" : "") + "/>Show Locked Problems</label></div></div><div class='row col-md-1></div><div class='row col-md-1></div><div class='row col-md-1></div>")

lockedProblemFilter();

$("#filterchosen").change(lockedProblemFilterAppend)
$("#b_showlocked").change(lockedProblemFilter)

$("#searchResultRow").before("<div class='row col-md-6'><form class='form-inline'><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_easy' checked />Easy</label></div><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_medium' checked />Medium</label></div><div class='checkbox' style='width:24%'><label><input type='checkbox' id='b_pick_hard' checked />Hard</label></div><a class='btn btn-info btn-sm' id='b_pick'>Pick One</a></form></div><div class='row col-md-6'><label id='b_message'></lable></div>")

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
		if(confirm("Pick [" + problem.text().trim() + "] ?"))
		{
			window.location.href=problem.find("a").attr("href")
		}
	}
})
function jsonfy() {
	var ticketName = $("input[name=TicketTitle]").val();

	var firstName = $("input[name=firstName]").val();

	var lastName = $("input[name=lastName").val();

	var email = $("input[name=field3]").val();

	var assigneeName = $("input[name=assigneeName]").val();

	var dueDate = $("input[name=myDate]").val();

	var storeNum = $("input[name=storeNum]").val();
	if(storeNum != "" && /^\d+$/.test(storeNum)) {
		storeNum = "Store #"+storeNum;
		console.log(storeNum);
	}

	var description = $("textarea[name=description]").val();

	var priorityLevel = $("#PriorityField option:selected").val();

	var category = $("#category option:selected").val();

	var json = '{ "ticket_name" : '+JSON.stringify(ticketName)+', "first_name" : '+JSON.stringify(firstName)+', "last_name" : '+JSON.stringify(lastName)+', "email" : '+JSON.stringify(email)+', "description" : '+JSON.stringify(description)+', "category" : '+JSON.stringify(category)+', "priorityLevel" : '+JSON.stringify(priorityLevel)+' }';

	var incident = '{ "incident": { "name": '+ JSON.stringify(category +': '+ storeNum +" - " + ticketName)+', "priority": '+JSON.stringify(priorityLevel)+', "category": {"name": '+JSON.stringify(category)+'}, "requester": {"email": '+JSON.stringify(email)+'}, "description": '+JSON.stringify(description)+', "due_at": '+JSON.stringify(dueDate)+',  "assignee": { "email": '+JSON.stringify(assigneeName)+' }  } }';
	console.log(incident);

	return incident;
}

function addTicket() {

	if(validateForm() == true) {
		var json = jsonfy();
		var obj = JSON.parse(json);
		console.log(obj);
		restfulCall(json);
	}
}

function successNotify() {
	 // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Successfully added ticket!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Successfully added ticket!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

function restfulCall(json) {
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test", true);

	xhr.setRequestHeader("content-type", "application/json");

	xhr.addEventListener("readystatechange", function() {
		if(this.readyState === 4) {
			if(this.status == 200) {
				console.log(this.responseText);
				successNotify();
				window.location.href = "index.html"
			} else {
				alert("Unsuccessfully added ticket, Please retry");
			}
		}
	});

	xhr.send(json);
}

function validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);

}

function validateForm() {
	var ticketName = $("input[name=TicketTitle]").val();

	var firstName = $("input[name=firstName]").val();

	var lastName = $("input[name=lastName").val();

	var email = $("input[name=field3]").val();

	var assigneeName = $("input[name=assigneeName]").val();

	var dueDate = $("input[name=myDate]").val();

	var description = $("textarea[name=description]").val();

	var priorityLevel = $("#PriorityField option:selected").val();

	var category = $("#category option:selected").val();

	if(!ticketName || !firstName || !lastName || !validateEmail(email) || !validateEmail(assigneeName)) {
		alert("Please fill out all required fields!");
		return false;
	} else if(!validateEmail(assigneeName)) {
		alert("assignee EMAIL");
		return false;
	} else if(!validateEmail(email)) {
		alert("email is wrong");
		return false;
	}
	else {
		return true;
	}

}
var noneIsClicked = false;
var lowIsClicked = false;
var mediumIsClicked = false;
var highIsClicked = false;
var criticalIsClicked = false;

$(".error_container").hide();
    
    var match = ["Atom", "atom", "Manhattan", "manhattan", "Molecule", "molecule"];

    function restCall(url, divId) {

        var id = "#"+divId + " .ticket-table";
        console.log(id);

        var table = $(id);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if(this.status == 200) {
                $("#"+divId+" .sk-circle").hide();
                $("#"+divId+" .hint").hide();
                object = JSON.parse(this.responseText);
                console.log(object);

                for(let incident of object) {
                    var name = incident.name;
                    var description = incident.description_no_html;

                    for(var i = 0; i < match.length; i++) {
                        if(name.indexOf(match[i]) != -1 || description.indexOf(match[i]) != -1) {
                            
                            table.append('<tr class="ticket"><td class="name">'+name+'</td><td>'+incident.state+'</td><td>'+incident.requester.name+'</td><td>'+incident.requester.email+'</td><td>'+incident.created_at+'</td><td class="desc" style="display:none;">'+description+'</td></tr>');
                            break;
                        }
                    }
                }
                console.log("SUCCESS");
            } else {
                console.log("Not successful status!");
                $("#"+divId+" .sk-circle").hide();
                $("#"+divId+" .hint").hide();
                $(".error_container").show();

            }
          }
        });

        xhr.open("GET", url, true); // Original
        xhr.send();
    }
   

    $(".ticket-table").on("click", "tr", function(e){
        var name = $(this).find('.name').text();
        var description = $(this).find(".desc").text();
        modal({
            type: 'inverted', //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
            title: name, //Modal Title
            text: description, //Modal HTML Content
            size: 'large', //Modal Size (normal | large | small)
            buttons: [{
                text: 'Close', //Button Text
                val: 'close', //Button Value
                eKey: true, //Enter Keypress
                addClass: 'btn-black', //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
            }, ],
            center: true, //Center Modal Box?
            autoclose: false, //Auto Close Modal Box?
            callback: null, //Callback Function after close Modal (ex: function(result){alert(result); return true;})
            onShow: function(r) {}, //After show Modal function
            closeClick: true, //Close Modal on click near the box
            closable: true, //If Modal is closable
            theme: 'xenon', //Modal Custom Theme (xenon | atlant | reseted)
            animate: false, //Slide animation
            background: 'rgba(0,0,0,0.35)', //Background Color, it can be null
            zIndex: 1050, //z-index
            buttonText: {
                ok: 'OK',
                yes: 'Yes',
                cancel: 'Cancel'
            },
            template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
            _classes: {
                box: '.modal-box',
                boxInner: ".modal-inner",
                title: '.modal-title',
                content: '.modal-text',
                buttons: '.modal-buttons',
                closebtn: '.modal-close-btn'
            }
        });
    });

function openCity(evt, priority) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById("tableDiv").style.display = "block";

    switch(priority) {
        case "None":
            document.getElementById("tableDivNone").style.display = "block";
            if(noneIsClicked == false) {
                noneIsClicked = true;
                restCall("https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test/nonepriority", "tableDivNone");
            }
            break;
        case "Low":
            document.getElementById("tableDivLow").style.display = "block";
            if(lowIsClicked == false) {
                lowIsClicked = true;
                restCall("https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test/lowpriority", "tableDivLow");
            }
            break;
        case "Medium":
            document.getElementById("tableDivMedium").style.display = "block";
            if(mediumIsClicked == false) {
                mediumIsClicked = true;
                restCall("https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test/mediumpriority", "tableDivMedium");
            }
            break;
        case "High":
            document.getElementById("tableDivHigh").style.display = "block";
            if(highIsClicked == false) {
                highIsClicked = true;
                restCall("https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test", "tableDivHigh");
            }
            break;
        case "Critical":
            document.getElementById("tableDivCritical").style.display = "block";
            if(criticalIsClicked == false) {
                criticalIsClicked = true;
                restCall("https://xalsmz1aph.execute-api.us-east-2.amazonaws.com/Test/criticalpriority", "tableDivCritical");
            }
            break;
    }

    evt.currentTarget.className += " active";
}
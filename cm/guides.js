
    // this apiKey is managed in shane's google developer account
    var apiKey = 'AIzaSyAC5jKXdm5Fdap-kqNVOI23c7a9fOV0lOY';
    var scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    
    function handleClientLoad() {
      gapi.client.setApiKey(apiKey);
      makeApiCall();
    }

    function makeApiCall() {
      gapi.client.load(discoveryUrl).then(parseResources);
    }

    /**
     * Print the names and majors of students in a sample spreadsheet:
     * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     */
    function parseResources() {

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1cRTwDZO8O_5qIuxSyA6iAu1RBvNaVs9a3Ogip5VvV_g',
        range: 'Sheet1!A2:K',
      }).then(function(response) {

        var range = response.result;
        if (range.values.length > 0) {
          for (i = 0; i < range.values.length; i++) {
            
            var card = [];
            var row = range.values[i];
            // console.log(row);

            // var cat = "education";
            // console.log(cat);

            //if live:
            if (row[9] == "x"){
            	//card title and description
              card.push("<div class=\"Grid-cell "+row[6]+"\"><div class=\"card-cm mdl-card mdl-shadow--2dp\"><div class=\"mdl-card__title mdl-card--expand\"><div class=\"mdl-typography--headline\">"+row[0]+"</div></div><div class=\"mdl-card__supporting-text\"><p>"+row[2]+"</p></div>");

              //border
              if (typeof row[3] != 'undefined' || typeof row[5] != 'undefined'){
                // console.log(row[0]+" not null 3 or 5");
                card.push("<div class=\"mdl-card__actions mdl-card--border\">");
              }

              //mailto
              if (typeof row[3] != 'undefined' && row[3] != ''){
                // console.log(row[0]+" not null 3 "+row[3]);
                card.push("<button class=\"mdl-button mdl-js-button mdl-button--icon\"><a href='mailto:"+row[3]+"?subject=Enventure%20Referral&bcc=team@enventure.org' target='_blank'\"><i class=\"material-icons\">email</i></a></button>");
              }

              //chip
              //name is defined
              if (typeof row[5] != 'undefined'){
                card.push("<div class=\"mdl-layout-spacer\"></div><span class=\"mdl-chip mdl-chip--contact\">");
                //link is defined
                if (typeof row[4] != 'undefined' && row[4] != ''){
                  card.push("<a href=\""+row[4]+"\">");
                }
                card.push("<img class=\"mdl-chip__contact\" src=\"../images/"+row[5]+".jpg\" alt=\""+row[5]+"\" onerror=\"this.style.opacity='0'\"><span class=\"mdl-chip__text\">"+row[5]+"</span>");
                //link is defined
                if (typeof row[4] != 'undefined' && row[4] != ''){
                  card.push("</a>");
                }
                card.push("</span>");
              }

              card.push("</div></div></div>");
              // console.log(card);
              // console.log(row[10]);
              //place card in document
              var element = document.getElementById(row[10]);
              // console.log(element);
              if (element) {
                // console.log("true");
            	 element.outerHTML = card.join("");
               // console.log(card);
              }
            }//end live
          }//end not empty spreadsheet
        } else {
        }
                
      });
    }
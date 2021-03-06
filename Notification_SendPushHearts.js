handlers.SendPushHearts = function (args)
{
	var message = args.Msg == undefined || args.Msg == null ? "" : args.Msg;
	var subject = args.Subject == undefined || args.Subject == null ? "" : args.Subject;

	var playfab_ids = args.PlayFabIds;
	for (var i = 0; i < playfab_ids.length; i++){
		var playfab_id = playfab_ids[i];

		var result = server.GetUserData({
	        PlayFabId: playfab_id,
	        Keys: ["language"]
	    });
	    
	    var language = result.Data["language"];
	    var msg_text = "❤️Received a heart from your friend!";

	    if (language == null || language.Value == ""){
	        log.info("language is null");
	    } else {
	    	log.info("language is " + language.Value);
	        if (language.Value == "German") {
	            msg_text = "❤️dein freund hat ein herz für sie!";
	        } else if (language.Value == "Chinese") {
	            msg_text = "❤️你的好友送给你了一颗心!";
	        } else if (language.Value == "Chinese (Hong Kong)"){
	            msg_text = "❤️你的朋友送來了一顆心!";
	        } else if (language.Value == "Japanese") {
	            msg_text = "❤️友達からハートを貰います";
	        } else if (language.Value == "Spanish") {
	        	msg_text = "❤️Recibió un corazón de su amigo";
	        }
	    }

		var spn_req = {};
		spn_req.Recipient = playfab_id;
		spn_req.Message = msg_text;
		spn_req.Subject = subject;

		log.info("SendPushNotification params: " + JSON.stringify(spn_req));
		try {
			server.SendPushNotification(spn_req);
		} catch (err) {
			log.info("ignore err: " + JSON.stringify(err));
		}
	}
}
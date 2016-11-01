handlers.SendPushHearts = function (args)
{
	var message = args.Msg == undefined || args.Msg == null ? "" : args.Msg;
	var subject = args.Subject == undefined || args.Subject == null ? "" : args.Subject;

	var playfab_ids = args.PlayFabIds;
	for (var i = 0; i < playfab_ids.length; i++){
		var playfab_id = playfab_ids[i];
		
		var msg_text = GetPlayerReceiveHeartMessage({
        	PlayFabId: playfab_id
    	}).language;

		var request = {};
		request.Recipient = playfab_id;
		request.Message = msg_text;
		request.Subject = subject;
		server.SendPushNotification(request);
	}
}
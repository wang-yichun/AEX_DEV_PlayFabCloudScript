handlers.SendPushNote = function (args)
{
    var request = {};
    request.Recipient = args.Id == undefined || args.Id == null ? currentPlayerId : args.Id;
    request.Message = args.Msg == undefined || args.Msg == null ? "" : args.Msg;
    request.Subject = args.Subject == undefined || args.Subject == null ? "" : args.Subject;
    server.SendPushNotification(request);
}
/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handlers.SendHeart = function(args) {

    var heart_send_from_key = "heart_send_from";
    var sender_id = args.sender_id;
    var receiver_ids = args.receiver_ids;

    // log.info("sender_id: " + sender_id);
    // log.info("receiver_ids: " + receiver_ids);

    for (var i = 0; i < receiver_ids.length; i++) {
        var receiver_id = receiver_ids[i];
        var heart_send_from_result = server.GetUserData({
            PlayFabId: receiver_id,
            Keys: [heart_send_from_key]
        });
        var heart_send_from = heart_send_from_result.Data[heart_send_from_key];

        log.info("i: " + i + "heart_send_from: " + heart_send_from);
    };


    return { status: 0 };
}
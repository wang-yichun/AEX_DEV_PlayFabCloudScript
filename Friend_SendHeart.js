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

    var success_count = 0;

    for (var i = 0; i < receiver_ids.length; i++) {
        var receiver_id = receiver_ids[i];
        var heart_send_from_result = server.GetUserData({
            PlayFabId: receiver_id,
            Keys: [heart_send_from_key]
        });
        var heart_send_from_data = heart_send_from_result.Data[heart_send_from_key];
        var heart_send_from;

        if (heart_send_from_data == null) {
            heart_send_from = sender_id;
        } else {
            heart_send_from = heart_send_from_data.Value + "," + sender_id
        }
        // log.info("i: " + i + "heart_send_from: " + heart_send_from);

        var data = {};
        data[heart_send_from_key] = heart_send_from;

        var update_result = server.UpdateUserData({
            PlayFabId: receiver_id,
            Data: data,
            Permission: "Public"
        });

        if (update_result.code == 200) {
            success_count = success_count + 1;
        }
    };

    return { status: 0, success_count: success_count, total_count: receiver_ids.length };
}
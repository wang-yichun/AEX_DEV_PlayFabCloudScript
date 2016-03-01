/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handlers.SendHeart = function(args) {

    var heart_receive_from_key = "friend_heart_receive_from";
    var friend_id_already_send_today_key = "friend_id_already_send_today";
    var friend_life_send_time_key = "friend_life_send_time";

    var sender_id = args.sender_id;
    var receiver_ids = args.receiver_ids;
    var send_time = args.send_time;

    log.info("sender_id: " + sender_id);
    log.info("receiver_ids: " + receiver_ids);
    log.info("send_time: " + send_time);

    var receiver_ids_str = "";
    // update receivers
    for (var i = 0; i < receiver_ids.length; i++) {
        var receiver_id = receiver_ids[i];

        if (i == 0) {
            receiver_ids_str = receiver_id;
        } else {
            receiver_ids_str = receiver_ids_str + "," + receiver_id;
        }

        var heart_send_to_result = server.GetUserData({
            PlayFabId: receiver_id,
            Keys: [heart_receive_from_key]
        });
        var heart_send_to_data = heart_send_to_result.Data[heart_receive_from_key];
        var heart_send_to;

        if (heart_send_to_data == null) {
            heart_send_to = sender_id;
        } else {
            heart_send_to = heart_send_to_data.Value + "," + sender_id
        }
        // log.info("i: " + i + "heart_send_to: " + heart_send_to);

        var data = {};
        data[heart_receive_from_key] = heart_send_to;

        var update_result = server.UpdateUserData({
            PlayFabId: receiver_id,
            Data: data,
            Permission: "Public"
        });
    };

    // update self
    var self_data_result = server.GetUserData({
        PlayFabId: sender_id,
        Keys: [friend_id_already_send_today_key, friend_life_send_time_key]
    });
    var friend_id_already_send_today_data = self_data_result.Data[friend_id_already_send_today_key];
    var friend_life_send_time = self_data_result.Data[friend_life_send_time_key]; // unuse

    var self_data = {};
    if (friend_id_already_send_today_data == null) {
        self_data[friend_id_already_send_today_key] = receiver_ids_str;
    } else {
        if (friend_id_already_send_today_data.Value == null) {
            self_data[friend_id_already_send_today_key] = receiver_ids_str;
        } else {
            self_data[friend_id_already_send_today_key] = friend_id_already_send_today_data.Value + "," + receiver_ids_str;
        }
    }
    self_data[friend_life_send_time_key] = send_time;

    var self_update_result = server.UpdateUserData({
        PlayFabId: sender_id,
        Data: self_data,
        Permission: "Public"
    });

    return { status: 0, data_version: self_update_result.data.DataVersion };
}
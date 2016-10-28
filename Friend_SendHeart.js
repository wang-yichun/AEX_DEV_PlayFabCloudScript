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
    
    var push_subject = args.push_subject;
    var push_message = args.push_message;

    log.info("sender_id: " + sender_id);
    log.info("receiver_ids: " + receiver_ids);
    log.info("send_time: " + send_time);
    log.info("push_subject: " + push_subject);
    log.info("push_message: " + push_message);

    // update receivers
    for (var i = 0; i < receiver_ids.length; i++) {
        var receiver_id = receiver_ids[i];

        var heart_receive_from_result = server.GetUserData({
            PlayFabId: receiver_id,
            Keys: [heart_receive_from_key]
        });
        var heart_receive_from_data = heart_receive_from_result.Data[heart_receive_from_key];
        var heart_receive_from;

        if (heart_receive_from_data == null) {
            heart_receive_from = JSON.stringify([sender_id]);
        } else {
            var heart_receive_from_list = JSON.parse(heart_receive_from_data.Value);
            heart_receive_from_list.push(sender_id);
            heart_receive_from = JSON.stringify(heart_receive_from_list);
        }
        // log.info("i: " + i + "heart_send_to: " + heart_send_to);

        var data = {};
        data[heart_receive_from_key] = heart_receive_from;

        var update_result = server.UpdateUserData({
            PlayFabId: receiver_id,
            Data: data,
            Permission: "Public"
        });
    };

    if (push_message != null || push_message != "") {
        var send_push_args = {};
        send_push_args.PlayFabIds = receiver_ids;
        send_push_args.Subject = push_subject;
        send_push_args.Msg = push_message;
        SendPushHearts(send_push_args);
    }

    // update self
    var self_data_result = server.GetUserData({
        PlayFabId: sender_id,
        Keys: [friend_id_already_send_today_key, friend_life_send_time_key]
    });
    var friend_id_already_send_today_data = self_data_result.Data[friend_id_already_send_today_key];
    var friend_life_send_time = self_data_result.Data[friend_life_send_time_key]; // unuse

    var self_data = {};
    if (friend_id_already_send_today_data == null) {
        self_data[friend_id_already_send_today_key] = JSON.stringify(receiver_ids);
    } else {
        if (friend_id_already_send_today_data.Value == null) {
            self_data[friend_id_already_send_today_key] = JSON.stringify(receiver_ids);
        } else {

            var already_send_ids = JSON.parse(friend_id_already_send_today_data.Value);

            self_data[friend_id_already_send_today_key] = JSON.stringify(already_send_ids.concat(receiver_ids));
        }
    }
    self_data[friend_life_send_time_key] = JSON.stringify(send_time);

    var self_update_result = server.UpdateUserData({
        PlayFabId: sender_id,
        Data: self_data,
        Permission: "Public"
    });

    return { status: 0 };
}
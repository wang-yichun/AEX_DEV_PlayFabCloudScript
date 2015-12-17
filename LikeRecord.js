////////////////////////////////////////////////
// 点赞
// return: {status = 0:正确 1:没有发现录像 2:已经点过赞了}

handlers.LikeRecord = function (args) {

    var play_fab_id = args.PlayFabId;
    var stage_id = args.StageId;

    var like_key = stage_id + "_user_rec_like";
    var s3_key = stage_id + "_user_rec_data_s3_key";

    var user_data = server.GetUserData({
        PlayFabId: play_fab_id,
        Keys: [like_key, s3_key]
    });

    var s3_value_data = user_data.Data[s3_key];
    var s3_value = null;
    
    // 处理没有s3的key的情况
    if (s3_value_data == null) {
        return {status: 1};
    } else {
        var s3_value = s3_value_data.Value;
    }

    // 检查自己是否已经点过赞了
    var internal_like_rec_key = "like_rec#" + s3_value;
    var user_data_2 = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [internal_like_rec_key]
    });

    var already_like_data = user_data_2.Data[internal_like_rec_key];
    if (already_like_data != null && already_like_data.Value == 1) {
        return {status: 2};
    }

    var like_value_data = user_data.Data[like_key];
    var like_value = null;

    // 处理没有原始like的情况
    if (like_value_data == null) {
        like_value = 0;
    } else {
        like_value = like_value_data.Value;
    }

    // 更新计数
    like_value++;

    var data_1 = {};
    data_1[like_key] = like_value;

    server.UpdateUserData({
        PlayFabId: play_fab_id,
        Data: data_1,
        Permission: "public"
    });
    
    // 添加internal key，对应点赞某录像
    var data_2 = {};
    data_2[internal_like_rec_key] = 1;
    server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data_2
    });

    log.info("set " + like_key + " = " + like_value);
    return {status: 0};
}
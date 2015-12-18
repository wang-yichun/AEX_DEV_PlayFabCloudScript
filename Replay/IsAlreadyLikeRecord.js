////////////////////////////////////////////////
// 是否已经点赞
// input args: { s3_value: 录像数据对应于s3中的key }
// return: {result = 0: 还没点赞 1: 点赞了已经}

handlers.IsAlreadyLikeRecord = function (args) {

    var s3_value = args.S3Value;

    var internal_like_rec_key = "like_rec#" + s3_value;
    var user_data_2 = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [internal_like_rec_key]
    });

    var already_like_data = user_data_2.Data[internal_like_rec_key];
    if (already_like_data != null && already_like_data.Value == 1) {
        return {status: 1};
    }

    return {status: 0};
}
////////////////////////////////////////////////
// 是否已经点赞
// input args: { s3_value: 录像数据对应于s3中的key }
// return: {result = 0: 还没点赞 1: 点赞了已经}

handlers.GetRecordInfoForMe = function (args) {

    var playfab_id = args.PlayFabId;
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
        return {
        	s3_value: s3_value,
            is_like: 0,
            is_buy: 0
        };
    } else {
        var s3_value = s3_value_data.Value;
    }

    var is_like_result = handlers.isAlreadyLikeRecord (s3_value);
    var is_buy_result = handlers.IsAlreadyBuyRecord (s3_value);

    var like_value_data = user_data.Data[like_key];
    var like_value = null;

    // 处理没有原始like的情况
    if (like_value_data == null) {
        like_value = 0;
    } else {
        like_value = like_value_data.Value;
    }

    return {
    	s3_value: s3_value,
    	like_value: like_value,
        is_like: is_like_result.result,
        is_buy: is_buy_result.result
    };
}
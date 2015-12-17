////////////////////////////////////////////////
// 是否已经购买
// input args: { s3_value: 录像数据对应于s3中的key }
// return: {result = 0: 还没买 1: 买了已经}

handlers.IsAlreadyBuy = function (args) {

    var s3_value = args.S3Value

    var internel_buy_rec_key = "buy_rec#" + s3_value;
    var user_data_2 = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [internel_buy_rec_key]
    });

    var already_buy_data = user_data_2.Data[internel_buy_rec_key];
    if (already_buy_data != null && already_buy_data.Value == 1) {
        return {result: 1};
    }

    return {result: 0};
}
////////////////////////////////////////////////
// 是否已经点赞
// input args: { s3_value: 录像数据对应于s3中的key }
// return: {result = 0: 还没点赞 1: 点赞了已经}

handlers.GetRecordInfoForMe = function (args) {

    var s3_value = args.S3Value;

    var is_like_result = handlers.IsAlreadyBuyRecord (s3_value);
    var is_buy_result = handlers.IsAlreadyBuyRecord (s3_value);

    return {
        is_like: is_like_result.result,
        is_buy: is_buy_result.result
    };
}
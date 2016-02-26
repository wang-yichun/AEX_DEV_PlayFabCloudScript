/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handlers.SendHeart = function(args) {
    var sender_id = args.sender_id;
    var receiver_ids = args.receiver_ids;

    log.info("sender_id: " + sender_id);
    log.info("receiver_ids: " + receiver_ids);

    return { status: 0 };
}
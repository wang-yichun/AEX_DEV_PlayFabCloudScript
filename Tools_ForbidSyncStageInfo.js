////////////////////////////////////////////////
// 阻止用户上传成绩到排行榜, 针对测试版本的老用户

handlers.ForbidSyncStageInfo = function (args) {
	// 获取用户版本:
	var version_key = "version";
	var user_data = server.GetUserData({
		PlayFabId: play_fab_id,
		Keys: [version_key]
	});
	var version_data = user_data.Data[version_key];
	var version_value; 
	if (version_data == null) {
		return {status: 1};
	} else {
		version_value = version_data.Value;
	}
	log.info("version_value: " + version_value);

	return {status: 0};
}
//////////////////////////////////////////////////////
// 初始化一个用户的云端数据,用户在第一次登陆后需要调用(或:发现用户只读数据的need_init==1时调用)
//

handlers.PrepareForNewUser = function (args) {
	
	// server.GrantItemsToUser({
	//	 CatalogVersion : "Alpha",
	//	 PlayFabId: currentPlayerId,
	//	 Annotation: "Test",
	//	 ItemIds: ["GA", "GB", "GC"]
	// });
	
	server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: {
			LineLevel: 1,
			TotalExp: 0,
			TotalStar: 0,
			CurrentStageID: "level_001"
		},
		Permission: "Public"
	});
	
	server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: {
			GA3: 0,
			GAPower: 0,
			GB3: 0,
			GBPower: 0,
			GC3: 0,
			GCPower: 0
		},
		Permission: "Public"
	});
	
	server.UpdateUserReadOnlyData({
		PlayFabId: currentPlayerId,
		Data: {
			need_init: 0
		}
	});
}
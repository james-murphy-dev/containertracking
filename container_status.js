$(document).ready(function(){
	var containerMap = {};
	var init = Kinvey.initialize({
		appKey	: 'kid_SJEyn--we',
		appSecret: 'cac42e4156ce423a9cd9f083ac6f6dd1'
	}).then(function(user){

		var dataStore = Kinvey.DataStore.collection('containers', Kinvey.DataStoreType.Network);
		var table = document.getElementById("table");
		function updateContainer(container){
			var updateContainerStatus = dataStore.save({
				"_id": container['_id'],
				"company": container['company'],
				"contents": container['contents'],
				"number": container['number'],
				"status": container['status']
			}).then(function onSuccess(entity){
				Location.reload();
			}, function onError(error){

			});
		}
		function updateContainer(container, status){
			var updateContainerStatus = dataStore.save({
				"_id": container['_id'],
				"company": container['company'],
				"contents": container['contents'],
				"quantity": container['quantity'],
				"number": container['number'],
				"status": status
			}).then(function onSuccess(entity){
				Location.reload();
			}, function onError(error){
				console.log(error);
			});
		}
		$(document).on('change', 'select', function(event){
			var customs = $(this).val();
			var kid = $(this).parent().parent().parent().parent().parent().find(".kid").eq(0);
			kid = kid.text();
			var container = containerMap[kid];
			updateContainer(container, customs);
		});
		$(document).on('click', '.markReady', function(event){
			var kid = $(this).parent().parent().parent().parent().parent().find(".kid").eq(0);
			kid = kid.text();
			var container = containerMap[kid];
			updateContainer(container, "ready");
		});
		$(document).on('click', '.markCustoms', function(event){
			var kid = $(this).parent().parent().parent().parent().parent().find(".kid").eq(0);
			kid = kid.text();
			var container = containerMap[kid];
			updateContainer(container, "customs");
		});
		function loadData(){
			var dataList = dataStore.find();

		dataList.subscribe(function onNext(entities){
			$(entities).each(function(index, value){
				var $statusDiv = $("#status").clone();
				$statusDiv.removeClass("hide");
				$statusDiv.find("*").removeClass("currentStatus");
				$statusDiv.find("*").removeClass("done");
				if (value['company'] == null){
					return true;
				}
				containerMap[value['_id']] = value;
				var row = $(table).find("tr").last().clone();
				/*populate row*/
				row.find(".id").find(".textContent").html(value['number']);
				row.find(".kid").text(value['_id']);
				row.find(".contents").find(".textContent").html(value['contents']);
				row.find(".quantity").find(".textContent").html(value['quantity']);

				if (value['status']=="arrived"){
					$statusDiv.find(".option1").addClass("currentStatus");
					$statusDiv.find(".customs").html("<button type=button class='markCustoms'> Customs </button>");
				}
				var $statusSelect = $statusDiv.find('[name=statusSelect]').first();
				if (value['status']=="customs"){
					$statusDiv.find(".arrived").addClass("done");
					$statusSelect.val(value['status']);
					$statusSelect.prop("disabled", false);
					$statusDiv.find(".verify").addClass("currentStatus");
				}
				if (value['status'] == "failed"){
					$statusDiv.find(".arrived").addClass("done");
					$statusSelect.val(value['status']);
					$statusSelect.prop("disabled", true);
					$statusDiv.find(".verify").addClass("currentStatus");
				}
				if (value['status'] == "ready"){
					$statusDiv.find(".arrived").addClass("done");
					$statusDiv.find(".verify").addClass("done");
					$statusSelect.val('ready');
					$statusSelect.prop("disabled", true);
					$statusDiv.find(".markReady").addClass("done");
					$statusDiv.find(".option2").addClass("currentStatus");
				}
				if (value['status'] == "picked up"){
					$statusDiv.find(".arrived").addClass("done");
					$statusSelect.val('ready');
					$statusSelect.prop("disabled", true);
					$statusDiv.find(".markReady").addClass("done");
					$statusDiv.find(".ready").addClass("done");
					$statusDiv.find(".option3").addClass("currentStatus");
				}

				$("button").prop("disabled", true);				
				row.find(".status").find(".textContent").html($statusDiv);
				row.insertAfter($(table).find("tr").last());
			});
			//$("#status").css("display", "none");

		}, function onError(error){

		}, function onComplete(){

		});	
		}
		//Add container to list
		$("#add").on("click", function(){
			var newContainer = {
				company: $('[name="company"]').val(),
				contents: $('[name="contents"]').val(),
				number: $('[name="number"]').val(),
				status: $('[name="status"]').val()
			};
			updateContainer(newContainer);
		});
		//Update container status
		$("#customs").click(function(){
			//get container attributes
			var container = {};
			updateContainer(container);
		});
		$("#ready").click(function(){
			//get container attributes
			var container = {};
			updateContainer(container);
		});
		loadData();
	}).catch(function(error){
		//error
	});
});
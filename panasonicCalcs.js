/** Add a new row of cameras, obviously. **/
function addRow(camera, before) {
	var newRow = "";
	$("#add").removeClass("ui-state-hover");
	
	newRow += "<tr class='' valign='top' id='" + camera.id + "'>"
		
		+ "<td><input type='text' id='quantity" + camera.id + "' maxlength='3' value='" + camera.qty + "' class='short ui-corner-all' onKeyUp='validateNumber(this, 999); calcData()' /></td>"
				+ "<td><select class='narrow' id='res" + camera.id + "'>"
			
			+ "<option>D1</option>"
			
			
			+ "<option>1.3M</option>"
			
			+ "<option>2M</option>"
			
			+ "<option>3M</option>"
			+ "<option>4M</option>"
			+ "<option>5M</option>"
			+ "<option>6M</option>"
			+ "<option>4K</option>"
			
		+ "</select></td>"
		
		+ "<td><select class='narrow' id='compress" + camera.id + "'>"
			+ "<option value='3'>H.264</option>"
			+ "<option value='1'>H.265</option>"
			+ "<option value='2'></option>"
			
		+ "</select></td>"
+ "<td align='center'><input id='dataRange" + camera.id + "' class='short ui-corner-all' style='width: 46px;' type='text' maxlength='5' value='" + camera.datarate + "' onKeyUp='validateNumber(this, 50000); calcData()' />"
			+ "</td>"
		+ "<td><input type'text' id='fps" + camera.id + "' maxlength='2' value='" + camera.fps + "' class='short ui-corner-all' onKeyUp='validateNumber(this, 30); calcFrameSize(\"" + camera.id + "\"); calcData()'/></td>"
		+ "<td><input type='text' class='short ui-corner-all' id='motion" + camera.id + "' maxlength='3' value='" + camera.motion + "' onKeyUp='validateNumber(this, 100); calcData()' /></td>"
		+ "<td><input type='text' class='short ui-corner-all' id='days" + camera.id + "' maxlength='5' value='" + camera.days + "' onKeyUp='validateNumber(this, 0); calcData()' /></td>"
		
		+ "<td valign='middle' align='center' id='bandwidth" + camera.id + "'>" + camera.band + "MB</td>"
		+ "<td valign='middle' align='center' id='size" + camera.id + "'>" + camera.size + "GB</td>"
		+ "<td><button class='delete' id='delete" + camera.id + "' onClick='killRow(\"" + camera.id + "\")'>Remove this row of cameras.</button></td>"
		
		+ "</tr>";
		
	
	
	if (typeof before === "undefined" || before == "first") {
		$("#cameras").find("tbody").append(newRow);
	} else {
		$(before).closest("tr").before(newRow);	
	}
	
	$("#type" + camera.id).selectmenu();
	
	$("#compress" + camera.id).selectmenu();
	$("#res" + camera.id).selectmenu();
	
	$("#type" + camera.id).find("option").each(function(i) {
		if ($(this).text() == camera.type) {
			$("#type" + camera.id)
				.selectmenu("index", i)
				.change(function() {
					var id = $(this).attr("id").substring(4);
					
					$.each(cameraObjects, function() {
						if (this.id == id) {
							this.type = $("#type" + id + " :selected").text();
						}
					});
				});
			
		}
	});



		
	$("#res" + camera.id).find("option").each(function(i) {
		if ($(this).text() == camera.resolution) {
			$("#res" + camera.id)
				.selectmenu("index", i)
				.change(function() {
					var id = $(this).attr("id").substring(3);
					$.each(cameraObjects, function() {
						if (this.id == id) {
							this.resolution = $("#res" + id + " :selected").text();
						}
					});
					calcFrameSize(id)
					calcData();
				});
		}
	});
	
	$("#compress" + camera.id).find("option").each(function(i) {
		if ($(this).text() == camera.compression) {
			$("#compress" + camera.id)
				.selectmenu("index", i)
				.change(function() {
					var compType = $(this).val();
					if (compType == "3") {
						var compval = "h264";
						var frameval = "hframes";
					} else if (compType == "2") {
						var compval = "mpeg4";
						var frameval = "mframes";
					} else {
						var compval = "mjpeg";
						var frameval = "jframes";
					}
					
					var id = $(this).attr("id").substring(8);
					var value = $("#model" + id).val();
					$.each(cameraObjects, function() {
						if (this.id == id) {
							this.compression = $("#compress" + id + " :selected").text();
						}
					});

					
					$(cameraData).find("model").each(function(index) {
						if ($(this).text() == value) {
							var max = $(this).siblings(compval).text();
							var frames = $(this).siblings(frameval).text();
					
							$("#res" + id).find("option").each(function(i) {
								if ($(this).text() == max) {
									$("#res" + id).selectmenu("enable", i);
									$("#res" + id).selectmenu("index", i);
									$("#fps" + id).val(frames);
								} else {
									$("#res" + id).selectmenu("disable", i);
								}
							});
						}
					})
					
					calcFrameSize(id);
					calcData();
				});
		}
	})
	
	if ($("#swonly").attr("checked")) {
		$("#type" + camera.id).selectmenu("disable", 1);
	}
	
	$("#multi" + camera.id).button({
		icons: { primary: "ui-icon-plusthick" }
	});

	// Create the "Edit" button. This will open the edit dialog box.
	$("#edit" + camera.id).button({
		icons: { primary: "ui-icon-wrench" },
		text: false
	});
	
	$("#editwindow" + camera.id).button({
		icons: { primary: "ui-icon-gear" },
		text: false
	
	});
	
	// Create the "Delete" button.
	$("#delete" + camera.id).button({
		icons: { primary: "ui-icon-closethick" },
		text: false
	});
	
	// Update page with new calculations.

	calcFrameSize(camera.id);
	calcData();
}



/** Remove whatever row is getting the axe. **/
function killRow(id) {
	for (var i = 0; i < cameraObjects.length; i++) {
		if (cameraObjects[i].id == id || cameraObjects[i].parent == id) {
			var parentID = cameraObjects[i].parent;
			
			$.each(cameraObjects, function() {
				if (this.id == parentID) {
					this.addedStreams--;
					
					if (this.addedStreams < this.streams - 1)
						$("#multi" + parentID).show();
				}
			});
			
			$("#" + cameraObjects[i].id).remove();
			cameraObjects.splice(i, 1);
			if (parentID == 0)
				$("#msr" + id).remove();
			
			i--;
		}
	};
	
	calcData();
}

function resetFPS(id) {
	$("#fps" + id).val("15");
}

function setResolutions(id) {
	var resArray = new Array();
	var $res = $("#res" + id);
	
	$res.find("option").each(function(i) {
		$res.selectmenu("enable", i);
	});

	if ($("#type" + id + " :selected").text() == "HD-SDI") {
		$res.find("option").each(function(i) {
			if ($(this).text() == "720P" || $(this).text() == "1080P") {
				$res.selectmenu("enable", i);
			} else {
				$res.selectmenu("disable", i);
			}
		});
	} else {
		if ($("#type" + id + " :selected").text() == "IP") {
			var maxRes = "20M";
		} else {
			var maxRes = "D1";
		}	
	
		$(resData).find("Resolution").each(function() {
			resArray.push($(this).attr("value"));
		});
		
		$res.find("option").each(function(i) {
			if (jQuery.inArray($(this).val(), resArray) > jQuery.inArray(maxRes, resArray)) {
				$res.selectmenu("disable", i);
			} else {
				$res.selectmenu("enable", i);
			}
		});
	}
	
	$res.selectmenu();
}



/** Calculations! **/
function calcData() {
	var totalFPS = 0, peakDR = 0, avg = 0;
	var buffer = 0, totalCameras = 0, totalStreams = 0;
	

	// Reset totals.
	var ipCams = parseInt(0, 10);
	var ipLicenses = parseInt(0, 10);
	var audioChannels = parseInt(0, 10);
	var analogCams = parseInt(0, 10);
	var hdsdiCams = parseInt(0, 10);
	var networkTraffic = parseFloat(0);
	var dataRate = parseFloat(0);
	var totalStorage = parseFloat(0);
	var audioDataRate = parseFloat(0);
	
	// Iterate over the entire table of cameras.
	$("#cameras tr").each(function() {
		var s = $(this).attr("id");
		
		if (typeof(s) !== "undefined" && s.indexOf("msr") < 0) {
			var t = $("#type" + s + " :selected").text();
			var d = parseFloat($("#dataRange" + s).val()); //(Kbps)
			var m = $("#motion" + s).val();
			var y = $("#days" + s).val();
			var f = $("#fps" + s).val();
			var tl = $("#timelapse").val();
			var c = $("#channels" + s).val();
			var q = $("#quantity" + s).val();
		
			// Update camera object with updated values
			$.each(cameraObjects, function() {
				if (this.id == s) {
					this.type = t;
					this.qty = q
					this.fps = f;
					this.motion = m;
					this.days = y;
					this.datarate = d;
					this.make = $("#make" + s + " :selected").text();
					this.model = $("#model" + s + " :selected").text();
					this.compression = $("#compress" + s + " :selected").text();
					this.resolution = $("#res" + s + " :selected").text();
					totalStreams += parseInt(this.addedStreams, 10);
				}
			});
			t = "IP"
			// If an input is empty, replace "" with 0.
			if (q == "") { q = 0; }
			if (d == "") { d = 0; }
			if (m == "") { m = 0; }
			if (y == "") { y = 0; }
			if (tl == "") { tl = 0; }

			// Determine whether cameras are analog or IP.
			if (t == "IP") {
				if (s.indexOf("-") < 0) {
					ipCams += parseInt(q, 10);
					ipLicenses += parseInt(Math.ceil(q / c), 10);
				}
				totalCameras += parseInt(q, 10);
				networkTraffic += parseFloat(d) * q;
			} 
			
			if (t != "Audio") {
				// Calculate total data rate.
				avg = ((100 - parseFloat(m)) / 2) + parseFloat(m);
				buffer += q * (avg / 100);
				
				if (m > 0)
					peakDR += parseFloat(d) * q;
				
				//              # of cams    *   data rate   * s/day *      % motion       *     days       / Kb to GB conversion
				var storage = (parseFloat(q) * parseFloat(d) * 86400 * parseFloat(m / 100) * parseFloat(y)) / parseFloat(800000);
				var band = (parseFloat(q) * (parseFloat(d))/1000);
				if (tl != "0") {
					var multi = 1, gov = 0;
					var comp_value = $("#compress" + s + " :selected").text();
					
					// Grab compresion using stored data.
					if (comp_value == "H.264") {
						multi = 10;
						gov = 1 / 1;
					} else if (comp_value == "H.265") {
						multi = 10;
						gov = 1 / 1;
					} else if (comp_value == "MPEG4" || comp_value == "MPEG4 / H.264") {
						multi = 5;
						gov = 30 / f;
					} else {
						multi = 1;
						gov = 1;
					}
					
					if (t == "HD-SDI") {
						gov = 1;
					}
					
					if (parseFloat(tl) > gov) {
						var use = parseFloat(tl);
					} else {
						var use = gov;
					}
					
					var fs = $("#framesize" + s).text();
					//          # of cams    *   frame size      cmult *    days       * s/day * GOV *   motion %    / KB to GB conversion  * record int.
					storage = (parseFloat(q) * (parseFloat(d)/8000000) * parseFloat(m / 100)) * (parseFloat(y) * 86400);
				band = (parseFloat(q) * (parseFloat(d))/1000);
				}
				
				storage = storage.toFixed(2);
								band = band.toFixed(2);

				$("#size" + s).text(parseFloat(storage));
				$("#bandwidth" + s).text(parseFloat(band));
				$("#framesize" + s).text(($("#dataRange" + s).val() / (8 * $("#fps" + s).val())).toFixed(1));
				totalStorage += parseFloat(storage);
			} else {
				audioDataRate = parseFloat(d * q);
				$("#size" + s).text((d * 3600 * m * q * y / parseFloat(8388608)).toFixed(2));
				totalStorage += d * 3600 * m * q * y / parseFloat(8388608);
				if ($("#make" + s + " :selected").text() == "Server") {
					audioChannels += parseInt(q, 10);
				}
			}
		}
	});
	
	if (totalStreams > 0) {
		$("#start").attr("disabled", "disabled");
		$("#starttext").css("color", "gray").css("font-style", "italic");
		if ($("#start").is(":checked")) {
			$("#pro").attr("checked", true);
		}
	} else {
		$("#start").removeAttr("disabled");
		$("#starttext").css("color", "black").css("font-style", "normal");
	}
	
	if (userServer.maxAnalog == 0 && $("#iponly").attr("disabled")) {
		$("#iponly").removeAttr("disabled");
	}
	
	if (totalCameras > 0) {
		buffer = buffer / totalCameras;
		dataRate += peakDR * buffer;
	}
	if (totalStorage > 100000000) {
		var severrec = 'NVR1000';
	}
	
	dataRate += audioDataRate;
	networkTraffic += audioDataRate;
	
	// Print totals.
	$(".iptotal").html(ipCams);
	$(".analogtotal").html(analogCams);
	$(".hdsditotal").html(hdsdiCams);
	$(".traffictotal").html((networkTraffic / 1000).toFixed(1) + " Mbps ");
	$(".datatotal").html((dataRate / 8000).toFixed(1) + " MBps ");
	$(".storagetotal").html((totalStorage / 1000).toFixed(2) + " TB");
	
	
	
	
}

function calcFrameSize(id) {
	var temp_string = id + " ";
	if ($("#type" + id + " :selected").text() == "HD-SDI") {
		var res = 0;
		$(resData).find("frames").each(function() {
			if ($("#fps" + id).val() == $(this).attr("value")) {
				if ($("#res" + id + " :selected").text() == "720P") {
					res = $(this).attr("dataRate720");
				} else if ($("#res" + id + " :selected").text() == "1080P") {
					res = $(this).attr("dataRate1080");
				}
			
			$("#framesize" + id).text(parseFloat(res / ($("#fps" + id).val() * 8)).toFixed(1));
				$("#dataRange" + id).val(res);
			}
		});
	} else if ($("#make" + id + " :selected").text() == "Undecided" || $("#make" + id + " :selected").text() == "ONVIF" || temp_string.indexOf("-") > -1) {
		var selected = $("#compress" + id + " :selected").text();
		$(resData).find("Resolution").each(function() {
			if ($("#res" + id + " :selected").text() == $(this).attr("value")) {
				var compression = "h264SizeBytes";
				
				if (selected == "MJPEG") {
					 compression = "jpegSizeBytes";
				} else if (selected == "MPEG4" || selected == "MPEG4 / H.264") {
					compression = "mpeg4SizeBytes";
				} else if (selected = "H.264") {
					compression = "h264SizeBytes";
				} else if (selected = "H.265") {
					compression = "h265SizeBytes";
				}
					
				var dr = $(this).attr(compression) / 1000;
				$("#framesize" + id).text(dr.toFixed(1));
				$("#dataRange" + id).val(parseFloat($("#fps" + id).val() * 1 * dr).toFixed(0));
			}
		});
	} else if ($("#type" + id + " :selected").text() == "Audio") {
		$("#framesize" + id).text("0");
		$("#dataRange" + id).val("32");
	} else {
		$(resData).find("Resolution").each(function() {
			if ($(this).attr("value") == $("#res" + id + " :selected").text()) {
				var $comp = $("#compress" + id + " :selected").text();
				var $fps2 = $("#fps" + id).val();
				var dr = 0;
				var dr2 = 0;
				/*************************************DATA Rate Calculation ************************************************/
				if ($comp == "MJPEG") {
					dr = $(this).attr("jpegSizeBytes") / 1000;
				} else if ($comp == "MPEG4" || $comp == "MPEG4 / H.264") {
					dr = $(this).attr("mpeg4SizeBytes") / 1000;
				} else if ($comp == "H.264") {
					dr = $(this).attr("h264SizeBytes") / 1;
				} else if ($comp == "H.265") {
					dr = $(this).attr("h265SizeBytes") / 1;
				}
$("#framesize" + id).text(dr.toFixed(1));
		dr2 = dr;
/*************************************Calculate Datarate with FPS ************************************************/
		if ($fps2 > 0 && $fps2 < 3) {
					dr = dr2 * 1;
			}
			else
			if ($fps2 > 2 && $fps2 < 6) {
					dr = dr2 * 0.7;
			}
			if ($fps2 > 5 && $fps2 < 9) {
					dr = dr2 * 0.61;
			}
			if ($fps2 > 8 && $fps2 < 13) {
					dr = dr2 * 0.57;
			}
			if ($fps2 > 12 && $fps2 < 19) {
					dr = dr2 * 0.51;
			}
			if ($fps2 > 18 && $fps2 < 25) {
				
					dr = dr2 * 0.49;
			}
			if ($fps2 > 24 && $fps2 < 31) {
				
					dr = dr2 * 0.46;
			}
			if ($fps2 > 30 && $fps2 < 61) {
				
					dr = dr2 * 0.4;
			}
			


				


								/*************************************KBS to KBPS ************************************************/

				$("#dataRange" + id).val(parseFloat($("#fps" + id).val() * 1 * dr).toFixed(0));



			
			
			}
		});
	}
}

function editMax(obj) {
	maxModels = $(obj).val();
	
}



var warnings = "";
var pageNum = 1, pages = 1;



function checkForWarnings(num, i) {	
	if (userServer.diskSize > (compatibleServers[i].diskSize * num * .8)) {
		var text = $("#ds" + i).text();
		if (text.substr(text.length - 1) != "*") {
			$("#ds" + i).append("*");
		}
		throwWarning("size");
		warnings += "" + i + ",";
	} else {
		$("#ds" + i).text().replace("*", "");
	}
	
	if (userServer.dataRate > (compatibleServers[i].dataRate * num * .8)) {
		var text = $("#dr" + i).text();
		if (text.substr(text.length - 1) != "*") {
			$("#dr" + i).append("*");
		}
		throwWarning("size");
		warnings += "" + i + ",";
	} else {
		$("#dr" + i).text().replace("*", "");
	}
	
	if (userServer.netTraffic > (compatibleServers[i].netTraffic * num * .75)) {
		var text = $("#nt" + i).text();
		if (text.substr(text.length - 1) != "*") {
			$("#nt" + i).append("*");
		}
		throwWarning("traffic_error");
		warnings += "" + i + ",";
	} else {
		$("#nt" + i).text().replace("*", "");
	}
	
	
}
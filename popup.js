// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
    chrome.tabs.executeScript(null, { code: "document.body.style.backgroundColor='" + e.target.id + "'" });
    window.close();
}

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    var url = 'https://www.baidu.com';
    chrome.tabs.executeScript(null, { code: "window.location.href = '" + url + "';" });

});

window.addEventListener('onload', function(event) {
  	var url = 'https://www.baidu.com/';
  	chrome.tabs.executeScript(null, {code:"window.location.href = '" + url + "';"});
});

document.addEventListener('DOMContentLoaded', function() {
    // var divs = document.querySelectorAll('div');
    // for (var i = 0; i < divs.length; i++) {
    //     divs[i].addEventListener('click	', click);
    // }
	
	// var form = document.getElementById('red');
	// if (form != null) {
 //  	var url = 'https://www.baidu.com/';
 //  	chrome.tabs.executeScript(null, {code:"window.location.href = '" + url + "';"});
 //  	return;
	// }

  	var url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new';
  	chrome.tabs.executeScript(null, {code:"window.location.href = '" + url + "';"});
    return;
	console.log('readyState = haha');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.body.className = 'ok';
                console.log(request.responseText);
            } else {
                document.body.className = 'error';
            }
        }
    };
    var url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new';
    request.open("GET", url, true);
    request.send(null);
});

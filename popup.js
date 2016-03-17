// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
    chrome.tabs.executeScript(null, { code: "document.body.style.backgroundColor='" + e.target.id + "'" });
    window.close();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        var sourceBranches = request.greeting;

        if (request.greeting == "hello")
            sendResponse({ farewell: "goodbye" });
        return true;

    }
);

function getBranches() {
    var xhr = new XMLHttpRequest();
    var testInt = 0;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {

            // var merge_request_source_branch = document.getElementById('merge_request_source_branch');
            // if (merge_request_source_branch) {
            //     alert('just a test');
            // }
            // merge_request_source_branch.value = 'beibei_pod';

            // var merge_request_target_branch = document.getElementById('merge_request_target_branch');
            // merge_request_target_branch.value = 'beibei_pod';
            // var mergeRequestElement = document.getElementById('new_merge_request');
            // mergeRequestElement.submit();

            // window.location.href = 'http://git.husor.com.cn/ios/beibei/merge_requests/new?utf8=✓&merge_request%5Bsource_project_id%5D=32&merge_request%5Bsource_branch%5D=beibei_pod&merge_request%5Btarget_project_id%5D=32&merge_request%5Btarget_branch%5D=master'

            // return;
            var element = document.createElement('html');
            element.innerHTML = xhr.responseText;

            // var targetBranch = element.getElementById('search');
            var merge_request_source_branch = element.querySelector('#merge_request_source_branch');
            var sourceBranchChildNodes = merge_request_source_branch.childNodes;
            var sourceBranches = [];
            for (var i = 1; i < sourceBranchChildNodes.length; i++) {
                var childElement = sourceBranchChildNodes[i];
                if (childElement.value) {
                    sourceBranches.push(childElement.value);
                }
            }

            var sourceBranchElement = document.getElementById('source_branch');
            var targetBranchElement = document.getElementById('destination_branch');
            for (var i = 0; i <= sourceBranches.length; i++) {
                var opt = document.createElement('option');
                opt.value = sourceBranches[i];
                opt.innerHTML = sourceBranches[i];
                sourceBranchElement.appendChild(opt);

                var destination = opt.cloneNode(true);
                targetBranchElement.appendChild(destination);
            }

            return;
            // console.log('sourceBranchOptionValues = ' + sourceBranchOptionValues);
            chrome.runtime.sendMessage({ greeting: sourceBranchOptionValues }, function(response) {
                console.log(response.farewell);
            });
        }
    }
    xhr.open('GET', 'http://git.husor.com.cn/ios/beibei/merge_requests/new', true);
    xhr.send(null);
}

document.addEventListener('DOMContentLoaded', function() {
    // var divs = document.querySelectorAll('div');
    // for (var i = 0; i < divs.length; i++) {
    //     divs[i].addEventListener('click  ', click);
    // }

    // var form = document.getElementById('red');
    // if (form != null) {
    //      var url = 'https://www.baidu.com/';
    //      chrome.tabs.executeScript(null, {code:"window.location.href = '" + url + "';"});
    //      return;
    // }
    getBranches();
    return;
    var url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new';
    url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new?utf8=✓&merge_request[source_project_id]=32&merge_request[source_branch]=beibei_pod&merge_request[target_project_id]=32&merge_request[target_branch]=master';
    chrome.tabs.executeScript(null, { code: "window.location.href = '" + url + "';" });

});

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
            for (var i = 0; i < sourceBranches.length; i++) {
                var opt = document.createElement('option');
                opt.value = sourceBranches[i];
                opt.innerHTML = sourceBranches[i];
                sourceBranchElement.appendChild(opt);

                var destination = opt.cloneNode(true);
                targetBranchElement.appendChild(destination);
            }
            return;
            // console.log('sourceBranchOptionValues = ' + sourceBranchOptionValues);
            // chrome.runtime.sendMessage({ greeting: sourceBranchOptionValues }, function(response) {
            //     console.log(response.farewell);
            // });
        }
    }
    xhr.open('GET', 'http://git.husor.com.cn/ios/beibei/merge_requests/new', true);
    xhr.send(null);
}

document.addEventListener('DOMContentLoaded', function() {
    var okBtn = document.getElementById('OK_BTN');
    okBtn.addEventListener('click', function(event) {
        var sourceBranchElement = document.getElementById('source_branch');
        var targetBranchElement = document.getElementById('destination_branch');
        var sourceBranch = sourceBranchElement.options[sourceBranchElement.selectedIndex].value;
        var destinationBranch = targetBranchElement.options[targetBranchElement.selectedIndex].value;
        if (!sourceBranch || !destinationBranch) {
            chrome.tabs.executeScript(null, { code: "alert('请选择source/destination branch')" });
        } else {
            var url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new';
            url = 'http://git.husor.com.cn/ios/beibei/merge_requests/new?utf8=✓&merge_request[source_project_id]=32&merge_request[source_branch]=' + sourceBranch + '&merge_request[target_project_id]=32&merge_request[target_branch]=' + destinationBranch;
            chrome.tabs.executeScript(null, { code: "window.location.href = '" + url + "';" });
        }
    });
    getBranches();
    getAssignees();
});

function getAssignees() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // chrome.storage.sync.set({ 'value': 12 }, function() {
            //     chrome.storage.sync.get("value", function(data) {
            //         console.log("data", data);
            //     });
            // });

            var allAssignees = JSON.parse(xhr.responseText);
            // chrome.tabs.executeScript(null, { code: "alert('" + allAssignees[0]['name'] + "')" });
            var assigneeNames = allAssignees.map(function(assignee) {
                return assignee.name;
            });
            var assigneeElement = document.getElementById('assignee');
            for (var i = 0; i < assigneeNames.length; i++) {
                var opt = document.createElement('option');
                opt.value = assigneeNames[i];
                opt.innerHTML = assigneeNames[i];
                assigneeElement.appendChild(opt);
            }
            chrome.storage.sync.get('assignee', function(assigneeObj) {
                console.log('pre', assigneeObj);
                if (assigneeObj) {
                    assigneeElement.value = assigneeObj['assignee']['name'];
                    assigneeElement.assignee = assigneeObj['assignee'];
                }
            });

            assigneeElement.addEventListener("change", function() {
                var selectedIndex = assigneeElement.selectedIndex;
                var assignee = allAssignees[selectedIndex];
                var assigneeInfo = JSON.stringify(assignee);
                var assigneeDict = {'name':assignee['name'], 'id':assignee['id']};
                chrome.storage.sync.set({ 'assignee': assigneeDict}, function() {
                    // Notify that we saved.
                    // chrome.tabs.executeScript(null, { code: "alert('" +assignee['name']+ "')" });
                    chrome.storage.sync.get('assignee', function(assignee) {
                        console.log('assignee', assignee);
                        if (assignee) {
                            var assigneeInfo = JSON.parse(assignee);
                            chrome.tabs.executeScript(null, { code: "alert('" + assignee + "')" });
                            assigneeElement.value = assignee;
                        } else {
                            // chrome.tabs.executeScript(null, { code: "alert('" + assignee + "')" });
                        }
                    });

                });

                // var assignee = window.localStorage.getItem('assignee');
                // chrome.tabs.executeScript(null, { code: "alert('" + assignee['name'] + "')" });
            });
        }
    }
    xhr.open('GET', 'http://git.husor.com.cn/autocomplete/users.json?search=&per_page=20&active=true&project_id=32&current_user=true', true);
    xhr.send(null);
}

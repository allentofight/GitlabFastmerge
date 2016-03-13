var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        // var mergeRequestElement = document.getElementById('new_merge_request');
        // return;
        var element = document.createElement('html');
        element.innerHTML = xhr.responseText;
    
        // var targetBranch = element.getElementById('search');
        var merge_request_source_branch = element.querySelector('#merge_request_source_branch');
        var sourceBranchChildNodes = merge_request_source_branch.childNodes;
        var sourceBranchOptionValues = [];
        for (var i = 1; i < sourceBranchChildNodes.length; i++) {
            var childElement = sourceBranchChildNodes[i];
            if (childElement.value) {
                sourceBranchOptionValues.push(childElement.value);
            }
        }

        chrome.runtime.sendMessage({ greeting: sourceBranchOptionValues }, function(response) {
            console.log(response.farewell);
        });
    }
}
xhr.open('GET', 'http://git.husor.com.cn/ios/beibei/merge_requests/new', true);
xhr.send(null);

// $.get("/ios/beibei/merge_requests/branch_from", function( data ) {
// 	alert('haha....');
// });

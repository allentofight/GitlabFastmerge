var url = window.location.href;
console.log('url = ' + url);
if (url == 'http://git.husor.com.cn/ios/beibei/merge_requests/new') {
    var xhr = new XMLHttpRequest();
    var testInt = 0;
    console.log('same...');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {

            var merge_request_source_branch = document.getElementById('merge_request_source_branch');
            if (merge_request_source_branch) {
                alert('just a test');
            }
            merge_request_source_branch.value = 'beibei_pod';

            var merge_request_target_branch = document.getElementById('merge_request_target_branch');
            merge_request_target_branch.value = 'beibei_pod';
            var mergeRequestElement = document.getElementById('new_merge_request');
            // mergeRequestElement.submit();

            window.location.href = 'http://git.husor.com.cn/ios/beibei/merge_requests/new?utf8=✓&merge_request%5Bsource_project_id%5D=32&merge_request%5Bsource_branch%5D=beibei_pod&merge_request%5Btarget_project_id%5D=32&merge_request%5Btarget_branch%5D=master'

            return;
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
}


// $.get("/ios/beibei/merge_requests/branch_from", function( data ) {
//  alert('haha....');
// });

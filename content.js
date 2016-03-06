var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var element = document.createElement('html');
        element.innerHTML = xhr.responseText;
        // var targetBranch = element.getElementById('search');
        var merge_request_source_branch = element.querySelector('#merge_request_source_branch');
        var sourceBranchChildNodes = merge_request_source_branch.sourceBranchChildNodes;
        var sourceBranchOptionValues = [];
        for (var i = 1; i < sourceBranchChildNodes.length; i++) {
        	var childElement = sourceBranchChildNodes[i];
        	if (childElement.value) {
        		sourceBranchOptionValues.push(childElement.value);	
        	}
        }   
        return;

        
    }
}
xhr.open('GET', 'http://git.husor.com.cn/ios/beibei/merge_requests/new', true);
xhr.send(null);

// $.get("/ios/beibei/merge_requests/branch_from", function( data ) {
// 	alert('haha....');
// });

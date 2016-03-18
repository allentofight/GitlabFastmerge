
var assigneeSpan = document.getElementById('select2-chosen-1');
var input = document.getElementById('merge_request_assignee_id');
console.log('just a test');
if (assigneeSpan) {
    chrome.runtime.sendMessage({ assignee: 'assignee' }, function(response) {
        var receivedAssignee = response.assignee;
        assigneeSpan.innerHTML = receivedAssignee['name'];
        input.value = receivedAssignee['id'];
    });
}

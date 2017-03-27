$(document).ready(function() {
    console.log('jquery up');

    //function to populate tasks
    updateTasks();

    //delete button listener
    // $('.tasks').on('click', '.delete', function() {
    //     console.log('Delete task: ' + $( this ).data('task'));
    //     $.ajax({
    //       type: 'DELETE',
    //       url: '/tasks/delete/' + $( this.data ('task') // use params
    //     });
    // }); // end delete listener

    $( '#taskInput' ).on( 'click', '#addTask', function(event) {
        event.preventDefault();
        // console.log('hit submit listener') ;

      var task = {};
      task.description = $( '#enterTask' ).val();


        $.ajax({
            type: 'POST',
            url: '/tasks/newTask',
            data: task,
            success: function(response) {
                console.log('response is ' + response);
                if (response == 'Created') {
                    //refresh todo list
                    updateTasks();
                } else {
                    alert('error adding task');
                }
            }
        }); //end ajax POST
        // clear input values
        $('#enterTask').val('');
        // refresh updateTasks()
        updateTasks();

    }); //end submitTask listener

}); //END DOC READY

function updateTasks() {
    // console.log('hit updateTasks ') ;
    $.ajax({
        type: "GET",
        url: "/tasks",
        success: function(response) {
            console.log(response);
            $('.tasks').empty();
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                $('.tasks').append('<tr></tr>');
                var $tud = $('.tasks').children().last();
                $tud.append('<td><input type= "checkbox", id= "check"' + task.id + '/></td>');
                $tud.append('<td>' + task.description + '</td>');
                $tud.append('<td><button class= "delete" data-task="' +
                    task.id + '" data-task="' +
                    task.description + '">DELETE</button></td>');
            }
        }
    });
} // end updateTasks()

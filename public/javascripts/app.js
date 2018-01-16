$(document).ready(function(){

const getData = ()=> {
    $.get("https://api.openweathermap.org/data/2.5/forecast/daily?q=New%20York&cnt=5&APPID=0a24d823e5f48003c6b67116f14c5541")
    .then( results => {
        console.log(results);
        $('#select-list').append(
            $('<select id="list">'));
        
        
        results.list.forEach(element => {
            console.log(element)
            let date=moment.unix(element.dt).format('dddd')
            $('#list').append(
                $('<option>').text(element.pressure+"     "+date).attr({"value":element.pressure})
            )
        });
    }).done( function(){
        $('#select-list').append(
            $("<button>").addClass("btn btn-info btn-lg submit-button").text("Submit")
        )
     })
            
}
    $(document).on("click", "#retrieve", function(event) {
        console.log("clicked")
        getData();
    })
    $(document).on("click", ".submit-button", function (event) {
        console.log("clicked submit")
        let submitData = $("#select-list").children().val().trim()
        console.log("submitData", submitData)
        //Data Exists
        if (submitData) {
            console.log("sending")
            $.post({
                url: "http://www.futurestaybeta.com/test3.php",
                data: { value: submitData }
            }).then( results =>{
                console.log("done"+results)
            })
        }
    });
});


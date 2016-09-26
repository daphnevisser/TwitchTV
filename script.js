var streamerList = ["freecodecamp", "storbeck", "noepel", "habathcx", "RobotCaleb", "xekedeath", "noobs2ninjas", "beohoff", "medrybw", "brunofin"];
var url = 'https://api.twitch.tv/kraken/streams/';
var url2 = 'https://api.twitch.tv/kraken/users/';

//loop through all the streamers
for (var i = 0; i < streamerList.length; i++) {
    loadData(i);
}

function loadData(i) {
    //class for each specific streamer
    var cu = "." + streamerList[i];

    $.ajax({
        url: url + streamerList[i],
        headers: {
            'Client-ID': API_KEY
        },
        success: function(data) {
            //add status text
            var status;
            if (data.stream) {
                status = data.stream.channel.status;
                if (status.length > 33) {
                    status = status.substring(0, 30) + "...";
                }
            } else {
                status = "Offline";
            }

            //append list items
            $(".user-list").append('<a target="_blank" href="http://twitch.tv/' + streamerList[i] + '"><li class="list-group-item ' + streamerList[i] + '"><img src="" alt="user img" class="img-rounded"><h4 class="list-group-item-heading"></h4><p class="list-group-item-text">' + status + '</p></li></a>');

            //add logo + name
            $.ajax({
                url: url2 + streamerList[i],
                headers: {
                    'Client-ID': API_KEY
                },
                success: function(data) {
                    if (data.logo) {
                        $(cu).find("img").attr("src", data.logo);
                    } else {
                        $(cu).find("img").attr("src", "img/twitch.png");
                    }
                    $(cu).find(".list-group-item-heading").text(data.display_name);
                }
            });
            //add class online/offline
            if (data.stream) {
                $(cu).addClass("online");
            } else {
                $(cu).addClass("offline");
            }
        }
    }).fail(function() {
        $(".user-list").append('<li class="list-group-item unavailable ' + streamerList[i] + '"><img src="img/error.jpg" alt="error img" class="img-rounded"><h4 class="list-group-item-heading">' + streamerList[i] + '</h4><p class="list-group-item-text">Twitch account unavailable</p></li>');
    });
}

//nav buttons
$("#all").click(function() {
    $(".online").show();
    $(".offline").show();
    $(".unavailable").show();
});

$("#on").click(function() {
    $(".online").show();
    $(".offline").hide();
    $(".unavailable").hide();
});

$("#off").click(function() {
    $(".offline").show();
    $(".online").hide();
    $(".unavailable").hide();
});

$(function(){
    //when the submit button is clicked
    $("#btn_submit").on("click", function(){
        var username = $("#searchInput").val();
        var user_uri   = "https://api.github.com/users/"+username;

        //make API request
        $.getJSON(user_uri)
        .done(function(data) {
            // get user info
            var fullname   = data.name;
            var username   = data.login;
            var avatarUrl     = data.avatar_url;
            var profileUrl = data.html_url;
            var location   = data.location;
            var followersnum = data.followers;
            var followingnum = data.following;
            var reposnum     = data.public_repos;
        
            //if there is no full name, the username is the full name
            if(fullname == undefined) { 
                fullname = username; 
            };
            
            //console.log(fullname);
            var outhtml = '<div id="results" class="resultContainer"><h2>'+fullname+' <span>(@<a href="'+profileUrl+'" target="_blank">'+username+'</a>) </span></h2>';
            outhtml = outhtml + '<div><div><a href="'+profileUrl+'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+username+'"></a></div>';
            outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div></div>';
            
            $('#searchBar').fadeOut(1000);
            $('body').html(outhtml);
        })

        //if request fails, output error message
        .fail(function(){
            console.log("data not found");
            location.href = "error.html";
        });
    });
});

$( document ).ready(function() {
    console.log( "document loaded" );
});

$( window ).on( "load", function() {
    console.log( "window loaded" );
});

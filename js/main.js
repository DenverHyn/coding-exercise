$(function(){
    //when the submit button is clicked
    $("#btn_submit").on("click", function(){
        var username = $("#searchInput").val();
        var user_uri   = "https://api.github.com/users/"+username;

        if(username == "") {
            alert("You have not entered a username!");
        }
        else{
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
                //construct html of search result
                var outhtml = '<div class="result"><h2>'+ fullname +' <span>(@<a href="'+ profileUrl +'" target="_blank">'+username+'</a>) </span></h2>';
                outhtml = outhtml + '<div><div id="username"><a href="'+ profileUrl +'" target="_blank"><img src="'+avatarUrl+'" width="80" height="80" alt="'+username+'"></a></div>';
                outhtml = outhtml + '<table><tr><th>Followers:</th><td>'+ followersnum +'</td></tr>';
                outhtml = outhtml + '<tr><th>Following:</th><td>'+ followingnum +'</td></tr>';
                outhtml = outhtml + '<tr><th>Repos:</th><td>'+ reposnum +'</td></tr></table></div></div>';
                
                //hide the search bar and show the search result
                $('#searchBar').fadeOut(1000);
                $('.resultContainer').html(outhtml);
            })

            //if request fails, output error message
            .fail(function(){
                console.log("data not found");
                location.href = "error.html";
            });
        }
    });
});

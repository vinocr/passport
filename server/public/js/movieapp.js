//search the movies and displays the list
function getMovies() {
  //ajax call used
  $.ajax({
    url: '/movie/search' + document.getElementById('name').value,
    type: 'GET',
    success: function(obj) {
      var total = obj.total_results;
      if (total > 10) {
        total = 20;
      }
      if (total != 0 && obj != 'error occured') {
        var filmHTML = '';
        var filmHTML = "<tr id='tt'><td>Title</td><td>Poster</td><td>Release_Date</td><td>AddMovie</td></tr>";
        for (var i = 0; i < total; i++) {
          var posterpath = 'http://image.tmdb.org/t/p/w185/' + obj.results[i].poster_path;
          var movobj = {
            title: obj.results[i].title,
            poster: posterpath,
            release_date: obj.results[i].release_date
          };
          var obj1 = JSON.stringify(movobj);
          filmHTML += "<tr id='trr'><td>" + obj.results[i].title + "</td>";
          filmHTML += "<td><img id='image' src=' " + posterpath + "'></td>";
          filmHTML += '<td>' + obj.results[i].release_date + '</td>';
          filmHTML += "<td><button onclick='addfavourite(event)' value='" + obj1 + "'>Add to Favourite</button></td></tr>";

        }
        //displays as table
        $("#listmovies tbody").html(filmHTML);
      } else {
        alert("Movie does not Exists!!!");
        window.location.reload(true);
      }
    },
    error: function(err) {
      console.log(err);
    }

  });
}

//adds the movies to fav list once the add button is clicked
function addfavourite(event) {
  //ajax call used
  $.ajax({
    url: '/movie/add',
    type: 'POST',
    data: (JSON.parse(event.target.value)),
    error: function(err) {
      alert("Error");
    },
    success: function(data) {
      if (data.code == 11000) {
        alert("Movie Already Added!!!!");
      } else {
        alert("Added to Favourite List!!");
      }
    }
  });
}

//displays all the movie in the fav list
function displayfav() {
  //ajax call used
  $.ajax({
    url: '/movie/view',
    type: 'GET',
    success: function(data) {
      var disHTML = '';
      var disHTML = "<tr id='tt'><td>Title</td><td>Poster</td><td>Release_Date</td><td>DeleteMovie</td></tr>";
      for (let i in data) {
        //var delobj = {title:data[i].Title,poster:data[i].Poster, release_date:data[i].Release_Date};
        var del = data[i].Title;
        disHTML += "<tr id='trr'>";
        disHTML += '<td>' + data[i].Title + '</td>';
        disHTML += '<td>' + "<img id='image' src='" + data[i].Poster + "'></td>";
        disHTML += '<td>' + data[i].Release_Date + '</td>';
        disHTML += "<td><button onclick='delfav(event)' value='" + del + "'>delete</button></td>";
        disHTML += '</tr>';
      }
      //displays as table
      $("#listmovies tbody").html(disHTML);

    },
    error: function(err) {
      exit
      console.log(err);
    }
  });
}

//deletes a particular movie from fav list based on movie name
function delfav(event) {
  //ajax call used
  $.ajax({
    url: '/movie/delete',
    type: 'GET',
    data: {
      Title: event.target.value
    },
    success: function(data) {
      alert("You have deleted a Movie from favourite");
    }
  });
}

function logout() {
  $.ajax({
    url: '/movie/logout',
    type: 'GET',
    success: function(data) {
      window.location.replace('../index.html');
    }
  });
}

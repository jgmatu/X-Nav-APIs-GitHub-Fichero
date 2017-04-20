$(function(){
      var github = null;
      var repo = null;

      function getToken() {
            var token = $("#token").val();

            github = new Github({
                  token: token,
                  auth: "oauth"
            });
            formRepoName();
      }

      function getRepo() {
            var user = $("#user").val();
            var repoName = $("#repo").val();

            repo = github.getRepo(user, repoName);
            repo.show(showRepo);
      }

      function showRepo(error, repo) {
            var data =  "<ul>" +
                              "<li>" + "Name :" + repo.name + "</li>" +
                              "<li>" + "Description : " + repo.description + "</li>" +
                              "<li>" + "Update At : " + repo.updated_at + "</li>" +
                        "</ul>";

            $("#repodata").html(data);
            $("#writeFile").show();
      }

      function formRepoName() {
            $("#formRepo").html('User : <input id="user" type="box" value=""></input>' +
                        'Repo : <input id="repo" type="box" value=""></input>');

            $("#getRep").html('<input id="butGet" type="button" value="Get Repo"> </input>');
            $("#butGet").click(getRepo);
      }

      function writeFile () {
            var path = $("#fileName").val();
            var content = $("#fileText").val();
            var message = "Bot message...";

            repo.write("master", path, content, message, promiseWriteCb);
      }

      function promiseWriteCb() {
            console.log("RECEIVED PROMISE!");
      }

      $("#gettok").click(getToken);
      $("#writeFile").hide();
      $("#sendwrite").click(writeFile);
});

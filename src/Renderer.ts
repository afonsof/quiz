class Renderer {
    public constructor(players: Player[]){
        this.players = players;
    }

    private players;

    public render(quizStatus, question, result, questionId, answerQuestionTimeout) {
        var $answerSection = $('#answer');

        switch (quizStatus) {
            case QuizStatusEnum.PRESS_START:
                Renderer.renderPressStart();
                break;
            case QuizStatusEnum.SELECT_PLAYER:
                Renderer.renderSelectPlayer(this.players);
                break;
            case QuizStatusEnum.QUESTION:
                Renderer.renderQuestion($answerSection, this.players, question, questionId);
                break;
            case QuizStatusEnum.ANSWER:
                Renderer.renderAnswer($answerSection, this.players, result, answerQuestionTimeout);
                break;
            case QuizStatusEnum.RESULT:
                Renderer.renderResult($answerSection, this.players);
        }
    }

    private static renderPressStart() {
        $("#result").hide();
        $("#pressStart").fadeIn("slow");
    }

    private static renderSelectPlayer(players) {
        $("#pressStart").fadeOut();
        $("#selectPlayer").fadeIn("slow");
        if (players[0].image) {
            $('#thumb0').show();
        }
        if (players[1].image) {
            $('#thumb1').show();
        }
    }

    private static renderQuestion($answerSection, players, question, questionId) {
        $("#selectPlayer").fadeOut(3000);
        $answerSection.hide();
        Renderer.renderScore(players);
        Renderer.printQuestion(question, questionId);
        $("#question").fadeIn(3000);
    }

    private static renderAnswer($answerSection, players, result, answerQuestionTimeout) {
        //todo: Resolver: quizStatus = QuizStatusEnum.ANIMATING;
        $answerSection.html("<h1>Player " + players[result.player].name + " " + (result.match ? "acertou" : "errou") + "!</h1>");
        $answerSection.slideDown("slow", function () {
            setTimeout(answerQuestionTimeout, 3000);
        });
    }

    private static renderResult($answerSection, players) {
        $("#question").hide();
        $answerSection.hide();
        var $result = $("#result");
        $result.html("<h1>Resultado final</h1><table><tr><th bgcolor=\"blue\">Jogador " + players[0].name + "</th>" +
        "<th bgcolor=\"yellow\">Jogador" + players[1].name + "</th></tr><tr><td>" + players[0].score +
        " pontos</td><td>" + players[1].score + " pontos</td></tr></table>");

        $result.fadeIn("slow");
    }

    private static renderScore(players:Player[]) {
        var $pb = $("#playerBlue");
        $pb.find("img").attr("src", players[0].image);
        $pb.find("span").html(players[0].score.toString());

        var $py = $("#playerYellow");
        $py.find("img").attr("src", players[1].image);
        $py.find("span").html(players[1].score.toString());
    }

    private static printQuestion(question, questionId) {
        $("#questions").html("<h1>Pergunta numero " + questionId + "</h1>");
        question.images.forEach(function (image) {
            $("#questions").append("<img class=\"option\" src=\"" + image + "\">");
        });
    }
}


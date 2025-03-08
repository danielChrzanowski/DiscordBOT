module.exports = {
    description: 'Stores global reactions',

    execute(variable) {
        const cuteReactions = [
            '<:pupperBless:781254877682729001>',
            '<:disaSmile:812821278984765490>',
            '<:catJuice:790433770092101672>',
            '<:otterP:797264682413981747>'
        ];

        const nekoReactions = [
            '<:peepoWOOpantsu:474699651661168661>',
            '<:catJuice:790433770092101672>',
            '<:catGold:886107774847705118>',
            '<:pupperSmirk:776134507090149376>'
        ];

        const nekoParameters = [
            'safe', 'suggestive', 'borderline', 'explicit'
        ];

        switch (variable) {
            case "cuteReactions":
                return cuteReactions;

            case "nekoReactions":
                return nekoReactions;

            case "nekoParameters":
                return nekoParameters;
        }
    }
}
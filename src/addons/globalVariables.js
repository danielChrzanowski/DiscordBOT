module.exports = {
    description: 'Stores global reactions',

    async execute(variable) {
        const cuteReactions = [
            '<:pupperBless:781254877682729001>',
            '<:disaSmile:812821278984765490>',
            '<:bnsPlease:468750180779294751>',
            '<:catJuice:790433770092101672>'
        ];

        const nekoReactions = [
            '<:shinoSmirk:474697613027966998>',
            '<:z18:470737705937141772>',
            '<:peepoWOOpantsu:474699651661168661>',
            '<:eosGasm:474698689772912640>',
            '<:catJuice:790433770092101672>'
        ];

        switch (variable) {
            case "cuteReactions":
                return cuteReactions;
            case "nekoReactions":
                return nekoReactions;
            case "currentDate": {
                date_ob = new Date();
                let hours = ((date_ob.getHours() + 2) < 10 ? '0' : '') + (date_ob.getHours() + 2);
                let minutes = (date_ob.getMinutes() < 10 ? '0' : '') + date_ob.getMinutes();
                let day = (date_ob.getDate() < 10 ? '0' : '') + date_ob.getDate();
                let month = ((date_ob.getMonth() + 1) < 10 ? '0' : '') + (date_ob.getMonth() + 1);
                let year = date_ob.getFullYear();

                if (hours == 24) hours == 0;

                return currentTime = hours + ":" + minutes + " | " + day + "-" + month + "-" + year;
            }
        }
    }
}
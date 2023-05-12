module.exports = {
    description: 'Stores global reactions',

    execute(variable) {
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

            case "currentDate":
                date_ob = new Date();
                date_ob.setHours(date_ob.getHours() + 2);

                date_ob = checkSummerTime(date_ob);
                var hours;

                if (date_ob.getHours() === 24) {
                    hours = '00';
                } else {
                    hours = ((date_ob.getHours()) < 10 ? '0' : '') + (date_ob.getHours());
                }

                var minutes = (date_ob.getMinutes() < 10 ? '0' : '') + date_ob.getMinutes();
                var day = (date_ob.getDate() < 10 ? '0' : '') + date_ob.getDate();
                var month = ((date_ob.getMonth() + 1) < 10 ? '0' : '') + (date_ob.getMonth() + 1);
                var year = date_ob.getFullYear();

                return currentTime = hours + ":" + minutes + " | " + day + "-" + month + "-" + year;

            case "fullHour":
                date_ob = new Date();
                var minutes = date_ob.getMinutes();

                return (minutes == 0);
        }

        function checkSummerTime(date_ob) {
            const january = new Date(date_ob.getFullYear(), 0, 1).getTimezoneOffset();
            const july = new Date(date_ob.getFullYear(), 6, 1).getTimezoneOffset();

            if (Math.max(january, july) !== date_ob.getTimezoneOffset()) date_ob.setHours(date_ob.getHours() + 1);
            return date_ob;
        }
    }
}
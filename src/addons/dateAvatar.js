module.exports = {
    name: 'dateAvatar',
    description: 'Apply date and avatar',

    async execute(client) {
        var avatarNumber = 0;
        applyDate();

        async function applyDate() {
            await searchForMinuteStart();
            showDate();

            setInterval(() => {
                showDate();
            }, 60000);
        }

        function searchForMinuteStart() {
            return new Promise((resolve) => {
                setTime = setInterval(() => {
                    date_ob = new Date();
                    let seconds = date_ob.getSeconds();

                    if (seconds == 0) {
                        clearInterval(setTime);
                        resolve();
                    };
                }, 1000);
            });
        }

        function showDate() {
            date_ob = new Date();
            let hours = ((date_ob.getHours() + 2) < 10 ? '0' : '') + (date_ob.getHours() + 2);
            let minutes = (date_ob.getMinutes() < 10 ? '0' : '') + date_ob.getMinutes();
            let day = (date_ob.getDate() < 10 ? '0' : '') + date_ob.getDate();
            let month = ((date_ob.getMonth() + 1) < 10 ? '0' : '') + (date_ob.getMonth() + 1);
            let year = date_ob.getFullYear();

            var currentTime = hours + ":" + minutes + " | " + day + "-" + month + "-" + year;
            client.user.setActivity(currentTime, { type: 'WATCHING' });

            if (hours == 12 && minutes == 0) changeAvatar();
        }

        function changeAvatar() {
            try {
                switch (avatarNumber) {
                    case 0:
                        client.user.setUsername("Dzieci Neo");
                        client.user.setAvatar("./src/assets/destiny2.png");
                        break;

                    case 1:
                        client.user.setUsername("Foxik <3");
                        client.user.setAvatar("./src/assets/fox.jpg");
                        break;

                    case 2:
                        client.user.setUsername("Kulka Pog");
                        client.user.setAvatar("./src/assets/destiny2_2.png");
                        break;

                    case 3:
                        client.user.setUsername("Akali OP");
                        client.user.setAvatar("./src/assets/akali.jpg");
                        break;
                }

                if (avatarNumber < 3) { avatarNumber++; } else { avatarNumber = 0; };
            } catch (error) { console.log(error) };
        }
    }
}
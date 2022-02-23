var admin = require("firebase-admin");

module.exports = {
    name: 'firebase',
    description: 'Firebase handler',

    async execute(variable, id) {
        const db = admin.firestore();

        switch (variable) {
            case "getDogeCounter":
                return getDogeCounter();

            case "setDogeCounter":
                let dogeCounter = Number(await getDogeCounter()) + 1;

                const docRef = db.collection('doges').doc(id);
                await docRef.set({
                    dogeCounter: dogeCounter
                });

                return;
        }

        async function getDogeCounter() {
            let dogeCounter = await db.collection('doges').doc(id).get();

            if (dogeCounter._fieldsProto != null) {
                return dogeCounter._fieldsProto.dogeCounter.integerValue;
            } else {
                return 0;
            }
        }
    }
}
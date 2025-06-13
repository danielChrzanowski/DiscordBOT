import admin from "firebase-admin";

export default {
    name: 'firebase',
    description: 'Firebase handler',

    async execute(variable: string, id: string, username: string) {
        const db = admin.firestore();

        switch (variable) {
            case "getDogeCounter":
                return getDogeCounter();
            case "setDogeCounter":
                let dogeCounter = Number(await getDogeCounter()) + 1;
                const docRef = db.collection('doges').doc(id);
                await docRef.set({
                    username: username,
                    dogeCounter: dogeCounter
                });
                return;
        }

        async function getDogeCounter(): Promise<number> {
            let dogeCounterDoc = await db.collection('doges').doc(id).get();
            const data = dogeCounterDoc.data();
            if (data && typeof data.dogeCounter === 'number') {
                return data.dogeCounter;
            } else {
                return 0;
            }
        }
    }
};

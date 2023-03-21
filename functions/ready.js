module.exports = async (client) => {
    client.on("ready", async () => {
        setInterval(() => {
            const statusNumber = Math.floor(Math.random() * 4) + 1;
            if (statusNumber == 1) {
                client.user.setPresence({
                    activities: [
                        {
                            name: `Asda Simulator`,
                            type: "PLAYING"
                        }
                    ]
                })
            }else if (statusNumber == 2) {
                client.user.setPresence({
                    activities: [
                        {
                            name: `Asda Theme Song`,
                            type: "LISTENING"
                        }
                    ]
                })
            }else if (statusNumber == 3) {
                client.user.setPresence({
                    activities: [
                        {
                            name: `Asda Employee`,
                            type: "PLAYING"
                        }
                    ]
                })
            }else if (statusNumber == 4) {
                client.user.setPresence({
                    activities: [
                        {
                            name: `Asda 3D`,
                            type: "PLAYING"
                        }
                    ]
                })
            }
        }, 15000);
    });
}

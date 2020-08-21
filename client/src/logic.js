import axios from 'axios'

class Logic {
    constructor() {

        this.app_screen = null

        setInterval(() => {
            this.getTemperature()
        }, 2000)

        this.getTemperature = async () => {
            try {
                const response = await axios({
                    url: "http://localhost:9090",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (response.status == 200) {
                    if (logic.app_screen) {
                        logic.app_screen.refreshTemps(response.data.currentTemp, response.data.currentSetpoint, response.data.timestamp)
                    }
                } else {
                    this.getTemperature()
                }
            } catch (e) {
                console.log(e)
            }
        }


        this.setTemperature = async (temperature) => {
            try {
                await axios({
                    url: "http://localhost:9090",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        currentSetpoint: temperature
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}

let logic = new Logic();
export default logic;
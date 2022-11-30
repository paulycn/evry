const apiKey = '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'

const app = Vue.createApp({
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            awesome: false,
            step: 1,
            premise: "",
            area: [],

            areaOptions:[
                {label: "1 Room", img: "/img/one_room.svg"},
                {label: "2 Rooms", img: "/img/two_room.svg"},
                {label: "3+ Rooms", img: "/img/three_room.svg"},
                {label: "Hallway", img: "/img/hallway.svg"},
                {label: "Bathroom", img: "/img/bathroom.svg"}
            ],

            serviceOptions:[
                
            ]
        }
    },
    computed: {
        attributes () {
            return {
                LASTNAME: this.lastName, 
                FIRSTNAME: this.firstName, 
                SMS: this.phoneNumber
            }
        }
    },
    methods:{
        send() {
            console.log(this.attributes)
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  'api-key': apiKey
                },
                body: JSON.stringify({
                  attributes: this.attributes,
                  updateEnabled: false,
                  email: this.email,
                  emailBlacklisted: true
                })
              }
              
              fetch('https://api.sendinblue.com/v3/contacts', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.closeForm()
                })
                .catch(err => console.error(err))
        },
        showForm(){
            this.awesome = true
            this.step = 1
        },
        closeForm(){
            this.awesome = false
        },
        back(){
           this.step -= 1
        },
        next(){
            this.step += 1
        },
        setPremise(data){
            this.premise = data
            this.next()
        },
        setArea(data){
            if(this.area.includes(data)){
                this.area.splice(this.area.indexOf(data),1)
            } else {
                this.area.push(data)
            }
            console.log(this.area)
        },
    }
})

app.mount('#app')
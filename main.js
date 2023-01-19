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
            service:[],
            showMobileMenu: false,

            areaOptions:[
                {label: "1 Room", img: "img/one_room.svg"},
                {label: "2 Rooms", img: "img/two_room.svg"},
                {label: "3+ Rooms", img: "img/three_room.svg"},
                {label: "Hallway", img: "img/hallway.svg"},
                {label: "Bathroom", img: "img/bathroom.svg"}
            ],

            serviceOptions:[
                {label: "Tiling", img:"img/tiling.svg"},
                {label: "Flooring", img:"img/flooring.svg"},
                {label: "Insulation", img:"img/insulation.svg"},
                {label: "Painting and Decoration", img:"img/painting.svg"},
                {label: "End of tenancy refurbishment", img:"img/house.svg"}
            ],
        }
    },
    computed: {
        attributes () {
            return {
                FIRSTNAME: this.firstName, 
                SMS: this.phoneNumber,
                ADDRESS: this.address,
                SERVICE: this.service,
                AREA: this.area,
                PREMISE: this.premise
                
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
                    this.next()
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
        setService(data){
            if(this.service.includes(data)){
                this.service.splice(this.service.indexOf(data),1)
            } else {
                this.service.push(data)
            }
            console.log(this.service)
        }
    }
})

app.mount('#app')
function optionGo() {
    console.log("aaa")
    let vm = new Vue({
        el: '#op',
        data: {
            config: {
                big_icon: true,
                easy_at: true,
                most_app: false,
                most_app_num: 1
            }
        },
        mounted: function () {
            if (localStorage.config != null) {
                this.config = JSON.parse(localStorage.config)
                if (this.config.big_icon) {
                    $('#bc1 .button').toggleClass('inactive')
                    $('#bc1 .content').toggleClass('inactive')
                }
                if (this.config.easy_at) {
                    $('#bc2 .button').toggleClass('inactive')
                    $('#bc2 .content').toggleClass('inactive')
                }
                if (this.config.most_app) {
                    $('#bc3 .button').toggleClass('inactive')
                    $('#bc3 .content').toggleClass('inactive')
                    $('#tc31').toggleClass('inactive')
                    $('#tc32').toggleClass('inactive')
                }
            }
        },
        methods: {
            saveconfig: function () {
                localStorage.config = JSON.stringify(this.config)
            },
            bt1: function (event) {
                $('#bc1 .button').toggleClass('inactive')
                $('#bc1 .content').toggleClass('inactive')
                this.config.big_icon = !$('#big_icon_sw').hasClass('inactive')
                this.saveconfig()
            },
            bt2: function (event) {
                $('#bc2 .button').toggleClass('inactive')
                $('#bc2 .content').toggleClass('inactive')
                this.config.easy_at = !$('#easy_at_sw').hasClass('inactive')
                this.saveconfig()
            },
            bt3: function (event) {
                $('#bc3 .button').toggleClass('inactive')
                $('#bc3 .content').toggleClass('inactive')
                $('#tc31').toggleClass('inactive')
                $('#tc32').toggleClass('inactive')
                this.config.most_app = !$('#most_app_sw').hasClass('inactive')
                this.saveconfig()
            },
            tx1: function (event) {
                this.saveconfig()
            }
        }
    })
}

window.onload = optionGo
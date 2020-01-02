function optionGo() {
    let vm = new Vue({
        el: '#op',
        data: {
            config: {
                big_icon: true,
                easy_at: true,
                easy_at_cus_text: "@",
                most_app: true,
                most_app_num: 5,
                cus_por: true,
                utter_history: true
            },
            bigUserIconTitle: chrome.i18n.getMessage("optionBigUserIconName"),
            easyAtTitle: chrome.i18n.getMessage("optionEasyAtName"),
            mostUsedAppTitle: chrome.i18n.getMessage("optionMostUsedAppName"),
            maxMostUsedAppNumberTitle: chrome.i18n.getMessage("optionMostUsedAppMaxName"),
            enableName: chrome.i18n.getMessage("enableName"),
            disableName: chrome.i18n.getMessage("disableName"),
            customPortalTitle: chrome.i18n.getMessage("optionCustomPortalName"),
            easyAtCusTextTitle: chrome.i18n.getMessage("optionEasyAtCusTextTitleName"),
            utterHistoryTitle: chrome.i18n.getMessage("optionUtterHistoryTitleName")
        },
        mounted: function () {
            if (localStorage.config) {
                this.config = JSON.parse(localStorage.config)
            } else {}
            if (!this.config.most_app_num) {
                this.config.most_app_num = 5
            }
            if (!this.config.easy_at_cus_text) {
                this.config.easy_at_cus_text = "@"
            }
            if (this.config.big_icon !== false) {
                this.config.big_icon = true
                $('#bc1 .button').toggleClass('inactive')
                $('#bc1 .content').toggleClass('inactive')
            }
            if (this.config.easy_at !== false) {
                this.config.easy_at = true
                $('#bc2 .button').toggleClass('inactive')
                $('#bc2 .content').toggleClass('inactive')
                $('#easy_at_cus_text_title').toggleClass('inactive')
                $('#easy_at_cus_text_value').toggleClass('inactive')
            }
            if (this.config.most_app !== false) {
                this.config.most_app = true
                $('#bc3 .button').toggleClass('inactive')
                $('#bc3 .content').toggleClass('inactive')
                $('#tc31').toggleClass('inactive')
                $('#tc32').toggleClass('inactive')
            }
            if (this.config.cus_por !== false) {
                this.config.cus_por = true
                $('#bc4 .button').toggleClass('inactive')
                $('#bc4 .content').toggleClass('inactive')
            }
            if (this.config.utter_history !== false) {
                this.config.utter_history = true
                $('#bc5 .button').toggleClass('inactive')
                $('#bc5 .content').toggleClass('inactive')
            }
            this.saveconfig()

            // if (localStorage.config != null) {
            //     this.config = JSON.parse(localStorage.config)
            //     if (!this.config.most_app_num) {
            //         this.config.most_app_num = 5
            //         console.log(2)
            //     }
            //     if (!this.config.easy_at_cus_text) {
            //         this.config.easy_at_cus_text = "@"
            //         console.log(3)
            //     }
            //     if (this.config.big_icon) {
            //         $('#bc1 .button').toggleClass('inactive')
            //         $('#bc1 .content').toggleClass('inactive')
            //         console.log(4)
            //     }
            //     if (this.config.easy_at) {
            //         $('#bc2 .button').toggleClass('inactive')
            //         $('#bc2 .content').toggleClass('inactive')
            //         $('#easy_at_cus_text_title').toggleClass('inactive')
            //         $('#easy_at_cus_text_value').toggleClass('inactive')
            //         console.log(5)
            //     }
            //     if (this.config.most_app) {
            //         $('#bc3 .button').toggleClass('inactive')
            //         $('#bc3 .content').toggleClass('inactive')
            //         $('#tc31').toggleClass('inactive')
            //         $('#tc32').toggleClass('inactive')
            //         console.log(6)
            //     }
            //     if (this.config.cus_por) {
            //         $('#bc4 .button').toggleClass('inactive')
            //         $('#bc4 .content').toggleClass('inactive')
            //         console.log(1)
            //     }
            //     if (this.config.utter_history) {
            //         $('#bc5 .button').toggleClass('inactive')
            //         $('#bc5 .content').toggleClass('inactive')
            //         console.log(1)
            //     }
            // } else {
            //     $('#bc1 .button').toggleClass('inactive')
            //     $('#bc1 .content').toggleClass('inactive')
            //     $('#bc2 .button').toggleClass('inactive')
            //     $('#bc2 .content').toggleClass('inactive')
            //     $('#easy_at_cus_text_title').toggleClass('inactive')
            //     $('#easy_at_cus_text_value').toggleClass('inactive')
            //     $('#bc3 .button').toggleClass('inactive')
            //     $('#bc3 .content').toggleClass('inactive')
            //     $('#tc31').toggleClass('inactive')
            //     $('#tc32').toggleClass('inactive')
            //     // $('#bc4 .content').toggleClass('inactive')
            //     // $('#bc5 .content').toggleClass('inactive')
            // }
        },
        methods: {
            saveconfig: function () {
                // localStorage.config = JSON.stringify(this.config)
                chrome.storage.sync.set({
                    'config': JSON.stringify(this.config)
                })
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
                $('#easy_at_cus_text_title').toggleClass('inactive')
                $('#easy_at_cus_text_value').toggleClass('inactive')
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
            bt4: function (event) {
                $('#bc4 .button').toggleClass('inactive')
                $('#bc4 .content').toggleClass('inactive')
                this.config.cus_por = !$('#cus_portal_sw').hasClass('inactive')
                this.saveconfig()
            },
            bt5: function (event) {
                $('#bc5 .button').toggleClass('inactive')
                $('#bc5 .content').toggleClass('inactive')
                this.config.utter_history = !$('#utter_history_sw').hasClass('inactive')
                this.saveconfig()
            },
            tx1: function (event) {
                this.saveconfig()
            },
            saveEasyAtCusText: function (event) {
                if (this.config.easy_at_cus_text == "") {
                    this.config.easy_at_cus_text = "@"
                }
                this.saveconfig()
            }
        }
    })
}

window.onload = optionGo
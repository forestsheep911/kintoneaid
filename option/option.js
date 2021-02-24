function optionGo() {
  let vm = new Vue({
    el: "#op",
    data: {
      config: {
        big_icon: true,
        easy_at: true,
        easy_at_cus_text: "@",
        most_app: true,
        most_app_num: 5,
        cus_por: true,
        utter_history: true,
      },
      bigUserIconTitle: chrome.i18n.getMessage("optionBigUserIconName"),
      easyAtTitle: chrome.i18n.getMessage("optionEasyAtName"),
      mostUsedAppTitle: chrome.i18n.getMessage("optionMostUsedAppName"),
      maxMostUsedAppNumberTitle: chrome.i18n.getMessage(
        "optionMostUsedAppMaxName"
      ),
      enableName: chrome.i18n.getMessage("enableName"),
      disableName: chrome.i18n.getMessage("disableName"),
      customPortalTitle: chrome.i18n.getMessage("optionCustomPortalName"),
      easyAtCusTextTitle: chrome.i18n.getMessage(
        "optionEasyAtCusTextTitleName"
      ),
      utterHistoryTitle: chrome.i18n.getMessage("optionUtterHistoryTitleName"),
    },
    mounted: function () {
      localStorage.removeItem("config")
      let _this = this;
      chrome.storage.sync.get(["config"], function (result) {
        _this.config = JSON.parse(result.config);

        if (!_this.config.most_app_num) {
          _this.config.most_app_num = 100;
        }
        if (!_this.config.easy_at_cus_text) {
          _this.config.easy_at_cus_text = "@";
        }
        if (_this.config.big_icon !== undefined) {
          _this.config.big_icon = true;
          $("#bc1 .button").toggleClass("inactive");
          $("#bc1 .content").toggleClass("inactive");
        }
        if (_this.config.easy_at !== undefined) {
          _this.config.easy_at = true;
          $("#bc2 .button").toggleClass("inactive");
          $("#bc2 .content").toggleClass("inactive");
          $("#easy_at_cus_text_title").toggleClass("inactive");
          $("#easy_at_cus_text_value").toggleClass("inactive");
        }
        if (_this.config.most_app !== undefined) {
          _this.config.most_app = true;
          $("#bc3 .button").toggleClass("inactive");
          $("#bc3 .content").toggleClass("inactive");
          $("#tc31").toggleClass("inactive");
          $("#tc32").toggleClass("inactive");
        }
        if (_this.config.cus_por !== undefined) {
          _this.config.cus_por = true;
          $("#bc4 .button").toggleClass("inactive");
          $("#bc4 .content").toggleClass("inactive");
        }
        if (_this.config.utter_history !== undefined) {
          _this.config.utter_history = true;
          $("#bc5 .button").toggleClass("inactive");
          $("#bc5 .content").toggleClass("inactive");
        }
        _this.saveconfig();
      });
    },
    methods: {
      saveconfig: function () {
        chrome.storage.sync.set({
          config: JSON.stringify(this.config),
        });
      },
      bt1: function (event) {
        $("#bc1 .button").toggleClass("inactive");
        $("#bc1 .content").toggleClass("inactive");
        this.config.big_icon = !$("#big_icon_sw").hasClass("inactive");
        this.saveconfig();
      },
      bt2: function (event) {
        $("#bc2 .button").toggleClass("inactive");
        $("#bc2 .content").toggleClass("inactive");
        $("#easy_at_cus_text_title").toggleClass("inactive");
        $("#easy_at_cus_text_value").toggleClass("inactive");
        this.config.easy_at = !$("#easy_at_sw").hasClass("inactive");
        this.saveconfig();
      },
      bt3: function (event) {
        $("#bc3 .button").toggleClass("inactive");
        $("#bc3 .content").toggleClass("inactive");
        $("#tc31").toggleClass("inactive");
        $("#tc32").toggleClass("inactive");
        this.config.most_app = !$("#most_app_sw").hasClass("inactive");
        this.saveconfig();
      },
      bt4: function (event) {
        $("#bc4 .button").toggleClass("inactive");
        $("#bc4 .content").toggleClass("inactive");
        this.config.cus_por = !$("#cus_portal_sw").hasClass("inactive");
        this.saveconfig();
      },
      bt5: function (event) {
        $("#bc5 .button").toggleClass("inactive");
        $("#bc5 .content").toggleClass("inactive");
        this.config.utter_history = !$("#utter_history_sw").hasClass(
          "inactive"
        );
        this.saveconfig();
      },
      tx1: function (event) {
        this.saveconfig();
      },
      saveEasyAtCusText: function (event) {
        if (this.config.easy_at_cus_text == "") {
          this.config.easy_at_cus_text = "@";
        }
        this.saveconfig();
      },
    },
  });
}

window.onload = optionGo;

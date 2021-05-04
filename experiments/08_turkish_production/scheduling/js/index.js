function make_slides(f) {
  var   slides = {};

  slides.bot = slide({
    name: "bot",
    start: function () {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();

      exp.answer = "mumu";
      exp.answer2 = "mum";
      exp.lives = 0;

      var question = "Yalancının neyi yatsıya kadar yanar?";
      document.getElementById("q").innerHTML = question;
    },
    button: function () {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.text_input.toLowerCase();

      if ((exp.lives < 3) && ((lower == exp.answer) | (lower== exp.answer2))) {
        exp.data_trials.push({
          "trial_type": "bot_check",
          "response": exp.text_input
        });
        exp.go();
      }
      else {
        console.log("exp.answer",exp.answer)
        console.log("lower",lower)
        exp.data_trials.push({
          "trial_type": "bot_check",
          "response": exp.text_input
        });
        if (exp.lives == 0) {
          $('.err1').show();
        } if (exp.lives == 1) {
          $('.err1').hide();
          $('.err2').show();
        } if (exp.lives == 2) {
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      }
    },
  });
  
  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.date = slide({
    name: "date",
    start: function() {
      $(".err").hide();
    },
    button : function() {
      exp.date =  $('input[name="date"]:checked').val();
      console.log("date", exp.date)
      if (exp.date != null) {
        exp.data_trials.push({
          "trial_type" : "age",
          "response" : exp.date
        });
        exp.go();
      } else 
      $(".err").show();
    }
  });

  slides.email = slide({
    name: "email",
    start: function() {
      $(".err").hide();
    },
    button : function() {
      email= $("#email").val();
        exp.data_trials.push({
          "trial_type" : "email",
          "response" : email
        });
        exp.go(); //make sure this is at the *end*, after you log your data
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      var day = "";
      var time = "";
      if (exp.date == "may17") {
        day = "17 Mayıs Pazartesi";
        time = "11am-12pm ET (8am-9am PT)";
      } else if (exp.date == "may18") {
        day = "18 Mayıs Salı";
        time = "12pm-1pm ET (9am-10am PT)";
      } else if (exp.date == "may19") {
        day = "19 Mayıs Çarşamba";
        time = "1pm-2pm ET (10am-11pm PT)";
      } 
      var msg = "<br><br>Başarıyla seçim yaptınız. <b>" + day + " günü saat " + time + " arasında</b> size göndereceğimiz link üzerinden deneyimize katılabilirsiniz!<br><br>Mechanical Turk Worker IDnizi lütfen kaydedin, deneyde sizden bu bilgiyi isteyeceğiz.<br><br>Zaman ayırdığınız için teşekkürler." 

      if (exp.date != "none") {
        document.getElementById("message").innerHTML = msg;
      } else {
        document.getElementById("message").innerHTML = "Zaman ayırdığınız için teşekkürler.";
      }
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}


// global variables
var age;
var language;

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample(["condition 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["bot", "i0", "date", "email", 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}

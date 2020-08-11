//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function make_slides(f) {
  var slides = {};

  slides.bot = slide({
    name : "bot",
    start: function() {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      //exp.speaker = _.shuffle(["Ali", "Mehmet", "Onur", "Berke", "Efe", "Cem", "Can", "Burak", "Mustafa", "Mert"])[0];
      //exp.listener = _.shuffle(["Selin", "Zeynep", "Deniz", "Melis", "Yasemin", "Belgin", "Ceren"])[0];
      
      exp.lives = 0;
      exp.listener = "beyaz";
      // var story = exp.speaker + ', ' + exp.listener + "'e " + '"Bugün hava çok güzel, değil mi?" diyor.'
      var question = "Ayran ne renktir?";
      //document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button : function() {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener)|(exp.text_input == lower) | (exp.text_input== upper))){
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "trial_type": "bot_check",
          "label": "",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "trial_type": "bot_check",
          "label": "",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        if (exp.lives == 0){
          $('.err1').show();
        }if (exp.lives == 1){
          $('.err1').hide();
          $('.err2').show();
        }if (exp.lives == 2){
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

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); 
    }
  });

  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.stims,
    start : function() {
	   $(".err").hide();
    },
      present_handle : function(stim) {
    	this.trial_start = Date.now();
      $(".err").hide();
      $("#answer").val("");
      $(".err").hide();

	    this.stim = stim;
      
      if (stim.trial_type == "adjective_ordering") {
        var list =  _.shuffle([1,2,3,4]);
        x = list.pop(); // 1,2,3,4,
        stim.label = stim[`img${x}`];
      }

	    var contextsentence = "Bu nesne nedir?<br><small><b>(Lütfen Türkçe cevap verin)</b></small>" ;
	    var objimagehtml = '<img src="images/'+stim.label+'.png" style="height:230px;">';

	    $("#contextsentence").html(contextsentence);
	    $("#objectimage").html(objimagehtml);

    document.onkeypress = checkKey;
    function checkKey(e) {
      e = e || window.event;
      if (e.keyCode == 13) {
         _s.button();
      }
    }
	},

	button : function() {
	  if ($("#answer").val().length > 2) {
        $(".err").hide();
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      //}
      } else {
        $(".err").show();
        document.getElementById('answer').value = '';
      }
    },

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "trial_type": this.stim.trial_type,
          "label": this.stim.label,
          "object": this.stim.object,
          "rt" : Date.now() - _s.trial_start,
          "response" : $("#answer").val()
        });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
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

/// init ///
function init() {
  exp.stims = _.shuffle(exp.items);

  console.log("length: "+ exp.stims.length);

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["bot","i0", "objecttrial", 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

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

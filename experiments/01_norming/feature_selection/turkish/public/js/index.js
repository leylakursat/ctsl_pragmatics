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

      exp.listener = "beyaz";
      exp.lives = 0;

      //var story = exp.speaker + ', ' + exp.listener + "'e " + '"Bugün hava çok güzel, değil mi?" diyor.'
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
      $(".err").hide();

	    this.stim = stim;
	    console.log(this.stim);
      var contextsentence = "Her resim için onu tanımlayan sıfatları isaretleyiniz.";
      $("#contextsentence").html(contextsentence);

      $(".loc1").html('<img src="images/'+stim.img1+'.png" style="height:200px;">');
      $(".loc2").html('<img src="images/'+stim.img2+'.png" style="height:200px;">');
      $(".loc3").html('<img src="images/'+stim.img3+'.png" style="height:200px;">');
      $(".loc4").html('<img src="images/'+stim.img4+'.png" style="height:200px;">');

      function getOptions(id,value){
        var result = ''
        for(var i = 0;i<value.length;i++){
          var inputID=`${id}${i+1}`
          result +=`<div><input type="checkbox" id="${inputID}"></input><label for="${inputID}">${value[i]}</label></div>`
        }
          result += `<div><input type="checkbox" id="${id}5" class='otherInput' data-target="${id}text"></input><label for="${id}5">diğer</label></div>`
          result += `<div><input type="text" id="${id}text" style="display:none"></input><label for="${id}text"></label></div>`

        return result
      }
  
      var features_img1 = getOptions('img1feature',stim.features_tr)
      var features_img2 = getOptions('img2feature',stim.features_tr)
      var features_img3 = getOptions('img3feature',stim.features_tr)
      var features_img4 = getOptions('img4feature',stim.features_tr)

      $(".loc5").html(features_img1);
      $(".loc6").html(features_img2);
      $(".loc7").html(features_img3);
      $(".loc8").html(features_img4);

      $('.otherInput').on('click',function(e){
        const targetInputareaID = $(this).data("target")
        if ($(this).is(":checked")) {
          $(`#${targetInputareaID}`).show();
        } else {
          $(`#${targetInputareaID}`).hide();
          $(`#${targetInputareaID}`).val('');
        }
      })
	},

	button : function() {
    exp.img1_resp = [$('#img1feature1').is(":checked"),$('#img1feature2').is(":checked"),$('#img1feature3').is(":checked"),$('#img1feature4').is(":checked"),$('#img1feature5').is(":checked"),$('#img1featuretext').val()];
    exp.img2_resp = [$('#img2feature1').is(":checked"),$('#img2feature2').is(":checked"),$('#img2feature3').is(":checked"),$('#img2feature4').is(":checked"),$('#img2feature5').is(":checked"),$('#img2featuretext').val()];
    exp.img3_resp = [$('#img3feature1').is(":checked"),$('#img3feature2').is(":checked"),$('#img3feature3').is(":checked"),$('#img3feature4').is(":checked"),$('#img3feature5').is(":checked"),$('#img3featuretext').val()];
    exp.img4_resp = [$('#img4feature1').is(":checked"),$('#img4feature2').is(":checked"),$('#img4feature3').is(":checked"),$('#img4feature4').is(":checked"),$('#img4feature5').is(":checked"),$('#img4featuretext').val()];

    const isAllAnswered = [exp.img1_resp,exp.img2_resp,exp.img3_resp,exp.img4_resp].every(responses=>responses.includes(true))
    
    if (isAllAnswered) {
      $(".err").hide();
      this.log_responses();
      _stream.apply(this);
    } else {
      console.log("not all are answered")
      $(".err").show();
    }
  },

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "trial_type": this.stim.trial_type,
          "object": this.stim.object,
          "img1" : this.stim.img1,
          "img2" : this.stim.img2,
          "img3" : this.stim.img3,
          "img4" : this.stim.img4,
          "features" : this.stim.features,
          "rt" : Date.now() - _s.trial_start,
          "response" : [exp.img1_resp,exp.img2_resp,exp.img3_resp,exp.img4_resp],
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

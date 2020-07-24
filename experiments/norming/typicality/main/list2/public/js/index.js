//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function make_slides(f) {
  var slides = {};

function startsWith(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) == 0) {
         return 1;
       }
    }
    return -1; 
}

function getArticleItem(item_id) {
  var article = "";
  if (startsWith(item_id, ["a","e","i","o","u"]) == 1) {
    article = "an ";
  } else {
    article = "a ";
  }
  return article;
}

  slides.bot = slide({
    name : "bot",
    start: function() {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      exp.speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      exp.listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];
      exp.lives = 0;
      var story = exp.speaker + ' says to ' + exp.listener + ': "It\'s a beautiful day, isn\'t it?"'
      var question = 'Who does ' + exp.speaker + ' talk to?';
      document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button : function() {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener)|(exp.text_input == lower) | (exp.text_input== upper))){
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
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
    present : exp.all_stims,
    start : function() {
	     $(".err").hide();
    },
      present_handle : function(stim) {

      console.log("new trial started");
    	this.trial_start = Date.now();
      $(".err").hide();

      this.init_sliders();
      exp.sliderPost = null;
      exp.sliderPost2 = null;
  
	   //$("#objectlabel").val("");	
	  this.stim = stim;
    // stim.item = _.shuffle(stim.item);
	  console.log(this.stim);
    var article = getArticleItem(stim.item);
   //  console.log(stim.item);
   //  console.log(stim.label);
    var contextsentence = "How typical is this material for this object?";
    var contextsentence2 = "How typical is this color for this object?";
	//var contextsentence = "How typical is this for "+stim.basiclevel+"?";
	//var objimagehtml = '<img src="images/'+stim.basiclevel+'/'+stim.item+'.jpg" style="height:190px;">';
    var objimagehtml = '<img src="images/'+stim.label+'.png" style="height:250px;">';

	$("#contextsentence").html(contextsentence);
  $("#contextsentence2").html(contextsentence2);
	$("#objectimage").html(objimagehtml);
	},

	button : function() {
    console.log("button was pressed");

    if ((exp.sliderPost == null) | (exp.sliderPost2 == null)) {
      console.log("one of the sliders is not moved")
      console.log("slider1: " + exp.sliderPost + " ,slider2: " + exp.sliderPost2)
      $(".err").show();
     } else  {   
      console.log("sliders moved");
      console.log("slider1: " + exp.sliderPost + " ,slider2: " + exp.sliderPost2)
      $(".err").hide();
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    }

    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
        // $("#number_guess").html(Math.round(ui.value*N));
      });
      utils.make_slider("#single_slider_2", function(event, ui) {
        exp.sliderPost2 = ui.value;
      });
    },

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": this.stim.item,
          "object": this.stim.label,
          "rt" : Date.now() - _s.trial_start,
          "response" : [exp.sliderPost, exp.sliderPost2]
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
  var items_target = _.shuffle([
{
"label": "bag_paper_green",
"item": ["bag"]
},
{
"label": "bag_plastic_blue",
"item": ["bag"]
},
{
"label": "boot_leather_original",
"item": ["boot"]
},
{
"label": "boot_rubber_brown",
"item": ["boot"]
},
{
"label": "bottle_glass_green",
"item": ["bottle"]
},
{
"label": "bottle_plastic_blue",
"item": ["bottle"]
},
{
"label": "bowl_glass_original",
"item": ["bowl"]
},
{
"label": "bowl_metal_green",
"item": ["bowl"]
},
{
"label": "box_cardboard_blue",
"item": ["box"]
},
{
"label": "box_wood_original",
"item": ["box"]
},
{
"label": "chair_metal_original",
"item": ["chair"]
},
{
"label": "chair_plastic_green",
"item": ["chair"]
},
{
"label": "chair_wood_purple",
"item": ["chair"]
},
{
"label": "cup_metal_green",
"item": ["cup"]
},
{
"label": "cup_plastic_green",
"item": ["cup"]
},
{
"label": "jacket_denim_purple",
"item": ["jacket"]
},
{
"label": "jacket_leather_original",
"item": ["jacket"]
},
{
"label": "pitcher_glass_original",
"item": ["pitcher"]
},
{
"label": "pitcher_metal_green",
"item": ["pitcher"]
},
{
"label": "pitcher_plastic_blue",
"item": ["pitcher"]
},
{
"label": "plate_paper_original",
"item": ["plate"]
},
{
"label": "plate_plastic_original",
"item": ["plate"]
},
{
"label": "spoon_metal_blue",
"item": ["spoon"]
},
{
"label": "spoon_plastic_original",
"item": ["spoon"]
},
{
"label": "spoon_wood_green",
"item": ["spoon"]
},
{
"label": "table_metal_blue",
"item": ["table"]
},
{
"label": "table_wood_original",
"item": ["table"]
},
]);

  function makeTargetStim(i) {
    console.log(items_target.length);
    //get item
    var item = items_target[i];
    var item_id = item.item[0];
    var object_label = item.label;
      
      return {
	  "item": item_id,
    "label": object_label
    }
  }
  
  exp.all_stims = [];
  for (var i=0; i<items_target.length; i++) {
    exp.all_stims.push(makeTargetStim(i));
  }

  exp.all_stims = _.shuffle(exp.all_stims);

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
  exp.structure=["bot","i0","objecttrial", 'subj_info', 'thanks'];
  //exp.structure=["objecttrial", 'subj_info', 'thanks'];
  // 
  
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

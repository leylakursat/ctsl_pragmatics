function make_slides(f) {
  var slides = {};

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
          "slide_number_in_experiment" : "bot_check",
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment" : "bot_check",
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

  slides.demonstration = slide({
    name : "demonstration",
    start: function() {
      $('.button').hide();
      $('.instruction').hide();
      $('.correct').hide();
      $('.incorrect').hide();
      $('.instruction2').hide();
      $('.dtransition').hide();

      $('.demo_word').html('<font size="6">green</font>'); 
      $('.demo_image').html('<img src="images/p_ball_plastic_green.png" align="center" style="height:330px;">');

      setTimeout(function(){
        $('.instruction').show();
      },500)

      var a = 0;

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;
        if ((a==0) && (e.keyCode == 74)){ // pressed J (YES) --> correct answer
          e = 0;
          $('.incorrect').hide();
          $('.correct').show();
          $('.instruction').hide();
          $('.no_image').css('border','');
          $('.yes_image').css('border', "solid 3px green");
          a=1;
          
          setTimeout(function(){
            $('.instruction').hide();
            $('.correct').hide();
            $('.incorrect').hide();
            $('.demo_word').hide();
            $('.demo_image').hide()
            $('.yes_image').hide();
            $('.no_image').hide();
            $('.dtransition').show();
          },1000)
        }
        else if ((a==0) &&  (e.keyCode == 70)){ // pressed F (NO) --> incorrect
          e = 0;
          $('.incorrect').show();
          $('.yes_image').css('border','');
          $('.no_image').css('border', "solid 3px red");
        }
        else if (($('.dtransition').is(":visible")) && (e.keyCode == 32)) {
          exp.go();
        }
      }
    },
  });

  slides.demonstration2 = slide({
    name : "demonstration2",
    start: function() {
      $('.button').hide();
      $('.instruction2').hide();
      $('.correct2').hide();
      $('.incorrect2').hide();
      $('.instruction22').hide();
      
      $('.demo_word2').html('<font size="6">metal</font>');
      $('.demo_image2').html('<img src="images/p_vase_wood_original.png" style="height:330px;">');

      setTimeout(function(){
        $('.instruction2').show();
      },500)

      var a = 0;

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;
        if ((a==0) && (e.keyCode == 70)){  // pressed F (NO) --> correct
          e = 0;
          $('.incorrect2').hide();
          $('.correct2').show();
          $('.no_image2').css('border','solid 3px green');
          $('.yes_image2').css('border', "");
          $('.instruction2').hide();
          a=1;
        
          setTimeout(function(){
            $('.instruction2').hide();
            $('.correct2').hide();
            $('.incorrect2').hide();
            $('.demo_word2').hide();
            $('.demo_image2').hide()
            $('.yes_image2').hide();
            $('.no_image2').hide();
            $('.instruction22').show();
          },1000)
        }
        else if ((a==0) && (e.keyCode == 74)) { // pressed J (YES) --> incorrect
          e = 0;
          $('.incorrect2').show();
          $('.yes_image2').css('border','solid 3px red');
          $('.no_image2').css('border', "");
        }
        else if (($('.instruction22').is(":visible")) && (e.keyCode == 32)) {
          exp.go();
        }
      }
    },
  });

  slides.practicetrial = slide({
    name : "practicetrial",
    present: 
    [{
    "label": "p_ball_metal_original", // no to material
    "item": ["ball"],
    "correct_color": ["silver"],
    "correct_material": ["metal"],
    "feature": ["glass"],
    "feature_type": ["material"],
    "correct_answer": ["no"]
    },
    {
    "label": "p_door_wood_yellow", // yes to color 
    "item": ["door"],
    "correct_color": ["yellow"],
    "correct_material": ["wood"],
    "feature": ["yellow"],
    "feature_type": ["color"],
    "correct_answer": ["yes"]
    },
    {
    "label": "p_ruler_metal_blue", // no to color
    "item": ["bag"],
    "correct_color": ["blue"],
    "correct_material": ["metal"],
    "feature": ["red"],
    "feature_type": ["color"],
    "correct_answer": ["no"]
    },
    {
    "label": "p_ball_plastic_red", // yes to material 
    "item": ["ball"],
    "correct_color": ["red"],
    "correct_material": ["plastic"],
    "feature": ["plastic"],
    "feature_type": ["material"],
    "correct_answer": ["yes"]
    }],

    present_handle : function(stim) {
      exp.pstartTime = Date.now();
      //console.log("timer started: " + (Date.now()-exp.pstartTime))
      
      $(".ptransition").hide();
  
      this.stim = stim;

      var pword = '<font size="6">'+stim.feature+'</font>';
      var pimage = '<img src="images/'+stim.label+'.png" style="height:330px;">';

      $('.pword').html('<font size="6">'+stim.feature+'</font>');
      $('.pimage').html('<img src="images/'+stim.label+'.png" style="height:330px;">');
      $('.pword').show();
      $('.pimage').show();
      $('.pyes_image').css('border', "");
      $('.pno_image').css('border', "");
      $('.pyes_image').show();
      $('.pno_image').show();
      //console.log("image appeared: " + (Date.now()-exp.pstartTime))
      
      var a = 0;
      exp.keyCode = "";

      setTimeout(function(){
        if (a==0) {
          exp.presponseTime = "late";
          //console.log("Late: " + (Date.now()-exp.pstartTime))
          $(".pword").hide();
          $(".pimage").hide();
          $('.pyes_image').hide();
          $('.pno_image').hide();
          $(".ptransition"). show();
          document.getElementById("critical_stop").play();
          a=1;
        }      
      },2000)
      
      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;
        
        if (e.keyCode == 74) {
          exp.keyCode = "yes"
          e = 0;
        } if (e.keyCode  == 70) {
          exp.keyCode = "no"
          e = 0;
        }

        if ((a==0) && (exp.keyCode == "yes"||exp.keyCode == "no") && ($('.ptransition').is(":hidden"))){
          e = 0;
          //console.log("pressed a button: " + (Date.now()-exp.pstartTime))
          exp.presponseTime = Date.now()-exp.pstartTime;
          if (exp.keyCode == stim.correct_answer) { // gave right answer
            if (exp.keyCode == "yes")
              $('.pyes_image').css('border','solid 3px green'); // right answer is yes
            if (exp.keyCode == "no")
              $('.pno_image').css('border','solid 3px green');
          } if (exp.keyCode != stim.correct_answer) { // gave wrong answer
            if (exp.keyCode == "yes")
              $('.pyes_image').css('border','solid 3px red'); // wrong answer is yes
            if (exp.keyCode == "no")
              $('.pno_image').css('border','solid 3px red');
          }
          setTimeout(function(){
            $(".pword").hide();
            $(".pimage").hide();
            $('.pyes_image').hide();
            $('.pno_image').hide();
            $(".ptransition"). show();
          },400)
          a=1;
        }
        if (($('.ptransition').is(":visible")) && (e.keyCode == 32)) {
          e = 0;
          console.log("saving rt as: " + exp.presponseTime)
          _s.button();
        }  
      }
     }, 
    
    button : function() {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    }, 

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : "practice_trial",
          "label": this.stim.label,
          "item": this.stim.item,
          "correct_color": this.stim.correct_color,
          "correct_material": this.stim.correct_material,
          "feature": this.stim.feature,
          "feature_type": this.stim.feature_type,
          "correct_answer": this.stim.correct_answer,
          "response" : [exp.presponseTime, exp.keyCode]
        });
    }
  });

  slides.beforeobject = slide({
    name : "beforeobject",
    start: function() {

      document.onkeydown = checkKey;
        function checkKey(e) {
          e = e || window.event;

          if (e.keyCode == 32)
            exp.go()

      }
    },
    
    // button : function() {
    //   exp.go(); 
    // }
  });

  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.all_stims,
    present_handle : function(stim) {

      exp.startTime = Date.now();
      //console.log("timer started: " + (Date.now()-exp.startTime))
      
      $(".transition").hide();
  
      this.stim = stim;

      var word = '<font size="6">'+stim.feature+'</font>';
      var image = '<img src="images/'+stim.label+'.png" style="height:330px;">';
      $('.word').html('<font size="6">'+stim.feature+'</font>');
      $('.image').html('<img src="images/'+stim.label+'.png" style="height:330px;">');
      $('.word').show();
      $('.image').show();
      $('.yes_image').css('border', "");
      $('.no_image').css('border', "");
      $('.yes_image').show();
      $('.no_image').show();
      //console.log("image appeared: " + (Date.now()-exp.startTime))
      
      var a = 0;
      exp.keyCode = "";

      setTimeout(function(){
        if (a==0) {
          exp.responseTime = "late";
          //console.log("Late: " + (Date.now()-exp.startTime))
          $(".word").hide();
          $(".image").hide();
          $('.yes_image').hide();
          $('.no_image').hide();
          $(".transition"). show();
          document.getElementById("critical_stop").play();
          a=1;
        }      
      },2000)

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;
        
        if (e.keyCode == 74) {
          exp.keyCode = "yes"
          e = 0;
        } if (e.keyCode  == 70) {
          exp.keyCode = "no"
          e = 0;
        }

        if ((a==0) && (exp.keyCode == "yes"||exp.keyCode == "no") && ($('.ptransition').is(":hidden"))){
          e = 0;
          //console.log("pressed a button: " + (Date.now()-exp.startTime))
          exp.responseTime = Date.now()-exp.startTime;
          if (exp.keyCode == stim.correct_answer) { // gave right answer
            if (exp.keyCode == "yes")
              $('.yes_image').css('border','solid 3px green'); // right answer is yes
            if (exp.keyCode == "no")
              $('.no_image').css('border','solid 3px green');
          } if (exp.keyCode != stim.correct_answer) { // gave wrong answer
            if (exp.keyCode == "yes")
              $('.yes_image').css('border','solid 3px red'); // wrong answer is yes
            if (exp.keyCode == "no")
            $('.no_image').css('border','solid 3px red');
          }
          setTimeout(function(){
            $(".word").hide();
            $(".image").hide();
            $('.yes_image').hide();
            $('.no_image').hide();
            $(".transition"). show();
          },400)
          a=1;
        }
        if (($('.transition').is(":visible")) && (e.keyCode == 32)) {
          e = 0;
          console.log("saving rt as: " + exp.responseTime)
          _s.button();
        }  
      }
     }, 
    
    button : function() {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    }, 

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "label": this.stim.label,
          "item": this.stim.item,
          "correct_color": this.stim.correct_color,
          "correct_material": this.stim.correct_material,
          "feature": this.stim.feature,
          "feature_type": this.stim.feature_type,
          "correct_answer": this.stim.correct_answer,
          "response" : [exp.responseTime, exp.keyCode]
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
        color : $('input[name="color"]:checked').val(),
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
  //var items_target = _.shuffle([
    exp.all_stims = _.shuffle(exp.stims);

    console.log(exp.all_stims);
    console.log(exp.all_stims.length);

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
  exp.structure=["bot","i0", "demonstration", "demonstration2", "practicetrial", "beforeobject", "objecttrial", 'subj_info', 'thanks'];
  //exp.structure=["demonstration", "demonstration2", "practicetrial", "beforeobject", "objecttrial", 'subj_info', 'thanks'];
    
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

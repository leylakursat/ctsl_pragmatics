// list1

exp.stims = [];

var list_a = ["bag_paper_blue",
"bag_plastic_green",
"boot_rubber_brown",
"bottle_glass_green",
"bottle_plastic_green",
"bowl_glass_green",
"bowl_metal_silver_original",
"box_wood_blue",
"chair_metal_silver_original",
"chair_plastic_blue_original",
"chair_wood_purple",
"cup_metal_blue",
"cup_plastic_green",
"jacket_denim_purple",
"jacket_leather_purple",
"pitcher_metal_blue",
"pitcher_plastic_green",
"spoon_metal_silver_original",
"spoon_wood_green",
"table_metal_green"]

var list_b = ["bag_paper_green",
"bag_plastic_white_original",
"boot_leather_black_original",
"bottle_glass_blue",
"bottle_plastic_clear_original",
"bowl_metal_blue",
"box_cardboard_green",
"box_wood_green",
"chair_metal_purple",
"chair_plastic_purple",
"cup_plastic_blue",
"jacket_denim_blue_original",
"jacket_leather_black_original",
"pitcher_glass_clear_original",
"pitcher_plastic_blue",
"plate_paper_blue",
"plate_plastic_blue_original",
"spoon_plastic_green",
"spoon_wood_brown_original",
"table_wood_green"]

var list_c = ["bag_paper_brown_original",
"boot_leather_green",
"boot_rubber_green",
"bottle_plastic_blue",
"bowl_glass_blue",
"box_cardboard_blue",
"chair_metal_green",
"chair_wood_green",
"cup_metal_silver_original",
"jacket_denim_green",
"pitcher_glass_green",
"pitcher_metal_green",
"pitcher_plastic_white_original",
"plate_paper_white_original",
"plate_plastic_green",
"plate_plastic_pink",
"spoon_metal_green",
"spoon_plastic_blue",
"spoon_wood_blue",
"table_metal_silver_original"]

var list_d= ["bag_plastic_blue",
"boot_leather_brown",
"boot_rubber_black_original",
"bottle_glass_clear_original",
"bowl_glass_clear_original",
"bowl_metal_green",
"box_cardboard_brown_original",
"box_wood_brown_original",
"chair_plastic_green",
"chair_wood_brown_original",
"cup_metal_green",
"cup_plastic_clear_original",
"jacket_leather_green",
"pitcher_glass_blue",
"pitcher_metal_silver_original",
"plate_paper_green",
"spoon_metal_blue",
"spoon_plastic_white_original",
"table_metal_blue",
"table_wood_blue",
"table_wood_brown_original"]

var order = [   {list_name : list_a, feature_type : "color", correct_answer : "no"},
                {list_name : list_b, feature_type : "material", correct_answer : "yes"},
                {list_name : list_c, feature_type : "material", correct_answer : "no"},
                {list_name : list_d, feature_type : "color", correct_answer : "yes"}
            ];
            
var color_list = ["blue","green","red","brown","black","clear","purple","pink","silver","white","yellow"];
var material_list = ["wood","paper","metal","plastic","rubber","leather","glass","cardboard","denim"]            

function addtoList(order) {
    for (var i=0; i<order.length; i++) {       
        var list = order[i].list_name;               // list             == list_a
        var feature_type = order[i].feature_type;                           
        var correct_answer = order[i].correct_answer;

        for (var k=0; k<list.length; k++) {          // list[0]          == "bag_paper_blue"
            property = []
            property = list[k].split("_");           // property[0] == bag // property[1] == paper // property[2] == blue // property[3] == null or original

            var label = list[k];

            var item = property[0]                   // item             == bag
            var correct_material = property[1]       // correct_material == paper
            var correct_color = property[2]          // correct_color    == blue
            
            if (correct_answer == "yes") {
                if (feature_type == "color") 
                    feature = property[2]
                else if (feature_type == "material")
                    feature = property[1] 
            }
            else if (correct_answer == "no") {
                if (feature_type == "color") {
                    feature = _.sample(color_list);
                    while (feature == correct_color)
                        feature = _.sample(color_list);
                } else if (feature_type == "material") {
                    feature = feature = _.sample(material_list);
                    while (feature == correct_material)
                        feature =_.sample(material_list);
                }
            }    
           
            // var feature_type2 = feature_type         //feature_type      == color OR material (determined by list and order)
            // var correct_answer2 = correct_answer     //correct_answer    == yes OR no (determined by list and order)

            exp.stims.push({
                'label' : label,
                'item' : item,
                'correct_color' : correct_color,
                'correct_material' : correct_material,
                'feature' : feature,
                'feature_type' : feature_type,
                'correct_answer' :  correct_answer
            });
        }    
    }
};

addtoList(order);

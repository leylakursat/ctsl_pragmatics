# overinformativeness (car_big_blue)
# file = open("stim_overinformativeness.txt", "a")

# items = [
#     "apple_big_green",
#     "apple_big_red",
#     "bag_big_blue",
#     "bag_big_red",
#     "ball_big_purple",
#     "ball_big_yellow",
#     "balloon_big_pink",
#     "balloon_big_yellow",
#     "binoculars_big_blue",
#     "binoculars_big_red",
#     "book_big_blue",
#     "book_big_red",
#     "brush_big_blue",
#     "brush_big_red",
#     "button_big_blue",
#     "button_big_green",
#     "car_big_blue",
#     "car_big_green",
#     "cat_big_black",
#     "cat_big_white",
#     "chair_big_blue",
#     "chair_big_yellow",
#     "clock_big_purple",
#     "clock_big_yellow",
#     "dress_big_blue",
#     "dress_big_green",
#     "flower_big_pink",
#     "flower_big_yellow",
#     "glasses_big_blue",
#     "glasses_big_red",
#     "glove_big_green",
#     "glove_big_orange",
#     "hat_big_orange",
#     "hat_big_pink",
#     "key_big_gold",
#     "key_big_silver",
#     "knife_big_blue",
#     "knife_big_red",
#     "lighter_big_black",
#     "lighter_big_white",
#     "lipstick_big_pink",
#     "lipstick_big_red",
#     "lock_big_gold",
#     "lock_big_silver",
#     "mirror_big_black",
#     "mirror_big_white",
#     "pants_big_green",
#     "pants_big_pink",
#     "pepper_big_green",
#     "pepper_big_red",
#     "pot_big_blue",
#     "pot_big_green",
#     "rosary_big_blue",
#     "rosary_big_yellow",
#     "scissors_big_blue",
#     "scissors_big_green",
#     "shoe_big_pink",
#     "shoe_big_yellow",
#     "skirt_big_blue",
#     "skirt_big_green",
#     "socks_big_blue",
#     "socks_big_green",
#     "tie_big_blue",
#     "tie_big_red",
#     "toothbrush_big_green",
#     "toothbrush_big_purple",
#     "tshirt_big_orange",
#     "tshirt_big_yellow",
#     "umbrella_big_blue",
#     "umbrella_big_green",
# ]

# for x in range(len(items)):
#     trial_type = "overinformativeness"
#     parts = items[x].split('_')
#     label = items[x]
#     object = parts[0] #car
#     size = parts[1] # big
#     color = parts[2] # blue

#     # stim =   "{" + "\n\t" + '"trial_type": "overinformativeness",' + "\n\t" + '"label": ' + '"' + label + '",' + "\n\t" + '"object": ' + '"' + object + '",' + "\n\t" + '"object_tr": ' + '"' + "change" + '",' + "\n\t" + '"size": ' + '"' + size+ '",' + "\n\t" + '"color": ' + '"' + color + '",' + "\n" + "}," + "\n"

#     stim =   "{" + "\n\t" + '"trial_type": "overinformativeness",' + "\n\t" + '"label": ' + '"' + label + '",' + "\n\t" + '"object": ' + '"' + object + '",' + "\n\t" + '"size": ' + '"' + size+ '",' + "\n\t" + '"color": ' + '"' + color + '",' + "\n" + "}," + "\n"

#     file.write(stim)

#######################################################################    

# adjective ordering (box_cardboard_one)

file = open("stim_adjordering.txt", "a")

items = [
    "bottle_glass_big",
    "bottle_glass_small",
    "bottle_plastic_big",
    "bottle_plastic_small",
    "box_closed_cardboard",
    "box_closed_wood",
    "box_open_cardboard",
    "box_open_wood",
    "cup_empty_glass",
    "cup_empty_metal",
    "cup_full_glass",
    "cup_full_metal",
    "earring_big_round",
    "earring_big_triangular",
    "earring_small_round",
    "earring_small_triangular",
    "hair_curly_blonde",
    "hair_curly_brown",
    "hair_straight_blond",
    "hair_straight_brown",
    "man_old_bald",
    "man_old_bearded",
    "man_young_bald",
    "man_young_bearded",
    "pencil_long_black",
    "pencil_long_blue",
    "pencil_short_black",
    "pencil_short_blue",
    "picture_bw_rectangular",
    "picture_bw_square",
    "picture_colored_rectangular",
    "picture_colored_square",
    "shorts_dry_green",
    "shorts_dry_red",
    "shorts_wet_green",
    "shorts_wet_red",
    "shorts_wrinkled_green",
    "shorts_wrinkled_red",
    "spoon_metal_clean",
    "spoon_metal_dirty",
    "spoon_wooden_clean",
    "spoon_wooden_dirty",
    "table_metal_high",
    "table_metal_low",
    "table_wood_high",
    "table_wood_low",
    "woman_old_happy",
    "woman_old_sad",
    "woman_young_happy",
    "woman_young_sad",
]

for x in range(len(items)):
    trial_type = "adjective_ordering"
    parts = items[x].split('_')
    label = items[x]
    object = parts[0] # hair
    adj1 = parts[1] # brown
    adj2 = parts[2] # curly

    # stim =   "{" + "\n\t" + '"trial_type": "adjective_ordering",' + "\n\t" + '"label": ' + '"' + label + '",' + "\n\t" + '"object": ' + '"' + object + '",' + "\n\t" + '"object_tr": ' + '"' + "change" + '",' + "\n\t" + '"adj1": ' + '"' + adj1+ '",' + "\n\t" + '"adj2": ' + '"' + adj2 + '",' + "\n" + "}," + "\n"

    stim =   "{" + "\n\t" + '"trial_type": "adjective_ordering",' + "\n\t" + '"label": ' + '"' + label + '",' + "\n\t" + '"object": ' + '"' + object + '",' + "\n\t" + '"adj1": ' + '"' + adj1+ '",' + "\n\t" + '"adj2": ' + '"' + adj2 + '",' + "\n" + "}," + "\n"

    file.write(stim)
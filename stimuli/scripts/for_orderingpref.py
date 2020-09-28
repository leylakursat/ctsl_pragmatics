file = open("stim_orderingpref.txt", "a")

items = [
    "bottle_glass_big",
    "bottle_glass_small",
    "bottle_plastic_big",
    "bottle_plastic_small",
    "box_closed_cardboard",
    "box_closed_wood",
    "box_open_cardboard",
    "box_open_wood",
    "earring_big_round",
    "earring_big_triangular",
    "earring_small_round",
    "earring_small_triangular",
    "frog_spotted_green",
    "frog_spotted_red",
    "frog_striped_green",
    "frog_striped_red",
    "hair_curly_blonde",
    "hair_curly_brown",
    "hair_straight_blond",
    "hair_straight_brown",
    "man_old_bearded",
    "man_old_cleanshaven",
    "man_young_bearded",
    "man_young_cleanshaven",
    "man2_bearded_glassed",
    "man2_bearded_hatted",
    "man2_mustached_glassed",
    "man2_mustached_hatted",
    "nails_black_glossy",
    "nails_black_matte",
    "nails_red_glossy",
    "nails_red_matte",
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
    "woman2_happy_fat",
    "woman2_happy_skinny",
    "woman2_sad_fat",
    "woman2_sad_skinny",
]

for x in range(len(items)):
    trial_type = "adjective_ordering"
    parts = items[x].split('_')
    label = items[x]   # bottle_glass_big
    object = parts[0] # bottle
    adj1 = parts[1] # glass
    adj2 = parts[2] # big

    line = "{" + "\n\t" + '"label": ' + '"' + label + '",' + "\n\t" + '"object": ' + '"' + object + '",' + "\n\t" + '"adj1": ' + '"' + adj1 + '",' + "\n\t" + '"adj2": ' + '"' + adj2 + '",' + "\n" + "}," + "\n"

    file.write(line)
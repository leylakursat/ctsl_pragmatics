items = [
"bag_paper_brown.png",
"bag_plastic_white.png",
"boot_leather_black.png",
"boot_rubber_black.png",
"bottle_glass_clear.png",
"bottle_plastic_clear.png",
"bowl_glass_clear.png",
"bowl_metal_silver.png",
"cup_metal_silver.png",
"cup_plastic_clear.png",
"door_steel_silver.png",
"door_wood_brown.png",
"jacket_denim_blue.png",
"jacket_leather_black.png",
"pitcher_glass_clear.png",
"pitcher_metal_silver.png",
"pitcher_plastic_white.png",
"plate_paper_white.png",
"plate_plastic_blue.png",
"ruler_metal_silver.png",
"ruler_wood_brown.png",
"spoon_metal_silver.png",
"spoon_plastic_white.png",
"spoon_wood_brown.png",
"table_metal_silver.png",
"table_wood_brown.png",
"vase_glass_clear.png",
"vase_wood_brown.png",
]

import random
random.shuffle(items)

file = open("stim_production.txt", "a")

for x in range(len(items)):
    parts = items[x].split('_')
    label= items[x]
    object = parts[0] # car
    trial_type = "adjective_ordering" #change
    adj1 = parts[1] # big
    adj2 = parts[2] # blue

    stim = "{ label: '" + label + "', adj1: '" + adj1 + "', adj2: '" + adj2 + "' }," + "\n"
    
    file.write(stim)



    # {
    #     object: 'bottle', 
    #     trial_type: 'adjective_ordering',
    #     images:[
    #         { label: 'bottle_glass_big', adj1: 'glass', adj2: 'big' },
    #         { label: 'bottle_glass_small', adj1: 'glass', adj2: 'small' },
    #         { label: 'bottle_plastic_big', adj1: 'plastic', adj2: 'big' },
    #         { label: 'bottle_plastic_small', adj1: 'plastic', adj2: 'small' },
    #     ]
    # },
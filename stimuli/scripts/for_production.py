items = [
"banana.png",
"bowl.png",
"butterfly.png",
"carrot.png",
"chick.png",
"cow.png",
"dog.png",
"door.png",
"elephant.png",
"fish.png",
"guitar.png",
"horse.png",
"pig.png",
"pitcher.png",
"strawberry.png",
"tomato.png",
]

import random
random.shuffle(items)

file = open("stim_filler.txt", "a")

for x in range(len(items)):
    parts = items[x].split('_')
    label= items[x]
    object = parts[0] # car
    trial_type = "filler" #change
    adj1 = 'none' # big
    adj2 = 'none' # blue

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
var conds = [
    {label: 'bag_paper_blue', condition: "difficulty_distractor", color: 'blue', material: 'paper', item: 'bag', url: 'stimuli/bag_paper_blue.png', width: 300, height: 300},
    {label: 'bag_paper_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'paper', item: 'bag', url: 'stimuli/bag_paper_brown_original.png', width: 300, height: 300},
    {label: 'bag_paper_green', condition: "difficulty_distractor", color: 'green', material: 'paper', item: 'bag', url: 'stimuli/bag_paper_green.png', width: 300, height: 300},
    {label: 'bag_plastic_blue', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'bag', url: 'stimuli/bag_plastic_blue.png', width: 300, height: 300},
    {label: 'bag_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'bag', url: 'stimuli/bag_plastic_green.png', width: 300, height: 300},
    {label: 'bag_plastic_white_original', condition: "difficulty_distractor", color: 'white', material: 'plastic', item: 'bag', url: 'stimuli/bag_plastic_white_original.png', width: 300, height: 300},
    {label: 'boot_leather_black_original', condition: "difficulty_distractor", color: 'black', material: 'leather', item: 'boot', url: 'stimuli/boot_leather_black_original.png', width: 300, height: 300},
    {label: 'boot_leather_brown', condition: "difficulty_distractor", color: 'brown', material: 'leather', item: 'boot', url: 'stimuli/boot_leather_brown.png', width: 300, height: 300},
    {label: 'boot_leather_green', condition: "difficulty_distractor", color: 'green', material: 'leather', item: 'boot', url: 'stimuli/boot_leather_green.png', width: 300, height: 300},
    {label: 'boot_rubber_black_original', condition: "difficulty_distractor", color: 'black', material: 'rubber', item: 'boot', url: 'stimuli/boot_rubber_black_original.png', width: 300, height: 300},
    {label: 'boot_rubber_brown', condition: "difficulty_distractor", color: 'brown', material: 'rubber', item: 'boot', url: 'stimuli/boot_rubber_brown.png', width: 300, height: 300},
    {label: 'boot_rubber_green', condition: "difficulty_distractor", color: 'green', material: 'rubber', item: 'boot', url: 'stimuli/boot_rubber_green.png', width: 300, height: 300},
    {label: 'bottle_glass_blue', condition: "difficulty_distractor", color: 'blue', material: 'glass', item: 'bottle', url: 'stimuli/bottle_glass_blue.png', width: 300, height: 300},
    {label: 'bottle_glass_clear_original', condition: "difficulty_distractor", color: 'clear', material: 'glass', item: 'bottle', url: 'stimuli/bottle_glass_clear_original.png', width: 300, height: 300},
    {label: 'bottle_glass_green', condition: "difficulty_distractor", color: 'green', material: 'glass', item: 'bottle', url: 'stimuli/bottle_glass_green.png', width: 300, height: 300},
    {label: 'bottle_plastic_blue', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'bottle', url: 'stimuli/bottle_plastic_blue.png', width: 300, height: 300},
    {label: 'bottle_plastic_clear_original', condition: "difficulty_distractor", color: 'clear', material: 'plastic', item: 'bottle', url: 'stimuli/bottle_plastic_clear_original.png', width: 300, height: 300},
    {label: 'bottle_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'bottle', url: 'stimuli/bottle_plastic_green.png', width: 300, height: 300},
    {label: 'bowl_glass_blue', condition: "difficulty_distractor", color: 'blue', material: 'glass', item: 'bowl', url: 'stimuli/bowl_glass_blue.png', width: 300, height: 300},
    {label: 'bowl_glass_clear_original', condition: "difficulty_distractor", color: 'clear', material: 'glass', item: 'bowl', url: 'stimuli/bowl_glass_clear_original.png', width: 300, height: 300},
    {label: 'bowl_glass_green', condition: "difficulty_distractor", color: 'green', material: 'glass', item: 'bowl', url: 'stimuli/bowl_glass_green.png', width: 300, height: 300},
    {label: 'bowl_metal_blue', condition: "difficulty_distractor", color: 'blue', material: 'metal', item: 'bowl', url: 'stimuli/bowl_metal_blue.png', width: 300, height: 300},
    {label: 'bowl_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'bowl', url: 'stimuli/bowl_metal_green.png', width: 300, height: 300},
    {label: 'bowl_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'bowl', url: 'stimuli/bowl_metal_silver_original.png', width: 300, height: 300},
    {label: 'box_cardboard_blue', condition: "difficulty_distractor", color: 'blue', material: 'cardboard', item: 'box', url: 'stimuli/box_cardboard_blue.png', width: 300, height: 300},
    {label: 'box_cardboard_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'cardboard', item: 'box', url: 'stimuli/box_cardboard_brown_original.png', width: 300, height: 300},
    {label: 'box_cardboard_green', condition: "difficulty_distractor", color: 'green', material: 'cardboard', item: 'box', url: 'stimuli/box_cardboard_green.png', width: 300, height: 300},
    {label: 'box_wood_blue', condition: "difficulty_distractor", color: 'blue', material: 'wood', item: 'box', url: 'stimuli/box_wood_blue.png', width: 300, height: 300},
    {label: 'box_wood_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'wood', item: 'box', url: 'stimuli/box_wood_brown_original.png', width: 300, height: 300},
    {label: 'box_wood_green', condition: "difficulty_distractor", color: 'green', material: 'wood', item: 'box', url: 'stimuli/box_wood_green.png', width: 300, height: 300},
    {label: 'chair_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'chair', url: 'stimuli/chair_metal_green.png', width: 300, height: 300},
    {label: 'chair_metal_purple', condition: "difficulty_distractor", color: 'purple', material: 'metal', item: 'chair', url: 'stimuli/chair_metal_purple.png', width: 300, height: 300},
    {label: 'chair_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'chair', url: 'stimuli/chair_metal_silver_original.png', width: 300, height: 300},
    {label: 'chair_plastic_blue_original', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'chair', url: 'stimuli/chair_plastic_blue_original.png', width: 300, height: 300},
    {label: 'chair_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'chair', url: 'stimuli/chair_plastic_green.png', width: 300, height: 300},
    {label: 'chair_plastic_purple', condition: "difficulty_distractor", color: 'purple', material: 'plastic', item: 'chair', url: 'stimuli/chair_plastic_purple.png', width: 300, height: 300},
    {label: 'chair_wood_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'wood', item: 'chair', url: 'stimuli/chair_wood_brown_original.png', width: 300, height: 300},
    {label: 'chair_wood_green', condition: "difficulty_distractor", color: 'green', material: 'wood', item: 'chair', url: 'stimuli/chair_wood_green.png', width: 300, height: 300},
    {label: 'chair_wood_purple', condition: "difficulty_distractor", color: 'purple', material: 'wood', item: 'chair', url: 'stimuli/chair_wood_purple.png', width: 300, height: 300},
    {label: 'cup_metal_blue', condition: "difficulty_distractor", color: 'blue', material: 'metal', item: 'cup', url: 'stimuli/cup_metal_blue.png', width: 300, height: 300},
    {label: 'cup_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'cup', url: 'stimuli/cup_metal_green.png', width: 300, height: 300},
    {label: 'cup_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'cup', url: 'stimuli/cup_metal_silver_original.png', width: 300, height: 300},
    {label: 'cup_plastic_blue', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'cup', url: 'stimuli/cup_plastic_blue.png', width: 300, height: 300},
    {label: 'cup_plastic_clear_original', condition: "difficulty_distractor", color: 'clear', material: 'plastic', item: 'cup', url: 'stimuli/cup_plastic_clear_original.png', width: 300, height: 300},
    {label: 'cup_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'cup', url: 'stimuli/cup_plastic_green.png', width: 300, height: 300},
    {label: 'jacket_denim_blue_original', condition: "difficulty_distractor", color: 'blue', material: 'denim', item: 'jacket', url: 'stimuli/jacket_denim_blue_original.png', width: 300, height: 300},
    {label: 'jacket_denim_green', condition: "difficulty_distractor", color: 'green', material: 'denim', item: 'jacket', url: 'stimuli/jacket_denim_green.png', width: 300, height: 300},
    {label: 'jacket_denim_purple', condition: "difficulty_distractor", color: 'purple', material: 'denim', item: 'jacket', url: 'stimuli/jacket_denim_purple.png', width: 300, height: 300},
    {label: 'jacket_leather_black_original', condition: "difficulty_distractor", color: 'black', material: 'leather', item: 'jacket', url: 'stimuli/jacket_leather_black_original.png', width: 300, height: 300},
    {label: 'jacket_leather_green', condition: "difficulty_distractor", color: 'green', material: 'leather', item: 'jacket', url: 'stimuli/jacket_leather_green.png', width: 300, height: 300},
    {label: 'jacket_leather_purple', condition: "difficulty_distractor", color: 'purple', material: 'leather', item: 'jacket', url: 'stimuli/jacket_leather_purple.png', width: 300, height: 300},
    {label: 'pitcher_glass_blue', condition: "difficulty_distractor", color: 'blue', material: 'glass', item: 'pitcher', url: 'stimuli/pitcher_glass_blue.png', width: 300, height: 300},
    {label: 'pitcher_glass_clear_original', condition: "difficulty_distractor", color: 'clear', material: 'glass', item: 'pitcher', url: 'stimuli/pitcher_glass_clear_original.png', width: 300, height: 300},
    {label: 'pitcher_glass_green', condition: "difficulty_distractor", color: 'green', material: 'glass', item: 'pitcher', url: 'stimuli/pitcher_glass_green.png', width: 300, height: 300},
    {label: 'pitcher_metal_blue', condition: "difficulty_distractor", color: 'blue', material: 'metal', item: 'pitcher', url: 'stimuli/pitcher_metal_blue.png', width: 300, height: 300},
    {label: 'pitcher_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'pitcher', url: 'stimuli/pitcher_metal_green.png', width: 300, height: 300},
    {label: 'pitcher_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'pitcher', url: 'stimuli/pitcher_metal_silver_original.png', width: 300, height: 300},
    {label: 'pitcher_plastic_blue', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'pitcher', url: 'stimuli/pitcher_plastic_blue.png', width: 300, height: 300},
    {label: 'pitcher_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'pitcher', url: 'stimuli/pitcher_plastic_green.png', width: 300, height: 300},
    {label: 'pitcher_plastic_white_original', condition: "difficulty_distractor", color: 'white', material: 'plastic', item: 'pitcher', url: 'stimuli/pitcher_plastic_white_original.png', width: 300, height: 300},
    {label: 'plate_paper_blue', condition: "difficulty_distractor", color: 'blue', material: 'paper', item: 'plate', url: 'stimuli/plate_paper_blue.png', width: 300, height: 300},
    {label: 'plate_paper_green', condition: "difficulty_distractor", color: 'green', material: 'paper', item: 'plate', url: 'stimuli/plate_paper_green.png', width: 300, height: 300},
    {label: 'plate_paper_white_original', condition: "difficulty_distractor", color: 'white', material: 'paper', item: 'plate', url: 'stimuli/plate_paper_white_original.png', width: 300, height: 300},
    {label: 'plate_plastic_blue_original', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'plate', url: 'stimuli/plate_plastic_blue_original.png', width: 300, height: 300},
    {label: 'plate_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'plate', url: 'stimuli/plate_plastic_green.png', width: 300, height: 300},
    {label: 'plate_plastic_pink', condition: "difficulty_distractor", color: 'pink', material: 'plastic', item: 'plate', url: 'stimuli/plate_plastic_pink.png', width: 300, height: 300},
    {label: 'spoon_metal_blue', condition: "difficulty_distractor", color: 'blue', material: 'metal', item: 'spoon', url: 'stimuli/spoon_metal_blue.png', width: 300, height: 300},
    {label: 'spoon_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'spoon', url: 'stimuli/spoon_metal_green.png', width: 300, height: 300},
    {label: 'spoon_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'spoon', url: 'stimuli/spoon_metal_silver_original.png', width: 300, height: 300},
    {label: 'spoon_plastic_blue', condition: "difficulty_distractor", color: 'blue', material: 'plastic', item: 'spoon', url: 'stimuli/spoon_plastic_blue.png', width: 300, height: 300},
    {label: 'spoon_plastic_green', condition: "difficulty_distractor", color: 'green', material: 'plastic', item: 'spoon', url: 'stimuli/spoon_plastic_green.png', width: 300, height: 300},
    {label: 'spoon_plastic_white_original', condition: "difficulty_distractor", color: 'white', material: 'plastic', item: 'spoon', url: 'stimuli/spoon_plastic_white_original.png', width: 300, height: 300},
    {label: 'spoon_wood_blue', condition: "difficulty_distractor", color: 'blue', material: 'wood', item: 'spoon', url: 'stimuli/spoon_wood_blue.png', width: 300, height: 300},
    {label: 'spoon_wood_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'wood', item: 'spoon', url: 'stimuli/spoon_wood_brown_original.png', width: 300, height: 300},
    {label: 'spoon_wood_green', condition: "difficulty_distractor", color: 'green', material: 'wood', item: 'spoon', url: 'stimuli/spoon_wood_green.png', width: 300, height: 300},
    {label: 'table_metal_blue', condition: "difficulty_distractor", color: 'blue', material: 'metal', item: 'table', url: 'stimuli/table_metal_blue.png', width: 300, height: 300},
    {label: 'table_metal_green', condition: "difficulty_distractor", color: 'green', material: 'metal', item: 'table', url: 'stimuli/table_metal_green.png', width: 300, height: 300},
    {label: 'table_metal_silver_original', condition: "difficulty_distractor", color: 'silver', material: 'metal', item: 'table', url: 'stimuli/table_metal_silver_original.png', width: 300, height: 300},
    {label: 'table_wood_blue', condition: "difficulty_distractor", color: 'blue', material: 'wood', item: 'table', url: 'stimuli/table_wood_blue.png', width: 300, height: 300},
    {label: 'table_wood_brown_original', condition: "difficulty_distractor", color: 'brown', material: 'wood', item: 'table', url: 'stimuli/table_wood_brown_original.png', width: 300, height: 300},
    {label: 'table_wood_green', condition: "difficulty_distractor", color: 'green', material: 'wood', item: 'table', url: 'stimuli/table_wood_green.png', width: 300, height: 300}]

var distractorList = [
	...conds
] 

module.exports = distractorList;

import PIL as pillow
from PIL import Image  

import glob


#inPath = r'/Users/leylakursat/Desktop/repos/ctsl_pragmatics/stimuli/05_om_small'
outPath = r'/Users/leylakursat/Desktop/repos/ctsl_pragmatics/stimuli/06_om_smaller'

# for imagePath in os.listdir(inPath):
#     inputPath = os.path.join(inPath, imagePath)
#     fullOutPath = os.path.join(outPath, imagePath)
#     img = Image.open(inputPath)

img_list = [i for i in glob.glob("*.png")]
print(img_list)
for i in img_list:
    img = Image.open(i)
    # newsize = (290, 290)     
    # img = img.resize(newsize) 
    # img_w, img_h = img.size
    # background = Image.new('RGBA', (320, 320), (255, 0, 0, 0))
    # bg_w, bg_h = background.size
    # offset = ((bg_w - img_w) // 2, (bg_h - img_h) // 2)   
    # background.paste(img, offset)                              
    # background.save(outPath,i)
    img.save(outPath,i)




this.dir <- dirname(rstudioapi::getSourceEditorContext()$path)
setwd(this.dir)

library("tidyverse")
library("xlsx")
library("readxl")

files<-list.files(pattern=".xlsx")

for (f in files) {
  print(f)
  d = read_excel(f)
  df = rbind(df,d)
}

# number of participants 
length(unique(df$speakerName)) 

# filter overinformativeness trials
df = df %>%
  filter(trialType == "overinformativeness")

nrow(df) # 210 overinformativeness trials
table(df$condition) # 98 color_sufficient, 112 size_sufficient trials

# was a color mentioned
colors = "blue|green|red|brown|black|clear|purple|pink|silver|gray|grey|white|yellow|violet|gold|silver"
df$colorMention = ifelse(grepl(colors, df$gloss, ignore.case = TRUE), 1,0)
table(df$colorMention)

# was size mentioned
sizes = "big|small|biggest|smalles|tiny|huge|little"
df$sizeMention = ifelse(grepl(sizes, df$gloss, ignore.case = TRUE), 1,0)
table(df$sizeMention)

# was both color and size mentioned
df$colorsizeMention = ifelse(df$colorMention==1&df$sizeMention==1,1,0)
table(df$colorsizeMention)

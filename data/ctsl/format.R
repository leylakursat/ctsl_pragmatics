this.dir <- dirname(rstudioapi::getSourceEditorContext()$path)
setwd(this.dir)

library("tidyverse")
library("xlsx")

files<-list.files(path="relevant",pattern=".csv", full.names = TRUE)

for (f in files) {
  #f = "relevant/2020-81-5-9-5-50-362_5101-0e7d50d0-1d23-4946-b16c-e1a7a00c8849.csv" 
  
  df = read.csv(file=f)
  
  df = df %>%
    mutate(trialType =  clickedObjTrialType) %>%
    mutate(targetName = ifelse(clickedObjTargetStatus=="target",as.character(clickedObjName),ifelse(alt1TargetStatus=="target",as.character(alt1Name),ifelse(alt2TargetStatus=="target",as.character(alt2Name),ifelse(alt3TargetStatus=="target",as.character(alt3Name),NA))))) %>%
    mutate(condition=clickedObjCondition) %>%
    mutate(correct=ifelse(targetName==clickedObjName,1,0)) %>%
    select(gameid,speakerName,listenerName,roundNum,trialType,condition,targetName,clickedObjName,correct) %>%
    add_column(gloss = "", pos_sequence = "", mouthing= "", pointing = "", notes="", listener="")

  df$speakerName = gsub(" ", "", df$speakerName)
  
  filename = paste(unique(df$speakerName), unique(df$listenerName), sep="_")
  export = paste(filename, "xlsx", sep=".")
  path = paste("relevant/for_annotation", export, sep="/")
  write.xlsx(df,path)
 }


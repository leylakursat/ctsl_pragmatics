setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
library(tidyverse)
source("helpers.R")
setwd('../data/')
theme_set(theme_bw())

df = read.csv("../data/example-trials.csv", header = TRUE)

View(df)

length(unique(df$workerid))



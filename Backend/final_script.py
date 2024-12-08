import pandas as pd
import numpy as np
import pickle
import nltk
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
import spacy

# Load the English language model
nlp = spacy.load("en_core_web_sm")

# create stemmer object
ps = PorterStemmer()

#function to create stemmer
def stem(text):
    doc = nlp(text)
    return " ".join([token.lemma_ for token in doc])


# load vectors here
with open('vectors.pkl', 'rb') as file2:
    vectors = pickle.load(file2)

# Load the CountVectorizer object
with open('cv.pkl', 'rb') as file:
    cv = pickle.load(file)

# Load the necessary data
new_df = pd.read_json('new_df.json')
similarity2 = pd.read_json('similarity.json')


# Load the machine learning model
with open('papers.pkl', 'rb') as f:
    model = pickle.load(f)
    
# checking if paper all ready in the index
def checker(paper):
    return paper in new_df['title'].values


def preProcess(paper):
    new_vector = cv.transform([paper])
    similarity2 = cosine_similarity(vectors,new_vector)
    distances = similarity2
    papers_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[0:10]
    
    recommended_papers = []
    for i in papers_list:
        recommended_papers.append(new_df.iloc[i[0]].title)
    
    return recommended_papers

def recommend2(paper):
    paper_index = new_df[new_df['title'] == paper].index[0]
    distances = similarity2[paper_index]
    papers_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]

    recommended_papers = []
    for i in papers_list:
        recommended_papers.append(new_df.iloc[i[0]].title)
    
    return recommended_papers



if __name__ == "__main__":
    # Receive paper title from Node.js
    paper = input()
    
    finder = checker(paper)
    
    if(finder):
        # Call the recommendation function
        recommended_papers =recommend2(paper)

        # Send recommended papers back to Node.js
        for recommended_paper in recommended_papers:
            print(recommended_paper)
        
    else:
        
        paper = stem(paper)
        # print(paper)
        
        # Call the recommendation function
        recommended_papers =preProcess(paper)

        # Send recommended papers back to Node.js
        for recommended_paper in recommended_papers:
            print(recommended_paper)
        

    

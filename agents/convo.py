import os
from langchain.agents import Tool
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain import OpenAI
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.agents import initialize_agent
from secrets_1 import OPENAI_API_KEY, GOOGLE_API_KEY, GOOGLE_CSE_ID
#import random

os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY
os.environ['GOOGLE_API_KEY'] = GOOGLE_API_KEY
os.environ['GOOGLE_CSE_ID'] = GOOGLE_CSE_ID

#print("Please set my temperature to a floating point from 0.0 to 1.0")
temp = 0 # input()

#Initialize llm, tools, memory
def init_tools():
     global search
     global tools
     global memory
     global llm

     search = GoogleSearchAPIWrapper()
     tools = [
     Tool(
          name = "Current Search",
          func = search.run,
          description = "Useful for when you need to answer questions about current events or the current state of the world"
     ),
     ]
     memory = ConversationBufferMemory(memory_key="chat_history")
     llm=OpenAI(temperature=temp)
     return search, tools, memory, llm

init_tools()

agent_chain = initialize_agent(tools, llm, agent="conversational-react-description", verbose=True, memory=memory)

class Converse(object):

     def __init__(self):
          self.proceed = False

     def set_prompt(self, arg):
          global prompt
          prompt = arg
          self.proceed = True
          return prompt
     
     #def user_input(self):
          #query=input()
          #return query
          #pass

     def talk(self, argPrompt):
          if (self.proceed == True):
               self.proceed = False
               agent_chain.run(input=argPrompt)
               #self.talk()

          #else:
          #     agent_chain.run(input="how big are cats")
          #     self.talk()

c = Converse()
#c.talk()

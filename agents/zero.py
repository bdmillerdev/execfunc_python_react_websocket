import os
from langchain.agents import initialize_agent, load_tools, ZeroShotAgent, Tool, AgentExecutor
from langchain import OpenAI, SerpAPIWrapper, LLMChain
from secrets_1 import OPENAI_API_KEY, SERPAPI_API_KEY

os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY
os.environ['SERPAPI_API_KEY'] = SERPAPI_API_KEY

def take_temp():

     print("Please set my temperature to a floating point from 0.0 to 1.0")
     degrees = input()
     return degrees

#Initialize model (llm) and tools
def init_vars():

     global llm
     global search
     global tools
     global prompt
     global llm_chain

     llm = OpenAI(temperature=0)
     search = SerpAPIWrapper()
     tools = load_tools(["serpapi"])
     prompt = ZeroShotAgent.create_prompt(tools) #, input_variables=["input", "agent_scratchpad"])
     llm_chain = LLMChain(llm=llm, prompt=prompt)
     return llm, search, tools, prompt, llm_chain

init_vars()

#Initialize agent
agent=ZeroShotAgent(llm_chain=llm_chain, tools=tools)
agent_executor = AgentExecutor.from_agent_and_tools(agent=agent, tools=tools, verbose=True)

class Discuss(object):

     def __init__(self):
          self.proceed = False

     def set_prompt(self, arg):
          global prompt
          prompt = arg
          self.proceed = True
          return prompt
     
     def blab(self, argPrompt):
          if (self.proceed == True):
               self.proceed = False
               agent_executor.run(input=argPrompt)

d = Discuss()
#d.blab()
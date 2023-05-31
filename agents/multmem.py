import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory, ConversationSummaryMemory, CombinedMemory
from secrets_1 import OPENAI_API_KEY, SERPAPI_API_KEY

os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY
os.environ['SERPAPI_API_KEY'] = SERPAPI_API_KEY

conv_memory = ConversationBufferMemory(
    #human_prefix: str = "Human",
    #ai_prefix: str = "AI",
    #buffer: str = "",
    #output_key: str | None = None,
    memory_key="chat_history_lines",
    input_key="input"
)

summary_memory = ConversationSummaryMemory(llm=OpenAI(), input_key="input")
# Combined
memory = CombinedMemory(memories=[conv_memory, summary_memory])
_DEFAULT_TEMPLATE = """The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Summary of conversation:
{history}
Current conversation:
{chat_history_lines}
Human: {input}
AI:"""

PROMPT = PromptTemplate(
    input_variables=["history", "input", "chat_history_lines"], template=_DEFAULT_TEMPLATE
)

temp=input()
llm = OpenAI(temperature=temp)
conversation = ConversationChain(
    llm=llm, 
    verbose=True, 
    memory=memory,
    prompt=PROMPT
)
import sys
#import subprocess
import socketio
from aiohttp import web
from io import StringIO
#from contextlib import redirect_stdout
import os
from zero import Discuss
#import zero
from langchain.agents import Tool
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain import OpenAI
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.agents import initialize_agent
from secrets_1 import OPENAI_API_KEY, GOOGLE_API_KEY, GOOGLE_CSE_ID

d = Discuss()
# Dev
HOST = '127.0.0.1'
# Prod
# HOST = 'https://www.execfunc.com/
PORT = 4030
path = "/Users/kjannette/workspace/efAgent"
sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode='aiohttp', logger=False, engineio_logger=False)
prompt = False

app = web.Application()
sio.attach(app)
print('server')
@sio.on('connect')
async def connect(sid, environmet):
    print('connect to client. sid', sid)

@sio.on('from_client')
async def handle_data(sid, data):
    print("~~~~~~~~~~~~~~~~~~~~~~data.message", data['message'])
    prompt = data['message']
    d.set_prompt(prompt)
    #await sio.emit('from_server', { 'message': 'prompt received' })
    old_stdout = sys.stdout
    sys.stdout = mystdout = StringIO()
    d.blab(prompt)
    response = mystdout.getvalue()
    await sio.emit('from_server', { 'message': response })
    sys.stdout = old_stdout
    print('response', response)

if __name__ == '__main__':
    web.run_app(app, host=HOST, port=PORT)
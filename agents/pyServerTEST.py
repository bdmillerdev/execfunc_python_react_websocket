# This is a cut and paste sanbox for debugging/fixing pyServer.py on server
import sys
import socketio
from aiohttp import web
from io import StringIO
import os
from convo import Converse
from langchain.agents import Tool
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain import OpenAI
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.agents import initialize_agent
from secrets_1 import OPENAI_API_KEY, GOOGLE_API_KEY, GOOGLE_CSE_ID

# Prod and dev
HOST = '127.0.0.1'
PORT = 4010
sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode='aiohttp', logger=True, engineio_logger=True)
c = Converse()
prompt = False

app = web.Application()
sio.attach(app)
print('server')
@sio.on('connect')
async def connect(sid, environmet):
    print('connect to client, sid', sid)

@sio.on('from_client')
async def handle_data(sid, data):
    print("~~~~~~~~~~~~~~~~~~~~~~data.message", data['message'])
    prompt = data['message']
    c.set_prompt(prompt)
    old_stdout = sys.stdout
    sys.stdout = mystdout = StringIO()
    c.blab(prompt)
    response = mystdout.getvalue()
    await sio.emit('from_server', { 'message': response })
    sys.stdout = old_stdout
    print('response', response)

if __name__ == '__main__':
    web.run_app(app, host=HOST, port=PORT)
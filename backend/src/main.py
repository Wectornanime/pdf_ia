from dotenv import load_dotenv
from services.gemini_service import GeminiService

load_dotenv()

contents = list()

while(True):
    ask = input('Sua pergunta: ')
    if ask == '':
        print('BYE!')
        break

    contents.append(f'USER: {ask}')
    resp = GeminiService.do_ask(contents)
    print(f'Resposta: {resp}')
    contents.append(f'MODEL: {resp}')
